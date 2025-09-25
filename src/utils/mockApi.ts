/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageResult, SearchFilters } from '../types'

/**
 * Busca imagens na API do Pexels
 */
export const pexelImages = async (query: string, page: number = 1): Promise<ImageResult[]> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`,
      { 
        headers: { 
          Authorization: import.meta.env.VITE_PEXELS_KEY ?? '' 
        } 
      }
    )

    if (!response.ok) {
      throw new Error(`Erro na API Pexels: ${response.statusText}`)
    }

    const data = await response.json()

    return data.photos?.map((photo: any) => ({
      src: photo.src.medium,
      id: `pexels-${photo.id}`,
      sourceName: 'Pexels',
      sourceColor: 'bg-green-500',
      title: photo.alt || `Imagem de ${query}`,
      photographer: photo.photographer || 'Pexels'
    })) || []
    
  } catch (error) {
    console.error("Erro ao buscar imagens no Pexels:", error)
    return []
  }
}

/**
 * Busca imagens na API do Pixabay
 */
export const pixabayImages = async (query: string, page: number = 1): Promise<ImageResult[]> => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_KEY}&q=${query}&page=${page}&per_page=15`
    )

    if (!response.ok) {
      throw new Error(`Erro na API Pixabay: ${response.statusText}`)
    }

    const data = await response.json()

    return data.hits?.map((photo: any) => ({
      src: photo.webformatURL,
      id: `pixabay-${photo.id}`,
      sourceName: 'Pixabay',
      sourceColor: 'bg-orange-500',
      title: photo.tags || `Imagem de ${query}`,
      photographer: photo.user || 'Pixabay'
    })) || []
    
  } catch (error) {
    console.error("Erro ao buscar imagens no Pixabay:", error)
    return []
  }
}

/**
 * Busca imagens na API do Unsplash
 */
export const unsplashImages = async (query: string, page: number = 1): Promise<ImageResult[]> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=15`,
      { 
        headers: { 
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY ?? ''}` 
        } 
      }
    )

    if (!response.ok) {
      throw new Error(`Erro na API Unsplash: ${response.statusText}`)
    }

    const data = await response.json()

    return data.results?.map((photo: any) => ({
      src: photo.urls.regular,
      id: `unsplash-${photo.id}`,
      sourceName: 'Unsplash',
      sourceColor: 'bg-blue-500',
      title: photo.alt_description || photo.description || `Imagem de ${query}`,
      photographer: photo.user?.name || 'Unsplash'
    })) || []
    
  } catch (error) {
    console.error("Erro ao buscar imagens no Unsplash:", error)
    return []
  }
}

/**
 * Função principal que busca imagens de múltiplas fontes
 * baseada nos filtros selecionados
 */
export const fetchImages = async (
  query: string,
  page: number = 1,
  filters?: SearchFilters
): Promise<{ results: ImageResult[], hasMore: boolean }> => {
  
  // Define quais sources usar (padrão: todas)
  const selectedSources = filters?.sources && filters.sources.length > 0 
    ? filters.sources 
    : ['pexels', 'pixabay', 'unsplash']

  // Cria promises para todas as APIs selecionadas
  const apiPromises = selectedSources.map(async (source) => {
    const apiConfig = API_CONFIG[source as keyof typeof API_CONFIG]
    if (apiConfig) {
      return await apiConfig.fetcher(query, page)
    }
    return []
  })

  try {
    // Executa todas as requisições em paralelo
    const apiResults = await Promise.allSettled(apiPromises)
    
    // Processa os resultados, ignorando erros
    const allImages: ImageResult[] = []
    
    apiResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        allImages.push(...result.value)
      }
    })

    // Embaralha os resultados para misturar as fontes
    const shuffledImages = shuffleArray(allImages)

    // Para paginação, assumimos que há mais resultados se pelo menos uma API retornou dados
    const hasMore = allImages.length > 0

    return {
      results: shuffledImages,
      hasMore
    }
    
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    return {
      results: [],
      hasMore: false
    }
  }
}

/**
 * Função auxiliar para embaralhar um array (Fisher-Yates shuffle)
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Mapeamento de APIs para facilitar a busca
const API_CONFIG = {
  pexels: {
    name: 'Pexels',
    color: 'bg-green-500',
    fetcher: pexelImages
  },
  pixabay: {
    name: 'Pixabay', 
    color: 'bg-orange-500',
    fetcher: pixabayImages
  },
  unsplash: {
    name: 'Unsplash',
    color: 'bg-blue-500', 
    fetcher: unsplashImages
  }
}

/**
 * Função específica para busca inicial (primeira página)
 */
export const searchImages = async (filters: SearchFilters): Promise<ImageResult[]> => {
  const response = await fetchImages(filters.query, 1, filters)
  return response.results
}

/**
 * Função para carregar mais resultados (páginas seguintes)
 */
export const loadMoreImages = async (
  query: string,
  page: number,
  filters?: SearchFilters
): Promise<{ results: ImageResult[], hasMore: boolean }> => {
  return await fetchImages(query, page, filters)
}

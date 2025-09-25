import { ImageResult } from '../types';

export const pexelImages = async (query: string) => {
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`,
      { headers: { Authorization: import.meta.env.VITE_PEXELS_KEY ?? '' } }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    const pexelImagesList = data.photos?.map((photo: any) => ({
      src: photo.src.medium,
      id: photo.src.medium,
      sourceName: 'Daniel',
      sourceColor: '',
      title: photo.src.medium,
      photographer: 'BISPO DANIEL'
    })) || [];

    return pexelImagesList;
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
};

export const pixabayImages = async (query: string) => {
  
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_KEY}&q=${query}`,
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    const pexelImagesList = data.hits?.map((photo: any) => ({
      src: photo.webformatURL,
      id: photo.id,
      sourceName: 'pixabay',
      sourceColor: '',
      title: '',
      photographer: photo.user
    })) || [];

    return pexelImagesList;
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
};

export const unsplashImages = async (query: string) => {
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}`,
      { headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY ?? ''}`  } }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    const pexelImagesList = data.results?.map((photo: any) => ({
      src: photo.urls.regular,
      id: photo.id,
      sourceName: 'unsplash',
      sourceColor: '',
      title: photo.alternative_slugs.pt,
      photographer: photo.user.name 
    })) || [];

    return pexelImagesList;
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
};

const SOURCES = [
  { name: 'Pexels', color: 'bg-green-500' },
  { name: 'Unsplash', color: 'bg-blue-500' },
  { name: 'Pixabay', color: 'bg-orange-500' },
];

const PHOTOGRAPHERS = [
  'John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia', 
  'David Wilson', 'Sarah Brown', 'Michael Davis', 'Emma Taylor'
];

export const fetchImages = async (
  query: string, 
  page: number = 1,
  filters?: { style?: string; orientation?: string; color?: string; sources?: string[] }
): Promise<{ results: ImageResult[]; hasMore: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const startIndex = (page - 1) * 9;
  const endIndex = startIndex + 9;
  
  const results: ImageResult[] = PEXELS_IMAGES.slice(startIndex, endIndex).map((src, index) => {
    // Filter sources based on user selection
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const startIndex = (page - 1) * 9;
  const endIndex = startIndex + 9;
  
  const results: ImageResult[] = PEXELS_IMAGES.slice(startIndex, endIndex).map((src, index) => {
    // Filter sources based on user selection
    const availableSources = filters?.sources && filters?.sources?.length > 0 
      ? SOURCES.filter(source => {
          const sourceMap: { [key: string]: string } = {
            'pexels': 'Pexels',
            'unsplash': 'Unsplash', 
            'pixabay': 'Pixabay'
          };
          return filters.sources!.includes(Object.keys(sourceMap).find(key => sourceMap[key] === source.name) || '');
        })
      : SOURCES;
    
    const source = availableSources[Math.floor(Math.random() * availableSources?.length)];
    const photographer = PHOTOGRAPHERS[Math.floor(Math.random() * PHOTOGRAPHERS?.length)];
    
    return {
      id: `${page}-${index}`,
      src,
      sourceName: source.name,
      sourceColor: source.color,
      title: `${query} Image ${startIndex + index + 1}`,
      photographer
    };
  });

  return {
    results,
    hasMore: endIndex < PEXELS_IMAGES?.length,
    total: PEXELS_IMAGES?.length
  };
};
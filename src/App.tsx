/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import ImageGrid from './components/ImageGrid'
import { searchImages, loadMoreImages } from './utils/mockApi'
import { SearchFilters, SearchState } from './types'

const INITIAL_SEARCH_STATE: SearchState = {
  results: [],
  loading: false,
  hasMore: false,
  page: 1
}

function App() {
  const [searchState, setSearchState] = useState<SearchState>(INITIAL_SEARCH_STATE)
  const [currentQuery, setCurrentQuery] = useState<SearchFilters | null>(null)
  const [totalResults, setTotalResults] = useState<number>(0)

  const isInitialLoading = searchState.loading && searchState.page === 1
  const hasResults = searchState.results.length > 0
  const shouldShowResultsCounter = currentQuery && !searchState.loading

  const resetSearchState = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      loading: false,
      results: [],
      hasMore: false
    }))
    setTotalResults(0)
  }, [])

  const updateSearchResults = useCallback((results: any[], hasMore: boolean, page: number) => {
    setSearchState({
      results,
      loading: false,
      hasMore,
      page
    })
  }, [])

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    // Validação: pelo menos uma fonte deve estar selecionada
    if (!filters.sources || filters.sources.length === 0) {
      console.warn('Nenhuma fonte selecionada para busca')
      return
    }

    setSearchState(prev => ({ ...prev, loading: true }))
    setCurrentQuery(filters)

    try {
      // Usa a nova função que busca em múltiplas APIs
      const results = await searchImages(filters)
      
      updateSearchResults(results, results.length > 0, 1)
      setTotalResults(results.length)
    } catch (error) {
      console.error('Search failed:', error)
      resetSearchState()
    }
  }, [updateSearchResults, resetSearchState])

  const handleLoadMore = useCallback(async () => {
    if (!currentQuery || searchState.loading) return

    // Validação para load more
    if (!currentQuery.sources || currentQuery.sources.length === 0) {
      console.warn('Nenhuma fonte selecionada para carregar mais resultados')
      return
    }

    setSearchState(prev => ({ ...prev, loading: true }))

    try {
      const nextPage = searchState.page + 1
      
      // Usa a nova função para carregar mais resultados
      const response = await loadMoreImages(currentQuery.query, nextPage, currentQuery)

      setSearchState(prev => ({
        results: [...prev.results, ...response.results],
        loading: false,
        hasMore: response.hasMore,
        page: nextPage
      }))
      
      setTotalResults(prev => prev + response.results.length)
    } catch (error) {
      console.error('Load more failed:', error)
      setSearchState(prev => ({ ...prev, loading: false }))
    }
  }, [currentQuery, searchState.loading, searchState.page])

  const renderResultsCounter = () => {
    if (!shouldShowResultsCounter) return null

    const resultsText = totalResults !== 1 ? 's' : ''
    const queryText = currentQuery.query
    const sourcesText = getSelectedSourcesText(currentQuery.sources)

    return (
      <div className="mb-6">
        {hasResults ? (
          <p className="text-gray-600 text-sm">
            Encontramos{' '}
            <span className="font-semibold text-gray-800">{totalResults}</span>{' '}
            resultado{resultsText} para{' '}
            <span className="font-semibold text-gray-800">'{queryText}'</span>
            {sourcesText && (
              <span className="text-gray-500"> em {sourcesText}</span>
            )}
          </p>
        ) : (
          <p className="text-gray-600 text-sm">
            Nenhuma imagem encontrada para{' '}
            <span className="font-semibold text-gray-800">'{queryText}'</span>
            {sourcesText && (
              <span className="text-gray-500"> em {sourcesText}</span>
            )}
          </p>
        )}
      </div>
    )
  }

  const getSelectedSourcesText = (sources?: string[]): string => {
    if (!sources || sources.length === 0) return ''
    
    const sourceNames: { [key: string]: string } = {
      'pexels': 'Pexels',
      'pixabay': 'Pixabay',
      'unsplash': 'Unsplash'
    }

    const names = sources.map(source => sourceNames[source]).filter(Boolean)
    
    if (names.length === 0) return ''
    if (names.length === 1) return names[0]
    if (names.length === 2) return `${names[0]} e ${names[1]}`
    
    return `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
  }

  const renderFooter = () => (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          Agregador de imagens - Conectando você às melhores fontes de imagens da web
        </p>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchForm 
          onSearch={handleSearch}
          loading={isInitialLoading}
        />
        
        {renderResultsCounter()}
        
        <ImageGrid
          images={searchState.results}
          hasMore={searchState.hasMore}
          loading={searchState.loading}
          onLoadMore={handleLoadMore}
        />
      </main>

      {renderFooter()}
    </div>
  )
}

export default App
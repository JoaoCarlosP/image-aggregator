import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ImageGrid from './components/ImageGrid';
import { fetchImages, pexelImages, pixabayImages, unsplashImages } from './utils/mockApi';
import { SearchFilters, SearchState  } from './types';

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    results: [],
    loading: false,
    hasMore: false,
    page: 1
  });
  
  const [currentQuery, setCurrentQuery] = useState<SearchFilters | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSearch = async (filters: SearchFilters) => {
    console.log('TESTE')
    setSearchState(prev => ({ ...prev, loading: true }));
    setCurrentQuery(filters);

    try {
      const response = await unsplashImages(filters.query);
      console.log(response)
      setSearchState({
        results: response,
        loading: false,
        hasMore: response.hasMore,
        page: 1
      });
      setTotalResults(response?.length);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchState(prev => ({ 
        ...prev, 
        loading: false,
        results: [],
        hasMore: false 
      }));
      setTotalResults(0);
    }
  };

  const handleLoadMore = async () => {
    if (!currentQuery || searchState.loading) return;

    setSearchState(prev => ({ ...prev, loading: true }));

    try {
      const nextPage = searchState.page + 1;
      const response = await fetchImages(currentQuery.query, nextPage, {
        style: currentQuery.style,
        orientation: currentQuery.orientation,
        color: currentQuery.color,
        sources: currentQuery.sources
      });

      setSearchState(prev => ({
        results: [...prev.results, ...response.results],
        loading: false,
        hasMore: response.hasMore,
        page: nextPage
      }));
      setTotalResults(prev => prev + response.results.length);
    } catch (error) {
      console.error('Load more failed:', error);
      setSearchState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchForm 
          onSearch={handleSearch}
          loading={searchState.loading && searchState.page === 1}
        />
        
        {/* Results Counter */}
        {currentQuery && !searchState.loading && (
          <div className="mb-6">
            {searchState.results.length > 0 ? (
              <p className="text-gray-600 text-sm">
                Encontramos <span className="font-semibold text-gray-800">{totalResults}</span> resultado{totalResults !== 1 ? 's' : ''} para <span className="font-semibold text-gray-800">'{currentQuery.query}'</span>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Nenhuma imagem encontrada para <span className="font-semibold text-gray-800">'{currentQuery.query}'</span>
              </p>
            )}
          </div>
        )}
        
        <ImageGrid
          images={searchState.results}
          hasMore={searchState.hasMore}
          loading={searchState.loading}
          onLoadMore={handleLoadMore}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 text-sm">
            Agregador de imagens - Conectando você às melhores fontes de imagens da web
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
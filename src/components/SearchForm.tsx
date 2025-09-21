import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    style: '',
    orientation: '',
    color: '',
    sources: ['pexels', 'unsplash', 'pixabay'] // All sources selected by default
  });

  const availableSources = [
    { id: 'pexels', name: 'Pexels', color: 'bg-green-500' },
    { id: 'unsplash', name: 'Unsplash', color: 'bg-blue-500' },
    { id: 'pixabay', name: 'Pixabay', color: 'bg-orange-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        ...filters
      });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSourceToggle = (sourceId: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter(id => id !== sourceId)
        : [...prev.sources, sourceId]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por paisagens, pessoas, objetos..."
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Sliders className="w-4 h-4" />
            <span className="text-sm font-medium">Opções Avançadas</span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Pesquisando...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Pesquisar</span>
              </>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="pt-4 border-t border-gray-100 space-y-4">
            {/* Sources Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fontes de Imagem
              </label>
              <div className="flex flex-wrap gap-3">
                {availableSources.map((source) => (
                  <label
                    key={source.id}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.sources.includes(source.id)}
                        onChange={() => handleSourceToggle(source.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                        filters.sources.includes(source.id)
                          ? `${source.color} border-transparent`
                          : 'border-gray-300 bg-white group-hover:border-gray-400'
                      } flex items-center justify-center`}>
                        {filters.sources.includes(source.id) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${
                      filters.sources.includes(source.id)
                        ? 'text-gray-800'
                        : 'text-gray-600 group-hover:text-gray-800'
                    }`}>
                      {source.name}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selecione as fontes onde deseja buscar imagens
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estilo
                </label>
                <select
                  value={filters.style}
                  onChange={(e) => handleFilterChange('style', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Todos os estilos</option>
                  <option value="realistic">Realista</option>
                  <option value="illustration">Ilustração</option>
                  <option value="3d">3D</option>
                  <option value="flat">Flat Design</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientação
                </label>
                <select
                  value={filters.orientation}
                  onChange={(e) => handleFilterChange('orientation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Todas</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="square">Quadrada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Predominante
                </label>
                <select
                  value={filters.color}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Todas as cores</option>
                  <option value="red">Vermelho</option>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="yellow">Amarelo</option>
                  <option value="purple">Roxo</option>
                  <option value="orange">Laranja</option>
                  <option value="black">Preto</option>
                  <option value="white">Branco</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
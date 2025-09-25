import React, { useState, useCallback } from 'react'
import { Search, ChevronDown, ChevronUp, Sliders } from 'lucide-react'
import { SearchFilters } from '../types'

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void
  loading: boolean
}

interface SourceSelectorProps {
  sources: string[]
  onSourceToggle: (sourceId: string) => void
}

interface FilterDropdownProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string, label: string }>
}

interface AdvancedToggleProps {
  showAdvanced: boolean
  onToggle: () => void
}

interface SearchButtonProps {
  loading: boolean
  disabled: boolean
}

const AVAILABLE_SOURCES = [
  { id: 'pexels', name: 'Pexels', color: 'bg-green-500' },
  { id: 'unsplash', name: 'Unsplash', color: 'bg-blue-500' },
  { id: 'pixabay', name: 'Pixabay', color: 'bg-orange-500' }
]

const FILTER_OPTIONS = {
  style: [
    { value: '', label: 'Todos os estilos' },
    { value: 'realistic', label: 'Realista' },
    { value: 'illustration', label: 'Ilustração' },
    { value: '3d', label: '3D' },
    { value: 'flat', label: 'Flat Design' }
  ],
  orientation: [
    { value: '', label: 'Todas' },
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'square', label: 'Quadrada' }
  ],
  color: [
    { value: '', label: 'Todas as cores' },
    { value: 'red', label: 'Vermelho' },
    { value: 'blue', label: 'Azul' },
    { value: 'green', label: 'Verde' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'purple', label: 'Roxo' },
    { value: 'orange', label: 'Laranja' },
    { value: 'black', label: 'Preto' },
    { value: 'white', label: 'Branco' }
  ]
}

const INITIAL_FILTERS = {
  style: '',
  orientation: '',
  color: '',
  sources: ['pexels', 'unsplash', 'pixabay']
}

const SourceCheckbox: React.FC<{
  source: typeof AVAILABLE_SOURCES[0]
  isSelected: boolean
  onToggle: (id: string) => void
}> = ({ source, isSelected, onToggle }) => (
  <label className="flex items-center space-x-2 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(source.id)}
        className="sr-only"
      />
      <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
        isSelected
          ? `${source.color} border-transparent`
          : 'border-gray-300 bg-white group-hover:border-gray-400'
      } flex items-center justify-center`}>
        {isSelected && (
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
      isSelected
        ? 'text-gray-800'
        : 'text-gray-600 group-hover:text-gray-800'
    }`}>
      {source.name}
    </span>
  </label>
)

const SourceSelector: React.FC<SourceSelectorProps> = ({ sources, onSourceToggle }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      Fontes de Imagem
    </label>
    <div className="flex flex-wrap gap-3">
      {AVAILABLE_SOURCES.map((source) => (
        <SourceCheckbox
          key={source.id}
          source={source}
          isSelected={sources.includes(source.id)}
          onToggle={onSourceToggle}
        />
      ))}
    </div>
    <p className="text-xs text-gray-500 mt-2">
      Selecione as fontes onde deseja buscar imagens
    </p>
  </div>
)

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

const AdvancedToggle: React.FC<AdvancedToggleProps> = ({ showAdvanced, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
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
)

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
)

const SearchButton: React.FC<SearchButtonProps> = ({ loading, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center space-x-2"
  >
    {loading ? (
      <>
        <LoadingSpinner />
        <span>Pesquisando...</span>
      </>
    ) : (
      <>
        <Search className="w-4 h-4" />
        <span>Pesquisar</span>
      </>
    )}
  </button>
)

const SearchInput: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Busque por paisagens, pessoas, objetos..."
      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
    />
  </div>
)

const AdvancedFilters: React.FC<{
  filters: typeof INITIAL_FILTERS
  onFilterChange: (key: string, value: string) => void
  onSourceToggle: (sourceId: string) => void
}> = ({ filters, onFilterChange, onSourceToggle }) => (
  <div className="pt-4 border-t border-gray-100 space-y-4">
    <SourceSelector 
      sources={filters.sources} 
      onSourceToggle={onSourceToggle} 
    />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FilterDropdown
        label="Estilo"
        value={filters.style}
        onChange={(value) => onFilterChange('style', value)}
        options={FILTER_OPTIONS.style}
      />
      
      <FilterDropdown
        label="Orientação"
        value={filters.orientation}
        onChange={(value) => onFilterChange('orientation', value)}
        options={FILTER_OPTIONS.orientation}
      />
      
      <FilterDropdown
        label="Cor Predominante"
        value={filters.color}
        onChange={(value) => onFilterChange('color', value)}
        options={FILTER_OPTIONS.color}
      />
    </div>
  </div>
)

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const isSearchDisabled = !query.trim() || loading

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        ...filters
      })
    }
  }, [query, filters, onSearch])

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleSourceToggle = useCallback((sourceId: string) => {
    setFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter(id => id !== sourceId)
        : [...prev.sources, sourceId]
    }))
  }, [])

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchInput value={query} onChange={setQuery} />

        <div className="flex items-center justify-between">
          <AdvancedToggle 
            showAdvanced={showAdvanced} 
            onToggle={toggleAdvanced} 
          />
          
          <SearchButton 
            loading={loading} 
            disabled={isSearchDisabled} 
          />
        </div>

        {showAdvanced && (
          <AdvancedFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSourceToggle={handleSourceToggle}
          />
        )}
      </form>
    </div>
  )
}

export default SearchForm
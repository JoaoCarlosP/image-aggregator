export interface ImageResult {
  id: string;
  src: string;
  sourceName: string;
  sourceColor: string;
  title?: string;
  photographer?: string;
}

export interface SearchFilters {
  query: string;
  style: string;
  orientation: string;
  color: string;
  sources: string[];
}

export interface SearchState {
  results: ImageResult[];
  loading: boolean;
  hasMore: boolean;
  page: number;
}
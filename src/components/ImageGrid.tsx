import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import ImageCard from './ImageCard';
import { ImageResult } from '../types';

interface ImageGridProps {
  images: ImageResult[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  hasMore, 
  loading, 
  onLoadMore 
}) => {
  if (images.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Nenhuma imagem encontrada</div>
        <p className="text-gray-500 text-sm">Tente usar termos diferentes para sua busca</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-0">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid mb-4 sm:mb-6">
            <ImageCard image={image} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 flex items-center space-x-3 shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                <span>Carregando mais...</span>
              </>
            ) : (
              <>
                <MoreHorizontal className="w-5 h-5" />
                <span>Carregar Mais</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};

export default ImageGrid;
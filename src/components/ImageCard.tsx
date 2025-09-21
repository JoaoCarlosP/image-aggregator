import React from 'react';
import { Download, Copy, ExternalLink } from 'lucide-react';
import { ImageResult } from '../types';

interface ImageCardProps {
  image: ImageResult;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const handleDownload = () => {
    // Mock download functionality - replace with actual download logic
    console.log('Downloading image:', image.src);
    // In a real app, you would trigger the download here
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(image.src);
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.title || 'Image'}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
            <button
              onClick={handleDownload}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Copiar Link"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.open(image.src, '_blank')}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Abrir Original"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Source Badge */}
        <div className="absolute bottom-3 right-3">
          <span className={`${image.sourceColor} text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg`}>
            {image.sourceName}
          </span>
        </div>
      </div>

      {/* Image Info */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-800 truncate">
          {image.title}
        </p>
        {image.photographer && (
          <p className="text-xs text-gray-500 mt-1">
            por {image.photographer}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
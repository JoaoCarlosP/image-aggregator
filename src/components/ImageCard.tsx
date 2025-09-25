import React from 'react';
import { Download, Copy, ExternalLink, MoreVertical } from 'lucide-react';
import { ImageResult } from '../types';

interface ImageCardProps {
  image: ImageResult;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const handleDownload = () => {
    // Mock download functionality - replace with actual download logic
    console.log('Downloading image:', image.src);
    // In a real app, you would trigger the download here
    setShowMobileMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(image.src);
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
    } finally {
      setShowMobileMenu(false);
    }
  };

  const handleOpenOriginal = () => {
    window.open(image.src, '_blank');
    setShowMobileMenu(false);
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
        
        {/* Desktop Overlay on Hover */}
        <div className="hidden sm:flex absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 items-center justify-center">
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
              onClick={handleOpenOriginal}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Abrir Original"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden absolute top-3 right-3">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-opacity-100"
            title="Opções"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <div 
              className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMobileMenu(false)}
            />
            
            {/* Menu */}
            <div className="sm:hidden absolute top-12 right-3 bg-white rounded-xl shadow-xl border border-gray-200 z-50 min-w-[160px] overflow-hidden">
              <button
                onClick={handleDownload}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download</span>
              </button>
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">Copiar Link</span>
              </button>
              
              <button
                onClick={handleOpenOriginal}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Abrir Original</span>
              </button>
            </div>
          </>
        )}
        {/* Source Badge */}
        <div className="absolute bottom-3 right-3">
          <span className={`${image.sourceColor} text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg`}>
            {image.sourceName}
          </span>
        </div>
      </div>

      {/* Image Info */}
      <div className="p-3 sm:p-4">
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
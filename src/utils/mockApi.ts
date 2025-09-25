import { ImageResult } from '../types';

const PEXELS_IMAGES = [
  'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1624895/pexels-photo-1624895.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1323592/pexels-photo-1323592.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1323585/pexels-photo-1323585.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1624511/pexels-photo-1624511.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1366934/pexels-photo-1366934.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1323578/pexels-photo-1323578.jpeg?auto=compress&cs=tinysrgb&w=800'
];

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
    const availableSources = filters?.sources && filters.sources.length > 0 
      ? SOURCES.filter(source => {
          const sourceMap: { [key: string]: string } = {
            'pexels': 'Pexels',
            'unsplash': 'Unsplash', 
            'pixabay': 'Pixabay'
          };
          return filters.sources!.includes(Object.keys(sourceMap).find(key => sourceMap[key] === source.name) || '');
        })
      : SOURCES;
    
    const source = availableSources[Math.floor(Math.random() * availableSources.length)];
    const photographer = PHOTOGRAPHERS[Math.floor(Math.random() * PHOTOGRAPHERS.length)];
    
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
    hasMore: endIndex < PEXELS_IMAGES.length
  };
};
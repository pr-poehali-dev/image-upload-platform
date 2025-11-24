import { ImageItem } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface ImageGalleryProps {
  images: ImageItem[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ImageGallery = ({ images, onToggleFavorite, onDelete }: ImageGalleryProps) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon name="Image" size={40} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Нет изображений</h3>
        <p className="text-muted-foreground">Загрузите свои первые фотографии</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative aspect-square rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-medium truncate mb-3">
                {image.name}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleFavorite(image.id)}
                  className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Icon 
                    name={image.favorite ? "Heart" : "Heart"} 
                    size={16}
                    className={image.favorite ? "fill-current" : ""}
                  />
                  <span className="text-xs font-medium">
                    {image.favorite ? 'В избранном' : 'В избранное'}
                  </span>
                </button>
                
                <button
                  onClick={() => onDelete(image.id)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-red-500/80 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

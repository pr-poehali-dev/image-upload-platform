import { useCallback, useState } from 'react';
import Icon from '@/components/ui/icon';

interface ImageUploadProps {
  onImagesUploaded: (files: File[]) => void;
}

export const ImageUpload = ({ onImagesUploaded }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onImagesUploaded(files);
    }
  }, [onImagesUploaded]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImagesUploaded(Array.from(files));
    }
  };

  return (
    <div className="animate-scale-in">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileInput}
        />
        
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
            isDragging ? 'bg-primary/20' : 'bg-primary/10'
          }`}>
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {isDragging ? 'Отпустите файлы' : 'Загрузите изображения'}
          </h3>
          
          <p className="text-muted-foreground text-center">
            Перетащите файлы сюда или нажмите для выбора
          </p>
          
          <p className="text-xs text-muted-foreground mt-2">
            Поддерживаются: JPG, PNG, GIF, WebP
          </p>
        </label>
      </div>
    </div>
  );
};

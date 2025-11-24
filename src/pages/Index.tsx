import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageGallery } from '@/components/ImageGallery';

export interface ImageItem {
  id: string;
  url: string;
  name: string;
  favorite: boolean;
}

const Index = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'settings' | 'favorites' | 'search'>('home');

  const handleImagesUploaded = (newImages: File[]) => {
    const uploadedImages: ImageItem[] = newImages.map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      name: file.name,
      favorite: false
    }));
    setImages([...images, ...uploadedImages]);
  };

  const toggleFavorite = (id: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-foreground mb-2">Галерея изображений</h1>
              <p className="text-muted-foreground">Загружайте и управляйте вашими изображениями</p>
            </div>
            <ImageUpload onImagesUploaded={handleImagesUploaded} />
            <ImageGallery 
              images={images} 
              onToggleFavorite={toggleFavorite}
              onDelete={deleteImage}
            />
          </div>
        );
      case 'favorites':
        return (
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-foreground mb-2">Избранное</h1>
              <p className="text-muted-foreground">Ваши любимые изображения</p>
            </div>
            <ImageGallery 
              images={images.filter(img => img.favorite)} 
              onToggleFavorite={toggleFavorite}
              onDelete={deleteImage}
            />
          </div>
        );
      case 'profile':
        return (
          <div className="animate-fade-in space-y-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Профиль</h1>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Пользователь</h2>
                  <p className="text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Всего изображений</p>
                  <p className="text-3xl font-bold">{images.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">В избранном</p>
                  <p className="text-3xl font-bold">{images.filter(img => img.favorite).length}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="animate-fade-in space-y-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Настройки</h1>
            <div className="bg-card p-8 rounded-2xl border border-border space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Внешний вид</h3>
                <p className="text-muted-foreground text-sm">Настройка темы и отображения</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Уведомления</h3>
                <p className="text-muted-foreground text-sm">Управление уведомлениями</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Конфиденциальность</h3>
                <p className="text-muted-foreground text-sm">Параметры приватности</p>
              </div>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="animate-fade-in space-y-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Поиск</h1>
            <input 
              type="text" 
              placeholder="Искать изображения..." 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <ImageGallery 
              images={images} 
              onToggleFavorite={toggleFavorite}
              onDelete={deleteImage}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;

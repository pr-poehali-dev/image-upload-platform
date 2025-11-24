import Icon from '@/components/ui/icon';

interface SidebarProps {
  currentPage: 'home' | 'profile' | 'settings' | 'favorites' | 'search';
  onPageChange: (page: 'home' | 'profile' | 'settings' | 'favorites' | 'search') => void;
}

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const menuItems = [
    { id: 'home' as const, label: 'Главная', icon: 'Home' },
    { id: 'favorites' as const, label: 'Избранное', icon: 'Heart' },
    { id: 'search' as const, label: 'Поиск', icon: 'Search' },
    { id: 'profile' as const, label: 'Профиль', icon: 'User' },
    { id: 'settings' as const, label: 'Настройки', icon: 'Settings' }
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 Gallery App
        </p>
      </div>
    </aside>
  );
};

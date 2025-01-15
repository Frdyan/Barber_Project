import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: 'Navigation', type: 'header' },
    { title: 'Barber', href: '/dashboard/' },
    { title: 'Booking', href: '/dashboard/bookings' },
    { title: 'User', href: '/dashboard/users' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}   
      <div className={`
        fixed top-0 left-0 h-full bg-blue-900 text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 w-48
      `}>
        {/* Logo container */}
        <div className="p-4 flex justify-center items-center border-b border-blue-800">
          <div className="bg-white p-2 rounded-md">
            <img 
              src="/api/placeholder/100/40" 
              alt="Dole Logo" 
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.type === 'header' ? (
                <div className="px-6 py-3 text-gray-400 text-sm">
                  {item.title}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="block px-6 py-3 text-gray-300 hover:bg-blue-800 hover:text-white transition-colors duration-200"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

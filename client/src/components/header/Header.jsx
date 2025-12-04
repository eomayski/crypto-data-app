import { useState } from 'react';
import { Link } from 'react-router'; 
import { Menu, X } from 'lucide-react'; // For icons (Menu, Close)

const Navigation = [
  { name: 'News', to: '/news' },
  { name: 'Trades', to: '/trades' },
  { name: 'Portfolio', to: '/portfolio' },
];

export default function Header(){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 mr-6 ml-6 rounded-b-lg backdrop-filter backdrop-blur-lg shadow-lg bg-[#9b87f533] transition duration-300 ease-in-out">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Title */}
          <div className="flex-shrink-0">
            {/* Using Link for home navigation */}
            <Link to="/" className="text-xl font-bold text-white tracking-wider">
              CRYPTO-DATA
            </Link>
          </div>
          
          {/* Navigation and Auth Links for Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            
            {/* Main Navigation Links */}
            <nav className="flex space-x-4">
              {Navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-white hover:text-indigo-300 transition duration-150 ease-in-out text-sm font-medium p-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Authentication Links */}
            <div className="flex space-x-4 ml-6">
                <Link 
                    to="/logout" 
                    className="px-3 py-1 text-sm font-medium rounded-md bg-transparent border border-white/30 hover:bg-white/10 text-white transition duration-150 ease-in-out"
                >
                    Logout
                </Link>
                <Link 
                    to="/login" 
                    className="px-3 py-1 text-sm font-medium rounded-md bg-transparent border border-white/30 hover:bg-white/10 text-white transition duration-150 ease-in-out"
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="px-3 py-1 text-sm font-medium rounded-md bg-transparent border border-white/30 hover:bg-white/10 text-white transition duration-150 ease-in-out"
                >
                    Register
                </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden backdrop-filter backdrop-blur-lg shadow-lg bg-opacity-90">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Main Navigation */}
            {Navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:bg-opacity-10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Links */}
             <div className="pt-2 border-t border-white/10">
                <Link 
                    to="/logout" 
                    className="block w-full text-left px-3 py-2 text-base font-medium rounded-md border border-white/30 hover:bg-white/10 text-white mt-2"
                    onClick={() => setIsOpen(false)}
                >
                    Logout
                </Link>
                <Link 
                    to="/login" 
                    className="block w-full text-left px-3 py-2 text-base font-medium rounded-md border border-white/30 hover:bg-white/10 text-white mt-2"
                    onClick={() => setIsOpen(false)}
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="block w-full text-left px-3 py-2 text-base font-medium rounded-md border border-white/30 hover:bg-white/10 text-white mt-2"
                    onClick={() => setIsOpen(false)}
                >
                    Register
                </Link>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};
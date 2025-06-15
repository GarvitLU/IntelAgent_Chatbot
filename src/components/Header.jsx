import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-bg sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Intel<span className="accent-text">Agent</span>
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#aibuilder" className="nav-link">
            AI Builder
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
        <a
          href="#contact"
          className="gradient-button hidden md:block"
        >
          Get Started
        </a>
        <button
          id="mobile-menu-button"
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden mobile-menu`}
      >
        <a href="#features" className="mobile-menu-link">
          Features
        </a>
        <a href="#aibuilder" className="mobile-menu-link">
          AI Builder
        </a>
        <a href="#about" className="mobile-menu-link">
          About Us
        </a>
        <a href="#contact" className="mobile-menu-link">
          Contact
        </a>
        <a
          href="#contact"
          className="gradient-button mx-4 my-2 text-center block"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header; 
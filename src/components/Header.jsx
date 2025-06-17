import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <header className="header-bg sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Intel<span className="accent-text">Agent</span>
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#features" onClick={(e) => handleNavLinkClick(e, 'features')} className="nav-link">
            Features
          </a>
          <a href="#ai-builder" onClick={(e) => handleNavLinkClick(e, 'ai-builder')} className="nav-link">
            AI Builder
          </a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="nav-link">
            About Us
          </a>
          <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="nav-link">
            Book a Demo
          </a>
        </div>
        <a
          href="#contact"
          onClick={(e) => handleNavLinkClick(e, 'contact')}
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
        <a href="#features" onClick={(e) => handleNavLinkClick(e, 'features')} className="mobile-menu-link">
          Features
        </a>
        <a href="#ai-builder" onClick={(e) => handleNavLinkClick(e, 'ai-builder')} className="mobile-menu-link">
          AI Builder
        </a>
        <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="mobile-menu-link">
          About Us
        </a>
        <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="mobile-menu-link">
          Book a Demo
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavLinkClick(e, 'contact')}
          className="gradient-button mx-4 my-2 text-center block"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header; 
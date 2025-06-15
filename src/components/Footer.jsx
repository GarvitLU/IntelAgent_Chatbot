import ShinyText from './ShinyText';

const Footer = () => {
  return (
    <footer className="bg-black py-10 text-center text-white">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} IntelAgent. All rights reserved. <ShinyText text="Powered by Lisa" speed={3} />
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-accent-text transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent-text transition duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
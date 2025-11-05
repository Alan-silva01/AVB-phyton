import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-[0_4px_20px_rgba(156,163,175,0.15)]">
      <nav className="container mx-auto px-4 sm:px-6">
        <ul className="flex items-center justify-between max-w-2xl mx-auto h-11">
          <li>
            <Link 
              to="/" 
              className="text-[0.6rem] sm:text-xs font-light tracking-wide sm:tracking-wider transition-colors duration-200 uppercase"
              style={{ color: '#FF8C42' }}
            >
              Home
            </Link>
          </li>
          <li>
            <a 
              href="#portfolio" 
              className="text-[0.6rem] sm:text-xs font-light tracking-wide sm:tracking-wider transition-colors duration-200 uppercase"
              style={{ color: '#FF8C42' }}
            >
              Projetos
            </a>
          </li>
          <li>
            <Link 
              to="/servicos" 
              className="text-[0.6rem] sm:text-xs font-light tracking-wide sm:tracking-wider transition-colors duration-200 uppercase"
              style={{ color: '#FF8C42' }}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link 
              to="/contato" 
              className="text-[0.6rem] sm:text-xs font-light tracking-wide sm:tracking-wider transition-colors duration-200 uppercase"
              style={{ color: '#FF8C42' }}
            >
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

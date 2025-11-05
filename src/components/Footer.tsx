const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-4">
          <div className="text-center md:text-left">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Alan Bot
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Automação Inteligente & No-Code
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#" className="hover:text-primary transition-colors">Projetos</a>
            <a href="#" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
          
          <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
            © 2025 Alan Bot. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

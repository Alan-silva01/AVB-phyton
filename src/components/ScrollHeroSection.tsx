import { WordHeroPage } from "@/components/ui/scroll-hero-section";

const ScrollHeroSection = () => {
  return (
    <div className="relative">
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase">
          Passos para Automatizar
          <br />
          Sua Empresa ou Negócio
        </h2>
      </div>
      <WordHeroPage
        items={[
          'Entender.',
          'Planejar.',
          'Integrar.',
          'Automatizar.',
          'Melhorar.',
          'Crescer.',
          'Lucrar.'
        ]}
        theme="dark"
        animate={true}
        hue={25}
        startVh={50}
        spaceVh={50}
        debug={false}
        showFooter={false}
        taglineHTML="Desenvolvo soluções inteligentes que <br />simplificam processos e <span style='color: #FF8C42'>otimizam rotinas</span>."
      />
    </div>
  );
};

export default ScrollHeroSection;

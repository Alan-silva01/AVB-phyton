import { WordHeroPage } from "@/components/ui/scroll-hero-section";

const ScrollHeroSection = () => {
  return (
    <div className="relative">
      <div className="text-center pt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase">
          Passos para Automatizar
          <br />
          Sua Empresa ou Negócio
        </h2>
      </div>
      <WordHeroPage
        items={[
          'entender.',
          'planejar.',
          'integrar.',
          'automatizar.',
          'melhorar.',
          'crescer.',
          'lucrar.'
        ]}
        theme="dark"
        animate={true}
        hue={25}
        startVh={35}
        spaceVh={50}
        debug={false}
        showFooter={false}
        taglineHTML="desenvolvo soluções inteligentes que <br />simplificam processos e <span style='color: #FF8C42'>otimizam rotinas</span>."
      />
    </div>
  );
};

export default ScrollHeroSection;

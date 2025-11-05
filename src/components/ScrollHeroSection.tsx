import { WordHeroPage } from "@/components/ui/scroll-hero-section";

const ScrollHeroSection = () => {
  return (
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
      animate={false}
      hue={25}
      startVh={50}
      spaceVh={50}
      debug={false}
      showFooter={false}
      taglineHTML="Desenvolvo soluções inteligentes que <br />simplificam processos e <span style='color: #FF8C42'>otimizam rotinas</span>."
    />
  );
};

export default ScrollHeroSection;

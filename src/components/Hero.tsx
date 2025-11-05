import { WordHeroPage } from "@/components/ui/scroll-hero-section";

const Hero = () => {
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
      animate={true}
      hue={217}
      startVh={50}
      spaceVh={50}
      debug={false}
      taglineHTML="Desenvolvo soluções inteligentes que <br />simplificam processos e <span style='color: hsl(217 91% 60%)'>otimizam rotinas</span>."
    />
  );
};

export default Hero;

import { VelocityScroll } from "./ui/velocity-scroll";
import { ParallaxComponent } from "./ui/parallax-scrolling";

const Hero = () => {
  const techWords = [
    "entender",
    "planejar",
    "integrar",
    "automatizar",
    "melhorar",
    "crescer",
    "e lucrar",
  ].join(" • ");

  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-11">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/50" />

      {/* Parallax Component */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <ParallaxComponent />
      </div>

      {/* Infinite Scroll Text with Framer Motion - Bottom */}
      <div className="relative z-10 w-full overflow-hidden pointer-events-none pb-8 sm:pb-12 lg:pb-16">
        <VelocityScroll
          text={techWords}
          default_velocity={2}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 hover:scale-110"
          style={{ color: '#FF8C42' }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-t from-black via-black to-transparent sm:via-black/95 pointer-events-none" />
    </section>
  );
};

export default Hero;

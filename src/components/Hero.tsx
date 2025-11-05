import { useState } from "react";
import HeroSkeleton from "./HeroSkeleton";
import { VelocityScroll } from "./ui/velocity-scroll";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  const techWords = [
    "AUTOMAÇÕES",
    "N8N",
    "INTEGRAÇÕES",
    "SUPABASE",
    "APIS",
    "POSTGRES",
    "AGENTES DE IA",
    "SQL",
    "WORKFLOWS INTELIGENTES",
    "OPENAI",
    "DISPAROS AUTOMÁTICOS",
    "VIBE CODING",
    "CHATBOTS",
    "LOVABLE",
    "ASSISTENTES VIRTUAIS",
    "MAKE",
    "APLICATIVOS NO-CODE",
    "GPT AGENTS",
    "DASHBOARDS",
    "WHATSAPP API",
    "SISTEMAS PERSONALIZADOS",
    "WEBHOOKS",
    "APLICAÇÕES WEB",
    "HTTP REQUEST",
    "APLICAÇÕES MOBILE",
    "API REST",
    "SITES INTELIGENTES",
    "SOLUÇÕES CORPORATIVAS",
  ].join(" • ");

  return (
    <>
      {isLoading && <HeroSkeleton />}
      <section
        className={`relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-11 transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100 animate-fade-in"}`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/50" />

        {/* 3D Robot iframe with mouse interaction enabled */}
        <div className="absolute inset-0 opacity-90 pointer-events-auto will-change-transform">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-KecHA1jjjtnXeR3FIpQyfIV3/"
            title="Interactive 3D Robot"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            loading="lazy"
            style={{ 
              pointerEvents: "auto",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Infinite Scroll Text with Framer Motion - Bottom Gradient */}
        <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-0 right-0 z-10 overflow-hidden pointer-events-none">
          <VelocityScroll
            text={techWords}
            default_velocity={2}
            className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] text-foreground/70 uppercase"
          />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 uppercase mb-4 sm:mb-6 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
            INTELFLUX
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase">
            AI SOLUTIONS AGENCY
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-t from-black via-black to-transparent sm:via-black/95 pointer-events-none" />
      </section>
    </>
  );
};

export default Hero;

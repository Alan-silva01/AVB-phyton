import { useState, useEffect, useRef } from "react";
import HeroSkeleton from "./HeroSkeleton";

const SCROLL_SPEED = 80; // pixels por segundo

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    if (!track || !firstGroup) return;

    // Calcula a largura total incluindo os gaps
    const calculateContentWidth = () => {
      const firstGroupWidth = firstGroup.getBoundingClientRect().width;
      // Pega o gap do estilo computado
      const computedStyle = window.getComputedStyle(firstGroup);
      const gap = parseFloat(computedStyle.gap) || 0;

      // A largura total é a largura do grupo + o gap (já que temos 2 grupos)
      return firstGroupWidth + gap;
    };

    let contentWidth = calculateContentWidth();
    let x = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      x -= SCROLL_SPEED * dt;

      // Quando chegar no final do primeiro grupo, reseta
      if (x <= -contentWidth) {
        x += contentWidth;
      }

      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    const handleResize = () => {
      const newWidth = calculateContentWidth();
      // Ajusta a posição X proporcionalmente à nova largura
      if (contentWidth > 0) {
        x = (x / contentWidth) * newWidth;
      }
      contentWidth = newWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLoading && <HeroSkeleton />}
      <section
        className={`relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-11 transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100 animate-fade-in"}`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/50" />

        {/* 3D Robot iframe with mouse interaction enabled */}
        <div className="absolute inset-0 opacity-90 pointer-events-auto">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-KecHA1jjjtnXeR3FIpQyfIV3/"
            title="Interactive 3D Robot"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: "auto" }}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Infinite Scroll Text - Bottom Gradient */}
        <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-0 right-0 z-10 overflow-hidden pointer-events-none">
          <div ref={trackRef} className="flex whitespace-nowrap w-max transform-gpu will-change-transform">
            <div ref={firstGroupRef} className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              {[
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
              ].map((text, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] text-foreground/70 uppercase"
                >
                  {text}
                </span>
              ))}
            </div>
            <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20" aria-hidden="true">
              {[
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
              ].map((text, i) => (
                <span
                  key={`duplicate-${i}`}
                  className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] text-foreground/70 uppercase"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
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

import { useEffect, useRef } from 'react';
import icon1 from '@/assets/icon-1.png';
import icon2 from '@/assets/icon-2.png';
import icon3 from '@/assets/icon-3.png';
import icon4 from '@/assets/icon-4.png';
import icon5 from '@/assets/icon-5.png';

const features = [
  {
    image: icon1,
    title: 'ImobAI',
    description: 'Agente inteligente para imobiliárias que atende leads automaticamente, interpreta texto, áudio e imagens, busca imóveis e terrenos no banco de dados conforme o interesse do cliente, envia detalhes, registra interações e faz follow-up quando novos imóveis surgem. Também agenda visitas com o consultor imobiliário sob demanda.'
  },
  {
    image: icon2,
    title: 'CliniCAI',
    description: 'Agente inteligente para clínicas que realiza atendimentos humanizados, entende texto, áudio e imagens, agenda consultas direto na dashboard da clínica e envia lembretes automáticos. Após o atendimento, faz follow-up para manter o vínculo com o paciente e ainda permite receber pagamentos automáticos pelo WhatsApp.'
  },
  {
    image: icon3,
    title: 'AdvogAI',
    description: 'Agente inteligente para escritórios de advocacia que realiza o primeiro atendimento, entende a necessidade do cliente e busca informações pelo CPF ou número do processo. Atualiza o cliente sobre o andamento do caso e organiza as interações de forma prática e automatizada.'
  },
  {
    image: icon4,
    title: 'EnsinAI',
    description: 'Agente inteligente para instituições de ensino que apresenta os cursos e matérias disponíveis, realiza matrículas automáticas e envia informações personalizadas aos alunos. Também gerencia pagamentos pelo WhatsApp e mantém o relacionamento ativo com os estudantes.'
  },
  {
    image: icon5,
    title: 'Agente Ofir',
    description: 'Agente multifuncional que integra setores como atendimento, secretaria, comercial e financeiro. Automatiza tarefas rotineiras, organiza informações e garante uma comunicação eficiente entre áreas, elevando a produtividade e a experiência do cliente.'
  }
];

const Features = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index % 2 === 0) {
              entry.target.classList.add('animate-in-left');
            } else {
              entry.target.classList.add('animate-in-right');
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-6xl mx-auto mb-12 sm:mb-16 space-y-2 sm:space-y-3 animate-fade-in">
          <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-cyan-400 uppercase leading-tight drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
            SOLUÇÕES COM INTELIGÊNCIA ARTIFICIAL
          </h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/80 px-2 sm:px-4 uppercase tracking-wide leading-relaxed">
            DESENVOLVEDOR ESPECIALIZADO EM AUTOMAÇÕES INTELIGENTES E INTEGRAÇÕES QUE SIMPLIFICAM PROCESSOS
          </p>
          <p className="text-[0.6rem] sm:text-[0.65rem] text-white/60 font-light tracking-wider pt-1 sm:pt-2">
            ALAN FERREIRA DA SILVA
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <p className="text-[0.65rem] sm:text-xs text-cyan-400/80 uppercase tracking-widest text-center mb-2">
            ✦ PROJETOS
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white uppercase text-center animate-fade-in">
            Conheça alguns projetos desenvolvidos
          </h3>
        </div>

        {/* 2 cards maiores em cima */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-light text-white uppercase tracking-wide pt-1">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 cards menores embaixo */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {features.slice(2).map((feature, index) => (
            <div
              key={index + 2}
              ref={(el) => (cardsRef.current[index + 2] = el)}
              className="group relative bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] opacity-0"
              style={{ transitionDelay: `${(index + 2) * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-light text-white uppercase tracking-wide pt-1">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

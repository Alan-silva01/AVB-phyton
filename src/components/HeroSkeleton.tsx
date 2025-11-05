import { Skeleton } from './ui/skeleton';

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-11">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/50" />
      <Skeleton className="absolute inset-0 opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-t from-black via-black to-transparent sm:via-black/95 pointer-events-none" />
    </section>
  );
};

export default HeroSkeleton;

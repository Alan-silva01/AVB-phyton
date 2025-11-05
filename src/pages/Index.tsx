import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = lazy(() => import("@/components/Hero"));
const Features = lazy(() => import("@/components/Features"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-background">
        <Header />
        <Suspense fallback={<Skeleton className="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-64" />}>
          <CTA />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-48" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;

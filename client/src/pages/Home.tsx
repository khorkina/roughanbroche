import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n";
import { BroochCard } from "@/components/BroochCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Brooch } from "@shared/schema";

export default function Home() {
  const { t } = useLanguage();
  
  const { data: brooches, isLoading, error } = useQuery<Brooch[]>({
    queryKey: ["/api/brooches"],
  });

  return (
    <div className="min-h-screen">
      <section className="px-6 py-24 md:px-12 md:py-32 text-center border-b border-foreground">
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] mb-6"
          data-testid="text-hero-title"
        >
          {t("home.title")}
        </h1>
        <p 
          className="text-xl md:text-2xl tracking-widest uppercase mb-4"
          data-testid="text-hero-subtitle"
        >
          {t("home.subtitle")}
        </p>
        <p className="max-w-2xl mx-auto mb-12 tracking-wide opacity-60">
          {t("home.tagline")}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-sm tracking-widest uppercase"
          >
            <a href="#collection" data-testid="button-explore">
              {t("home.explore")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          
          <Link href="/create">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-sm tracking-widest uppercase border-foreground"
              data-testid="button-create-cta"
            >
              {t("home.create")}
            </Button>
          </Link>
        </div>
      </section>

      <section id="collection" className="px-6 py-16 md:px-12 md:py-24">
        <h2 
          className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-center mb-16"
          data-testid="text-collection-title"
        >
          {t("home.collection")}
        </h2>

        {isLoading && (
          <div className="gallery-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="mb-4 opacity-60">{t("common.error")}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              data-testid="button-retry"
            >
              {t("common.retry")}
            </Button>
          </div>
        )}

        {brooches && (
          <div className="gallery-grid" data-testid="grid-brooches">
            {brooches.map((brooch) => (
              <BroochCard key={brooch.id} brooch={brooch} />
            ))}
          </div>
        )}

        <div className="text-center mt-16 pt-16 border-t border-foreground">
          <p className="mb-6 tracking-wide opacity-60">
            {t("home.tagline")}
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="px-8 py-6 text-sm tracking-widest uppercase"
              data-testid="button-create-bottom"
            >
              {t("home.cta")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import type { Brooch } from "@shared/schema";

interface BroochCardProps {
  brooch: Brooch;
}

export function BroochCard({ brooch }: BroochCardProps) {
  const { language, t } = useLanguage();
  const name = language === "de" ? brooch.nameDE : brooch.name;

  return (
    <Link href={`/product/${brooch.id}`}>
      <article
        className="group cursor-pointer hover-elevate active-elevate-2"
        data-testid={`card-brooch-${brooch.id}`}
      >
        <div className="aspect-square overflow-hidden border border-foreground">
          <img
            src={brooch.imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="pt-4 pb-6">
          <h3 className="text-lg font-semibold tracking-wide mb-1" data-testid={`text-brooch-name-${brooch.id}`}>
            {name}
          </h3>
          <p className="text-xl font-bold tracking-wider" data-testid={`text-brooch-price-${brooch.id}`}>
            EUR {brooch.price}
          </p>
          <p className="text-sm mt-2 tracking-wider uppercase opacity-60">
            {t("home.view")} →
          </p>
        </div>
      </article>
    </Link>
  );
}

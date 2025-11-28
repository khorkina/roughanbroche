import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage, formatTemplate } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Mail, Check, X } from "lucide-react";
import type { Brooch } from "@shared/schema";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const { data: brooch, isLoading, error } = useQuery<Brooch>({
    queryKey: ["/api/brooches", id],
  });

  const handleOrderEmail = () => {
    if (!brooch) return;

    const name = language === "de" ? brooch.nameDE : brooch.name;
    const subject = encodeURIComponent(
      formatTemplate(t("product.emailSubject"), { name })
    );
    const body = encodeURIComponent(
      formatTemplate(t("product.emailBody"), { 
        name, 
        price: brooch.price 
      })
    );
    
    window.location.href = `mailto:order@roughan.art?subject=${subject}&body=${body}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-6 py-12 md:px-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !brooch) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-6 opacity-60">{t("common.error")}</p>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-error">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t("product.backToCollection")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = language === "de" ? brooch.nameDE : brooch.name;
  const description = language === "de" ? brooch.descriptionDE : brooch.description;

  return (
    <div className="min-h-screen">
      <div className="px-6 py-6 md:px-12 border-b border-foreground">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="text-sm tracking-wider uppercase"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t("product.backToCollection")}
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-200px)]">
        <div className="relative aspect-square lg:aspect-auto lg:h-full border-b lg:border-b-0 lg:border-r border-foreground">
          <img
            src={brooch.imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            data-testid="img-product"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 lg:py-24">
          <div className="max-w-lg">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4"
              data-testid="text-product-name"
            >
              {name}
            </h1>
            
            <p 
              className="text-2xl md:text-3xl font-bold tracking-wider mb-6"
              data-testid="text-product-price"
            >
              EUR {brooch.price}
            </p>

            <div className="flex items-center gap-2 mb-8">
              {brooch.available ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm tracking-wider uppercase" data-testid="text-availability">
                    {t("product.available")}
                  </span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 opacity-50" />
                  <span className="text-sm tracking-wider uppercase opacity-50" data-testid="text-availability">
                    {t("product.soldOut")}
                  </span>
                </>
              )}
            </div>

            <p 
              className="tracking-wide mb-12 leading-relaxed opacity-70"
              data-testid="text-product-description"
            >
              {description}
            </p>

            <Button
              size="lg"
              onClick={handleOrderEmail}
              disabled={!brooch.available}
              className="px-8 py-6 text-sm tracking-widest uppercase w-full sm:w-auto"
              data-testid="button-order-email"
            >
              <Mail className="mr-2 w-4 h-4" />
              {t("product.orderEmail")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

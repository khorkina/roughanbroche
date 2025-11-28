import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { useLocalStorage, type GeneratedBroochLocal } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, Mail, Plus } from "lucide-react";

function MyBroochCard({ brooch, onRemove, onOrder }: { 
  brooch: GeneratedBroochLocal; 
  onRemove: (id: string) => void;
  onOrder: (brooch: GeneratedBroochLocal) => void;
}) {
  const { t } = useLanguage();
  
  return (
    <article className="group">
      <div className="aspect-square overflow-hidden border border-foreground relative">
        <img
          src={brooch.imageUrl}
          alt="Generated brooch"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={() => onRemove(brooch.id)}
          className="absolute top-2 right-2 p-2 bg-background/80 border border-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          title={t("myBrooches.delete")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="pt-4 pb-6 space-y-2">
        <p className="text-sm tracking-wider uppercase opacity-60">
          {t(`shape.${brooch.shape}`)} • {brooch.size}
        </p>
        <p className="text-sm line-clamp-2 opacity-70">
          {brooch.description}
        </p>
        <div className="flex gap-2 flex-wrap pt-2">
          {brooch.colors.map((hex, idx) => (
            <div
              key={idx}
              className="w-5 h-5 border border-foreground"
              style={{ backgroundColor: hex }}
              title={hex}
            />
          ))}
        </div>
        <p className="text-xs opacity-50">
          {new Date(brooch.createdAt).toLocaleDateString()}
        </p>
        <Button
          size="sm"
          onClick={() => onOrder(brooch)}
          className="w-full mt-2 text-xs tracking-widest uppercase"
        >
          <Mail className="mr-2 w-3 h-3" />
          {t("generator.order")}
        </Button>
      </div>
    </article>
  );
}

export default function MyBrooches() {
  const { language, t } = useLanguage();
  const { myBrooches, removeBrooch, getRemainingGenerations } = useLocalStorage();
  const remaining = getRemainingGenerations();

  const handleOrder = (brooch: GeneratedBroochLocal) => {
    const colorDisplay = brooch.colors.join(", ");
    
    const subject = encodeURIComponent(t("generator.emailSubject"));
    const body = encodeURIComponent(
      `${language === "de" ? "Hallo" : "Hello"},\n\n${language === "de" ? "Ich möchte die individuelle Brosche bestellen, die ich erstellt habe" : "I would like to order the custom brooch design I created"}:\n\n${language === "de" ? "Größe" : "Size"}: ${brooch.size}\n${language === "de" ? "Form" : "Shape"}: ${t(`shape.${brooch.shape}`)}\n${language === "de" ? "Farben" : "Colors"}: ${colorDisplay}\n${language === "de" ? "Beschreibung" : "Description"}: ${brooch.description}\n\n${language === "de" ? "Bitte bestätigen Sie die Verfügbarkeit und den Produktionszeitraum" : "Please confirm availability and production timeline"}.\n\n[${language === "de" ? "Ihr Name" : "Your Name"}]\n[${language === "de" ? "Ihre Adresse" : "Your Address"}]\n[${language === "de" ? "Stadt, PLZ" : "City, Postal Code"}]\n[${language === "de" ? "Land" : "Country"}]\n\n${language === "de" ? "Vielen Dank" : "Thank you"}!`
    );

    window.location.href = `mailto:roughanbrooch@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 py-12 md:px-12 text-center border-b border-foreground">
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4">
          {t("myBrooches.title")}
        </h1>
        <p className="max-w-xl mx-auto tracking-wide opacity-60">
          {t("myBrooches.subtitle")}
        </p>
        <p className="mt-4 text-sm tracking-wider">
          {t("myBrooches.remaining")}: <span className="font-bold">{remaining}/3</span> {t("myBrooches.today")}
        </p>
      </div>

      <div className="px-6 py-12 md:px-12">
        {myBrooches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl tracking-wide opacity-60 mb-8">
              {t("myBrooches.empty")}
            </p>
            <Link href="/create">
              <Button
                size="lg"
                className="px-8 py-6 text-sm tracking-widest uppercase"
              >
                <Plus className="mr-2 w-4 h-4" />
                {t("myBrooches.createFirst")}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="gallery-grid">
              {myBrooches.map((brooch) => (
                <MyBroochCard
                  key={brooch.id}
                  brooch={brooch}
                  onRemove={removeBrooch}
                  onOrder={handleOrder}
                />
              ))}
            </div>

            <div className="text-center mt-16 pt-16 border-t border-foreground">
              <Link href="/create">
                <Button
                  size="lg"
                  className="px-8 py-6 text-sm tracking-widest uppercase"
                >
                  {t("myBrooches.createNew")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLanguage, formatTemplate } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { apiRequest } from "@/lib/queryClient";
import ColorPalette, { colorPalettes } from "@/components/ColorPalette";
import { 
  sizeOptions, 
  shapeCategories, 
  type Size,
  type ShapeCategory,
  type GeneratedBrooch 
} from "@shared/schema";
import { Sparkles, Mail, RefreshCw, AlertTriangle } from "lucide-react";

export default function Generator() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { saveBrooch, canGenerate, getRemainingGenerations, incrementGenerationCount } = useLocalStorage();
  
  const [size, setSize] = useState<Size>("M");
  const [shape, setShape] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [generatedBrooch, setGeneratedBrooch] = useState<GeneratedBrooch | null>(null);

  const remainingGenerations = getRemainingGenerations();

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate", {
        size,
        shape,
        colors: selectedColors,
        description,
      });
      return response.json() as Promise<GeneratedBrooch>;
    },
    onSuccess: (data) => {
      setGeneratedBrooch(data);
      incrementGenerationCount();
      saveBrooch({
        id: data.id,
        imageUrl: data.imageUrl,
        size: data.size,
        shape: data.shape,
        colors: data.colors,
        description: data.description,
        createdAt: data.createdAt,
      });
    },
    onError: () => {
      toast({
        title: t("common.error"),
        description: t("common.retry"),
        variant: "destructive",
      });
    },
  });

  const handleColorToggle = (hex: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(hex)) {
        return prev.filter((c) => c !== hex);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, hex];
    });
  };

  const handlePaletteSelect = (colors: string[]) => {
    setSelectedColors(colors.slice(0, 4));
  };

  const handleGenerate = () => {
    if (!canGenerate()) {
      toast({
        title: language === "de" ? "Tageslimit erreicht" : "Daily limit reached",
        description: language === "de" ? "Sie können heute keine weiteren Designs erstellen" : "You cannot create more designs today",
        variant: "destructive",
      });
      return;
    }
    if (!shape) {
      toast({
        title: language === "de" ? "Bitte wählen Sie eine Form" : "Please select a shape",
        variant: "destructive",
      });
      return;
    }
    if (selectedColors.length === 0) {
      toast({
        title: language === "de" ? "Bitte wählen Sie mindestens eine Farbe" : "Please select at least one color",
        variant: "destructive",
      });
      return;
    }
    if (description.length < 10) {
      toast({
        title: language === "de" ? "Bitte geben Sie eine Beschreibung ein (mind. 10 Zeichen)" : "Please enter a description (min. 10 characters)",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate();
  };

  const handleOrderEmail = () => {
    if (!generatedBrooch) return;

    const colorDisplay = selectedColors.join(", ");
    const imageUrl = `${window.location.origin}/api/generated/${generatedBrooch.id}/image`;

    const subject = encodeURIComponent(t("generator.emailSubject"));
    const body = encodeURIComponent(
      formatTemplate(t("generator.emailBody"), {
        size,
        shape: t(`shape.${shape}`),
        colors: colorDisplay,
        description,
        imageUrl,
      })
    );

    window.location.href = `mailto:roughanbrooch@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleNewDesign = () => {
    setGeneratedBrooch(null);
  };

  if (generatedBrooch) {
    return (
      <div className="min-h-screen">
        <div className="px-6 py-12 md:px-12 text-center border-b border-foreground">
          <h1 
            className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4"
            data-testid="text-result-title"
          >
            {t("generator.result")}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-300px)]">
          <div className="relative aspect-square lg:aspect-auto lg:h-full border-b lg:border-b-0 lg:border-r border-foreground bg-background">
            <img
              src={`/api/generated/${generatedBrooch.id}/image`}
              alt="Generated brooch design"
              className="w-full h-full object-contain p-8"
              data-testid="img-generated"
            />
          </div>

          <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
            <div className="max-w-lg space-y-8">
              <div>
                <p className="text-sm tracking-wider uppercase opacity-60 mb-2">
                  {t("generator.size")}
                </p>
                <p className="text-xl font-bold" data-testid="text-result-size">{size}</p>
              </div>

              <div>
                <p className="text-sm tracking-wider uppercase opacity-60 mb-2">
                  {t("generator.shape")}
                </p>
                <p className="text-xl font-bold" data-testid="text-result-shape">{t(`shape.${shape}`)}</p>
              </div>

              <div>
                <p className="text-sm tracking-wider uppercase opacity-60 mb-2">
                  {t("generator.colors")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedColors.map((hex, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 border border-foreground"
                      style={{ backgroundColor: hex }}
                      title={hex}
                      data-testid={`color-result-${idx}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm tracking-wider uppercase opacity-60 mb-2">
                  {t("generator.description")}
                </p>
                <p className="opacity-70" data-testid="text-result-description">
                  {description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleOrderEmail}
                  className="px-8 py-6 text-sm tracking-widest uppercase flex-1"
                  data-testid="button-order-custom"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  {t("generator.order")}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleNewDesign}
                  className="px-8 py-6 text-sm tracking-widest uppercase border-foreground"
                  data-testid="button-new-design"
                >
                  <RefreshCw className="mr-2 w-4 h-4" />
                  {t("generator.newDesign")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-6 py-12 md:px-12 text-center border-b border-foreground">
        <h1 
          className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4"
          data-testid="text-generator-title"
        >
          {t("generator.title")}
        </h1>
        <p className="max-w-xl mx-auto tracking-wide opacity-60">
          {t("generator.subtitle")}
        </p>
        <p className="mt-4 text-sm tracking-wider">
          {t("generator.remainingToday")}: <span className={`font-bold ${remainingGenerations === 0 ? "text-destructive" : ""}`}>{remainingGenerations}/3</span>
        </p>
        {remainingGenerations === 0 && (
          <div className="mt-4 inline-flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{t("generator.limitReached")}</span>
          </div>
        )}
      </div>

      <div className="px-6 py-12 md:px-12 max-w-4xl mx-auto">
        {generateMutation.isPending ? (
          <div className="py-24 text-center" data-testid="loading-generator">
            <div className="inline-flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span className="text-xl tracking-wider">{t("generator.generating")}</span>
            </div>
            <Skeleton className="aspect-square max-w-md mx-auto" />
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <Label className="text-sm tracking-widest uppercase mb-4 block">
                {t("generator.size")}
              </Label>
              <p className="text-sm opacity-60 mb-4">
                {t("generator.sizeDesc")}
              </p>
              <div className="grid grid-cols-4 gap-4">
                {sizeOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-4 border text-center font-bold tracking-wider transition-colors hover-elevate active-elevate-2 ${
                      size === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground"
                    }`}
                    data-testid={`button-size-${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm tracking-widest uppercase mb-4 block">
                {t("generator.shape")}
              </Label>
              <p className="text-sm opacity-60 mb-6">
                {t("generator.shapeDesc")}
              </p>
              
              {(Object.keys(shapeCategories) as ShapeCategory[]).map((category) => (
                <div key={category} className="mb-8">
                  <h3 className="text-sm tracking-wider uppercase opacity-60 mb-3">
                    {t(`shape.${category}`)}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {shapeCategories[category].map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`py-3 px-4 border text-sm tracking-wide transition-colors hover-elevate active-elevate-2 ${
                          shape === s
                            ? "bg-foreground text-background border-foreground"
                            : "border-foreground"
                        }`}
                        data-testid={`button-shape-${s}`}
                      >
                        {t(`shape.${s}`)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Label className="text-sm tracking-widest uppercase mb-4 block">
                {t("generator.colors")}
              </Label>
              <p className="text-sm opacity-60 mb-4">
                {language === "de" 
                  ? "Wählen Sie eine Farbpalette oder klicken Sie auf Farben zum Anpassen" 
                  : "Select a color palette or click colors to customize"}
              </p>
              <ColorPalette
                selectedColors={selectedColors}
                onColorToggle={handleColorToggle}
                onPaletteSelect={handlePaletteSelect}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm tracking-widest uppercase mb-4 block">
                {t("generator.description")}
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("generator.descriptionPlaceholder")}
                className="min-h-32 border-foreground resize-none text-base"
                maxLength={500}
                data-testid="input-description"
              />
              <p className="text-sm opacity-60 mt-2">
                {t("generator.descriptionHint")}
              </p>
              <p className="text-sm opacity-60 mt-1">
                {description.length}/500
              </p>
            </div>

            <div className="pt-8 border-t border-foreground">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !canGenerate()}
                className="w-full py-6 text-sm tracking-widest uppercase"
                data-testid="button-generate"
              >
                <Sparkles className="mr-2 w-4 h-4" />
                {canGenerate() ? t("generator.generate") : t("generator.limitReached")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

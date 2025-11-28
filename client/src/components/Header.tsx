import { Link, useLocation } from "wouter";
import { useLanguage, type Language } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground">
      <div className="flex items-center justify-between px-6 py-3 text-xs tracking-widest uppercase">
        <Globe className="w-4 h-4" />
        <span data-testid="text-worldwide-shipping">{t("nav.worldwide")}</span>
        <div className="w-4" />
      </div>
      
      <nav className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
        <Link href="/" data-testid="link-home">
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.3em] hover-elevate active-elevate-2 px-2 py-1">
            ROUGHAN
          </h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/">
            <Button
              variant="ghost"
              className={`text-sm tracking-wider uppercase ${isActive("/") ? "bg-foreground text-background" : ""}`}
              data-testid="nav-collection"
            >
              {t("nav.collection")}
            </Button>
          </Link>
          
          <Link href="/create">
            <Button
              variant="ghost"
              className={`text-sm tracking-wider uppercase ${isActive("/create") ? "bg-foreground text-background" : ""}`}
              data-testid="nav-create"
            >
              {t("nav.create")}
            </Button>
          </Link>
          
          <Link href="/shipping">
            <Button
              variant="ghost"
              className={`text-sm tracking-wider uppercase ${isActive("/shipping") ? "bg-foreground text-background" : ""}`}
              data-testid="nav-shipping"
            >
              {t("nav.shipping")}
            </Button>
          </Link>

          <div className="flex items-center gap-1 ml-2 border-l border-foreground pl-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-sm font-bold tracking-wider"
              data-testid="button-language-toggle"
            >
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

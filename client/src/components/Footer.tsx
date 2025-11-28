import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground mt-auto">
      <div className="px-6 py-12 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold tracking-[0.3em] mb-2">ROUGHAN</h2>
            <p className="text-sm tracking-wider opacity-60">
              {t("footer.handmade")}
            </p>
          </div>
          
          <div className="text-center md:text-right text-sm tracking-wider opacity-60">
            <p>&copy; {currentYear} ROUGHAN</p>
            <p>{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

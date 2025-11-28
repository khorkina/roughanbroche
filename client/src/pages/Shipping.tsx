import { useLanguage } from "@/lib/i18n";
import { Package, Clock, DollarSign, RotateCcw, Mail, Globe } from "lucide-react";

export default function Shipping() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Globe,
      title: t("shipping.worldwide"),
      content: t("shipping.worldwideDesc"),
    },
    {
      icon: Clock,
      title: t("shipping.delivery"),
      content: null,
      list: [
        t("shipping.europe"),
        t("shipping.worldwide2"),
        t("shipping.custom"),
      ],
    },
    {
      icon: DollarSign,
      title: t("shipping.costs"),
      content: t("shipping.costsDesc"),
    },
    {
      icon: RotateCcw,
      title: t("shipping.returns"),
      content: t("shipping.returnsDesc"),
    },
    {
      icon: Mail,
      title: t("shipping.contact"),
      content: t("shipping.contactDesc"),
      email: "hello@roughan.art",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-6 py-12 md:px-12 text-center border-b border-foreground">
        <Package className="w-12 h-12 mx-auto mb-6" />
        <h1 
          className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4"
          data-testid="text-shipping-title"
        >
          {t("shipping.title")}
        </h1>
      </div>

      <div className="px-6 py-12 md:px-12 max-w-3xl mx-auto">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section 
              key={index} 
              className="border-b border-foreground pb-12 last:border-0"
              data-testid={`section-shipping-${index}`}
            >
              <div className="flex items-start gap-4">
                <section.icon className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold tracking-wide mb-4">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="tracking-wide leading-relaxed opacity-70">
                      {section.content}
                    </p>
                  )}
                  {section.list && (
                    <ul className="space-y-2 tracking-wide opacity-70">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.email && (
                    <a
                      href={`mailto:${section.email}`}
                      className="inline-block mt-4 text-lg font-bold tracking-wider underline underline-offset-4 hover-elevate"
                      data-testid="link-contact-email"
                    >
                      {section.email}
                    </a>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

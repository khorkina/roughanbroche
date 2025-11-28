import { createContext, useContext } from "react";

export type Language = "en" | "de";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations = {
  en: {
    // Header
    "nav.collection": "Collection",
    "nav.create": "Create",
    "nav.shipping": "Shipping",
    "nav.worldwide": "Worldwide Shipping",
    
    // Homepage
    "home.title": "ROUGHAN",
    "home.subtitle": "Handmade Beaded Brooches",
    "home.tagline": "Each piece is a unique work of art, meticulously crafted by hand",
    "home.explore": "Explore Collection",
    "home.create": "Create Your Brooch",
    "home.cta": "Design Your Own",
    "home.collection": "The Collection",
    "home.view": "View Details",
    
    // Product
    "product.orderEmail": "Order via Email",
    "product.backToCollection": "Back to Collection",
    "product.price": "Price",
    "product.available": "Available",
    "product.soldOut": "Sold Out",
    "product.emailSubject": "Order Inquiry: {name}",
    "product.emailBody": "Hello,\n\nI would like to order the \"{name}\" brooch (EUR {price}).\n\nPlease confirm availability and provide shipping details to:\n\n[Your Name]\n[Your Address]\n[City, Postal Code]\n[Country]\n\nThank you!",
    
    // Generator
    "generator.title": "Create Your Brooch",
    "generator.subtitle": "Design a unique piece tailored to your vision",
    "generator.size": "Size",
    "generator.sizeDesc": "Select the dimensions of your brooch",
    "generator.shape": "Shape",
    "generator.shapeDesc": "Choose a silhouette for your design",
    "generator.colors": "Colors",
    "generator.colorsDesc": "Select up to 4 primary colors",
    "generator.description": "Description",
    "generator.descriptionPlaceholder": "Describe your dream brooch... What mood, style, or special elements would you like?",
    "generator.descriptionHint": "Be creative! Include details about patterns, textures, or inspirations",
    "generator.generate": "Generate Design",
    "generator.generating": "Creating your brooch...",
    "generator.result": "Your Custom Brooch",
    "generator.order": "Order This Brooch",
    "generator.newDesign": "Create New Design",
    "generator.emailSubject": "Custom Brooch Order",
    "generator.emailBody": "Hello,\n\nI would like to order the custom brooch design I created:\n\nSize: {size}\nShape: {shape}\nColors: {colors}\nDescription: {description}\n\nGenerated image URL: {imageUrl}\n\nPlease confirm the production timeline and provide shipping details to:\n\n[Your Name]\n[Your Address]\n[City, Postal Code]\n[Country]\n\nThank you!",
    
    // Shape categories
    "shape.insects": "Insects",
    "shape.animals": "Animals",
    "shape.abstract": "Abstract",
    "shape.botanical": "Botanical",
    
    // Shapes
    "shape.butterfly": "Butterfly",
    "shape.bee": "Bee",
    "shape.dragonfly": "Dragonfly",
    "shape.beetle": "Beetle",
    "shape.moth": "Moth",
    "shape.bird": "Bird",
    "shape.fish": "Fish",
    "shape.cat": "Cat",
    "shape.fox": "Fox",
    "shape.rabbit": "Rabbit",
    "shape.geometric": "Geometric",
    "shape.spiral": "Spiral",
    "shape.wave": "Wave",
    "shape.starburst": "Starburst",
    "shape.organic": "Organic",
    "shape.flower": "Flower",
    "shape.leaf": "Leaf",
    "shape.vine": "Vine",
    "shape.mushroom": "Mushroom",
    "shape.tree": "Tree",
    
    // Shipping
    "shipping.title": "Shipping & Returns",
    "shipping.worldwide": "Worldwide Shipping",
    "shipping.worldwideDesc": "We ship our handmade brooches to every corner of the world. Each piece is carefully packaged to ensure it arrives in perfect condition.",
    "shipping.delivery": "Delivery Times",
    "shipping.europe": "Europe: 5-7 business days",
    "shipping.worldwide2": "Worldwide: 10-14 business days",
    "shipping.custom": "Custom orders: 2-4 weeks production + delivery",
    "shipping.costs": "Shipping Costs",
    "shipping.costsDesc": "Free shipping on all orders. Customs fees may apply for international orders.",
    "shipping.returns": "Returns & Exchanges",
    "shipping.returnsDesc": "Due to the handmade nature of our products, we offer returns within 14 days of receipt if the item is unused and in its original packaging. Custom-designed brooches are non-refundable.",
    "shipping.contact": "Contact Us",
    "shipping.contactDesc": "For any questions about your order, please reach out to us at:",
    
    // Footer
    "footer.handmade": "Handmade with care",
    "footer.rights": "All rights reserved",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.retry": "Try Again",
  },
  de: {
    // Header
    "nav.collection": "Kollektion",
    "nav.create": "Gestalten",
    "nav.shipping": "Versand",
    "nav.worldwide": "Weltweiter Versand",
    
    // Homepage
    "home.title": "ROUGHAN",
    "home.subtitle": "Handgefertigte Perlen-Broschen",
    "home.tagline": "Jedes Stück ist ein einzigartiges Kunstwerk, sorgfältig von Hand gefertigt",
    "home.explore": "Kollektion entdecken",
    "home.create": "Brosche gestalten",
    "home.cta": "Eigene gestalten",
    "home.collection": "Die Kollektion",
    "home.view": "Details ansehen",
    
    // Product
    "product.orderEmail": "Per E-Mail bestellen",
    "product.backToCollection": "Zurück zur Kollektion",
    "product.price": "Preis",
    "product.available": "Verfügbar",
    "product.soldOut": "Ausverkauft",
    "product.emailSubject": "Bestellanfrage: {name}",
    "product.emailBody": "Hallo,\n\nIch möchte die Brosche \"{name}\" bestellen (EUR {price}).\n\nBitte bestätigen Sie die Verfügbarkeit und senden Sie mir die Versanddetails an:\n\n[Ihr Name]\n[Ihre Adresse]\n[Stadt, PLZ]\n[Land]\n\nVielen Dank!",
    
    // Generator
    "generator.title": "Brosche gestalten",
    "generator.subtitle": "Entwerfen Sie ein einzigartiges Stück nach Ihrer Vorstellung",
    "generator.size": "Größe",
    "generator.sizeDesc": "Wählen Sie die Maße Ihrer Brosche",
    "generator.shape": "Form",
    "generator.shapeDesc": "Wählen Sie eine Silhouette für Ihr Design",
    "generator.colors": "Farben",
    "generator.colorsDesc": "Wählen Sie bis zu 4 Hauptfarben",
    "generator.description": "Beschreibung",
    "generator.descriptionPlaceholder": "Beschreiben Sie Ihre Traumbrosche... Welche Stimmung, welchen Stil oder welche besonderen Elemente wünschen Sie?",
    "generator.descriptionHint": "Seien Sie kreativ! Fügen Sie Details zu Mustern, Texturen oder Inspirationen hinzu",
    "generator.generate": "Design erstellen",
    "generator.generating": "Ihre Brosche wird erstellt...",
    "generator.result": "Ihre individuelle Brosche",
    "generator.order": "Diese Brosche bestellen",
    "generator.newDesign": "Neues Design erstellen",
    "generator.emailSubject": "Individuelle Broschenbestellung",
    "generator.emailBody": "Hallo,\n\nIch möchte das individuelle Broschen-Design bestellen, das ich erstellt habe:\n\nGröße: {size}\nForm: {shape}\nFarben: {colors}\nBeschreibung: {description}\n\nURL des generierten Bildes: {imageUrl}\n\nBitte bestätigen Sie den Produktionszeitraum und senden Sie mir die Versanddetails an:\n\n[Ihr Name]\n[Ihre Adresse]\n[Stadt, PLZ]\n[Land]\n\nVielen Dank!",
    
    // Shape categories
    "shape.insects": "Insekten",
    "shape.animals": "Tiere",
    "shape.abstract": "Abstrakt",
    "shape.botanical": "Botanisch",
    
    // Shapes
    "shape.butterfly": "Schmetterling",
    "shape.bee": "Biene",
    "shape.dragonfly": "Libelle",
    "shape.beetle": "Käfer",
    "shape.moth": "Motte",
    "shape.bird": "Vogel",
    "shape.fish": "Fisch",
    "shape.cat": "Katze",
    "shape.fox": "Fuchs",
    "shape.rabbit": "Hase",
    "shape.geometric": "Geometrisch",
    "shape.spiral": "Spirale",
    "shape.wave": "Welle",
    "shape.starburst": "Sternexplosion",
    "shape.organic": "Organisch",
    "shape.flower": "Blume",
    "shape.leaf": "Blatt",
    "shape.vine": "Ranke",
    "shape.mushroom": "Pilz",
    "shape.tree": "Baum",
    
    // Shipping
    "shipping.title": "Versand & Rückgabe",
    "shipping.worldwide": "Weltweiter Versand",
    "shipping.worldwideDesc": "Wir versenden unsere handgefertigten Broschen in jeden Winkel der Welt. Jedes Stück wird sorgfältig verpackt, um sicherzustellen, dass es in einwandfreiem Zustand ankommt.",
    "shipping.delivery": "Lieferzeiten",
    "shipping.europe": "Europa: 5-7 Werktage",
    "shipping.worldwide2": "Weltweit: 10-14 Werktage",
    "shipping.custom": "Sonderanfertigungen: 2-4 Wochen Produktion + Lieferung",
    "shipping.costs": "Versandkosten",
    "shipping.costsDesc": "Kostenloser Versand bei allen Bestellungen. Bei internationalen Bestellungen können Zollgebühren anfallen.",
    "shipping.returns": "Rückgabe & Umtausch",
    "shipping.returnsDesc": "Aufgrund der handgefertigten Natur unserer Produkte bieten wir Rückgaben innerhalb von 14 Tagen nach Erhalt an, wenn der Artikel unbenutzt und in seiner Originalverpackung ist. Individuell gestaltete Broschen sind nicht erstattungsfähig.",
    "shipping.contact": "Kontaktieren Sie uns",
    "shipping.contactDesc": "Bei Fragen zu Ihrer Bestellung erreichen Sie uns unter:",
    
    // Footer
    "footer.handmade": "Mit Sorgfalt handgefertigt",
    "footer.rights": "Alle Rechte vorbehalten",
    
    // Common
    "common.loading": "Lädt...",
    "common.error": "Etwas ist schief gelaufen",
    "common.retry": "Erneut versuchen",
  },
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function getTranslation(language: Language, key: string): string {
  const langTranslations = translations[language];
  return (langTranslations as Record<string, string>)[key] || key;
}

export function formatTemplate(template: string, values: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}

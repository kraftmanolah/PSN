import ClientRequestQuote from './page.client';

// Categories data (defined server-side)
const categories: { [key: string]: string[] } = {
  branding: [
    "Vehicle branding",
    "Mugs",
    "T-shirts",
    "Water bottles",
    "Pens",
    "Keyholders",
    "Face caps",
    "Monogram",
    "Screen print",
    "UV direct print",
  ],
  printing: [
    "Flyers",
    "Jotters",
    "Programs",
    "Brochures",
    "Business cards",
    "ID cards",
    "Customized printing solutions",
  ],
  packaging: [
    "Boxes",
    "Food packs",
    "Pizza packs",
    "Platter packs",
    "Custom packaging solutions",
  ],
  publishing: [
    "Stationaries",
    "Journals",
    "Storybooks",
    "Novels",
    "Christian books",
    "Publishing codes",
  ],
};

export const metadata = {
  title: "Request a Quote",
  description: "Submit a quote request for branding, printing, packaging, or publishing services.",
};

export default function RequestQuotePage() {
  return <ClientRequestQuote categories={categories} />;
}
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { BulletinBoardFooter } from "@/components/BulletinBoardFooter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, PartyPopper } from "lucide-react";
import aerial2026 from "@/assets/aerial-cozy-corner-2026.jpeg.asset.json";
import music2026 from "@/assets/music-cozy-corner-2026.jpeg.asset.json";
import aerial2025 from "@/assets/block-party-aerial.png";
import music2025 from "@/assets/block-party-music.png";
import civicJoyLogo from "@/assets/civic-joy-fund-logo.png";
import oslLogo from "@/assets/osl-logo.png";

const highlights = [
  { emoji: "🎸", key: "music" }, { emoji: "🐕", key: "pets" },
  { emoji: "🥘", key: "food" }, { emoji: "🏰", key: "bounce" },
  { emoji: "👋", key: "neighbors" },
];

const BlockParty = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-12 md:space-y-16">
        <header className="max-w-2xl space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            <PartyPopper className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
            {t('bp.title')}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('bp.intro')}</p>
        </header>

        <section aria-labelledby="party-2026" className="space-y-6">
          <div className="space-y-3 max-w-3xl">
            <h2 id="party-2026" className="text-2xl md:text-3xl font-bold text-foreground">{t('bp.2026.title')}</h2>
            <p className="text-sm font-medium text-primary"><time dateTime="2026-10-17">{t('bp.2026.date')}</time></p>
            <p className="text-foreground leading-relaxed">{t('bp.2026.story')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ src: aerial2026.url, alt: 'bp.2026.aerial', caption: 'bp.photo.aerial' }, { src: music2026.url, alt: 'bp.2026.music', caption: 'bp.photo.music' }].map(photo => (
              <figure key={photo.src} className="space-y-2">
                <img src={photo.src} alt={t(photo.alt)} width={1024} height={768} className="w-full aspect-[4/3] object-contain rounded-lg bg-muted" />
                <figcaption className="text-sm text-muted-foreground">{t(photo.caption)}</figcaption>
              </figure>
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map(item => <li key={item.key} className="flex items-center gap-2 text-sm text-foreground"><span aria-hidden="true" className="text-xl">{item.emoji}</span>{t(`bp.highlight.${item.key}`)}</li>)}
          </ul>
        </section>

        <section aria-labelledby="party-2025" className="border-t border-border pt-10 space-y-6">
          <div className="space-y-3 max-w-3xl">
            <h2 id="party-2025" className="text-2xl md:text-3xl font-bold text-foreground">{t('bp.2025.title')}</h2>
            <p className="text-sm font-medium text-primary"><time dateTime="2025-09-27">{t('bp.2025.date')}</time></p>
            <p className="text-foreground leading-relaxed">{t('bp.2025.story')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ src: aerial2025, alt: 'bp.2025.aerial' }, { src: music2025, alt: 'bp.2025.music' }].map(photo => <img key={photo.src} src={photo.src} alt={t(photo.alt)} loading="lazy" className="w-full aspect-[4/3] object-contain rounded-lg bg-muted" />)}
          </div>
          <Button asChild variant="outline"><Link to="/block-party-2025">{t('bp.2025.more')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
        </section>

        <section aria-labelledby="party-partners" className="border-t border-border pt-10 space-y-6">
          <h2 id="party-partners" className="text-2xl font-bold text-foreground">{t('bp.archive.partners')}</h2>
          <div className="flex flex-wrap gap-10">
            {[{ src: civicJoyLogo, name: 'Civic Joy Fund' }, { src: oslLogo, name: 'Outer Sunset Neighbors' }].map(partner => (
              <figure key={partner.name} className="space-y-3">
                <img src={partner.src} alt={partner.name} loading="lazy" className="w-28 h-28 object-contain" />
                <figcaption className="font-medium text-foreground">{partner.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-10 space-y-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground">🎉 {t('bp.next.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('bp.next.body')}</p>
          <Button asChild className="h-auto min-h-10 whitespace-normal"><Link to="/contact">{t('bp.next.cta')}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></Button>
        </section>
      </main>
      <BulletinBoardFooter />
    </div>
  );
};
export default BlockParty;

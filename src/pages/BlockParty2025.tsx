import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { BulletinBoardFooter } from "@/components/BulletinBoardFooter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import aerial from "@/assets/block-party-aerial.png";
import chalk from "@/assets/block-party-chalk.png";
import music from "@/assets/block-party-music.png";
import civicJoyLogo from "@/assets/civic-joy-fund-logo.png";
import oslLogo from "@/assets/osl-logo.png";

const BlockParty2025 = () => {
  const { t } = useLanguage();
  return <div className="min-h-screen bg-background">
    <MainNavigation />
    <main className="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-10">
      <Button asChild variant="ghost" className="h-auto whitespace-normal"><Link to="/block-party"><ArrowLeft className="h-4 w-4 shrink-0" />{t('bp.archive.back')}</Link></Button>
      <header className="space-y-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">🎉 {t('bp.archive.title')}</h1>
        <p className="text-primary font-medium"><time dateTime="2025-09-27">{t('bp.2025.date')}</time></p>
        <p className="text-lg text-muted-foreground leading-relaxed">{t('bp.2025.story')}</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label={t('bp.2025.title')}>
        {[{src: aerial, alt: 'bp.2025.aerial'}, {src: music, alt: 'bp.2025.music'}, {src: chalk, alt: 'bp.2025.chalk'}].map(photo => <img key={photo.src} src={photo.src} alt={t(photo.alt)} loading="lazy" className="w-full aspect-[4/3] object-contain rounded-lg bg-muted" />)}
      </section>
      <section className="border-t border-border pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-bold">{t('bp.archive.thanks')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('bp.archive.thanks.body')}</p>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">{t('bp.archive.partners')}</h2>
        <div className="flex flex-wrap gap-10">
          {[{src: civicJoyLogo, name: 'Civic Joy Fund', key: 'bp.archive.funding'}, {src: oslLogo, name: 'Outer Sunset Neighbors', key: 'bp.archive.support'}].map(partner => <figure key={partner.name} className="space-y-2"><img src={partner.src} alt={partner.name} loading="lazy" className="w-28 h-28 object-contain" /><figcaption><p className="font-medium">{partner.name}</p><p className="text-sm text-muted-foreground">{t(partner.key)}</p></figcaption></figure>)}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">{t('bp.archive.layout')}</h2>
        <img src="/lovable-uploads/Updated_BP_Site_Plan.png" alt={t('bp.archive.layout')} loading="lazy" className="w-full max-w-2xl rounded-lg" />
      </section>
      <Button asChild variant="outline" className="h-auto min-h-10 whitespace-normal"><Link to="/block-party">{t('bp.archive.back')}<ArrowLeft className="h-4 w-4 shrink-0" /></Link></Button>
    </main>
    <BulletinBoardFooter />
  </div>;
};
export default BlockParty2025;

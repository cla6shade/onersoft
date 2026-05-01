import { FinalCta } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { Oklch } from '@/components/landing/oklch';
import { Status } from '@/components/landing/status';
import { Tiny } from '@/components/landing/tiny';

export default function HomePage() {
  return (
    <main
      className="flex flex-col flex-1 [--container:1100px]"
      style={{ fontFamily: 'var(--ds-font-sans)' }}
    >
      <Hero />
      <Tiny />
      <Oklch />
      <Status />
      <FinalCta />
      <Footer />
    </main>
  );
}

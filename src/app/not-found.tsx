import { Container } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-calm-gradient">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-serif text-6xl text-sage/70">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">This page seems to have wandered off</h1>
        <p className="mt-3 max-w-md text-lg text-stone">
          The page you were looking for isn&apos;t here. Let&apos;s gently guide
          you back to somewhere familiar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/free-consultation" variant="secondary" size="lg">
            Book a free consultation
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

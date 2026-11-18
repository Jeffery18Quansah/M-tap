import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  LockKeyhole,
  Phone,
  Radio,
  Smartphone,
} from "lucide-react";
import { MtapLogo } from "@/components/brand/mtap-logo";

const activationUrl = "/activate";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
      {children}
    </p>
  );
}

export function MarketingHome() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-text-primary">
      <header className="border-b border-neutral-100 bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <MtapLogo height={36} />
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-medium text-neutral-700 transition-colors hover:text-black" href="#how-it-works">
              How it works
            </Link>
            <Link className="text-sm font-medium text-neutral-700 transition-colors hover:text-black" href="#for-business">
              For business
            </Link>
            <Link className="text-sm font-medium text-neutral-700 transition-colors hover:text-black" href="#built-with-care">
              Built with care
            </Link>
          </nav>
          <Link
            href={activationUrl}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-yellow px-5 text-sm font-semibold text-black transition-colors hover:bg-brand-yellow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Activate your tag
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main>
        <section className="relative isolate">
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:min-h-[610px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 lg:py-16">
            <div className="marketing-hero-copy relative z-10 max-w-[590px]">
              <h1 className="max-w-[620px] text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.99] tracking-[-0.06em] text-black">
                One small tap.
                <br />
                <span className="relative inline-block">
                  A simpler
                  <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full bg-brand-yellow sm:-bottom-2 sm:h-5" aria-hidden="true" />
                </span>{" "}
                way to pay.
              </h1>
              <p className="mt-7 max-w-[490px] text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                M-Tap makes everyday payments simpler. Link your tag to mobile money, then tap and confirm on your phone.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={activationUrl}
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-black px-7 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Activate your tag
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-black transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  See how it works
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="marketing-hero-art relative mx-auto w-full max-w-[620px]">
              <div className="relative overflow-hidden rounded-[28px] bg-[#FFF9E5] px-3 py-5 sm:rounded-[36px] sm:px-6 sm:py-8">
                <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-2xl bg-black px-4 py-3 text-[11px] font-semibold text-white shadow-lg sm:left-7 sm:top-7 sm:px-5 sm:py-4 sm:text-xs">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-black">
                    <Radio className="h-4 w-4" aria-hidden="true" />
                  </span>
                  Contactless payments, made simple
                </div>
                <Image
                  src="/illustrations/01-tap-to-pay.svg"
                  alt="A customer taps a phone beside a contactless payment terminal."
                  width={800}
                  height={600}
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="relative mx-auto mt-8 h-auto w-full max-w-[570px]"
                />
                <div className="marketing-flow-callout absolute bottom-5 right-4 flex items-center gap-2.5 rounded-2xl bg-black px-4 py-3 text-white shadow-lg sm:bottom-8 sm:right-8 sm:px-5 sm:py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-black">
                    <Check className="marketing-flow-check h-4 w-4 stroke-[3]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold sm:text-sm">Tap. Confirm. Done.</span>
                    <span className="mt-0.5 block text-[10px] text-white/65 sm:text-[11px]">A simpler way to pay</span>
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 left-5 hidden items-center gap-2.5 rounded-2xl bg-black px-4 py-3 text-xs font-semibold text-white shadow-lg sm:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-black">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                </span>
                You stay in control
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-brand-yellow" aria-hidden="true" />
        </section>

        <section aria-label="M-Tap principles" className="border-b border-neutral-100 bg-white">
          <div className="marketing-scroll-reveal mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-neutral-100 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {[
              { icon: Radio, label: "A small physical tag" },
              { icon: Smartphone, label: "A familiar phone" },
              { icon: LockKeyhole, label: "You approve the prompt" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex min-h-[76px] items-center justify-center gap-3 py-4 text-sm font-medium text-neutral-700">
                <Icon className="h-4 w-4 text-black" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-[#FAFAF8] py-20 sm:py-28">
          <div className="marketing-scroll-reveal mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <SectionLabel>A simple flow</SectionLabel>
                <h2 className="max-w-[470px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-5xl">
                  From tag to phone, with you in control.
                </h2>
              </div>
              <p className="max-w-[470px] text-sm leading-7 text-neutral-700 md:justify-self-end md:text-base">
                M-Tap brings your tag and mobile money together for a quick, convenient checkout. Tap your tag, then confirm the payment on your phone.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Link your tag",
                  body: "Connect your M-Tap tag to the mobile money number you use every day.",
                },
                {
                  number: "02",
                  title: "Verify the number",
                  body: "Securely link your number and get your tag ready to use.",
                },
                {
                  number: "03",
                  title: "Tap and confirm",
                  body: "Tap your tag at checkout and approve the payment on your phone.",
                },
              ].map((item) => (
                <article key={item.number} className="marketing-reveal-card rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-xs font-semibold text-black">
                    {item.number}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight text-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="built-with-care" className="scroll-mt-20 py-20 sm:py-28">
          <div className="marketing-scroll-reveal mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="max-w-[570px]">
              <SectionLabel>Thoughtful by design</SectionLabel>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-5xl">
                Convenience should still feel considered.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="marketing-reveal-card grid overflow-hidden rounded-[26px] bg-[#FFF7D6] sm:grid-cols-[1fr_0.9fr]">
                <div className="p-6 sm:p-8">
                  <h3 className="mt-7 text-xl font-semibold text-black">A simpler way to pay</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Leave the long checkout behind. Tap your M-Tap tag and move through payment with a quick confirmation on your phone.
                  </p>
                </div>
                <Image
                  src="/illustrations/02-instant-settlement.svg"
                  alt="Illustration of a shopkeeper and a mobile payment notification."
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="h-auto w-full self-end"
                />
              </article>
              <article className="marketing-reveal-card grid overflow-hidden rounded-[26px] bg-[#F5F5F3] sm:grid-cols-[1fr_0.9fr]">
                <div className="p-6 sm:p-8">
                  <h3 className="mt-7 text-xl font-semibold text-black">Your PIN stays yours</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Your mobile money PIN stays private. Review and authorize each payment securely on your phone.
                  </p>
                </div>
                <Image
                  src="/illustrations/03-secure-transactions.svg"
                  alt="A shield and lock represent secure, customer-authorized payments."
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="h-auto w-full self-end"
                />
              </article>
            </div>
          </div>
        </section>

        <section id="for-business" className="scroll-mt-20 bg-black py-16 text-white sm:py-20">
          <div className="marketing-scroll-reveal mx-auto grid max-w-[1200px] items-center gap-5 px-5 sm:px-8 md:grid-cols-[1fr_0.9fr]">
            <div className="order-2 md:order-1">
              <Image
                src="/illustrations/06-merchant-empowerment.svg"
                alt="A local shopkeeper accepts a contactless payment from a customer."
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="mx-auto h-auto w-full max-w-[540px]"
              />
            </div>
            <div className="order-1 md:order-2 md:pl-12">
              <SectionLabel>Made for everyday business</SectionLabel>
              <h2 className="max-w-[510px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                A simpler checkout for everyday business.
              </h2>
              <p className="mt-5 max-w-[470px] text-sm leading-7 text-white/70 sm:text-base">
                Give customers a quick, familiar way to pay at your shop. M-Tap connects a simple tap with the mobile money experience they already know.
              </p>
              <Link
                href={activationUrl}
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-yellow px-6 text-sm font-semibold text-black transition-colors hover:bg-brand-yellow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Activate your tag
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="marketing-scroll-reveal mx-auto grid max-w-[1200px] items-center gap-8 px-5 sm:px-8 md:grid-cols-2 md:gap-14">
            <div>
              <SectionLabel>Physical meets digital</SectionLabel>
              <h2 className="max-w-[520px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-5xl">
                Familiar technology. A more human interaction.
              </h2>
              <p className="mt-5 max-w-[480px] text-sm leading-7 text-neutral-700 sm:text-base">
                M-Tap connects a secure contactless tag to mobile money. Tap to begin, review the payment details on your phone, and approve when you are ready.
              </p>
            </div>
            <div className="rounded-[28px] bg-[#FFF9E5] p-4 sm:p-7">
              <Image
                src="/illustrations/07-seamless-connectivity.svg"
                alt="A contactless symbol connecting phones and payment devices."
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="marketing-scroll-reveal mx-auto grid max-w-[1200px] items-center overflow-hidden rounded-[30px] bg-[#FFF4CC] md:grid-cols-[1fr_1fr]">
            <div className="px-6 py-10 sm:px-12 sm:py-14">
              <SectionLabel>Try the guided walkthrough</SectionLabel>
              <h2 className="max-w-[480px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-5xl">
                Get your M-Tap tag ready.
              </h2>
              <p className="mt-5 max-w-[450px] text-sm leading-7 text-neutral-700 sm:text-base">
                Link your M-Tap tag to your mobile money number in a few simple steps. Once it is set up, you are ready for a faster, easier checkout.
              </p>
              <Link
                href={activationUrl}
                className="mt-8 inline-flex min-h-[54px] items-center gap-3 rounded-full bg-black px-7 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Activate your tag
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="px-4 pb-5 sm:px-8 sm:pb-8">
              <Image
                src="/illustrations/04-easy-activation.svg"
                alt="A person follows a guided setup on a phone to activate a contactless tag."
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="mx-auto h-auto w-full max-w-[540px]"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <MtapLogo height={30} />
          <p className="max-w-[520px] text-center text-xs leading-5 text-neutral-500 sm:text-left">
            M-Tap. A simpler way to pay.
          </p>
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 underline-offset-4 hover:text-black hover:underline" href="tel:+233546007121">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}

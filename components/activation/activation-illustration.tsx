import Image from "next/image";
import { ActivationStep } from "@/lib/services/activation-service";

interface ActivationIllustrationProps {
  step: ActivationStep;
  title?: string;
  description?: string;
}

const ILLUSTRATIONS: Record<
  ActivationStep,
  { src: string; alt: string }
> = {
  "tag-check": {
    src: "/illustrations/m-tap-phone-interaction-no-chat-bubble.webp",
    alt: "A person interacting with an M-Tap tag using a phone.",
  },
  "phone-entry": {
    src: "/illustrations/provider-neutral-momo-input.webp",
    alt: "Entering mobile money details to link an M-Tap tag.",
  },
  "otp-verification": {
    src: "/illustrations/03-secure-transactions.svg",
    alt: "A shield and lock represent a secure verification step.",
  },
  activating: {
    src: "/illustrations/03-secure-transactions.svg",
    alt: "A shield and lock represent a secure verification step.",
  },
  success: {
    src: "/illustrations/m-tap-completion-illustration.webp",
    alt: "Confirmation that M-Tap setup is complete.",
  },
  error: {
    src: "/illustrations/m-tap-phone-interaction-no-chat-bubble.svg",
    alt: "A person interacting with an M-Tap tag using a phone.",
  },
};

export function ActivationIllustration({
  step,
  title,
  description,
}: ActivationIllustrationProps) {
  const illustration = ILLUSTRATIONS[step];

  return (
    <aside className="order-1 flex min-h-[210px] flex-col items-center justify-start overflow-hidden bg-[#FFF9E5] px-5 pt-2 pb-4 sm:min-h-[240px] sm:px-8 lg:order-2 lg:min-h-0 lg:justify-center lg:px-12 lg:py-10">
      <div
        key={step}
        className="activation-artwork-enter relative mx-auto h-[198px] w-full max-w-[320px] sm:h-[220px] sm:max-w-[420px] lg:h-[min(58vh,500px)] lg:max-w-[620px]"
      >
        <Image
          src={illustration.src}
          alt={illustration.alt}
          fill
          loading="eager"
          sizes="(max-width: 639px) 320px, (max-width: 1023px) 420px, 48vw"
          className="object-contain"
        />
        {title && description && (
          <div className="absolute inset-x-0 bottom-5 z-10 bg-gradient-to-t from-[#FFF9E5] via-[#FFF9E5]/95 to-transparent px-3 pt-12 pb-1 text-center lg:hidden">
            <h1 className="text-[25px] font-semibold leading-[1.08] tracking-[-0.04em] text-black">
              {title}
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-neutral-600">
              {description}
            </p>
          </div>
        )}
      </div>
      {title && description && (
        <div className="hidden max-w-[620px] px-4 text-center lg:block">
          <h1 className="text-[40px] font-semibold leading-[1.12] tracking-[-0.04em] text-black">
            {title}
          </h1>
          <p className="mt-2 text-[15px] leading-6 text-neutral-600">
            {description}
          </p>
        </div>
      )}
    </aside>
  );
}

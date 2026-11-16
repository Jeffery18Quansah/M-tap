import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface MtapLogoProps {
  className?: string;
  height?: number;
  asLink?: boolean;
  href?: string;
}

export const MtapLogo: React.FC<MtapLogoProps> = ({
  className = "",
  height = 40,
  asLink = true,
  href = "/",
}) => {
  const width = Math.round(height * 4);

  const imageElement = (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      style={{ height, width }}
    >
      <Image
        src="/brand/Minimal%20M-Tap%20Yellow%20Ribbon%20Logo.png"
        alt="M-TAP"
        width={width}
        height={height}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label="M-TAP"
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
};

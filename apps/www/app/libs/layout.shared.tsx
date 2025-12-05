import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import Logo from "@/public/logo.png";

export const logo = (
  <>
    <Image
      alt="Fumadocs"
      src={Logo}
      sizes="100px"
      className="hidden w-22 in-[.uwu]:block"
      aria-label="Fumadocs"
    />
  </>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium in-[.uwu]:hidden">Fumadocs</span>
        </>
      ),
    },
  };
}

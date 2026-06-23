import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/images/logo-trans.png"
        alt={`${site.name} logo — tree of life`}
        width={320}
        height={160}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}

"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export function FloatingActionButton() {
  return (
    <Link
      href="/booking/professional"
      className="fixed bottom-24 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-2xl transition-all hover:scale-110 active:scale-95 md:bottom-12 md:right-12"
      aria-label="Book appointment"
    >
      <Plus className="h-8 w-8" />
    </Link>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();
  const imagePath = "https://github.com/shadcn.png";
  return (
    <div
      onClick={() => router.push("/")}
      className="min-h-20 flex items-center px-6 border-r cursor-pointer gap-2 "
    >
      <Image src={imagePath} alt="Logo" width={30} height={30} priority />
      <h1 className="font-bold text-xl">StockFlow v1.0</h1>
    </div>
  );
}

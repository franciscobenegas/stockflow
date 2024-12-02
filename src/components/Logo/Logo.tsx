"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="min-h-20 flex items-center px-6 border-b cursor-pointer gap-2 "
    >
      <Image
        src="https://logowik.com/content/uploads/images/abstract-black-geometric-shape1729685012.logowik.com.webp"
        alt="Logo"
        width={40}
        height={40}
        className="rounded-lg"
      />
      <h1 className="font-bold text-xl">StockFlow</h1>
    </div>
  );
}

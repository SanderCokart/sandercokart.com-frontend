"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowCircleLeft } from "react-icons/fa";

export const GlobalGoBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const goBack = () => {
    router.back();
  };

  if (isHome) return null;

  return (
    <button
      className="absolute z-50 flex h-[68px] place-items-center gap-2 bg-secondary px-4 py-1 font-digital text-xl dark:bg-secondaryDark md:text-2xl"
      onClick={goBack}
    >
      <FaArrowCircleLeft />
      <span>Go back</span>
    </button>
  );
};

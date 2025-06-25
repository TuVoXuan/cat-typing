import React from "react";
import CatTypeLogo from "../icons/cat-type-logo";

export default function Header() {
  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="flex items-center gap-2 px-4">
        <CatTypeLogo className="text-main" />
        <div className="relative text-[2rem] leading-[2rem] transition-colors duration-200 ease-linear text-text -mt-2 font-lexend-deca">
          <div className="absolute top-0 left-0 text-[0.325em] leading-[0.325em] text-sub">
            cat see
          </div>
          cattype
        </div>
      </div>
    </div>
  );
}

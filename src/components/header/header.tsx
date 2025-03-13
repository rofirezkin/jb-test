import { ArrowLeftIcon } from "@/lib/svg/arrow-left";
import { JuiceBoxIcon } from "@/lib/svg/juicebox";
import { RefreshIcon } from "@/lib/svg/refresh";
import React from "react";

type HeaderProps = {
  goBack: () => void;
  showGoBack: boolean;
};
export default function Header({ goBack, showGoBack }: HeaderProps) {
  return (
    <div className="flex flex-row w-full justify-between items-center  ">
      {showGoBack && (
        <button
          aria-label="Go back"
          className="bg-gray-700  rounded-full p-2"
          onClick={goBack}
        >
          <ArrowLeftIcon />
        </button>
      )}

      <JuiceBoxIcon />
      {showGoBack && (
        <button aria-label="refresh" className="bg-gray-700  rounded-full p-2">
          <RefreshIcon />
        </button>
      )}
    </div>
  );
}

"use client";

import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../_redux/store";
import { usePathname } from "next/navigation";

export default function HeaderComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const currentPathName = usePathname();

  const showSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: true });
  };
  return (
    <div className="flex justify-between lg:justify-end items-center bg-white border-b p-4 h-[72px]">
      <div className="flex lg:hidden">
        <h1 className="text-secondary font-bold bg-primary py-2 h-10 pl-2 pr-1 rounded-l-xl">
          3
        </h1>
        <h1 className="text-primary font-bold bg-secondary py-2 h-10 pr-2 pl-1 rounded-r-xl">
          10
        </h1>
      </div>
      {currentPathName === "/" || currentPathName === "/search" ? (
        <SearchBar />
      ) : null}
      <FontAwesomeIcon
        onClick={showSidebar}
        className="h-8 text-primary lg:hidden cursor-pointer"
        icon={faBars}
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import sidebarConfig from "../menu.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../_redux/store";

export default function SidebarComponent() {
  const currentPathName = usePathname();
  const sidebar = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch<AppDispatch>();

  const hideSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: false });
  };
  return (
    <div
      onClick={hideSidebar}
      className={`h-screen w-screen bg-gray-800 bg-opacity-50 lg:w-auto lg:bg-white lg:opacity-100 lg:inline lg:static ${
        sidebar ? "inline fixed" : "hidden"
      }`}
    >
      <div className="bg-white w-max h-screen bg-opacity-100 py-4 px-8 border-r">
        <div className="flex justify-center">
          <h1 className="text-secondary font-bold bg-primary py-2 h-10 pl-2 pr-1 rounded-l-xl">
            3
          </h1>
          <h1 className="text-primary font-bold bg-secondary py-2 h-10 pr-2 pl-1 rounded-r-xl">
            10
          </h1>
        </div>
        <div className="nav">
          {sidebarConfig.length
            ? sidebarConfig.map((item) => (
                <Link
                  className={`nav-link ${
                    currentPathName === item.link ||
                    (currentPathName === "/"
                      ? item.link === "/"
                      : currentPathName.startsWith(`${item.link}/`))
                      ? "nav-link--active"
                      : ""
                  }`}
                  href={item.link}
                  key={item.id}
                >
                  <div className="flex gap-2">
                    <FontAwesomeIcon
                      className={`h-5 w-5 text-accent ${
                        currentPathName === item.link ||
                        (currentPathName === "/"
                          ? item.link === "/"
                          : currentPathName.startsWith(`${item.link}/`))
                          ? "nav-link__icon--active"
                          : ""
                      }`}
                      icon={item.icon}
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

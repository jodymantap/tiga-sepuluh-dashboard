"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const q = searchParams.get("q");

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(
      `/search?q=${searchQuery}${category || brand ? "" : "&limit=5"}&skip=0${
        category ? "&category=" + category : ""
      }${brand ? "&brand=" + brand : ""}`
    );
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setSearchQuery(q ? (q as string) : "");
  }, [q]);

  return (
    <>
      <form method="post" onSubmit={onSearch}>
        <input
          className="input-primary mr-0 md:mr-2"
          type="search"
          placeholder="Search product"
          onChange={onInputChange}
          value={searchQuery}
        />
        <button className="btn-primary hidden md:inline">Search</button>
      </form>
    </>
  );
}

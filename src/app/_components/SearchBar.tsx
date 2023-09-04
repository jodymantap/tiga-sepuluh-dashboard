"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${searchQuery}&limit=5&skip=0`);
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <form method="post" onSubmit={onSearch}>
        <input
          className="input-primary mr-0 md:mr-2"
          type="search"
          placeholder="Search product"
          onChange={onInputChange}
        />
        <button className="btn-primary hidden md:inline">Search</button>
      </form>
    </>
  );
}

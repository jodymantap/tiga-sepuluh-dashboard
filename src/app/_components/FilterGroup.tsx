"use client";

import { productBrands, productCategories } from "../_dummies/SelectOption";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function FilterGroup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categoryQuery, setcategoryQuery] = useState("");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  const onCategoryFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setcategoryQuery(event.target.value);
    router.push(
      `/search?&skip=0&category=${event.target.value}&q=${q ? q : ""}`
    );
  };

  useEffect(() => {
    setcategoryQuery(category ? (category as string) : "");
  }, [q]);
  return (
    <div className="flex gap-x-8">
      <select
        value={categoryQuery}
        onChange={onCategoryFilter}
        className="border border-primary rounded-lg bg-transparent p-2 text-primary"
        name="category"
        id="category"
      >
        <option value="">Filter by Category</option>
        {productCategories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>

      <select
        className="border border-primary rounded-lg bg-transparent p-2 text-primary"
        name="category"
        id="category"
      >
        <option value="">Filter by Brand</option>
        {productBrands.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

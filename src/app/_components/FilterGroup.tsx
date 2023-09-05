"use client";

import {
  productBrands,
  productCategories,
  productPriceRange,
} from "../_dummies/SelectOption";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function FilterGroup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categoryQuery, setCategoryQuery] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState("");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const price = searchParams.get("price");
  const q = searchParams.get("q");

  const onCategoryFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryQuery(event.target.value);
    router.push(
      `/search?&skip=0&category=${event.target.value}${
        brand ? "&brand=" + brand : ""
      }&q=${q ? q : ""}${price ? "&price=" + price : ""}`
    );
  };

  const onBrandFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setBrandQuery(event.target.value);
    router.push(
      `/search?&skip=0${category ? "&category=" + category : ""}&brand=${
        event.target.value
      }&q=${q ? q : ""}${price ? "&price=" + price : ""}`
    );
  };

  const onPriceFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriceQuery(event.target.value);
    router.push(
      `/search?&skip=0${category ? "&category=" + category : ""}${
        brand ? "&brand=" + brand : ""
      }&q=${q ? q : ""}&price=${event.target.value}`
    );
  };

  useEffect(() => {
    setCategoryQuery(category ? (category as string) : "");
    setBrandQuery(brand ? (brand as string) : "");
    setPriceQuery(price ? (price as string) : "");
  }, [q]);
  return (
    <div className="flex justify-between lg:justify-start flex-wrap gap-x-8 gap-y-2">
      <select
        value={categoryQuery}
        onChange={onCategoryFilter}
        className="border border-primary rounded-lg bg-transparent p-2 text-primary"
        name="category"
        id="category"
      >
        <option value="">Select Category</option>
        {productCategories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>

      <select
        value={brandQuery}
        onChange={onBrandFilter}
        className="border border-primary rounded-lg bg-transparent p-2 text-primary"
        name="brand"
        id="brand"
      >
        <option value="">Select Brand</option>
        {productBrands.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>

      <select
        value={priceQuery}
        onChange={onPriceFilter}
        className="border border-primary rounded-lg bg-transparent p-2 text-primary"
        name="price"
        id="price"
      >
        <option value="">Select Price Range</option>
        {productPriceRange.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

import { PartialProductResponse } from "../../_types/PartialProductResponse";
import { Suspense } from "react";
import { filterProducts } from "../page";
import TableComponent from "../../_components/TableComponent";
import Await from "../await";
import Loading from "../loading";
import FilterGroup from "@/app/_components/FilterGroup";

type extendedResponseType = {
  products: PartialProductResponse[];
  skip: number;
  total: number;
};

async function getProducts(
  q: string = "",
  skip: number = 0,
  category: string,
  brand: string,
  price: string,
  limit: number
): Promise<extendedResponseType> {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    //error
  }

  const response = await res.json();

  if (response) {
    const filteredProducts = await filterProducts(
      response.products,
      category,
      brand,
      price
    );

    response.products = filteredProducts;

    if (category || brand || price) {
      response.total = filteredProducts.length;
    }
  }
  return response;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headers = ["title", "brand", "price", "stock", "category"];
  const skip =
    typeof searchParams?.skip === "string" ? Number(searchParams.skip) : 0;
  const q = typeof searchParams?.q === "string" ? String(searchParams.q) : "";
  const category =
    typeof searchParams?.category === "string"
      ? String(searchParams.category)
      : "";
  const brand =
    typeof searchParams?.brand === "string" ? String(searchParams.brand) : "";
  const price =
    typeof searchParams?.price === "string" ? String(searchParams.price) : "";
  const limit = category || brand || price ? 100 : 5;
  const promise = getProducts(q, skip, category, brand, price, limit);

  return (
    <main>
      <h2 className="text-primary font-semibold mb-4">
        Product<span className="text-secondary">s</span>
      </h2>

      <div className="flex justify-end mb-2">
        <FilterGroup />
      </div>

      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(response) => (
            <TableComponent
              pathname="/search"
              headers={headers}
              data={response.products}
              q={q}
              skip={response.skip}
              filter={{ category, brand, price }}
              total={response.total}
              usePagination={true}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}

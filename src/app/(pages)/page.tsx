import { PartialProductResponse } from "../_types/PartialProductResponse";
import { Suspense } from "react";
import TableComponent from "../_components/TableComponent";
import Await from "./await";
import Loading from "./loading";
import FilterGroup from "../_components/FilterGroup";

type extendedResponseType = {
  products: PartialProductResponse[];
  skip: number;
  total: number;
};

async function getProducts(
  skip: number = 0,
  limit: number,
  category: string
): Promise<extendedResponseType> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    //error
  }

  const response = await res.json();

  if (response) {
    const filteredProducts = await filterProducts(response.products, category);

    response.products = filteredProducts;

    if (category) {
      response.total = filteredProducts.length;
    }
  }
  return response;
}

export async function filterProducts(
  products: PartialProductResponse[],
  category: string
) {
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter((product: PartialProductResponse) => {
      return product.category == category;
    });
  }

  return filteredProducts;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headers = ["title", "brand", "price", "stock", "category"];
  const skip =
    typeof searchParams?.skip === "string" ? Number(searchParams.skip) : 0;
  const category =
    typeof searchParams?.category === "string"
      ? String(searchParams.category)
      : "";
  const limit = category ? 100 : 5;
  const promise = getProducts(skip, limit, category);

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
              pathname="/"
              headers={headers}
              data={response.products}
              q=""
              skip={response.skip}
              filter={{ category }}
              total={response.total}
              usePagination={true}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}

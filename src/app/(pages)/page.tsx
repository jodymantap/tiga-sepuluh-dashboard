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
  category: string,
  brand: string,
  price: string
): Promise<extendedResponseType> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
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

    if (category) {
      response.total = filteredProducts.length;
    }
  }
  return response;
}

export async function filterProducts(
  products: PartialProductResponse[],
  category: string,
  brand: string,
  price: string
) {
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product: PartialProductResponse) => {
        return product.category == category;
      }
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product: PartialProductResponse) => {
        return product.brand == brand;
      }
    );
  }

  if (price) {
    filteredProducts = filteredProducts.filter(
      (product: PartialProductResponse) => {
        const [min, max] = price.split("-").map(Number);
        return product.price > min && product.price < max;
      }
    );
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
  const brand =
    typeof searchParams?.brand === "string" ? String(searchParams.brand) : "";
  const price =
    typeof searchParams?.price === "string" ? String(searchParams.price) : "";
  const limit = category ? 100 : 5;
  const promise = getProducts(skip, limit, category, brand, price);

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

import { PartialProductResponse } from "../_types/PartialProductResponse";
import { Suspense } from "react";
import TableComponent from "../_components/TableComponent";
import Await from "./await";
import Loading from "./loading";

type extendedResponseType = {
  products: PartialProductResponse[];
  skip: number;
  total: number;
};

async function getProducts(skip: number = 0): Promise<extendedResponseType> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=5&skip=${skip}`
  );

  if (!res.ok) {
    //error
  }

  const response = await res.json();
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
  const promise = getProducts(skip);

  return (
    <main>
      <h2 className="text-primary font-semibold mb-4">
        Product<span className="text-secondary">s</span>
      </h2>

      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(response) => (
            <TableComponent
              pathname="/"
              headers={headers}
              data={response.products}
              q=""
              skip={response.skip}
              total={response.total}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}

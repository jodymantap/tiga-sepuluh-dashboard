import { PartialProductResponse } from "../_types/PartialProductResponse";
import TableComponent from "../_components/TableComponent";
import Await from "./await";

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

      <Await promise={promise}>
        {(response) => (
          <TableComponent
            headers={headers}
            data={response.products}
            skip={response.skip}
            total={response.total}
          />
        )}
      </Await>
    </main>
  );
}

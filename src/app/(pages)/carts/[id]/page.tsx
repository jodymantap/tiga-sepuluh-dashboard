import { PartialCartResponse } from "@/app/_types/PartialCartResponse";
import { PartialProductResponse } from "@/app/_types/PartialProductResponse";
import { Suspense } from "react";
import TableComponent from "../../../_components/TableComponent";
import Await from "../../await";
import Loading from "../loading";
import CartInfo from "@/app/_components/CartInfo";
import BarChart from "@/app/_components/BarChart";

async function getCarts(id: string): Promise<PartialCartResponse> {
  const res = await fetch(`https://dummyjson.com/carts/${id}`);

  if (!res.ok) {
    //error
  }

  const response = await res.json();
  return response;
}

export default function CartDetail({
  params,
}: {
  params?: { [key: string]: string | string[] | undefined };
}) {
  const headers = ["title", "price", "quantity", "total", "discountedPrice"];
  const promise = getCarts(params?.id as string);
  return (
    <div>
      <h2 className="text-primary font-semibold mb-4">
        Cart Detail<span className="text-secondary">s</span>
      </h2>

      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(response) => <CartInfo cart={response} />}
        </Await>
      </Suspense>

      <h2 className="text-primary font-semibold mb-4 mt-8">
        Products<span className="text-secondary">s</span>
      </h2>

      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(response) => (
            <TableComponent
              pathname="/carts"
              headers={headers}
              data={response.products as PartialProductResponse[]}
              q=""
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

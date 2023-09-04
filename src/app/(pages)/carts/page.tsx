import { PartialCartResponse } from "@/app/_types/PartialCartResponse";
import { Suspense } from "react";
import TableComponent from "../../_components/TableComponent";
import Await from "../await";
import Loading from "./loading";

type extendedResponseType = {
  carts: PartialCartResponse[];
  skip: number;
  total: number;
};

async function getCarts(skip: number = 0): Promise<extendedResponseType> {
  const res = await fetch(`https://dummyjson.com/carts?limit=5&skip=${skip}`);

  if (!res.ok) {
    //error
  }

  const response = await res.json();
  return response;
}

export default function Carts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headers = ["id", "userId", "totalProducts", "totalQuantity", "total"];
  const skip =
    typeof searchParams?.skip === "string" ? Number(searchParams.skip) : 0;
  const promise = getCarts(skip);
  const actionField = {
    label: "view cart",
    child: <button className="btn-primary">View</button>,
  };

  return (
    <div>
      <h2 className="text-primary font-semibold mb-4">
        Cart<span className="text-secondary">s</span>
      </h2>

      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(response) => (
            <TableComponent
              pathname="/carts"
              headers={headers}
              data={response.carts}
              q=""
              skip={response.skip}
              total={response.total}
              actionField={actionField}
              usePagination={true}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

import { PartialCartResponse } from "@/app/_types/PartialCartResponse";
import TableComponent from "../../_components/TableComponent";
import Await from "../await";

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

export default function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headers = ["id", "userId", "totalProducts", "totalQuantity", "total"];
  const skip =
    typeof searchParams?.skip === "string" ? Number(searchParams.skip) : 0;
  const promise = getCarts(skip);

  return (
    <div>
      <h2 className="text-primary font-semibold mb-4">
        Cart<span className="text-secondary">s</span>
      </h2>

      <Await promise={promise}>
        {(response) => (
          <TableComponent
            pathname="/carts"
            headers={headers}
            data={response.carts}
            skip={response.skip}
            total={response.total}
          />
        )}
      </Await>
    </div>
  );
}

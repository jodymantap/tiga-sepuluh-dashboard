import { PartialCartResponse } from "../_types/PartialCartResponse";

export default function CartInfo({ cart }: { cart: PartialCartResponse }) {
  return (
    <div className="w-full flex gap-y-4 flex-wrap bg-white border text-primary border-accent rounded-lg p-8">
      <div className="w-full sm:w-1/2">
        User ID <span className="text-secondary">: </span> {cart?.userId || "-"}
      </div>
      <div className="w-full sm:w-1/2">
        Total Products <span className="text-secondary">: </span>
        {cart?.totalProducts || "-"} products
      </div>
      <div className="w-full sm:w-1/2">
        Total Quantity <span className="text-secondary">: </span>{" "}
        {cart?.totalQuantity || "-"} items
      </div>
      <div className="w-full sm:w-1/2">
        Total Amount <span className="text-secondary">: </span> $
        {cart?.total || "-"}
      </div>
    </div>
  );
}

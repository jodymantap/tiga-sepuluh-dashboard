import { PartialProductResponse } from "../_types/PartialProductResponse";

export default function BarChart({
  products,
}: {
  products: PartialProductResponse[];
}) {
  return (
    <div className="bg-white p-4 mt-8 border rounded-lg border-secondary">
      <div className="mb-4 text-primary font-semibold underline">
        Product&apos;s Stock
      </div>
      {products?.length
        ? products.map((product) => (
            <div className="mb-2" key={product.id}>
              <div className="flex items-center justify-between">
                <div className="text-sm text-primary font-semibold">
                  {product.title}
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-primary text-white py-1 px-2 rounded"
                    style={{ width: `${product.stock}px` }}
                  >
                    {product.stock}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

import TableComponent from "../_components/TableComponent";

async function getProducts(page: number = 0) {
  const res = await fetch(
    `https://dummyjson.com/products?limit=5&skip=${page * 5}`
  );

  if (!res.ok) {
    //error
  }

  return res.json();
}

export default async function Home() {
  const headers = ["title", "brand", "price", "stock", "category"];
  const products = await getProducts();
  console.log(products);
  return (
    <main>
      <h2 className="text-primary font-semibold mb-4">
        Product<span className="text-secondary">s</span>
      </h2>

      <TableComponent headers={headers} data={products.products} />
    </main>
  );
}

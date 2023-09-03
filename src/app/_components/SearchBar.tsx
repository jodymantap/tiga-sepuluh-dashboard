"use client";

export default function SearchBar() {
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <form method="post" onSubmit={onSearch}>
        <input
          className="input-primary mr-0 md:mr-2"
          type="search"
          placeholder="Search product"
        />
        <button className="btn-primary hidden md:inline">Search</button>
      </form>
    </>
  );
}

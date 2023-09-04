import PaginationComponent from "./PaginationComponent";

interface TableComponentProps<T> {
  headers: string[];
  data: T[];
  skip: number;
  total: number;
}

export default function TableComponent<T>({
  headers,
  data,
  skip,
  total,
}: TableComponentProps<T>) {
  function renderTableCell(item: T, header: string): React.ReactNode {
    if (typeof item === "object" && item !== null) {
      return (item as Record<string, React.ReactNode>)[header];
    } else {
      return String(item);
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary">
          <thead>
            <tr>
              {headers.length
                ? headers.map((item) => (
                    <th
                      key={item}
                      className="px-6 py-3 whitespace-nowrap bg-gray-50 text-left text-xs leading-4 font-semibold text-primary uppercase tracking-wider"
                    >
                      {item}
                    </th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {data.length
              ? data.map((item, index) => (
                  <tr key={index}>
                    {headers.length
                      ? headers.map((header) => (
                          <td
                            key={header}
                            className="px-6 py-4 text-primary font-light whitespace-nowrap"
                          >
                            {renderTableCell(item, header)}
                          </td>
                        ))
                      : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <PaginationComponent total={total} skip={skip} />
    </>
  );
}

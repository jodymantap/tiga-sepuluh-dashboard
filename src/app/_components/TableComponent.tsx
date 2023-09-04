import PaginationComponent from "./PaginationComponent";

interface TableComponentProps<T> {
  headers: string[];
  data: T[];
  q: string;
  skip: number;
  total: number;
  pathname: string;
}

export default function TableComponent<T>({
  headers,
  data,
  q,
  skip,
  total,
  pathname,
}: TableComponentProps<T>) {
  function renderTableCell(item: T, header: string): React.ReactNode {
    if (typeof item === "object" && item !== null) {
      return (item as Record<string, React.ReactNode>)[header];
    } else {
      return String(item);
    }
  }

  function formatHeader(inputString: string) {
    const words = inputString.split(/(?=[A-Z])/);
    const formattedString = words.join(" ");
    return formattedString;
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
                      {formatHeader(item)}
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
      <PaginationComponent
        q={q}
        total={total}
        skip={skip}
        pathname={pathname}
      />
    </>
  );
}

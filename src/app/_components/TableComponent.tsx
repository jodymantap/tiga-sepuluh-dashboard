import Link from "next/link";
import PaginationComponent from "./PaginationComponent";

type actionFieldType = {
  label?: string;
  child: React.ReactNode;
};

type filterProps = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};
interface TableComponentProps<T> {
  headers: string[];
  data: T[];
  q?: string;
  skip?: number;
  filter?: filterProps;
  total?: number;
  pathname: string;
  actionField?: actionFieldType;
  usePagination?: boolean;
}

export default function TableComponent<T>({
  headers,
  data,
  q,
  skip,
  filter,
  total,
  pathname,
  actionField,
  usePagination,
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
              {actionField ? (
                <th className="px-6 py-3 text-center whitespace-nowrap bg-gray-50 text-xs leading-4 font-semibold text-primary uppercase tracking-wider">
                  {actionField?.label ? actionField?.label : "action"}
                </th>
              ) : null}
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
                    {actionField?.child ? (
                      <td className="text-center">
                        <Link
                          href={{
                            pathname: `/carts/${
                              (item as Record<string, unknown>)?.id
                            }`,
                          }}
                        >
                          {actionField?.child}
                        </Link>
                      </td>
                    ) : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      {usePagination ? (
        <PaginationComponent
          q={q as string}
          total={total as number}
          skip={skip as number}
          pathname={pathname}
          filter={filter}
        />
      ) : null}
    </>
  );
}

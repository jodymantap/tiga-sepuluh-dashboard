export default function TableComponent({
  headers,
  data,
}: {
  headers: string[];
  data: Record<string, React.ReactNode>[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-secondary">
        <thead>
          <tr>
            {headers.length
              ? headers.map((item) => (
                  <th
                    key={item}
                    className="px-6 py-3 whitespace-nowrap bg-gray-50 text-left text-xs leading-4 font-medium text-primary uppercase tracking-wider"
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
                          className="px-6 py-4 text-accent whitespace-nowrap"
                        >
                          {item[header]}
                        </td>
                      ))
                    : null}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export const Table = ({ headers, children }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 sm:rounded-xl shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#fafafa]">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

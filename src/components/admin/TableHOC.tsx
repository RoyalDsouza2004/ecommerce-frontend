
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { useTable, Column, TableOptions, useSortBy, usePagination } from "react-table";

function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = true
) {
  return function HOC() {
    const option: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
    } = useTable(option, useSortBy, usePagination);

    return (
      <div className={`${containerClassname} bg-white shadow-md rounded-xl`}>
        <h2 className="mt-6 tracking-[3px] font-light uppercase">{heading}</h2>

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={key} {...restColumnProps}>
                        {column.render("Header")}
                        {"   "}
                        {column.isSorted && (
                          <span className="inline-block align-middle">
                            {column.isSortedDesc ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {showPagination && (
          <div className="w-full flex items-center justify-center p-8 gap-8">
            <button
              disabled={!canPreviousPage}
              onClick={previousPage}
              className="py-2 px-4 outline-none rounded-xl cursor-pointer bg-blue-600 text-white disabled:bg-[rgba(0,115,255,0.1)] disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button
              disabled={!canNextPage}
              onClick={nextPage}
              className="px-4 py-2 outline-none rounded-xl cursor-pointer bg-blue-600 text-white disabled:bg-[rgba(0,115,255,0.1)] disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC

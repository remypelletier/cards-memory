import React from "react";

const Table = (props) => {

    const {dataSource, columns} = props;

    const columnItems = columns.map((column, index) => {
        return <th key={column.key} className={`p-4 ${(index === 0 ? 'text-left' : '')}`}>{column.title}</th>
    });

    const rowItems = dataSource.map((data) => {
        const cells = columns.map((column, index) => (
            <td key={`${data.key}-${index}`} className={`p-4 ${(index === 0 ? 'w-1/2 text-left' : 'text-center')}`}>{data[column.dataIndex]}</td>
        ));

        return <tr key={data.key} className="border-t cursor-pointer hover:bg-gray-100">
            { cells }
        </tr>
    })

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="w-full min-w-lg bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {columnItems}
                    </tr>
                </thead>
                <tbody>
                    { rowItems }
                </tbody>
            </table>
        </div>
    )
}

export default Table;

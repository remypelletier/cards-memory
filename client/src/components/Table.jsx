import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";

const Table = (props) => {

    const { dataSource, columns, onClick } = props;

    const columnItems = columns.map((column, index) => {
        if (!column.collapsible)
            return <th key={column.key} className={`p-4 ${(index === 0 ? 'text-left' : '')}`}>{column.title}</th>
    });

    const rowItems = dataSource.map((data, index) => {
        return <TableRow key={`TableRow-${index}`} columns={columns} data={data} />
    });

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

const TableRow = (props) => {

    const { columns, data } = props;
    const [ collapisbleItem, setCollapsibleItem] = useState(null);
    const [ isOpen, setIsOpen ] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        columns.forEach(column => {
            if (column.collapsible) {
                setCollapsibleItem(data[column.dataIndex]);
            }
        });
    });

    const handleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (e, link) => {
        if (link) {
            e.stopPropagation();
            navigate(link);
        }
    }

    const cells = columns.map((column, index) => {
        if (collapisbleItem && column.key === 'actions') {
            return  <td key={`${data.key}-${index}`} className={`flex p-4 ${(index === 0 ? 'w-1/3 text-left' : 'text-center')}`}>
                <button onClick={handleCollapse} className="flex items-center text-indigo-600 mr-3"><ChevronRightIcon className={`w-5 h-5 transition transform ${isOpen ? 'rotate-90' : 'rotate-180'}`} />Answer</button>
                {data[column.dataIndex]}
            </td>
        }
        if (!column.collapsible)
            return <td key={`${data.key}-${index}`} className={`p-4 ${(index === 0 ? 'w-1/3 text-left' : 'text-center')}`}>{data[column.dataIndex]}</td>
    });

    return <>
        <tr key={data.key} className={`${isOpen ? 'bg-gray-100' : ''} border-t ${data.link === undefined ? '' : 'cursor-pointer'} hover:bg-gray-100`} onClick={(e) => handleClick(e, data.link)}>
            { cells }
        </tr>
        {collapisbleItem &&
            <tr key={data.key + 'col'} className={`transition transform ${isOpen ? '-translate-y-0 opacity-1 h-auto table-row' : '-translate-y-4 opacity-0 h-0 flex'} delay-75 ease-out overflow-hidden`}>
                <td colSpan="5">{collapisbleItem}</td>
            </tr>
        }
    </>
}

export default Table;

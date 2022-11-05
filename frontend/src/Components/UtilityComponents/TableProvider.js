// import React, { useEffect, useState } from 'react'
// import { Table, TableHead, TableRow, TableCell, TablePagination, TableSortLabel } from '@mui/material/';
// // making Table Components


// const TableProvider = (tableCells, data, filterFn) =>
// {
//     const pages = [5, 20, 30]
//     {/* page is for setting index from the pages array to know how many pages*/ }
//     const [page, setPage] = useState(0)

//     {/* how many pages to show */ }
//     const [rowsPerPage, setRowsPerPage] = useState(pages[page])

//     // order being followed asc or dsc
//     const [order, setOrder] = useState()
//     // ordering is done of which column name whose id is given
//     const [orderBy, setOrderBy] = useState()

//     const MyTableHead = (props) =>
//     {
//         const sortTable = (cellId) =>
//         {
//             // isAsc decides whether both the orderby is that cellid which is clicked and the order follwed is asc, then true boolean so then assign order now to desc to toggle
//             const isAsc = orderBy === cellId && order === "asc";
//             setOrder(isAsc ? 'desc' : 'asc');
//             setOrderBy(cellId)
//         }

//         return (
//             <TableHead>
//                 <TableRow>
//                     {
//                         tableCells.map((tableCell) =>
//                         (
//                             <TableCell
//                                 key={tableCell.id}
//                                 // sorts the direction in the direction which is set by sort function, which sets the order, or if not same column id then, it is not sorted and set to false
//                                 sortDirection={orderBy === tableCell.id ? order : false}
//                             >
//                                 {
//                                     tableCell.disableSorting ?
//                                         tableCell.label :
//                                         <TableSortLabel
//                                             active={orderBy === tableCell.id}
//                                             direction={orderBy === tableCell.id ? order : 'asc'}
//                                             onClick=
//                                             {
//                                                 () =>
//                                                 {
//                                                     sortTable(tableCell.id)
//                                                 }}
//                                         >
//                                             {tableCell.label}
//                                         </TableSortLabel>
//                                 }
//                             </TableCell>
//                         ))
//                     }
//                 </TableRow>
//             </TableHead >
//         );
//     }

//     const handleChangePage = (event, newPage) =>
//     {
//         setPage(newPage);
//     }

//     const handleChangeRowsPerPage = event =>
//     {
//         setRowsPerPage(parseInt(event.target.value, 10))
//         setPage(0);
//     }

//     const MyTablePagination = () =>
//     (
//         <TablePagination
//             component="div"
//             page={page}
//             // for the array of how many pages to see at a time
//             rowsPerPageOptions={pages}
//             rowsPerPage={rowsPerPage}
//             count={data.length}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//     )

//     function stableSort(array, comparator)
//     {
//         const stabilizedThis = array.map((el, index) => [el, index]);
//         stabilizedThis.sort((a, b) =>
//         {
//             const order = comparator(a[0], b[0]);
//             if (order !== 0) return order;
//             return a[1] - b[1];
//         });
//         return stabilizedThis.map((el) => el[0]);
//     }

//     const getComparator = (order, orderBy) =>
//     {
//         return order === 'desc'
//             ? (a, b) => descendingComparator(a, b, orderBy)
//             : (a, b) => -descendingComparator(a, b, orderBy);
//     }

//     const descendingComparator = (a, b, orderBy) =>
//     {
//         if (b[orderBy] < a[orderBy])
//         {
//             return -1;
//         }
//         if (b[orderBy] > a[orderBy])
//         {
//             return 1;
//         }
//         return 0;
//     }

//     // for showing only the number of rows as mentioned
//     const recordsAfterPagingAndSorting = () =>
//     {
//         return stableSort(filterFn.fn(data), getComparator(order, orderBy))
//             .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
//         // return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).sort(getComparator(order, orderBy))
//     }

//     return {
//         MyTableHead,
//         MyTablePagination,
//         recordsAfterPagingAndSorting
//     }
// };

// export default TableProvider;
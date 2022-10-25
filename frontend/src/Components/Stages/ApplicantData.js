import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import TableProvider from '../UtilityComponents/TabularProvider';

const ApplicantData = (props) =>
{
    // useEffect(() =>
    // {
    //     getApplicantsData();
    // }, []);

    const tableCells = [
        {
            id: 'Name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'Enrollment Number',
            numeric: true,
            disablePadding: false,
            label: 'Enrollment Number',
        },
        {
            id: 'Role',
            numeric: true,
            disablePadding: false,
            label: 'Role',
        },
        {
            id: 'Phone Number',
            numeric: true,
            disablePadding: false,
            label: 'Phone Number',
        },
        {
            id: 'Status',
            numeric: true,
            disablePadding: false,
            label: 'Status',
        },
    ];

    const
        {
            MyTableHead,
            MyTablePagination,
            recordsAfterPagingAndSorting
        } = TableProvider(tableCells, props.data)

    return (
        <div className='table'>
            <Table>
                <MyTableHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map((item) =>
                        (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.enroll_no}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{item.phone_number}</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <MyTablePagination />
        </div>
    );
};

export default ApplicantData;
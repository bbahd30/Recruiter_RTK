import React from 'react';
import { useEffect, useState } from 'react';
import LoginStatus from '../LoginComp/LoginStatus';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import * as Links from '../../Links';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import TableProvider from '../UtilityComponents/TableProvider';
import MyDialogBox from '../UtilityComponents/MyDialogBox';
import CSVForm from '../Forms/CSVForm';

// custom withRouter as it is not present in router 6
function withRouter(Component)
{
    function ComponentWithRouterProp(props)
    {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

function Dashboard(props)
{
    const [season, setSeason] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();

    const getSeasonData = () =>
    {
        axios
            .get(Links.seasons_api + `${id}/`)
            .then((response) =>
            {
                setSeason(response.data);
            });
    }

    const getApplicantsData = () =>
    {
        axios
            .get(Links.seasons_api + `${id}/applicants/`)
            .then((response) =>
            {
                setApplicants(response.data);
            });
    }

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
            id: 'Academic Year',
            numeric: true,
            disablePadding: false,
            label: 'Academic Year',
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
        } = TableProvider(tableCells, applicants)

    useEffect(() =>
    {
        // defining the season_id for backend data
        getSeasonData();
        getApplicantsData();
    }, []);



    return (
        <div>
            <LoginStatus />
            <SideBar id={id} />
            <Box sx={{ backgroundColor: '#5b004c', padding: '50px 0 50px 20%', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <Typography variant='h5' color='white'>{season.year}</Typography>
                    <Typography variant='h3' color='white'>{season.season_name}</Typography>
                    <Typography variant='h6' color='white'>{season.description}</Typography>


                    <MyDialogBox

                        buttonChild=
                        {
                            // <Button variant='contained' sx={{ marginTop: '30px' }}>Import CSV</Button>
                            "Upload CSV"
                        }
                        dataChild=
                        {
                            <CSVForm season_id={id} />
                        }
                        title="Upload CSV File"
                    />
                </div>
                <div>
                    <img src={require('../../Images/welcome.svg').default} width="800px"></img>
                </div>
            </Box>
            <Box>
                {
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
                                            <TableCell>{item.academic_year}</TableCell>
                                            <TableCell>{item.role}</TableCell>
                                            <TableCell>{item.phone_no}</TableCell>
                                            <TableCell>{item.status}</TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <MyTablePagination />
                    </div>
                }
            </Box>


        </div>
    );
};

export default withRouter(Dashboard);
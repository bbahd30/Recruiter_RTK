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
import Toolbar from '@mui/material/Toolbar';
import { TextField } from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import MyDialogBox from '../UtilityComponents/MyDialogBox';
import CSVForm from '../Forms/CSVForm';
import { setDataChild, setOpen } from '../../Slices/dialogBoxSlice';

import { useDispatch, useSelector } from 'react-redux';
import { getSeasonData } from '../../Slices/seasonSlice';
import { showApplicants } from '../../Slices/applicantSlice';

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
    const dispatch = useDispatch();
    const seasonState = useSelector((state) => state.season);
    const applicantState = useSelector((state) => state.applicant);
    const seasonId = useParams()['id'];

    // object fn in the filter function filterfn which has a function
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [pageSize, setPageSize] = React.useState(5);

    const arr = ['Test', 'Dev Round 1'];
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'enroll_no',
            headerName: 'Enrollment Number',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
        },
        {
            field: 'project',
            headerName: 'Project',
            flex: 1,
        },
        {
            field: 'project_link',
            headerName: 'Project Link',
            flex: 1,
        },
        {
            field: 'phone_no',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            type: 'singleSelect',
            valueOptions: arr,
            editable: 'true'
        },
    ];

    const ImportCSV = () =>
    {
        dispatch(setOpen(true));
        dispatch(setDataChild(<CSVForm />));
    }

    useEffect(() =>
    {
        dispatch(getSeasonData(seasonId));
        dispatch(showApplicants(seasonId));
        // getApplicantsData();
    }, []);

    return (
        <div>
            {/* <LoginStatus /> */}
            <SideBar id={seasonId} />
            <Box sx={{ backgroundColor: '#5b004c', padding: '50px 0 50px 20%', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <Typography variant='h5' color='white'>{seasonState.year}</Typography>
                    <Typography variant='h3' color='white'>{seasonState.season_name}</Typography>
                    <Typography variant='h6' color='white'>{seasonState.description}</Typography>

                    <MyDialogBox
                        icon="Import CSV"
                        onClick={ImportCSV}
                    // dataChild=
                    // {
                    //     <CSVForm season_id={id} />
                    // }
                    // title="Upload CSV File"
                    />
                </div>
                <div>
                    <img src={require('../../Images/welcome.svg').default} width="800px"></img>
                </div>
            </Box>
            <Box>
                {
                    <div className='table'>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                sx={{ m: 5 }}
                                rows={applicantState.applicantList}
                                columns={columns}
                                pagination
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                                rowsPerPageOptions={[5, 10, 15]}
                                autoHeight
                            />
                        </div>

                    </div>
                }
            </Box>


        </div>
    );
};

export default withRouter(Dashboard);
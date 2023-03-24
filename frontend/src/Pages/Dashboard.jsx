import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/system';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';

import LoginStatus from '../Components/LoginComp/LoginStatus';
import SideBar from '../Components/DashboardComponents/SideBar';
import * as Links from '../Links';
import MyDialogBox from '../Components/UtilityComponents/MyDialogBox';
import CSVForm from '../Components/Forms/CSVForm';
import ApplicantCard from '../Components/ApplicantComponents/ApplicantCard';

import { setDataChild, setOpen } from '../Slices/dialogBoxSlice';
import { getSeasonData } from '../Slices/seasonSlice';
import { setApplicantDetails, setApplicantId, setOpenModal, setPageSize, setSelectedApplicants, showApplicants, changeMovingMode, getQuestionMarksAwarded } from '../Slices/applicantSlice';
import { getSectionMarks, showSections } from '../Slices/sectionSlice';
import { showRounds } from '../Slices/roundSlice';
import { getStatusAndSectionMarks } from '../Slices/applicantSlice';

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

    const dispatch = useDispatch();
    const seasonState = useSelector((state) => state.season);
    const applicantState = useSelector((state) => state.applicant);
    const seasonId = useParams()['id'];
    const sectionState = useSelector((state) => state.section)
    const roundState = useSelector((state) => state.round)

    // const section

    // object fn in the filter function filterfn which has a function
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    // const [pageSize, setPageSize] = React.useState(5);


    const ImportCSV = () =>
    {
        dispatch(setOpen(true));
        dispatch(setDataChild(<CSVForm />));
    }
    const type = 'test'
    const openModal = (params) =>
    {
        dispatch(setOpenModal(true))
        dispatch(setApplicantDetails({
            'applicant': params.row,
        }))
        console.log(params.row['id'])
        dispatch(setApplicantId({
            id: params.row['id']
        }))
        dispatch(getSectionMarks())
        if (roundState.rounds.len != 0)
        {
            dispatch(showRounds(seasonId))
        }
        dispatch(getStatusAndSectionMarks({
            'applicant_id': params.row['id'],
            'season_id': seasonId,
        }))
    }

    useEffect(() =>
    {
        roundState.rounds.map((round) => {
            dispatch(showSections(round.id));
            if (applicantState.openModal)
            {
                dispatch(getQuestionMarksAwarded({
                'applicant_id': applicantState.selectedApplicants[0],
                'round_id': round.id
            }));
            }
        });
        console.log("********8")
    }, [roundState.rounds])

    useEffect(() =>
    {
        dispatch(getSeasonData(seasonId));
        dispatch(showApplicants(seasonId));
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
                    />
                </div>
                <div>
                    <img src={require('../Images/welcome.svg').default} width="75%"></img>
                </div>
            </Box>
            <Box>
                {
                    <>
                    <div className='table'>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                sx={{ m: 5 }}
                                rows={applicantState.applicantList}
                                columns={columns}
                                pagination
                                pageSize={applicantState.pageSize}
                                onPageSizeChange={(newPageSize) => {dispatch(setPageSize(newPageSize))}}
                                checkboxSelection={applicantState.movingMode}
                                    onSelectionModelChange={(selection) =>
                                    {
                                        dispatch(setSelectedApplicants({ 'applicants': selection }))
                                        console.log("*******")
                                        console.log(selection)
                                    }}
                                    
                                rowsPerPageOptions={[5, 10, 15]}
                                autoHeight
                                onRowClick={(params) => { openModal(params) }} 
                                />
                                <button onClick={() => dispatch(changeMovingMode())}>
                                    {applicantState.movingMode ? 'Cancel Select Multiple' : 'Select Multiple'}
                                </button>
                                <ApplicantCard selectedApplicants={applicantState.selectedApplicants} />
                                <ApplicantCard/>
                        </div>

                    </div>
                    </>
                }
            </Box>


        </div>
    );
};

export default withRouter(Dashboard);
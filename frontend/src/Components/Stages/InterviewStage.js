import React from 'react';
import SideBar from '../DashboardComponents/SideBar';
import { useLocation } from 'react-router-dom';

const InterviewStage = () =>
{
    const location = useLocation();
    const seasonID = location.state.sId;
    // const navigateToRound = (id, sId) =>
    // {
    //     navigate(`../rounds/${id}`, { state: { sId: sId } });
    // }
    return (
        <div>
            <SideBar id={seasonID} />
        </div>
    );
};

export default InterviewStage;
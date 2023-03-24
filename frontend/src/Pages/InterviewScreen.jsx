import React from 'react';
import SideBar from '../Components/DashboardComponents/SideBar';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const InterviewScreen = () =>
{
    const location = useLocation();
    const seasonID = useParams()['id']

    return (
        <div>
            <SideBar id={seasonID} />
        </div>
    );
};

export default InterviewScreen;
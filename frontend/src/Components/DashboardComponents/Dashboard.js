import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

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

const Dashboard = (props) =>
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
                console.log(response.data);
                setApplicants(response.data);
            });
    }
    useEffect(() =>
    {
        // defining the season_id for backend data
        console.log(id)
        getSeasonData();
        getApplicantsData();
    }, []);

    return (
        <div>

        </div>
    );
};

export default withRouter(Dashboard);
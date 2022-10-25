import React from 'react';
import SideBar from '../DashboardComponents/SideBar';
import FormProvider from '../UtilityComponents/FormProvider';

const RTStage = () =>
{
    const fields = [];

    return (
        <div>
            <SideBar />
            <FormProvider />
        </div>
    );
};

export default RTStage;
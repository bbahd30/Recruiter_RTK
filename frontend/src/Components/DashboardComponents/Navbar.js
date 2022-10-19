import { AppBar, Avatar, Button, Paper, Toolbar, Typography, Container } from '@mui/material';
import React from 'react';
import Icon from '@mui/material/Icon';
// import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
    return (
        <>
            <AppBar position='static' sx={{background: '#21b6ae'}}>
                <Toolbar sx={{display: 'flex', justifyContent: "space-between"}}>
                    <Typography variant="h5" sx={{ display: {sm: "block" } }}>
                        Recruiter
                    </Typography>
                    {/* <WorkHistoryIcon /> */}

                    <Avatar 
                        sx={{ width: 30, height: 30 }}
                        src="https://www.pngitem.com/pimgs/m/421-4213036_avatar-hd-png-download.png"
                    />
                    
                </Toolbar>
                
            </AppBar>
        </>
    );
};

export default Navbar;


{/* <WorkHistoryIcon /> */}
//                     //     <Typography component={'span'}>Recruiter</Typography>
//                     // </div>

//                     // <div sx={{innerWidth: '90px'}}>
//                     //     {/* <AccountBoxIcon sx={{marginLeft: 'auto'}} /> */}
//                     //     <Typography component={'span'} sx={{ marginRight: 'auto'}}>Username</Typography>
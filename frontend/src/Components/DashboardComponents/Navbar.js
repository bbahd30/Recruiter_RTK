import { AppBar, Avatar, Button, Paper, Toolbar, Typography, Container } from '@mui/material';
import React from 'react';
import Icon from '@mui/material/Icon';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = (props) =>
{
    const toggleDrawer = props.toggleFunction;
    const logoStyle = { marginRight: "20px", marginTop: '9%' }
    return (
        <>
            <AppBar position='static' sx={{ background: '#21b6ae' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className='navSection' >
                        {
                            props.hamburger === "true" ?
                                <MenuIcon style={logoStyle} onClick={toggleDrawer(true)} /> :
                                <></>
                        }
                        <WorkHistoryIcon style={logoStyle} />
                        <Typography variant="h5" sx={{ display: { sm: "block" } }}>
                            <span className='logoSpan'>R</span>ECRUITER
                        </Typography>

                    </div>

                    <div>
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src="https://www.pngitem.com/pimgs/m/421-4213036_avatar-hd-png-download.png"
                        />
                    </div>
                </Toolbar>

            </AppBar>
        </>
    );
};

export default Navbar;


{/* <WorkHistoryIcon /> */ }
//                     //     <Typography component={'span'}>Recruiter</Typography>
//                     // </div>

//                     // <div sx={{innerWidth: '90px'}}>
//                     //     {/* <AccountBoxIcon sx={{marginLeft: 'auto'}} /> */}
//                     //     <Typography component={'span'} sx={{ marginRight: 'auto'}}>Username</Typography>
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './Navbar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SideBar(props)
{
    const navigate = useNavigate()
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) =>
    {
        setState(open);
    };

    const seasonId = useParams()['id']

    const list = (anchor) => (
        <Box
            sx={{ width: 270 }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <Link to={"/seasons/" + seasonId + "/applicants"}>
                        Dashboard
                    </Link>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Link to={"/seasons/" + props.id}>
                            Rounds and Tests
                        </Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <Link to={"/seasons/" + props.id + "/interview/"}>
                        Interview Round
                    </Link>
                </ListItem>
            </List>
        </Box >
    );

    return (
        <div>
            <Navbar hamburger="true" toggleFunction={toggleDrawer} />
            <>
                <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </>
        </div>
    );
}

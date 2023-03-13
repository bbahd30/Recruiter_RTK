import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { setOpen, setTitle, setDataChild, } from '../../Slices/dialogBoxSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props)
{
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other} >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MyDialogBox(props)
{
    const dispatch = useDispatch();
    const dialogBoxState = useSelector((state) => state.dialogBox);
    const handleClose = () =>
    {
        dispatch(setOpen(false));
    };

    return (
        <>
            {/* // todo: still using props for passing the function to dispatch accordingly on the basis of the click made on which div*/}
            <Button variant="contained" onClick={props.onClick} >
                {props.icon}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={dialogBoxState.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dialogBoxState.title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {dialogBoxState.dataChild}
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}

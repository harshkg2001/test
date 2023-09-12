import { Alert, Snackbar } from '@mui/material'

function Notification({ message, type, open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCloseAlert = () => {
        setOpen(false);
    };
    return <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        color= {type === 'error' ? 'error' : 'success'}
        open={open}
        autoHideDuration={6000}
        message={message}
        onClose={handleClose}
    >
        <Alert
            onClose={handleCloseAlert}
            severity={type === 'error' ? 'error' : 'success'}
            sx={{ width: '100%' }}
        >
            {message}   
        </Alert>
    </Snackbar>
}

export default Notification
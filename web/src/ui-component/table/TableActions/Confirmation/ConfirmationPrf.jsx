/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const Confirmation = ({ open, setOpen, params, deleteProfFromTable }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const moveToTrash = () => {
        const token = localStorage.getItem('TOKEN');

        axios.delete(`http://localhost:3001/api1/v1/professeurs/deleteOne/${params.row.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Item deleted:', response.data);
            setOpen(false);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000); // Display success message for 2 seconds before disappearing
        })
        .catch(error => {
            console.error('Error deleting item:', error);
            // Handle error here, such as displaying a message to the user
        });

        // Remove professor from table after deletion
        deleteProfFromTable(params.row.id);
        handleClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently Delete This Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to permanently delete this item? This action is irreversible, and all associated data will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={moveToTrash} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {showSuccessMessage && (
                <div className="alert alert-success text-center" role="alert" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Deletion successful!
                </div>
            )}
        </>
    );
}

export default Confirmation;

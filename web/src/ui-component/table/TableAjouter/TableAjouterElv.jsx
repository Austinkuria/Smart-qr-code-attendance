/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Field from './fields/FieldElv';
import Button from '@mui/material/Button';
import { IconUserPlus } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const TableAjouterElv = ({ openAjouter, setOpenAjouter, addStudentToTable }) => {
    const theme = useTheme();

    const [formData, setFormData] = useState({});
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedCategory, setSelectedIssueDe] = useState('');
    const [selectedSemestre, setSelectedSemestre] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for managing error messages

    const handleClose = () => {
        setOpenAjouter(false);
        setErrorMessage(''); // Clear errors when closing the dialog
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api1/v1/students/createStudent', {
                ...formData,
                filieres: [selectedFiliere], // Convert selectedFiliere to an array
                admissionCategory: selectedCategory,
                semestre: selectedSemestre
            });
            console.log('Student created successfully:', response.data);
            handleClose();
            addStudentToTable(response.data);
        } catch (error) {
            console.error('Error creating student:', error);
            setErrorMessage(
                error.response?.data?.message || 
                'An error occurred while adding the student. Please try again.'
            );
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFiliere(filiere);
    };

    const handleAdmissionCategorySelect= (admissionCategory) => {
        setSelectedIssueDe(admissionCategory);
    };

    const handleSemestreSelect = (semestre) => {
        console.log('Selected semester:', semestre);
        setSelectedSemestre(semestre);
    };

    return (
        <>
            <Dialog
                open={openAjouter}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle sx={{ fontSize: '16px', color: 'black' }}>
                    <IconButton edge="start" sx={{ mr: 1 }}>
                        <IconUserPlus />
                    </IconButton>
                    Add a Student
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fields marked with an asterisk (*) are required.
                    </DialogContentText>
                    <Field
                        handleInputChange={handleInputChange}
                        onFiliereSelect={handleFiliereSelect}
                        onAdmissionCategorySelect={handleAdmissionCategorySelect}
                        onSemestreSelect={handleSemestreSelect}
                        filiereSelected={selectedFiliere}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'grey' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        sx={{
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.dark,
                            color: 'white',
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error Snackbar */}
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage('')}
            >
                <Alert
                    onClose={() => setErrorMessage('')}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default TableAjouterElv;

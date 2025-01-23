/* eslint-disable prettier/prettier */
// TableAjouterLecturer.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IconUserPlus } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Field from './fields/FieldProf';

const TableAjouterLecturer = ({ openAjouter, setOpenAjouter, addLecturerToTable }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [selectedFilieres, setSelectedFilieres] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        setOpenAjouter(false);
        setErrorMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api1/v1/lecturers/create', {
                ...formData,
                filieres: selectedFilieres,
                elements: selectedElements,
            });
            addLecturerToTable(response.data);
            console.log('Lecturer added successfully:', response.data);
            handleClose();
        } catch (error) {
            console.error('Error adding lecturer:', error);
            setErrorMessage("Failed to add lecturer. Please try again.");
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFilieres(filiere);
        setFormData({ ...formData, filieres: filiere });
    };

    const handleElementSelect = (element) => {
        setSelectedElements(element);
        setFormData({ ...formData, elements: element });
    };

    return (
        <Dialog
            open={openAjouter}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle sx={{ fontSize: '16px', color: 'black' }}>
                <IconButton edge="start" sx={{ mr: 1 }}>
                    <IconUserPlus />
                </IconButton>
                Add a Lecturer
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fields marked with an asterisk (*) are mandatory.
                </DialogContentText>
                {errorMessage && (
                    <DialogContentText sx={{ color: 'red', marginTop: 1 }}>
                        {errorMessage}
                    </DialogContentText>
                )}
                <Field
                    handleInputChange={handleInputChange}
                    onFiliereSelect={handleFiliereSelect}
                    onElementSelect={handleElementSelect}
                    filiereSelected={selectedFilieres}
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
                            color: theme.palette.secondary.light,
                        },
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TableAjouterLecturer;

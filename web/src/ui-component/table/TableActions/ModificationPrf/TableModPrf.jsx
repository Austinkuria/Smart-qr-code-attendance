/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
import Field from './Field';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TableModPrf = ({ params, openAjouter, setOpenAjouter }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [selectedFilieres, setSelectedFilieres] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);
    const [profData, setProfData] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('TOKEN');
                const response = await axios.get(`http://localhost:3001/api1/v1/professeurs/getOne/${params.row.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Lecturers data fetched:', response.data);
                setProfData(response.data.professeurInstance);
                
                // Set selected filieres after data is fetched
                const filieresArry = response.data.professeurInstance.filieres.map(filiere => filiere._id);
                setSelectedFilieres(filieresArry);
            } catch (error) {
                console.error('Error fetching Lecturers data:', error);
                setErrorMessage('Failed to load Lecturers data. Please try again later.');
                setShowError(true);
            }
        };

        fetchData();
    }, [params]); // Re-fetch when params change

    const handleClose = () => {
        setOpenAjouter(false);
        setFormData({}); // Reset form data
        setSelectedFilieres([]); // Reset selected academic programs
        setSelectedElements([]); // Reset selected units
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validation for selected Academic Programs and Units
        if (!selectedFilieres.length || !selectedElements.length) {
            setErrorMessage('Please select both Academic Programs and Units!');
            setShowError(true);
            return;
        }

        try {
            const token = localStorage.getItem('TOKEN');
            const response = await axios.put(
                `http://localhost:3001/api1/v1/professeurs/update/${params.row.id}`,
                { 
                    ...formData,
                    filieres: selectedFilieres,
                    admissionCategory: selectedElements
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Object updated successfully:', response.data);
            handleClose();
            setShowSuccessMessage(true);

            // Show success message for 2 seconds before reloading
            setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload(); // Refresh the page after successful update
            }, 2000);

        } catch (error) {
            console.error('Error updating object:', error);
            setErrorMessage('Failed to update Lecturer details. Please try again later.');
            setShowError(true);
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFiliereSelect = (filiere) => {
        setSelectedFilieres(filiere);
        setFormData({ ...formData, filieres: Array.isArray(filiere) ? filiere : [filiere] });
    };

    const handleElementSelect = (element) => {
        setSelectedElements(element);
        setFormData({ ...formData, elements: Array.isArray(element) ? element : [element] });
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
                    Add a Lecturer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fields marked with an asterisk (*) are mandatory.
                    </DialogContentText>
                    <Field
                        params={profData}
                        handleInputChange={handleInputChange}
                        onFiliereSelect={handleFiliereSelect}
                        onElementSelect={handleElementSelect}
                        filiereSelected={selectedFilieres}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'grey' }} onClick={handleClose}>Cancel</Button>
                    <Button type="submit" sx={{
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.secondary.dark,
                        color: 'white',
                        '&:hover': {
                            background: theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}>Update</Button>
                </DialogActions>
            </Dialog>

            {showSuccessMessage && (
                <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={() => setShowSuccessMessage(false)}>
                    <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
                        Lecturer updated successfully!
                    </Alert>
                </Snackbar>
            )}

            {showError && (
                <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
                    <Alert severity="error" onClose={() => setShowError(false)}>
                        {errorMessage || 'An unexpected error occurred. Please try again later.'}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default TableModPrf;

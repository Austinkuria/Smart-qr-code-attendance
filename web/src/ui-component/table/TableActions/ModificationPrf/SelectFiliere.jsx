/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../hooks/useFetch';

export default function SelectFiliereMultiple({ params, onFiliereSelect }) {
    const filieresArry = params.filieres.map(filiere => filiere.nomFiliere); // Extracting nomFiliere from each filiere object
    const [filieres, setFilieres] = useState(filieresArry); // Setting the initial state with filieresArry
    const [dataFiliere, setDataFiliere] = useState([]);
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleChange = (event) => {
        const selectedFiliereNames = event.target.value; // Changed from selectedFiliereName to selectedFiliereNames
        setFilieres(selectedFiliereNames); // Changed from setFiliere to setFilieres
        // Find the selected filiere objects
        const selectedFiliereIds = dataFiliere
            .filter(item => selectedFiliereNames.includes(item.nomFiliere))
            .map(item => item._id);
        // Pass the _ids of the selected filieres to the parent component
        onFiliereSelect(selectedFiliereIds);
    };

    const { data, isLoading, isError } = useFetch("filieres/getAll");

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }

        if (isError) {
            setError('Failed to load academic programs. Please try again later.');
            console.error('Error loading data:', isError);
        } else if (data) {
            setDataFiliere(data.filiereList);
        }
    }, [data, isLoading, isError]);

    return (
        <div style={{ width: '100%' }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-filiere-label">Academic Programs</InputLabel>
                <Select
                    labelId="select-filiere-label"
                    id="select-filiere"
                    value={filieres}
                    onChange={handleChange}
                    label="Filieres"
                    multiple // Enable multiple selection
                    name="academicProgram"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {dataFiliere.map((filiere) => (
                        <MenuItem value={filiere.nomFiliere} key={filiere._id} sx={{
                            backgroundColor: filieres.includes(filiere.nomFiliere) ? '#003366' : 'inherit',
                            color: filieres.includes(filiere.nomFiliere) ? '#6EC6FF' : 'inherit'
                        }}>
                            {filiere.nomFiliere}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading && <p>Loading academic programs...</p>} {/* Show loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
        </div>
    );
}

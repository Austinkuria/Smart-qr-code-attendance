/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../hooks/useFetch';

export default function SelectFiliereSingle({ params, onFiliereSelect }) {
    const [filiere, setFiliere] = useState(params?.filieres?.nomFiliere || ''); // Safe access with fallback
    const [dataFiliere, setDataFiliere] = useState([]);
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleChange = (event) => {
        const selectedFiliereName = event.target.value;
        setFiliere(selectedFiliereName);

        // Find the selected filiere object
        const selectedFiliere = dataFiliere.find(item => item.nomFiliere === selectedFiliereName);
        
        if (selectedFiliere) {
            console.log('Selected Filiere ID:', selectedFiliere._id);
            onFiliereSelect(selectedFiliere._id); // Passing _id to parent
        } else {
            setError('No filiere selected. Please select a valid program.');
            console.error('No filiere selected. Please select a valid program.');
        }
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
        <div style={{ width: '100%', maxWidth: 400 }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="select-single-filiere-label">Academic Program</InputLabel>
                <Select
                    labelId="select-single-filiere-label"
                    id="select-single-filiere"
                    value={filiere}
                    onChange={handleChange}
                    label="Filiere"
                    name="academicProgram"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {dataFiliere.map((filiere) => (
                        <MenuItem value={filiere.nomFiliere} key={filiere._id}>
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

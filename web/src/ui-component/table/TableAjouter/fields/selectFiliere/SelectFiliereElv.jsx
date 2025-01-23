import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../../hooks/useFetch';

export default function SelectFiliere({ onFiliereSelect }) {
  const [filiere, setFiliere] = useState('');
  const [dataFiliere, setDataFiliere] = useState([]);
  const [error, setError] = useState(null); // State to store any errors

  // Handle the change when a filiere is selected
  const handleChange = (event) => {
    const selectedFiliereName = event.target.value;
    setFiliere(selectedFiliereName);

    // Find the selected academic program object
    const selectedFiliere = dataFiliere.find((item) => item.nomFiliere === selectedFiliereName);

    if (selectedFiliere) {
      // Pass only the _id of the selected academic program to the parent component
      onFiliereSelect(selectedFiliere._id);
    } else {
      setError('An error occurred while selecting the Academic Program. Please try again.'); // Set error message
      console.error('Error selecting Academic Program:', selectedFiliereName); // Log error for debugging
    }
  };

  // Fetch the list of Academic Program from the server
  const { data } = useFetch('filieres/getAll');

  useEffect(() => {
    if (data) {
      setDataFiliere(data.filiereList); // Update filiere data when fetched
    } else {
      setError('Failed to load the list of Academic Programs. Please try again later.'); // Set error message if data is not available
    }
  }, [data]);

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message if it exists */}
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Select Academic Program</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filiere}
          onChange={handleChange}
          label="Select Academic Program"
        >
          {dataFiliere.length === 0 ? (
            <MenuItem disabled>No Academic Programs available</MenuItem> // Show a message if there are no academic programs available
          ) : (
            dataFiliere.map((filiere) => (
              <MenuItem value={filiere.nomFiliere} key={filiere._id}>
                {filiere.nomFiliere}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}

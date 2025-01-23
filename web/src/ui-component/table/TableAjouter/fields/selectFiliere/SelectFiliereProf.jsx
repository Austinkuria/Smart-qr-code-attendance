import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFetch } from '../../../../../hooks/useFetch';
import { Snackbar, Alert } from '@mui/material';

export default function SelectFiliere({ onFiliereSelect }) {
  const [filieres, setFilieres] = useState([]);
  const [dataFiliere, setDataFiliere] = useState([]);
  const [error, setError] = useState(null); // State to manage error
  const [showError, setShowError] = useState(false); // State to toggle the error message visibility

  const handleChange = (event) => {
    const selectedFiliereNames = event.target.value;
    setFilieres(selectedFiliereNames);

    // Find the selected filiere objects
    const selectedFiliereIds = dataFiliere.filter((item) => selectedFiliereNames.includes(item.nomFiliere)).map((item) => item._id);

    // Pass the _ids of the selected filieres to the parent component
    onFiliereSelect(selectedFiliereIds);
  };

  const { data, error: fetchError } = useFetch('filieres/getAll');

  useEffect(() => {
    if (data) {
      setDataFiliere(data.filiereList);
    }

    if (fetchError) {
      // Set error if fetch fails
      setError('Failed to load Academic Programs. Please try again later.');
      setShowError(true);
      console.error('Error fetching Academic Programs:', fetchError); // Log for debugging
    }
  }, [data, fetchError]);

  const handleCloseError = () => {
    setShowError(false); // Close the error message
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Academic Programs</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filieres}
          onChange={handleChange}
          label="Academic Programs"
          multiple // Enable multiple selection
          name="walid"
        >
          {dataFiliere.map((filiere) => (
            <MenuItem
              value={filiere.nomFiliere}
              key={filiere._id}
              sx={{
                backgroundColor: filieres.includes(filiere.nomFiliere) ? '#003366' : 'inherit',
                color: filieres.includes(filiere.nomFiliere) ? '#6EC6FF' : 'inherit'
              }}
            >
              {filiere.nomFiliere}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display error message if there was a problem fetching data */}
      {showError && (
        <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert severity="error" onClose={handleCloseError}>
            {error || 'An unexpected error occurred. Please try again later.'}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSemestre = ({ onSemestreSelect, filiereSelected }) => {
  const [selectedSemestre, setSelectedSemestre] = useState('');
  const [semestres, setSemestres] = useState([]);
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    const fetchSemestresForFiliere = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereSelected}`);
        if (!response.ok) {
          throw new Error('Failed to fetch semesters for the selected academic program.');
        }
        const data = await response.json();
        const filiereSemestres = data.filiereInstance.semestres;
        setSemestres(filiereSemestres);
      } catch (error) {
        setError(error.message); // Show the error to the user
        console.error('Error fetching semesters:', error); // Log to console for debugging
      }
    };

    fetchSemestresForFiliere();
  }, [filiereSelected]);

  const handleSemestreChange = (event) => {
    const semestreId = event.target.value;
    setSelectedSemestre(semestreId);
  };

  useEffect(() => {
    // Check if selectedSemester is not empty, then pass its value via onSemesterSelect
    if (selectedSemestre) {
      onSemestreSelect(selectedSemestre);
    }
  }, [selectedSemestre, onSemestreSelect]);

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show the error to the user */}
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id={`select-label-${filiereSelected}`}>Select Semester</InputLabel>
        <Select
          labelId={`select-label-${filiereSelected}`}
          id={`select-${filiereSelected}`}
          value={selectedSemestre}
          onChange={handleSemestreChange}
          input={<OutlinedInput id={`select-input-${filiereSelected}`} label="Select Semester" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250
              }
            }
          }}
        >
          {semestres.length === 0 ? (
            <MenuItem disabled>No semesters available</MenuItem> // No semesters available message
          ) : (
            semestres.map((semestre) => (
              <MenuItem key={semestre._id} value={semestre._id}>
                {semestre.nomSemestre}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSemestre;

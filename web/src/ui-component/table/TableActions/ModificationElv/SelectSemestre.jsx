import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSemestre = ({ params, onSemestreSelect, filiereSelected }) => {
  const [selectedSemestre, setSelectedSemestre] = useState(params?.semestre?.nomSemestre || '');
  const [semestres, setSemestres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!filiereSelected) return;

    const fetchSemestresForFiliere = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereSelected}`);
        if (!response.ok) throw new Error('Failed to fetch semesters.');
        const data = await response.json();
        const filiereSemestres = data.filiereInstance.semestres || [];
        setSemestres(filiereSemestres);
      } catch (err) {
        console.error('Error fetching semestres:', err);
        setError('Unable to fetch semesters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSemestresForFiliere();
  }, [filiereSelected]);

  const handleSemestreChange = (event) => {
    const semestreId = event.target.value;
    setSelectedSemestre(semestreId);
    onSemestreSelect(semestreId);
  };

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id={`select-label-${filiereSelected}`}>Semesters</InputLabel>
        <Select
          labelId={`select-label-${filiereSelected}`}
          id={`select-${filiereSelected}`}
          value={selectedSemestre}
          onChange={handleSemestreChange}
          input={<OutlinedInput id={`select-input-${filiereSelected}`} label="Semesters" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250
              }
            }
          }}
        >
          {loading && <MenuItem disabled>Loading...</MenuItem>}
          {error && <MenuItem disabled>{error}</MenuItem>}
          {!loading &&
            !error &&
            semestres.map((semestre) => (
              <MenuItem key={semestre._id} value={semestre._id}>
                {semestre.nomSemestre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSemestre;

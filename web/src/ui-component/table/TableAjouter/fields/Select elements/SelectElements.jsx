import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const SelectElements = ({ onElementSelect, filiereSelected }) => {
  const [selectedElements, setSelectedElements] = useState({});
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    // When selected elements change, call the parent function to update the elements
    const allSelectedElements = Object.values(selectedElements).flat();
    onElementSelect(allSelectedElements);
  }, [selectedElements, onElementSelect]);

  return (
    <div>
      {filiereSelected.map((filiereId) => (
        <div className="mt-1" key={filiereId}>
          <SelectElement
            filiereId={filiereId}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
            setError={setError} // Pass error setter to child component
          />
        </div>
      ))}
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show the error to the user */}
    </div>
  );
};

const SelectElement = ({ filiereId, selectedElements, setSelectedElements, setError }) => {
  const [libelle, setLibelle] = useState([]);
  const [elements, setElements] = useState([]);
  const [filNom, setFilNom] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  useEffect(() => {
    const fetchElementsForFiliere = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch units for the selected academic program.'); // API error
        }
        const data = await response.json();
        const filiereElements = data.filiereInstance.elements;
        setFilNom(data.filiereInstance.nomFiliere);
        setElements(filiereElements);
      } catch (error) {
        setError(error.message); // Show the error to the user
        console.error('Error fetching Units:', error); // Log to console for debugging
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchElementsForFiliere();
  }, [filiereId, setError]);

  const handleChange = (event) => {
    const selectedValues = event.target.value;
    setLibelle(selectedValues);

    // Extract IDs of selected elements
    const selectedElementIds = selectedValues.map((element) => element._id);

    // Update selected elements for the current Academic Program immutably
    setSelectedElements((prevSelectedElements) => ({
      ...prevSelectedElements,
      [filiereId]: selectedElementIds
    }));
  };

  if (isLoading) {
    return <div>Loading Units for {filNom}...</div>; // Loading indicator
  }

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel id={`select-label-${filiereId}`}>Units for {filNom}</InputLabel>
      <Select
        labelId={`select-label-${filiereId}`}
        id={`select-${filiereId}`}
        multiple
        value={libelle}
        onChange={handleChange}
        input={<OutlinedInput id={`select-input-${filiereId}`} label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value._id} label={value.libelleElement} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {elements.map((element) => (
          <MenuItem key={element._id} value={element}>
            {element.libelleElement}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectElements;

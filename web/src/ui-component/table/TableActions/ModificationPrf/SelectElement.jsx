/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

// Constants for menu height and padding
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let elementsF;

const SelectElements = ({ params, onElementSelect, filiereSelected }) => {
  const [selectedElements, setSelectedElements] = useState();
  const [elementsError, setElementsError] = useState('');

  useEffect(() => {
    onElementSelect(elementsF);
  }, [selectedElements, onElementSelect]);

  return (
    <div>
      {filiereSelected.map((filiere) => (
        <div className="mt-1" key={filiere}>
          <SelectElement
            params={params}
            filiereId={filiere}
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
            setElementsError={setElementsError} // Passing the error setter function
          />
          {elementsError && <p style={{ color: 'red' }}>{elementsError}</p>} {/* Show error message */}
        </div>
      ))}
    </div>
  );
};

const SelectElement = ({ filiereId, setSelectedElements, setElementsError }) => {
  const [libelle, setLibelle] = useState([]);
  const [elements, setElements] = useState([]);
  const [filNom, setFilNom] = useState([]);

  useEffect(() => {
    const fetchElementsForFiliere = async () => {
      try {
        const token = localStorage.getItem('TOKEN');
        const response = await fetch(`http://localhost:3001/api1/v1/filieres/getOnebyId/${filiereId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Academic Program data');
        }

        const data = await response.json();
        setFilNom(data.filiereInstance.nomFiliere);
        setElements(data.filiereInstance.elements);
      } catch (error) {
        console.error('Error fetching units:', error);
        setElementsError('Failed to load units. Please try again.');
      }
    };

    fetchElementsForFiliere();
  }, [filiereId, setElementsError]); // Adding setElementsError to dependency array

  const handleChange = (event) => {
    const selectedElements = event.target.value;
    setLibelle(selectedElements);
    console.log(selectedElements);
    
    // Extracting IDs of selected elements
    const selectedElementIds = selectedElements.map((element) => element._id);

    // Update selected elements for the current filiere
    setSelectedElements((prevSelectedElements) => {
      const updatedSelectedElements = { ...prevSelectedElements };

      updatedSelectedElements[filiereId] = selectedElementIds;
      elementsF = Object.values(updatedSelectedElements).flatMap((ids) => ids);

      setSelectedElements(Object.values(updatedSelectedElements).flatMap((ids) => ids));

      console.log(libelle);
      return updatedSelectedElements;
    });

    console.log(elementsF);
  };

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

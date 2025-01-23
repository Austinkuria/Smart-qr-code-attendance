import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectAdmissionCategory = ({ onAdmissionCategorySelect }) => {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    console.log(selectedCategory); // Log the selected category
    // Call the onAdmissionCategorySelect function with the selected category as argument
    onAdmissionCategorySelect(selectedCategory);
  };

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Admission Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}
          onChange={handleChange}
          label="Admission Category"
        >
          {/* Set unique values for each MenuItem */}
          <MenuItem value="KCSE">KCSE</MenuItem>
          <MenuItem value="Diploma Holders">Diploma Holders</MenuItem>
          <MenuItem value="Self-Sponsored (Private)">Self-Sponsored (Private)</MenuItem>
          <MenuItem value="Government-Sponsored">Government-Sponsored</MenuItem>
          <MenuItem value="Parallel Program">Parallel Program</MenuItem>
          <MenuItem value="Transfer Students">Transfer Students</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectAdmissionCategory;

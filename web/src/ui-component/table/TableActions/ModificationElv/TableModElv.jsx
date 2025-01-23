import React, { useState, useEffect, useRef } from 'react';
import Field from './Field';
import Button from '@mui/material/Button';
import { IconUserPlus } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const TableModElv = ({ params, openAjouter, setOpenAjouter }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('');
  const [studentData, setStudentData] = useState(null);
  const initialFormData = useRef(null); // Store initial form data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('TOKEN');
        const response = await axios.get(`http://localhost:3001/api1/v1/students/getStudent/${params.row.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const student = response.data.student;
        setStudentData(student);
        setFormData(student);
        initialFormData.current = student; // Store the fetched data as initial data
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [params]);

  const handleClose = () => {
    setOpenAjouter(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('TOKEN');
      const response = await axios.put(
        `http://localhost:3001/api1/v1/students/updateStudent/${params.row.id}`,
        {
          ...formData,
          filieres: selectedFiliere,
          admissionCategory: selectedCategory,
          semestre: selectedSemestre
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Object updated:', response.data);
      alert('Student updated successfully.');
      handleClose();
    } catch (error) {
      console.error('Error updating student:', error);
      alert('An error occurred while updating the student.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFiliereSelect = (filiere) => {
    setSelectedFiliere(filiere);
  };

  const handleAdmissionCategorySelect = (admissionCategory) => {
    setSelectedCategory(admissionCategory);
  };

  const handleSemestreSelect = (semestre) => {
    setSelectedSemestre(semestre);
  };

  const isFormModified = () => {
    if (!initialFormData.current) return false;

    // Check if formData, filiere, admissionCategory, or semestre has changed
    return (
      JSON.stringify(formData) !== JSON.stringify(initialFormData.current) ||
      selectedFiliere !== initialFormData.current.filieres?.nomFiliere ||
      selectedCategory !== initialFormData.current.admissionCategory ||
      selectedSemestre !== initialFormData.current.semestre?.nomSemestre
    );
  };

  return (
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
        Edit Student
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Fields marked with an asterisk (*) are required.</DialogContentText>
        <Field
          params={studentData}
          handleInputChange={handleInputChange}
          onFiliereSelect={handleFiliereSelect}
          onAdmissionCategorySelect={handleAdmissionCategorySelect}
          onSemestreSelect={handleSemestreSelect}
          filiereSelected={selectedFiliere}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'grey' }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isFormModified()}
          sx={{
            transition: 'all .2s ease-in-out',
            background: theme.palette.secondary.dark,
            color: 'white',
            '&:hover': {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light
            }
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableModElv;

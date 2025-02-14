/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus, IconFileTypeCsv } from '@tabler/icons-react';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

import noFile from '../../assets/images/icons/noFile.png';
import Loader from '../Loader';
import { columns } from './Data/columns';

import Ajouter from '../../ui-component/table/TableAjouter/ButtonAjouter/AjouterElv';
import axios from 'axios';

const TableCrudElv = () => {
  const [dataProfs, setDataProfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // For error feedback
  const [showError, setShowError] = useState(false); // Toggle error feedback

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api1/v1/students/getStudents');
      setDataProfs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to load data. Please try again later.');
      setShowError(true);
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api1/v1/students/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
          fetchData(); // Refresh data after successful file import
        }, 2000);

        console.log('File imported successfully');
      } else {
        const errorText = await response.text();
        console.error('Failed to import file:', errorText);
        setErrorMessage('Failed to import file. Please ensure it is a valid CSV file.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error importing file:', error);
      setErrorMessage('An unexpected error occurred while importing the file.');
      setShowError(true);
    }
  };

  const addStudentToTable = (newStudent) => {
    setDataProfs((prevData) => [...prevData, newStudent]);
    fetchData();
  };

  const rows = dataProfs.map((elv, index) => ({
    id: elv._id || index,
    col1: elv.cne,
    col2: elv.nom,
    col3: elv.prenom,
  }));

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <Grid item xs={12} sm={1}>
          <label htmlFor="file-input">
            <Button
              fullWidth
              component="span"
              variant="contained"
              color="primary"
              endIcon={<IconFileTypeCsv />}
            >
              Import
            </Button>
          </label>
          <input
            id="file-input"
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Grid>
      </GridToolbarContainer>
    );
  }

  const CustomNoRowsOverlay = () => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    };
    const imgStyle = {
      width: '50px',
      height: '50px',
    };

    return (
      <div style={containerStyle}>
        <img src={noFile} alt="No data available" style={imgStyle} />
        <div>No data available</div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showSuccessMessage && (
            <Snackbar
              open={showSuccessMessage}
              autoHideDuration={2000}
              onClose={() => setShowSuccessMessage(false)}
            >
              <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
                File imported successfully!
              </Alert>
            </Snackbar>
          )}
          {showError && (
            <Snackbar
              open={showError}
              autoHideDuration={4000}
              onClose={() => setShowError(false)}
            >
              <Alert severity="error" onClose={() => setShowError(false)}>
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
          <DataGrid
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              backgroundColor: 'white',
            }}
            rows={rows}
            columns={columns}
            checkboxSelection
            density="comfortable"
            slotProps={{ pagination: { labelRowsPerPage: 'Rows per page' } }}
            slots={{
              toolbar: CustomToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          <Ajouter addStudentToTable={addStudentToTable} />
        </>
      )}
    </>
  );
};

export default TableCrudElv;

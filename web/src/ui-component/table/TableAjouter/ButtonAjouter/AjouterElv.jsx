/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

//**********************import react*************************//
import { useState } from 'react';

//**********************import mui*************************//
import { Button, Box, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconUserPlus, IconFileTypeCsv } from '@tabler/icons-react'; // Assuming you have an icon for CSV file
import { useTheme } from '@mui/material/styles';

//**********************import project*************************//
import TableAjouterElv from '../TableAjouterElv';

const AjouterElv = ({ addStudentToTable }) => {
  const theme = useTheme();
  const [openAjouter, setOpenAjouter] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleClickOpen = () => {
    setOpenAjouter(true);
  };

  // Example for adding an error message if something goes wrong (can be triggered based on certain conditions)
  const handleError = (message) => {
    setErrorMessage(message);
    setShowError(true);
    console.error(message); // Console log for debugging purposes
  };

  return (
    <Box textAlign="center" marginTop="18px">
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
          >
            Add a Student
          </Button>
        </Grid>
      </Grid>

      <TableAjouterElv
        openAjouter={openAjouter}
        setOpenAjouter={setOpenAjouter}
        addStudentToTable={addStudentToTable}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={2000}
          onClose={() => setShowSuccessMessage(false)}
        >
          <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
            Addition successful!
          </Alert>
        </Snackbar>
      )}

      {/* Error Message */}
      {showError && (
        <Snackbar
          open={showError}
          autoHideDuration={4000}
          onClose={() => setShowError(false)}
        >
          <Alert severity="error" onClose={() => setShowError(false)}>
            {errorMessage || 'An error occurred. Please try again later.'}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AjouterElv;

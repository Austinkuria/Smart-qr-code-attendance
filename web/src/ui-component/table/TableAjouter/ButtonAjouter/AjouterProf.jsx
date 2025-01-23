import { useState } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { IconUserPlus } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import TableAjouterProf from '../TableAjouterProf';

const AjouterProf = ({ addProfToTable }) => {
  const theme = useTheme();
  const [openAjouter, setOpenAjouter] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleClickOpen = () => {
    setOpenAjouter(true);
  };

  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

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
                color: theme.palette.secondary.light
              }
            }}
          >
            Add Lecturer
          </Button>
        </Grid>
      </Grid>

      <TableAjouterProf
        openAjouter={openAjouter}
        setOpenAjouter={setOpenAjouter}
        addProfToTable={addProfToTable}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={() => setShowSuccessMessage(false)}>
          <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
            Lecturer added successfully!
          </Alert>
        </Snackbar>
      )}

      {/* Error Message */}
      {showError && (
        <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
          <Alert severity="error" onClose={() => setShowError(false)}>
            {errorMessage || 'An error occurred. Please try again later.'}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AjouterProf;

/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SelectFiliere from './SelectFiliere';
import Box from '@mui/material/Box';
import SelectElements from './SelectElement';


const Field = ({ params, handleInputChange, onFiliereSelect,onElementSelect, filiereSelected }) => {
  // Accepting props
  const [nom, setNom] = useState(params.nom);
  const [prenom, setPrenom] = useState(params.prenom);
  const [email, setEmail] = useState(params.email);
  const [cin, setCin] = useState(params.cin);
  const [cne, setCne] = useState(params.cne);
  const [telephone, setTelephone] = useState(params.telephone);
  const [dateNaissance, setDateNaissance] = useState(params.dateDeNaissance);
  const [lieuNaissance, setLieuNaissance] = useState(params.lieuDeNaissance);
  const [adresse, setAdresse] = useState(params.adresse);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [focused, setFocused] = useState(false);
  const [cinError, setCinError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [cneError, setCneError] = useState('');

  // Handle Name change
  const handleNomChange = (event) => {
    const value = event.target.value;
    setNom(value);
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)) {
      setNameError('First Name must contain only letters.');
    } else if (value.length < 3) {
      setNameError('First Name must contain at least 3 characters.');
    } else {
      setNameError('');
    }
    handleInputChange(event);
  };

  // Handle Prenom change
  const handlePrenomChange = (event) => {
    const value = event.target.value;
    setPrenom(value);
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)) {
      setPrenomError('Last Name must contain only letters.');
    } else if (value.length < 3) {
      setPrenomError('Last Name must contain at least 3 characters.');
    } else {
      setPrenomError('');
    }
    handleInputChange(event);
  };

  // Handle Email change
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const regex = /^[^\s@]+@[^\s@]+\.(gmail\.com|yahoo\.com)$/i; // Validating for Gmail.com and Yahoo.com domains
    if (!regex.test(value)) {
      setEmailError('Invalid email address or unsupported domain.');
    } else {
      setEmailError('');
    }
    handleInputChange(event);
  };

  // Handle CIN change (ID No)
  const handleCinChange = (event) => {
    const value = event.target.value;
    setCin(value);
    const regex = /^[0-9]*$/; // Only allow numeric characters
    if (!regex.test(value)) {
      setCinError('ID number must contain only numeric characters.');
    } else {
      setCinError('');
    }
    handleInputChange(event);
  };

  // Handle CNE change (Registration Number)
  const handleCneChange = (event) => {
    const value = event.target.value;
    setCne(value);
    const regex = /^[a-zA-Z0-9]*$/; // Allow alphanumeric characters
    if (!regex.test(value)) {
      setCneError('Registration number must contain only alphanumeric characters.');
    } else {
      setCneError('');
    }
    handleInputChange(event);
  };

  // Handle Telephone change
  const handleTelephoneChange = (event) => {
    const value = event.target.value;
    setTelephone(value);
    const regex = /^(\+)?\d{1,15}$/; // Allow numeric characters, optional "+" sign, and up to 15 digits
    if (!regex.test(value)) {
      setTelephoneError('Telephone number must contain only digits and be up to 15 digits long.');
    } else {
      setTelephoneError('');
    }
    handleInputChange(event);
  };

  // Handle Date of Birth change
  const handleDateNaissanceChange = (event) => {
    setDateNaissance(event.target.value);
    handleInputChange(event);
  };

  // Handle Place of Birth change
  const handleLieuNaissanceChange = (event) => {
    setLieuNaissance(event.target.value);
    handleInputChange(event);
  };

  // Handle Address change
  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
    handleInputChange(event);
  };

  // Handle Focus on the fields
  const handleFocus = () => {
    setFocused(true);
  };

  // Handle Blur on the fields (after focus is lost)
  const handleBlur = () => {
    setFocused(false);
    setNameError('');
    setEmailError('');
    setCinError('');
    setTelephoneError('');
    setPrenomError('');
    setCneError('');
  };

  return (
    <>
      <TextField
        autoFocus
        required
        margin="dense"
        id="nom"
        name="nom"
        label="First Name"
        fullWidth
        variant="standard"
        value={nom}
        onChange={handleNomChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!nameError}
        helperText={nameError}
      />

      <TextField
        required
        margin="dense"
        id="prenom"
        name="prenom"
        label="Last Name"
        fullWidth
        variant="standard"
        value={prenom}
        onChange={handlePrenomChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!prenomError}
        helperText={prenomError}
      />

      <TextField
        required
        margin="dense"
        id="email"
        name="email"
        label="Email"
        fullWidth
        type="email"
        variant="standard"
        value={email}
        onChange={handleEmailChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!emailError && focused}
        helperText={emailError && focused ? emailError : ''}
      />

      <TextField
        required
        margin="dense"
        id="cin"
        name="cin"
        label="ID No"
        fullWidth
        variant="standard"
        value={cin}
        onChange={handleCinChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!cinError && focused}
        helperText={cinError && focused ? cinError : ''}
      />

      <TextField
        required
        margin="dense"
        id="cne"
        name="cne"
        label="Registration Number"
        fullWidth
        variant="standard"
        value={cne}
        onChange={handleCneChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!cneError && focused}
        helperText={cneError && focused ? cneError : ''}
      />

      <TextField
        margin="dense"
        id="telephone"
        name="telephone"
        label="Telephone"
        fullWidth
        variant="standard"
        value={telephone}
        onChange={handleTelephoneChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!telephoneError && focused}
        helperText={telephoneError && focused ? telephoneError : ''}
      />

      <TextField
        margin="dense"
        id="dateNaissance"
        name="dateNaissance"
        label="Date of Birth"
        fullWidth
        type="date"
        variant="standard"
        value={dateNaissance}
        onChange={handleDateNaissanceChange}
      />

      <TextField
        margin="dense"
        id="lieuNaissance"
        name="lieuNaissance"
        label="Place of Birth"
        fullWidth
        variant="standard"
        value={lieuNaissance}
        onChange={handleLieuNaissanceChange}
      />

      <TextField
        margin="dense"
        id="adresse"
        name="address"
        label="Address"
        fullWidth
        variant="standard"
        value={adresse}
        onChange={handleAdresseChange}
      />

      <br />
      <br />
      <h4 style={{ color:'grey' }}> <em>(Optionel)</em></h4>
  
      <Box component="section" sx={{ paddingBottom: "1px" }}>
          <SelectFiliere params={params} onFiliereSelect={onFiliereSelect} />
                
      </Box>
      <Box component="section" sx={{ paddingBottom: "1px" }}>
          <SelectElements params={params} onElementSelect={onElementSelect} filiereSelected={filiereSelected} />
        </Box>

    </>
  );
};

export default Field;

/* eslint-disable prettier/prettier */
//* import react //
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";

//* import project //
import MainLayout from './layout/MainLayout/index';
import NavigationScroll from 'layout/NavigationScroll';
import themes from 'themes';
import Dashboard from './views/dashboard/Default/index';
import Enseignants from './views/Enseignants/Enseignants';
import ProfilProfesseur from './views/Enseignants/ProfilProfesseur';
import ContactAdministration from './views/Contact-Administration/index';
import Prepa from './views/Formations/2AP/Prepa';
import Ccn from './views/Formations/Cycle-Ing/ccn';
import Iite from './views/Formations/Cycle-Ing/iite';
import Gc from './views/Formations/Cycle-Ing/gc';
import Gi from './views/Formations/Cycle-Ing/gi';
import Isic from './views/Formations/Cycle-Ing/isic';
import Gee from './views/Formations/Cycle-Ing/gee';
import About from './views/About/About';
import Eleves from './views/Eleves/Eleves';
import UpdatePassword from 'views/Authentification/updatePassword/UpdatePassword';
import ProfileUser from 'views/Profil/ProfileUser';
import Element from 'views/Semestres/Elements/Elements';
import QrPage from 'views/ListeAbs/QRPAGE/QrPage';


//* import material ui //
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Emploi from 'views/Semestres/Emploi/EmploiDutemps';
import Home from './views/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'icofont/dist/icofont.min.css';
import LayoutProf from 'layout/LayoutProf';
import SeancesToday from 'views/SeancesToday/SeancesToday';
import SignInSignUpForm from 'views/Authentification/SignInSignUpForm';
import ProfilEleve from 'views/Eleves/ProfilEleve';

const token = localStorage.getItem('TOKEN');
const userRole = localStorage.getItem('USER_ROLE');
const userId = localStorage.getItem('USER_ID');
const isFirstLogin = localStorage.getItem('ISFIRST');

const isAuthenticated = token && userRole && userId;
const isAdmin = userRole === 'admin';
const isProf = userRole === 'Professeurs';

// ==============================|| APP ||============================== //
const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes>
            {/* Only show the update-password route if it's the user's first login */}
            {isFirstLogin && (
              <Route path="/update-password/:nom" element={<UpdatePassword />} />
            )}

            {/* If not authenticated, show login page */}
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignInSignUpForm />} />
              </>
            ) : null}

            {/* If user is a professor */}
            {isProf && isAuthenticated && (
              <>
                <Route path="/seances" element={<LayoutProf />}>
                  <Route index element={<SeancesToday />} />
                </Route>
                <Route path="/scan/:id" element={<QrPage />} />
                <Route path="/profile/:id" element={<ProfileUser />} />
              </>
            )}

            {/* If user is an admin */}
            {isAdmin && isAuthenticated && (
              <Route path="/admin" element={<MainLayout />}>
                <Route path="profile/:id" element={<ProfileUser />} />
                <Route path="liste-éleves" element={<Eleves />} />
                <Route path="Enseignants" element={<Enseignants />} />
                <Route path="Enseignants/:id" element={<ProfilProfesseur />} />
                <Route path="Elèves/:id" element={<ProfilEleve />} />
                <Route path="Contact" element={<ContactAdministration />} />
                <Route index element={<Dashboard />} />
                <Route path="About" element={<About />} />
                <Route path="Formations/2AP/:id" element={<Prepa />} />
                <Route path="Formations/2AP/:id/:idSemestre" element={<Emploi />} />
                <Route path="Formations/2AP/:id/elements/:idSemestre" element={<Element />} />
                {/* Other Formation routes */}
              </Route>
            )}
          </Routes>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

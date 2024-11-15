import { Route, Routes} from 'react-router-dom';

import MainLayout from './pages/MainLayout';
import Biblioteca from './pages/Biblioteca';
import AudioLibroReproductor from './pages/AudiolibroRepro';
import Publicar from './pages/Publicar';
import PanelAdmin from "./pages/PanelAdmin";
import Actualizar from "./pages/Actualizar";
import InicioSesion from './pages/InicioSesion';
import Registro from './components/ModalRegistro';
import TasksPage from './pages/Taskpage';
import HeroSection from './pages/HeroSection';
import Preview from './pages/Preview';
import Reproductor from './pages/Reproductor';
import SearchResults from './components/SearchResults';
import { AuthProvider } from './context/authContext';
import { ProtectedRoutes } from './context/ProtectedRoutes';
import Reseña from './components/reseña';

function App() {

    return (
       <Reseña/>
    );
}
export default App;

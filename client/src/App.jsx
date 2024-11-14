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


function App() {

    return (
        <AuthProvider>
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            {/* <Route path="/registro" element={<Registro/>}/> */}
            <Route path="/libros" element={<ProtectedRoutes><MainLayout><Biblioteca /></MainLayout></ProtectedRoutes>} />
            <Route path="/reproductor/:id" element={<AudioLibroReproductor />} />
            <Route path="/escuchar/:id" element={<MainLayout><Reproductor /></MainLayout>} />
            <Route path="/panelAdmin" element={<MainLayout><PanelAdmin /></MainLayout>} />
            <Route path="/publicar" element={<MainLayout><Publicar /></MainLayout>} />
            <Route path="/actualizar/:id" element={<MainLayout><Actualizar /></MainLayout>} />
            
            <Route path="/taskpage" element={<TasksPage />} />
            <Route path="/preview/:id" element={<MainLayout><Preview /></MainLayout>} />

            <Route path="/buscar" element={<MainLayout><SearchResults/></MainLayout> } />
        </Routes>
        </AuthProvider>
    );
}
export default App;

import { Route, Routes } from 'react-router-dom';

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
                
                {/* MainLayout envuelve las rutas protegidas */}
                <Route element={<MainLayout />}>
                    <Route path="/libros" element={<ProtectedRoutes><Biblioteca /></ProtectedRoutes>} />
                    <Route path="/reproductor/:id" element={<AudioLibroReproductor />} />
                    <Route path="/escuchar/:id" element={<Reproductor />} />
                    <Route path="/panelAdmin" element={<PanelAdmin />} />
                    <Route path="/publicar" element={<Publicar />} />
                    <Route path="/actualizar/:id" element={<Actualizar />} />
                    <Route path="/taskpage" element={<TasksPage />} />
                    <Route path="/preview/:id" element={<Preview />} />
                    <Route path="/buscar" element={<SearchResults />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;

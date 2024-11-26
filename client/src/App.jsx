import { Route, Routes } from 'react-router-dom';

import MainLayout from './pages/MainLayout';
import Inicio from './pages/Inicio';
import AudioLibroReproductor from './pages/AudiolibroRepro';
import Publicar from './pages/Publicar';
import PanelAdmin from "./pages/PanelAdmin";
import Biblioteca from "./pages/Biblioteca";
import Actualizar from "./pages/Actualizar";
import TasksPage from './pages/Taskpage';
import HeroSection from './pages/HeroSection';
import Preview from './pages/Preview';
import Reproductor from './pages/Reproductor';
import SearchResults from './components/search/SearchResults';
import Explorar from './pages/Explorar';
import Categorias from './pages/Categorias';
import Reseña from './pages/Reseña';
import EditarPerfil from './pages/EditarPerfil';
import RecuperarPassword from './pages/RecuperarPassword'
import VerificarEmail from './components/VerificarEmail';
import PerfilUser from './pages/PerfilUser';
import TodoBiblioteca from './pages/TodoBiblioteca';
import Login from './pages/Login';
import SobreNosotros from './pages/Sobrenosotros';
import Contactanos from './pages/Contactanos';

import { AuthProvider } from './context/authContext';
import { ProtectedRoutes } from './context/ProtectedRoutes';
import { LibraryProvider } from './context/libraryContext';

 
function App() {
    return (
        <AuthProvider>
            <LibraryProvider>
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sobrenosotros" element={<SobreNosotros />} />
                    <Route path="/contactanos" element={<Contactanos />} />
                    {/* MainLayout envuelve las rutas protegidas */}
                    <Route element={<MainLayout />}>

                        <Route path="/inicio" element={<ProtectedRoutes><Inicio /></ProtectedRoutes>} />
                        <Route path="/biblioteca" element={<ProtectedRoutes><Biblioteca /></ProtectedRoutes>} />
                        <Route path="/reproductor/:id" element={<ProtectedRoutes><AudioLibroReproductor /></ProtectedRoutes>} />
                        <Route path="/escuchar/:id" element={<ProtectedRoutes><Reproductor /></ProtectedRoutes>} />
                        <Route path="/panelAdmin" element={<ProtectedRoutes><PanelAdmin /></ProtectedRoutes>} />
                        <Route path="/publicar" element={<ProtectedRoutes><Publicar /></ProtectedRoutes>} />
                        <Route path="/actualizar/:id" element={<ProtectedRoutes><Actualizar /></ProtectedRoutes>} />
                        <Route path="/taskpage" element={<ProtectedRoutes><TasksPage /></ProtectedRoutes>} />
                        <Route path="/preview/:id" element={<ProtectedRoutes><Preview /></ProtectedRoutes>} />
                        <Route path="/buscar" element={<ProtectedRoutes><SearchResults /></ProtectedRoutes>} />
                        <Route path="/explorar" element={<ProtectedRoutes><Explorar /></ProtectedRoutes>} />
                        <Route path="/explorar/categorias/:id" element={<ProtectedRoutes><Categorias /></ProtectedRoutes>} />
                        <Route path="/perfil" element={<ProtectedRoutes><PerfilUser /></ProtectedRoutes>} />
                        <Route path="/perfil/:userId" element={<ProtectedRoutes><PerfilUser /></ProtectedRoutes>} />
                        <Route path="/perfil/editar_perfil" element={<ProtectedRoutes><EditarPerfil /></ProtectedRoutes>} />
                        <Route path="/biblioteca/libros" element={<ProtectedRoutes><TodoBiblioteca /></ProtectedRoutes>} />

                    </Route><Route path="/resenia/:id" element={<ProtectedRoutes><Reseña /></ProtectedRoutes>} />
                    <Route path="/verificar" element={<VerificarEmail />} />
                    <Route path="/recuperar" element={<RecuperarPassword />} />
                </Routes>
            </LibraryProvider>
        </AuthProvider>
    );
}

export default App;

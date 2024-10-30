import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import supabase from './utils/supabase';

import MainLayout from './pages/MainLayout';
import Biblioteca from '../src/pages/Biblioteca';
import AudioLibroReproductor from './pages/AudiolibroRepro';
import Publicar from './pages/Publicar';
import PanelAdmin from "./pages/PanelAdmin";
import Actualizar from "./pages/Actualizar";
import InicioSesion from './pages/InicioSesion';
import TasksPage from './pages/Taskpage';
import HeroSection from './pages/HeroSection';
import Preview from './pages/Preview';
import ChapterText from './components/ChapterText';
import Reproductor from './pages/Reproductor';
import ResultsPage from './pages/ResultsPage';


function App() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                navigate('/')
            } else {
                navigate('/libros')
            }
        })
    }, [])
    return (
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/libros" element={<MainLayout><Biblioteca /></MainLayout>} />
            <Route path="/reproductor/:id" element={<AudioLibroReproductor />} />
            <Route path="/texto/:id" element={<ChapterText />} />
            <Route path="/escuchar/:id" element={<Reproductor />} />
            <Route path="/panelAdmin" element={<MainLayout><PanelAdmin /></MainLayout>} />
            <Route path="/publicar" element={<MainLayout><Publicar /></MainLayout>} />
            <Route path="/actualizar/:id" element={<MainLayout><Actualizar /></MainLayout>} />
            <Route > element Protected</Route>
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/taskpage" element={<TasksPage />} />
            <Route path="/preview/:id" element={<MainLayout><Preview /></MainLayout>} />

            <Route path="/buscar" element={<MainLayout><ResultsPage /></MainLayout>} />
        </Routes>
    );
}
export default App;

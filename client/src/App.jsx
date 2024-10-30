import { Route, Routes } from 'react-router-dom';
import Biblioteca from '../src/pages/Biblioteca';
import Reproductor from '../src/pages/Reproductor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Publicar from './pages/Publicar';
import DropdownMenu from './components/DropdownMenu';
import { RouteProvider } from './context/RouteContext';
import TasksPage from './pages/Taskpage';
import Preview from './components/Preview';

function App() {
    return (
        <RouteProvider>
        <div className="flex min-h-screen bg-[#F0F9F9]">
            <DropdownMenu />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-grow p-4 bg-[#F0F9F9]">
                    <Routes>
                        <Route path="/" element={<Biblioteca />} />
                        <Route path="/reproductor/:id" element={<Reproductor />} />
                        <Route path="/publicar" element={<Publicar />} />
                        <Route path="/taskpage" element={<TasksPage />} />
                        <Route path="/preview/:id" element={<Preview />} />
                    </Routes>
                </div>
                {<Footer />}
            </div>
        </div>
    </RouteProvider>

    );
}

export default App;

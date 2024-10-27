import { Route, Routes } from 'react-router-dom';
import Biblioteca from '../src/pages/Biblioteca';
import Reproductor from '../src/pages/Reproductor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Publicar from './pages/Publicar';
import DropdownMenu from './components/DropdownMenu';
import { RouteProvider } from './context/RouteContext';
import HeroSection from './components/HeroSection';
function App() {
    return (
        <div>
      <HeroSection />
       </div>

    );
}

export default App;

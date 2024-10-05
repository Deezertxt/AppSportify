import {Route, Routes} from  'react-router-dom';
import TaskPage from "./pages/Taskpage";
import Reproductor from "./pages/Reproductor.jsx";
import Biblioteca from "./pages/Biblioteca.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<TaskPage/>}/>
                <Route path="/reproductor" element={<Reproductor/>}/>
                <Route path="/biblioteca" element={<Biblioteca/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>
    )
    }
    export default App
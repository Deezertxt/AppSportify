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
       <Preview 
       
         id="1"
         coverImage="https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fddd.webp?alt=media&token=0c9bd3e5-3da9-4fc6-8c3b-5ec97791d6c4"
         title="los muertos"
         author="ricardo milos"
         duration="15 min"
         description=  "todos van a morir eceptop yo dylan estas muerto a cagar piedras  sadaslñdñasklñ lñasñl dakñklasladssadlñadslññld sañldaslñklñkdasñkldsañlklñkdasñlkdsal kñlñkdasñlkadñslkñlkdsañlkdkñasllñkdaskñldsaklñ ñalkdsañlskdñlasdkñlkasdkñldsañladskñlkdasñlaskda hola madrir"
       />
       


       
    );
}

export default App;

import {Route, Routes} from  'react-router-dom';
import TaskPage from "./pages/Taskpage";

function App() {
    return(
        <Routes>
            <Route path="/" element={<TaskPage/>}/>
        </Routes>
    )
    }
    export default App
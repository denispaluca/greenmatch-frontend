import { Routes, Route } from "react-router-dom";
import PowerPlantSettings from "./pages/PowerPlantSettings";
import { Layout } from './components';
import { 
    Dashboard, 
    UserSettings, 
    Login, 
    Conclusion
} from './pages';

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="powerplant/:id/edit" element={<PowerPlantSettings />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="conclusion" element={<Conclusion />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default App;

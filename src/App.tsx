import { Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import UserSettings from "./pages/UserSettings";
import PowerPlantSettings from "./pages/PowerPlantSettings";

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="powerplant/:id/edit" element={<PowerPlantSettings />} />
                <Route path="login" element={<Login />} />
                <Route path="user-settings" element={<UserSettings />} />
            </Route>
        </Routes>
    )
}

export default App;
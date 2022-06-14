import { Routes, Route } from "react-router-dom";
import ConsumerDashboard from "./pages/ConsumerDashboard/ConsumerDashboard";

import { Layout } from './components';
import { 
    Dashboard, 
    UserSettings, 
    Login, 
    Conclusion,
    PowerPlantSettings
} from './pages';

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="powerplant/:id/edit" element={<PowerPlantSettings />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="deals" element={<ConsumerDashboard />} />
                <Route path="conclusion" element={<Conclusion />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default App;

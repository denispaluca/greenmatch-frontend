import { Routes, Route } from "react-router-dom";
import { Conclusion } from "./pages/Conclusion/Conclusion";
import { Layout } from './components';
import { Dashboard, UserSettings, Login } from './pages';

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="conclusion" element={<Conclusion />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default App;

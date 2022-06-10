import { Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { Conclusion } from "./pages/Conclusion/Conclusion";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import UserSettings from "./pages/UserSettings";

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="conclusion" element={<Conclusion />} />
            </Route>
        </Routes>
    )
}

export default App;
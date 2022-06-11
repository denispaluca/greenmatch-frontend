import { Routes, Route } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import UserSettings from "./pages/UserSettings";
import ConsumerDashboard from "./pages/ConsumerDashboard";

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="deals" element={<ConsumerDashboard />} />
            </Route>
        </Routes>
    )
}

export default App;
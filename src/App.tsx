import { Routes, Route } from "react-router-dom";
import { Layout } from './components';
import { Dashboard, UserSettings, Login } from './pages';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { count: 0 };
const { useGlobalState } = createGlobalState(initialState);

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="user-settings" element={<UserSettings />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default App;

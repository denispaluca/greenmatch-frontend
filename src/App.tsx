import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Dashboard,
  UserSettings,
  Login,
  Conclusion,
  PowerPlantSettings,
  ConsumerDasboard,
  Landing,
  PPAOverView,
  Payment,
} from './pages';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
          path="powerplant/:id/edit"
          element={<PowerPlantSettings />}
        />
        <Route
          path="user-settings"
          element={<UserSettings />}
        />
        <Route
          path="offers"
          element={<ConsumerDasboard />}
        />
        <Route
          path="offers/:id"
          element={<Conclusion />}
        />
        <Route
          path="landing"
          element={<Landing />}
        />
        <Route
          path="ppa-overview/:id"
          element={<PPAOverView />}
        />
      </Route>
      <Route
        path="login"
        element={<Login />}
      />
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Dashboard,
  UserSettings,
  Login,
  Conclusion,
  PowerPlantSettings,
  ConsumerDashboard,
  Landing,
  PPAOverView,
  SupplierRegistration,
} from './pages';

export function App() {
  return (

    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="powerplants"
          element={<Dashboard />}
        />
        <Route
          path="powerplants/:id/edit"
          element={<PowerPlantSettings />}
        />
        <Route
          path="user-settings"
          element={<UserSettings />}
        />
        <Route
          path="offers"
          element={<ConsumerDashboard />}
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
      <Route
        path="register"
        element={<SupplierRegistration />}
      />
    </Routes>

  );
}

export default App;

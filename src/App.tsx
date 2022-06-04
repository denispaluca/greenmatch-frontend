import {Route, Routes} from "react-router-dom";
import {Layout} from "./components";
import Dashboard from "./Dashboard";

export function App(){
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Dashboard/>} />
        <Route 
          path="/user-settings" 
          element={<div>Add a page here</div>}
        />
      </Route>
      </Routes>
  );
}

export default App;

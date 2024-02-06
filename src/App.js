import Showdata from "./components/Showdata";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Showdata/>
      <Outlet/>
    </>
  );
}

export default App;

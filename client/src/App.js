import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import './App.css';
import SignIn from "./components/SignIn";

function App() {

  const token = null;

  /*  if (!token) {
     return (
       <div className="App">
         <SignIn />
       </div>
     )
   } */

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App; 

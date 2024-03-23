import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from './components/Main';
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./components/NotFound";
import Project from "./components/Project";
import Layout from "./components/Layout";

const App = () => {

  const [token, setToken] = React.useState(localStorage.getItem('token') || null);

  function isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  React.useEffect(() => {
    // Überprüfen, ob im Local Storage ein Token vorhanden ist
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
      localStorage.removeItem('token')
    }

  }, [token]);



  return (

    <Routes>

      <Route path="login" element={<SignIn />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Layout />} >

        <Route element={<RequireAuth />}>
          <Route path="" element={<Main />} />
          <Route path="project/:id" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Route>

    </Routes>


  );
};


export default App;

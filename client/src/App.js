import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main';
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./components/NotFound";
import Project from "./components/Project";
import Layout from "./components/Layout";
import { AuthProvider } from './context/AuthProvider';
import PublicLayout from "./components/PublicLayout";

const App = () => {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Layout />} >

              <Route element={<RequireAuth />}>
                <Route path="/" element={<Main />} />
                <Route path="project/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Route>

            </Route>

            <Route path="/" element={<PublicLayout />}>
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<Register />} />

            </Route>

          </Routes>
        </AuthProvider>
      </Router>
    </div>

  );
};


export default App;

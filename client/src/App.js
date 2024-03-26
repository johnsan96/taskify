import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Layout from "./components/Layout";
import { AuthProvider } from './context/AuthProvider';
import PublicLayout from "./components/PublicLayout";
import Profile from "./pages/Profile";
import People from "./pages/People";

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
                <Route path="profile" element={<Profile />} />
                <Route path="people" element={<People />} />
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

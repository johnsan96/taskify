import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function SignIn() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const axiosInstance = axios.create({ timeout: 2000, baseURL: "http://localhost:5000", withCredentials: false })
    /*  const axiosTestInstance = axios.create({ timeout: 2000, baseURL: "https://jsonplaceholder.typicode.com", withCredentials: true }) */

    const register = async () => {
        try {
            const response = await axiosInstance.post("/users", {
                vorname: usernameReg,
                nachname: "ziza",
                email: "ziza@email",
                telefon: "123123",
                password: "lksdfldskf",
            }, {
              /*   headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5000',
                }, */
            });
            console.log(response);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    };


    const login = () => {
        axiosInstance.post("/login", {
            vorname: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].vorname);
            }
        });
    };

    /*   const testPost = () => {
  
          const postData = {
              userId: 1,
              id: 1,
              title: "ur maman",
              body: "klsdfsfk"
          };
  
          axiosTestInstance.post('/posts', postData)
              .then((response) => {
                  console.log('Erfolgreich gesendet:', response.data);
              })
              .catch((error) => {
                  console.error('Fehler beim Senden der Anfrage:', error);
              });
  
      } */

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button onClick={register}> Register </button>
            </div>

            <div className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login}> Login </button>
            </div>

            {/*      <button onClick={testPost}> test </button> */}

            <h1>{loginStatus}</h1>
        </div>
    );
}
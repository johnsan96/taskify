import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Register() {


    return (
        <div className="main">
            <h1>Register</h1>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;

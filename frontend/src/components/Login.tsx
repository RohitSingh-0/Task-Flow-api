import "./Login.css";
import type { FormEvent } from "react";
import { api } from "../API";
import React, { useState } from "react";

export function Login() {
    const [isPasswordVisible, passwordVisible] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        if (typeof password === "string" && typeof email === "string") {
            const body = {
                email,
                password,
            };
            const response = await api.post("/users/login", body);
            const token = response.data.userLoggedIn;
            localStorage.setItem("token", token);
            console.log(response.data);
        }
    }

    return (
        <div id="loginPage">
            <div className="loginSection" id="leftMainDiv">
                <div className="loginCard center" id="leftChildBox">
                    <div>
                        <h1 id="loginHere">Login Here</h1>
                        <h2 id="journey">
                            Start your journey <br></br> now with us
                        </h2>
                    </div>
                </div>
            </div>
            <div className="loginSection" id="rightMainDiv">
                <div className="loginCard" id="loginCardRight">
                    <div id="signIn">
                        <span className="blueColor logoT center">T</span>
                        <h2 id="welcomeBack">Welcome Back</h2>
                        <p id="signInToTask">sign in to your Taskflow account</p>

                        <form onSubmit={handleSubmit} className="width100" id="formField">
                            <label htmlFor="email">Email:</label>
                            <input
                                required
                                id="email"
                                type="email"
                                placeholder="enter email"
                                name="email"
                            ></input>
                            <div id="passwordRow">
                                <label htmlFor="password">Password:</label>
                                <a href="#">Forgot password?</a>
                            </div>
                            <input
                                required
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="enter password"
                                name="password"
                            ></input>
                            <button onClick={() => passwordVisible(!isPasswordVisible)}>
                                👁️
                            </button>
                            <div id="buttonRow">
                                <button className="blueColor" type="submit">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client"

import {FormEvent, useState} from "react";
import s from "./AuthCredentials.module.css";
import {useSlider} from "@/components/shared/Provider";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {MdErrorOutline} from "react-icons/md";
import {IoIosCloseCircle} from "react-icons/io";
import {ImSpinner5, ImSpinner9} from "react-icons/im";

type ValidatorRequest = {
    email?: string;
    username: string;
    password: string;
    confirmPassword?: string;
}

type ValidatorResponse = {
    isValid: boolean;
    message?: string;
}

export default function AuthCredentials() {
    const [mode, setMode] = useState<string>("login")

    return (
        <div className={s.authCredentialsContainer}>
            {mode === "login" && <LoginForm setMode={setMode}/>}
            {mode === "register" && <RegisterForm setMode={setMode}/>}
        </div>
    );
}


function LoginForm({setMode}: { setMode: Function }) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>();
    const [error, setError] = useState<boolean>();
    const {handleSlider} = useSlider();


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        //@ts-ignore
        const {username: {value: username}, password: {value: password}} = e.target;

        const validatorResponse = Validator({username, password}, "login");
        if (!validatorResponse.isValid) {
            setError(true);
            setDisabled(false);
            setErrorMessage(validatorResponse.message || "");
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/User/Login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })

        console.log(res.status, ':', res.statusText);

        if (res.status === 400) {
            setError(true);
            setErrorMessage("Username/Password is required");
        } else if (res.status === 404) {
            setError(true);
            setErrorMessage("Username or Password is incorrect");
        } else if (res.ok) {
            const data = await res.json();
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            handleSlider(false);
        } else {
            console.log("Error: " + res.statusText);
        }
        setDisabled(false);
    };

    return (
        <div className={s.authCredentials}>
            <div className={s.header}>
                <div className={s.title}>Log In</div>
                <div className={s.desc}>Welcome back! please enter your details</div>
            </div>
            <form onSubmit={onSubmit} method="POST">
                <fieldset disabled={disabled}>
                    {
                        error &&
                        <div className={s.errorDiv}>
                            <MdErrorOutline/>
                            <span>{errorMessage}</span>
                            <IoIosCloseCircle
                                className={s.closeBtn}
                                onClick={() => setError(false)}
                            />
                        </div>
                    }
                    <input type="text" placeholder="Enter Username" name="username" className={s.input}/>
                    <InputPassword placeholder="Enter Password" name="password"/>

                    <div className={s.options}>
                        <div className={s.rememberMeBase}>
                            <input type="checkbox" className={s.checkBox}/>
                            <span>Remember Me</span>
                        </div>
                        <span className={s.forgotPassBtn}
                              onClick={() => setMode("forgotPassword")}>Forgot password?</span>
                    </div>
                    <button className={s.btn}>{disabled && <ImSpinner9 className={s.spinner}/>} &nbsp; Log In</button>
                    <span className={s.footer}>
                        {"Don't have an account? "}
                        <button onClick={() => setMode("register")}>Register</button>
                    </span>
                </fieldset>
            </form>
        </div>
    )
}

function RegisterForm({setMode}: { setMode: Function }) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const {handleSlider} = useSlider();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        const {
            //@ts-ignore
            email: {value: email},
            //@ts-ignore
            username: {value: username},
            //@ts-ignore
            password: {value: password},
            //@ts-ignore
            confirmPassword: {value: confirmPassword}
        } = e.target;

        const obj: ValidatorRequest = {
            email,
            username,
            password,
            confirmPassword
        };

        const validatorResponse = Validator(obj, "login");
        if (!validatorResponse.isValid) {
            setError(true);
            setDisabled(false);
            setErrorMessage(validatorResponse.message || "");
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/User/Register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })

        console.log(res.status, ':', res.statusText);

        if (res.status === 400) {
            setError(true);
            setErrorMessage("All fields are required");
        } else if (res.ok) {
            const data = await res.json();
            console.log("data:", data);
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(obj));
            handleSlider(false);
        } else {
            console.log("Error: " + res.statusText);
        }

        setDisabled(false);
    };

    return (
        <div className={s.authCredentials}>
            <div className={s.header}>
                <div className={s.title}>Register</div>
                <div className={s.desc}>Welcome, please enter your details</div>
            </div>
            <form onSubmit={onSubmit} method="POST">
                <fieldset disabled={disabled}>
                    {
                        error &&
                        <div className={s.errorDiv}>
                            <MdErrorOutline/>
                            <span>{errorMessage}</span>
                            <IoIosCloseCircle
                                className={s.closeBtn}
                                onClick={() => setError(false)}
                            />
                        </div>
                    }
                    <input type="text" placeholder="Enter Email" name="email" className={s.input}/>
                    <input type="text" placeholder="Enter Username" name="username" className={s.input}/>
                    <InputPassword placeholder="Enter Password" name="password"/>
                    <InputPassword placeholder="Confirm Password" name="confirmPassword"/>
                    <button className={s.btn}>{disabled && <ImSpinner5 className={s.spinner}/>} &nbsp; Register</button>
                    <span className={s.footer}>
                        {"Already have an account? "}
                        <button onClick={() => setMode("login")}>Log In</button>
                    </span>
                </fieldset>
            </form>
        </div>
    )
}

function InputPassword({placeholder, name}: { placeholder: string, name: string }) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <label className={s.label}>
            <input type={isVisible ? "text" : "password"} placeholder={placeholder} name={name} className={s.input}/>
            <div className={s.eyeBtn} onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? <FaEyeSlash/> : <FaEye/>}
            </div>
        </label>
    )
}

function Validator(request: ValidatorRequest, type: string): ValidatorResponse {
    const {email, username, password, confirmPassword} = request;
    const isEmpty = (str: string | undefined) => str === "" || str === null;
    if (type === "login") {
        if (isEmpty(username) || isEmpty(password)) {
            return {
                isValid: false,
                message: "All Fields are required"
            };
        }

        if (username.length < 3) {
            return {
                isValid: false,
                message: "Username should be 3 characters long"
            };
        }

        if (password.length < 8) {
            return {
                isValid: false,
                message: "Password should be 8 characters long"
            };
        }
    } else if (type === "register") {
        if (isEmpty(email) || isEmpty(username) || isEmpty(password) || isEmpty(confirmPassword)) {
            return {
                isValid: false,
                message: "All Fields are required"
            };
        }

        if (password !== confirmPassword) {
            return {
                isValid: false,
                message: "Passwords do not match"
            };
        }

        let pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!email || !pattern.test(email as string)) {
            return {
                isValid: false,
                message: "Please enter a valid email address"
            };
        }

        if (password.length < 8) {
            return {
                isValid: false,
                message: "Password should be 8 characters long"
            };
        }
    }

    return {
        isValid: true
    };
}
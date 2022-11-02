import React, { useState, useCallback, } from 'react'

import './authorization.scss';
import home from '../../assets/home.png';

const Authorization = () => {

    const [isSingIn, setIsSignIn] = useState(true);
    const [isEqualPass, setIsEqualPass] = useState(true);
    const [isCorrectEmail, setIsCorrectEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const onEmailChange = useCallback((e) => {
        setEmail(e.target.value);
        setIsCorrectEmail(true);
    }, [setEmail]);

    const onPassChange = useCallback((e) => {
        setPassword(e.target.value);
        setIsEqualPass(true);
        setIsCorrectEmail(true);
    }, [setPassword])

    const onRepPassChange = useCallback((e) => {
        setRepPassword(e.target.value);
        setIsEqualPass(true);
        setIsCorrectEmail(true);
    }, [setRepPassword])

    const createAccount = useCallback(() => {
        if (password !== repPassword) {
            setIsEqualPass(false);
        }
        else {
            let accounts = JSON.parse(localStorage.getItem('allAccounts'));
            let newAcc = true;
            accounts.forEach((elem) => {
                if (elem.email === email) newAcc = false;
            });
            if (newAcc === true) {
                console.log("ok");
                accounts.push({
                    "email": email,
                    "password": password,
                    "favouriteTV": [],
                    "favouriteMovies": []
                });
                localStorage.setItem("allAccounts", JSON.stringify(accounts));
                const profile = {
                    "email": email,
                    "password": password,
                    "favouriteTV": [],
                    "favouriteMovies": []
                }
                localStorage.setItem("activeAccount", JSON.stringify(profile));
                window.location.href = '/';
            }
            else {
                alert("Account with that email is already registered")
            }
        }
    }, [email, password, repPassword])

    const signIn = useCallback(() => {
        let accounts = JSON.parse(localStorage.getItem('allAccounts'));
        let newAcc = true;
        let currAcc;
        accounts.forEach((elem) => {
            if (elem.email === email) {
                newAcc = false;
                currAcc = elem;
            }
        });
        console.log(newAcc, isCorrectEmail);
        if (newAcc === false) {
            if (currAcc.password === password) {
                localStorage.setItem("activeAccount", JSON.stringify(currAcc));
                window.location.href = '/';
            }
            else {
                setIsCorrectEmail(false);
            }
        }
        else {
            setIsCorrectEmail(false);
        }
    }, [email, password, isCorrectEmail])

    return (
        <>
            <div className='authContainer'>
                <h1>Authorization</h1>
                <div className="authForm">
                    <div className='authForm__links'>
                        <a href='/'><img alt="No" src={home} className="goHome"></img></a>
                        <span className={`authForm__links__href ${isSingIn ? "activeAuth" : ""}`} onClick={() => { setIsSignIn(true) }}>Sign In</span>
                        <span className={`authForm__links__href ${!isSingIn ? "activeAuth" : ""}`} onClick={() => { setIsSignIn(false) }}>Sign Up</span>
                    </div>
                    <hr className='hr'></hr>
                    <div className="signIn" method="" action="" autoComplete="off">
                        <input type="email" id="user" name="user" placeholder="email" value={email} onChange={onEmailChange} />
                        {!isCorrectEmail ?
                            <span className='notEqual'>Invalid email or password</span> :
                            ""}
                        <input type="password" id="pass" name="pass" placeholder="password" value={password} onChange={onPassChange} />
                        {!isSingIn ?
                            <input type="password" id="repPass" name="repPass" placeholder="repeat password" value={repPassword} onChange={onRepPassChange} /> :
                            ""}
                        {!isEqualPass ?
                            <span className='notEqual'>Passwords aren't equal</span> :
                            ""}
                        <hr className='hr'></hr>
                        <button className='signIn__btn'>{isSingIn ?
                            <span onClick={signIn} style={{ width: "100%" }}>Sign In</span> :
                            <span onClick={createAccount} style={{ width: "100%" }}>Sign Up</span>}</button>
                        {isSingIn ? <span className='forgot'>forgot your password? <a href="/" className='signIn__clickHere'>click here</a></span> : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authorization
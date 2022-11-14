import React, { useState, useCallback, } from 'react'
import { v4 as uuidv4 } from "uuid";

import './authorization.scss';
import home from '../../assets/home.png';
import profileImg from '../../assets/profileImg.png';
import translations from '../../config/translations';

const Authorization = () => {

    const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['Authorization']) : Object.keys(translations['Authorization']);

    if (localStorage.length === 0) {
        localStorage.setItem('theme', JSON.stringify("dark"));
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        localStorage.setItem('language', navigator.language.substring(0, 2) === 'en' ? 'en' : 'uk');
    }

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
        if (password !== repPassword || password.length === 0) {
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
                const profile = {
                    "email": email,
                    "password": password,
                    "nickName": email,
                    "id": uuidv4(),
                    "image": profileImg,
                    "favouriteTV": [],
                    "favouriteMovies": []
                }
                accounts.push(profile);
                localStorage.setItem("allAccounts", JSON.stringify(accounts));
                localStorage.setItem("activeAccount", JSON.stringify(profile));
                window.location.href = '/';
            }
            else {
                alert(pageText[6])
            }
        }
    }, [email, password, repPassword, pageText])

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
                <h1>{pageText[0]}</h1>
                <div className="authForm">
                    <div className='authForm__links'>
                        <a href='/'><img alt="No" src={home} className="goHome"></img></a>
                        <span className={`authForm__links__href ${isSingIn ? "activeAuth" : ""}`} onClick={() => { setIsSignIn(true) }}>{pageText[1]}</span>
                        <span className={`authForm__links__href ${!isSingIn ? "activeAuth" : ""}`} onClick={() => { setIsSignIn(false) }}>{pageText[2]}</span>
                    </div>
                    <hr className='hr'></hr>
                    <div className="signIn" method="" action="" autoComplete="off">
                        <input type="email" id="user" name="user" placeholder={pageText[3]} value={email} onChange={onEmailChange} />
                        {!isCorrectEmail ?
                            <span className='notEqual'>{pageText[7]}</span> :
                            ""}
                        <input type="password" id="pass" name="pass" placeholder={pageText[4]} value={password} onChange={onPassChange} />
                        {!isSingIn ?
                            <input type="password" id="repPass" name="repPass" placeholder={pageText[5]} value={repPassword} onChange={onRepPassChange} /> :
                            ""}
                        {!isEqualPass ?
                            <span className='notEqual'>{pageText[8]}</span> :
                            ""}
                        <hr className='hr'></hr>
                        <button className='signIn__btn'>{isSingIn ?
                            <span onClick={signIn} style={{ width: "100%" }}>{pageText[1]} </span> :
                            <span onClick={createAccount} style={{ width: "100%" }}>{pageText[2]} </span>}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authorization
import React, { useState, useCallback, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageHeader from '../../components/pageHeader/PageHeader';
import profileImg from '../../assets/profileImg.png';
import translations from '../../config/translations';


import './profile.scss';

const Profile = () => {

    const pageText = Object.values(translations[localStorage.getItem('language')]['Profile'])

    const account = JSON.parse(localStorage.getItem('activeAccount'));
    const oldPassword = useRef();
    const newPassword = useRef();

    const [userImage, setUserImage] = useState(account.image || profileImg);
    const [userNickname, setUserNickname] = useState(account.nickName);
    const [userEmail, setUserEmail] = useState(account.email);
    const [userPassword, setUserPassword] = useState(account.password);
    const [isAllFilled, setIsAllFilled] = useState(true);
    const [isCorrectPass, setIsCorrectPass] = useState(true);

    const profileLink = Object.keys(account).length > 0 ? "/profile/" + (account.id) : "/";

    const onUserImageChange = useCallback((e) => {
        setUserImage(e.target.value);
        setIsAllFilled(true);
    }, [setUserImage])

    const onUserNicknameChange = useCallback((e) => {
        setUserNickname(e.target.value);
        setIsAllFilled(true);
    }, [setUserNickname]);

    const onUserEmailChange = useCallback((e) => {
        setUserEmail(e.target.value);
        setIsAllFilled(true);
    }, [setUserEmail]);

    const onUserPasswordChange = useCallback((e) => {
        setIsCorrectPass(true);
    }, []);

    const exitAccount = useCallback(() => {
        localStorage.setItem('activeAccount', JSON.stringify({}));
        window.location.href = "/";
    }, []);

    const saveProfileInfo = useCallback(() => {
        if (userImage && userNickname && userEmail && ((oldPassword.current.value && newPassword.current.value)
            || (!oldPassword.current.value && !newPassword.current.value))) {
            const allAccs = JSON.parse(localStorage.getItem('allAccounts'));
            let pass = userPassword;
            if (oldPassword.current.value) {
                if (oldPassword.current.value === userPassword) {
                    pass = newPassword.current.value;
                    setUserPassword(pass);
                }
                else {
                    setIsCorrectPass(false);
                }
            }
            let activeAccountIndex = -1;
            allAccs.forEach((elem, index) => {
                if (elem.id === account.id) activeAccountIndex = index;
            });
            const newAccount = {
                "email": userEmail,
                "password": pass,
                "nickName": userNickname,
                "id": account.id,
                "image": userImage,
                "favouriteTV": account.favouriteTV,
                "favouriteMovies": account.favouriteMovies
            }
            allAccs[activeAccountIndex] = newAccount;
            localStorage.setItem('allAccounts', JSON.stringify(allAccs));
            localStorage.setItem('activeAccount', JSON.stringify(newAccount));
            alert(pageText[11]);
        } else {
            setIsAllFilled(false);
        }

    }, [account.id, userEmail, userImage, userNickname, userPassword, account.favouriteMovies, account.favouriteTV, pageText]);

    return JSON.parse(localStorage.getItem('activeAccount')).id === useParams().id ? (
        <>
            <Header />
            <PageHeader>
            </PageHeader>
            <div className='profileContainer'>
                <div className='profileForm'>
                    <div className='userInfo__item'>
                        <div className='profileImg' style={{ backgroundImage: `url(${userImage}` }}></div>
                        <div className='userInfo__item'>
                            <label htmlFor='userPhotoLink'>{pageText[0]}:</label>
                            <input type="text" name="userPhotoLink" id="userPhotoLink" className={`${!isAllFilled && !userImage ? "empty" : ""}`}
                                placeholder={pageText[1]} value={userImage} onChange={onUserImageChange} />
                        </div>
                    </div>
                    <div className='userInfo__item'>
                        <label htmlFor="userNickName">{pageText[2]}:</label>
                        <input type="text" name="userNickName" id="userNickName" placeholder={pageText[2]}
                            className={`${!isAllFilled && !userNickname ? "empty" : ""}`} value={userNickname} onChange={onUserNicknameChange} />
                    </div>
                    <div className='userInfo__item'>
                        <label htmlFor="userEmail">{pageText[3]}:</label>
                        <input type="email" name="userEmail" id="userEmail" placeholder={pageText[3]}
                            className={`${!isAllFilled && !userEmail ? "empty" : ""}`} value={userEmail} onChange={onUserEmailChange} />
                        {!isAllFilled ?
                            <span className='notEqual'>{pageText[7]}</span> :
                            ""}
                    </div>
                    <div className='userInfo__item'>
                        <span>{pageText[4]}:</span>
                        <div className='userInfo__item__row'>
                            <input type="password" name="userPassword" id="userOldPassword" style={{ minWidth: "55px" }} placeholder={pageText[5]}
                                ref={oldPassword} onChange={onUserPasswordChange} />
                            <input type="password" name="userPassword" id="userNewPassword" style={{ minWidth: "55px" }} placeholder={pageText[6]}
                                ref={newPassword} onChange={onUserPasswordChange} />
                        </div>
                    </div>
                    {!isCorrectPass ?
                        <span className='notEqual'>{pageText[8]}</span> :
                        ""}
                    <div className='profileButtons'>
                        <button onClick={saveProfileInfo} style={{ width: 'fit-content' }}>{pageText[9]}</button>
                        <button onClick={exitAccount} style={{ width: 'fit-content' }}>{pageText[10]}</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : <Navigate to={profileLink} />;
}

export default Profile
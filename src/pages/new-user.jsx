import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Logo from "../assets/logo.jpg";
import "../pages/new-user.css";

function NewUser() {
    const [businessName, setBusinessName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessTypes, setBusinessTypes] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setBusinessTypes(prevTypes => [...prevTypes, value]);
            setSelectedBusinessType(value); // Update selected business type
        } else {
            setBusinessTypes(prevTypes => prevTypes.filter(type => type !== value));
            setSelectedBusinessType(""); // Clear selected business type if unchecked
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedBusinessType(selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPhoneNumberError('');
        setPasswordError('');

        // Email validation
        if (!email.endsWith('@gmail.com')) {
            setEmailError('Имэйл @gmail.com хаягтай байх ёстой');
            return;
        }

        // Phone number validation
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneNumberError('Утасны дугаар 8 оронтой байх ёстой');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            setPasswordError('Нууц үг тохирохгүй байна');
            return;
        }

        // Proceed with form submission
        console.log("Form submitted:", { businessName, email, password, phoneNumber, selectedBusinessType });
    };

    return (
        <div className="new-user-form">
            <div className="logo-login">
                <img src={Logo} alt="Logo" />
                <h1>
                    <div className='amar'>Амар</div>
                    <div className='pos'>Пос</div>
                </h1>
            </div>
            <div className='new'><b>Шинээр Бүртгүүлэх</b></div>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="email">Имэйл</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div className="input">
                    <label htmlFor="phoneNumber">Утасны дугаар</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                </div>
                <div className="input">
                    <label htmlFor="password">Нууц үг</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input">
                    <label htmlFor="confirmPassword">Нууц үг давтах</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
                <button type="submit">Бүртгүүлэх</button>
                <div className={`dark ${darkMode ? 'light-mode' : ''}`}>
                    <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} onClick={toggleDarkMode} />
                    <span className="toggle-text" onClick={toggleDarkMode}>
                        {darkMode ? ' Light Mode' : ' Dark Mode'}
                    </span>
                </div>
            </form>
        </div>
    );
}

export default NewUser;

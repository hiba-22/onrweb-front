import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import axios from "axios";

const ContactWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #3a7bd5, #00d2ff);
    height: 100vh;
    color: white;

    .contact-container {
        display: flex;
        flex-direction: row;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 30px;
        width: 60%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .form-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
    }

    .form-container h1,
    .form-container h2,
    .form-container p {
        margin: 0 0 20px 0;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input, textarea, button {
        margin-bottom: 20px;
        padding: 10px;
        border: none;
        border-radius: 5px;
    }

    button {
        background: #4caf50;
        color: white;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background: #45a049;
    }
`;

const Contact = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            if (response.data.success) {
                alert('Message sent successfully');
            }
        } catch (error) {
            alert('Failed to send message');
        }
    };

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <ContactWrapper ref={heroRef}>
                <div className="contact-container">
                    <div className="form-container">
                        <h1>Vous avez un projet ?</h1>
                        <h2>Contactez-nous</h2>
                        <p>Envoyez-nous un message et nous vous répondrons dans les meilleurs délais.</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adresse e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Numéro de téléphone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Parlez-nous un peu de votre projet"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Soumettre</button>
                        </form>
                    </div>
                </div>
            </ContactWrapper>
        </>
    );
};

export default Contact;

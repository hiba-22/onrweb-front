import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import axios from "axios";

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);

    .text-content {
        flex: 1;
        padding: 50px;
        color: white;

        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-size: 2rem;
            margin-top: 10px;
        }

        p {
            margin-top: 20px;
            font-size: 1rem;
        }
    }

    .form-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 50px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        backdrop-filter: blur(10px);

        input,
        textarea {
            margin-bottom: 20px;
            padding: 15px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
        }

        button {
            padding: 15px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background-color: #2980b9;
        }
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
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            }
        } catch (error) {
            alert('Failed to send message');
        }
    };

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <ContactWrapper ref={heroRef}>
                <div className="text-content">
                    <h1>Vous avez un projet ?</h1>
                    <h2>Contactez-nous</h2>
                    <p>Envoyez-nous un message et nous vous répondrons dans les meilleurs délais.</p>
                </div>
                <div className="form-content">
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
            </ContactWrapper>
        </>
    );
};

export default Contact;

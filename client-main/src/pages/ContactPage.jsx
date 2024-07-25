import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../assets/css/wrappers/LandingPage";
import Navbar from "../components/shared/Navbar";
import axios from "axios";

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
            <Wrapper ref={heroRef}>
                <div className="hero-content">
                    <div className="text-content">
                        <h1>Vous avez un projet ?</h1>
                        <h2>Contactez-nous</h2>
                        <p>Envoyez-nous un message et nous vous répondrons dans les meilleurs délais.</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
                            <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Adresse e-mail" value={formData.email} onChange={handleChange} required />
                            <input type="tel" name="phone" placeholder="Numéro de téléphone" value={formData.phone} onChange={handleChange} required />
                            <textarea name="message" placeholder="Parlez-nous un peu de votre projet" value={formData.message} onChange={handleChange} required />
                            <button type="submit">Soumettre</button>
                        </form>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default Contact;

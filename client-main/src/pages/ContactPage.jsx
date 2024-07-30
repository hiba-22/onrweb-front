import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import emailjs from '@emailjs/browser';

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #3a7bd5, #00d2ff);
    color: white;

    .text-content {
        flex: 1;
        padding: 50px;

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

    .form-div {
        display: flex;
        flex-direction: column;
    }

    .form-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 50px;
        margin: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        backdrop-filter: blur(10px);

        input,
        textarea {
            margin-bottom: 20px;
            padding: 15px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            color: black;
        }

        button {
            padding: 15px;
            background-color: rgb(188 228 255);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background-color: rgb(192 224 245);
        }

        .error {
            color: red;
            font-size: 0.8rem;
            margin-top: -15px;
            margin-bottom: 15px;
        }
    }
`;

const Contact = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const form = useRef();

    const [formData, setFormData] = useState({
        user_name: '',
        user_subject: '',
        user_email: '',
        user_phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.user_name) newErrors.user_name = 'Name is required';
        if (!formData.user_subject) newErrors.user_subject = 'Subject is required';
        if (!formData.user_email) newErrors.user_email = 'Email is required';
        if (!formData.user_phone) newErrors.user_phone = 'Phone is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        emailjs.sendForm('service_yy49ssl', 'template_4p7j7bj', form.current, 'M2zBgsbvSJrGg-zHj')
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert('Message sent successfully');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Failed to send message');
                }
            );
    };

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <ContactWrapper ref={heroRef}>
                <div className="text-content">
                    <h1>You have a project ?</h1>
                    <h2>Contact us</h2>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                </div>
                <div className="form-content">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-div">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Name"
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                            />
                            {errors.user_name && <div className="error">{errors.user_name}</div>}
                            <input
                                type="text"
                                name="user_subject"
                                placeholder="Subject"
                                value={formData.user_subject}
                                onChange={handleChange}
                                required
                            />
                            {errors.user_subject && <div className="error">{errors.user_subject}</div>}
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Email"
                                value={formData.user_email}
                                onChange={handleChange}
                                required
                            />
                            {errors.user_email && <div className="error">{errors.user_email}</div>}
                            <input
                                type="tel"
                                name="user_phone"
                                placeholder="Phone"
                                value={formData.user_phone}
                                onChange={handleChange}
                                required
                            />
                            {errors.user_phone && <div className="error">{errors.user_phone}</div>}
                            <textarea
                                name="message"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            {errors.message && <div className="error">{errors.message}</div>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </ContactWrapper>
        </>
    );
};

export default Contact;

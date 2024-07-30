import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form";

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    
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
        background: linear-gradient(to right, #3a7bd5, #00d2ff);
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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
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
                    <h1>Vous avez un projet ?</h1>
                    <h2>Contactez-nous</h2>
                    <p>Envoyez-nous un message et nous vous répondrons dans les meilleurs délais.</p>
                </div>
                <div className="form-content">
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-div">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Name"
                                {...register("user_name", {
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Too long (max 100 characters)",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (min 3 characters)",
                                    },
                                })}
                            />
                            {errors.user_name && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.user_name.message}
                                </span>
                            )}

                            <input
                                type="text"
                                name="user_subject"
                                placeholder="Subject"
                                {...register("user_subject", {
                                    required: {
                                        value: true,
                                        message: "Subject is required",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Too long (max 100 characters)",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (min 3 characters)",
                                    },
                                })}
                            />
                            {errors.user_subject && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.user_subject.message}
                                </span>
                            )}

                            <input
                                type="email"
                                name="user_email"
                                placeholder="Email"
                                {...register("user_email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.user_email && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.user_email.message}
                                </span>
                            )}

                            <input
                                type="tel"
                                name="user_phone"
                                placeholder="Phone"
                                {...register("user_phone", {
                                    required: {
                                        value: true,
                                        message: "Phone is required",
                                    },
                                    pattern: {
                                        value: /^\+?\d{10,15}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                            />
                            {errors.user_phone && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.user_phone.message}
                                </span>
                            )}

                            <textarea
                                name="message"
                                placeholder="How can we help you?"
                                {...register("message", {
                                    required: {
                                        value: true,
                                        message: "Message is required",
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "Too long (max 500 characters)",
                                    },
                                })}
                            />
                            {errors.message && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.message.message}
                                </span>
                            )}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </ContactWrapper>
        </>
    );
};

export default Contact;

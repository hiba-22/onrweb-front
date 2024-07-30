import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

const countries = [
    { name: "Tunisia", code: "+216" },
    { name: "France", code: "+33" },
    { name: "Italy", code: "+39" },
    // Add more countries as needed
];

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;

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
        background: linear-gradient(135deg, rgb(0 152 255 / 27%), rgb(255, 255, 255));
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

        .phone-input {
            display: flex;
            align-items: center;

            select {
                padding: 15px;
                border: none;
                border-radius: 5px 0 0 5px;
                background-color: #00d2ff;
                color: white;
                font-size: 1rem;
                outline: none;
                width: 150px;
            }

            .country-code {
                padding: 15px;
                border: none;
                background-color: #f5f5f5;
                font-size: 1rem;
                outline: none;
                width: 60px;
                text-align: center;
            }

            input[type="text"] {
                padding: 15px;
                border: none;
                border-left: 1px solid #ddd;
                border-radius: 0 5px 5px 0;
                font-size: 1rem;
                outline: none;
                flex: 1;
            }
        }
    }
`;

const Contact = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const form = useRef();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const handleCountryChange = (event) => {
        const selected = countries.find(
            (country) => country.name === event.target.value
        );
        setSelectedCountry(selected);
    };

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
                    <h1> <strong>You have a project ?</strong></h1>
                    <h2>Contact us</h2>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                </div>
                <div className="form-content">
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-div">
                            <label>Name</label>
                            <input
                                type="text"
                                name="user_name"
                                placeholder="User"
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
                            <label>Subject</label>
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
                            <label>Email</label>
                            <input
                                type="email"
                                name="user_email"
                                placeholder="example@gmail.com"
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
                            <label>Phone</label>
                            <div className="phone-input">
                                <select  value={selectedCountry.name} onChange={handleCountryChange}>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="country-code" name="code">{selectedCountry.code}</div>
                                <input
                                    type="text"
                                    name="user_phone"
                                    placeholder="Phone number"
                                    {...register("user_phone", {
                                        required: {
                                            value: true,
                                            message: "Phone is required",
                                        },
                                        pattern: {
                                            value: /^\d{7,15}$/,
                                            message: "Invalid phone number",
                                        },
                                    })}
                                />
                            </div>
                            {errors.user_phone && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors.user_phone.message}
                                </span>
                            )}
                            <label>Message</label>
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

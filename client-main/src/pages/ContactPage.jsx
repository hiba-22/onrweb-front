import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form";
import { validateEmail, validateMessage, validateName, validateSubject } from "../utils/validation";
import InlineError from "../utils/InlineError";
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';

const ContactWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    
    .text-c{
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
    .text-content {
        flex: 1;
       

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
        iframe{
            margin-top: 50px;
            font-size: 1rem;
            width: 650px;
            height: 450px;
        }
    }
    .frame{
    padding-left: 40px;
    padding-right: 40px;
    }
    .fancy {
        color: var(--color-primary);
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
            width: -webkit-fill-available;
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

        .valid {
            color: #51b851d9;
            font-size: 0.8rem;
            margin-top: -15px;
            margin-bottom: 15px;
        }
    }
`;

const PhoneInputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: normal;
    justify-content: normal;
    margin-left: 1px;

    .phoneInput {
        width: -webkit-fill-available;
    }
`;

const Contact = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const form = useRef();
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [nameError, setNameError] = useState();
    const [subjectError, setSubjectError] = useState();
    const [emailError, setEmailError] = useState();
    const [messageError, setMessageError] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const formattedPhone = phone ? formatPhoneNumberIntl(phone) : '';
        const formData = {
            ...data,
            user_phone: formattedPhone,
            user_name : name,
            user_email: email,
            user_subject : subject,
        };

        emailjs.send('service_yy49ssl', 'template_4p7j7bj', formData, 'M2zBgsbvSJrGg-zHj')
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
        validateName({ name, setNameError });
        validateSubject({ subject, setSubjectError });
        validateEmail({ email, setEmailError });
        validateMessage({ message, setMessageError });
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, [name, subject, email, phone, message]);

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <ContactWrapper ref={heroRef}>
                <div className="text-content">
                    <div className="text-c">
                    <h1><strong>You have a project ?</strong></h1>
                    <h1><span className="fancy">Contact us</span></h1>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                    </div>
                    
                    <div className="frame">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5253.910108427141!2d2.546822!3d48.820919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e60e78333cac9b%3A0x41087316aadd9964!2s32%20Rue%20des%20Perroquets%2C%2094350%20Villiers-sur-Marne!5e0!3m2!1sfr!2sfr!4v1722550899530!5m2!1sfr!2sfr"></iframe>
                    </div>
                </div>
                
                <div className="form-content">
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-div">
                            <label>Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                name="user_name"
                                placeholder="Name"
                            />
                            {nameError && <InlineError error={nameError} />}
                            <label>Subject</label>
                            <input
                                type="text"
                                name="user_subject"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                            {subjectError && <InlineError error={subjectError} />}
                            <label>Email</label>
                            <input
                                type="email"
                                name="user_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <InlineError error={emailError} />}
                            <label>Phone</label>
                            <PhoneInputWrapper>
                                <PhoneInput
                                    className="phoneInput"
                                    name="user_phone"
                                    defaultCountry="TN"
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
                                    inputProps={{ required: true }}
                                />
                            </PhoneInputWrapper>
                            <span className={phone && isPossiblePhoneNumber(phone) ? "valid" : "error"}>
                                Is this number possible: {phone && isPossiblePhoneNumber(phone) ? "Yes, it is" : "No"}
                            </span>
                            <span className={phone && isValidPhoneNumber(phone) ? "valid" : "error"}>
                                Is this number VALID in this country: {phone && isValidPhoneNumber(phone) ? "Yes, it is" : "No"}
                            </span>
                            <span className="valid">
                                International phone number: {phone && formatPhoneNumberIntl(phone)}
                            </span>
                            <label>Message</label>
                            <textarea
                                name="message"
                                placeholder="How can we help you?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            {messageError && <InlineError error={messageError} />}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </ContactWrapper>
        </>
    );
};

export default Contact;

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import LogoLight from "../components/Logo-ligth";
import {Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../context/Theme";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
    const { t } = useTranslation(["auth"]);
    const { themeMode } = useTheme();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/"; // to navigate right location after login

    const onSubmit = async (data) => {
        setIsLoading(true);
        

        // posting
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/forgot",
                data,
                {
                    withCredentials: true,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Hurray...",
                text: response?.data?.message,
            });
            

            //reset();
         navigate("/login");
            // navigate("/dashboard");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
            
        }
        setIsLoading(false);
    };

    return (
        <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
            <div className="container">
                <div className="flex justify-center">
                    {themeMode === 'dark' ? <LogoLight /> :  <Logo />} 
                </div>
                <h1>{t("Forget_Password")}</h1>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="row">
                        <label htmlFor="email">{t("address")}</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={t("EmailV")}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: t("valid_email"),
                                },
                            })}
                        />
                        {errors?.email && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                  
                    
                    <div className="flex justify-center">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : t("Continue")}
                        </button>
                    </div>
                </form>
                <div className="">
                    <p className="text-center text-[10px] font-semibold opacity-9 mt-3">
                            {t("Back")}
                        <Link className="ml-1 link" to="/login">
                            {t("Login")}
                        </Link>
                    </p>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #f9faff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    .container {
        background: var(--color-white);
        max-width: 360px;
        width: 100%;
        padding: 58px 44px;
        border: 1px solid #e1e2f0;
        border-radius: 4px;
        box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
        transition: all 0.3s ease;
    }
    h1 {
        margin-top: 20px;
        text-align: center;
        text-transform: capitalize;
        font-size: calc(1rem + 0.5vw);
        font-weight: 600;
        color: var(--color-primary);
    }
    form {
        margin-top: calc(1rem + 0.9vw);
    }

    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .row label {
        font-size: 12px;
        color: var(--color-black);
        font-weight: 400;
        margin-bottom: 2px;
    }

    .row input {
        flex: 1;
        padding: 8px 10px;
        border: 1px solid #d6d8e6;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease-out;
    }

    .row input:focus {
        outline: none;
        box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
    }

    .row input::placeholder {
        color: var(--color-black);
        opacity: 0.7;
    }
    .row a{
        color: crimson;
        font-size: 12px;
        text-decoration: underline;
        
    }
    button {
        width: 50%;
        min-width: 90px;
        padding: 8px;
        font-size: 16px;
        letter-spacing: 1px;
        background: #007bff;
        color: var(--color-white);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin: 1px auto 0;
        transition: background 0.2s ease-out;
    }

    button:hover {
        background:  #0069d9;
        box-shadow: 0 0 0 2px #3498db;
    }
    button:disabled {
        background: var(--color-gray);
        color: var(--color-black);
        cursor: not-allowed;
    }

    @media (max-width: 458px) {
        .container {
            width: 90%;
            padding: 30px 0;
        }
        form {
            padding: 0 20px;
        }
    }
    p .link {
        text-transform: capitalize;
        color: var(--color-primary);
    }
    p .link:hover {
        text-decoration: underline;
    }
    &.dark {
        background-color: #1f2937;
        color: #f9fafb;
        
        .container {
            background: #374151;
            border-color: #4b556;
        }
        .row label {
            
            color: var( --color-white);
           
        }
        .row input {
            color:var( --color-black);
        }
    }
`;

export default ForgetPassword;

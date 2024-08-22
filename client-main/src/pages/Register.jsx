import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import LogoLight from "../components/Logo-ligth";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../context/Theme";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const Register = () => {
    const { t } = useTranslation(["auth"]);
    const { themeMode } = useTheme();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const [isPasswordMatched, setIsPasswordMatched] = useState({
        status: true,
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // password: A@1abcde
        const { username, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setIsPasswordMatched({
                status: false,
                message: "Both password not matched.",
            });
            return;
        } else {
            setIsLoading(true);
            const user = { username, email, password };
            console.log(user);
            // posting
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/v1/auth/register",
                    user
                );
                    console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Hurray...",
                    text: response?.data?.message,
                });
                reset();
                navigate("/login");
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data,
                });
            }
        }
        setIsLoading(false);
    };

    // to hide the popup
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsPasswordMatched({ status: true, message: "" });
        }, 2000);

        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount or when dependencies change
        };
    }, [isPasswordMatched.status]);

    return (
        <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
            <div className="container">
                <div className="flex justify-center">
                    {themeMode === 'dark' ? <LogoLight /> :  <Logo />} 
                </div>
                <h1>{t("create_Account")}</h1>
                {!isPasswordMatched?.status && (
                    <p className="text-[11px] font-semibold text-center text-red-700 bg-red-100 px-1 py-2 mt-4 tracking-wider">
                        {t("not_matched")}
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="row">
                        <label htmlFor="username">{t("labelUsername")}</label>
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder={t("placeholder")}
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: t("errorName"),
                                },
                                maxLength: {
                                    value: 30,
                                    message: t("maxLengthName"),
                                },
                                minLength: {
                                    value: 3,
                                    message:
                                        t("minLengthName"),
                                },
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z0-9_]*$/,
                                    message:t("patternName"),
                                       
                                },
                            })}
                        />
                        {errors?.username && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.username?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="email">{t("labelEmail")}</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={t("EmailV")}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: t("errorEmail"),
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message:  t("patternEmail"),
                                },
                            })}
                        />
                        {errors?.email && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="password">{t("labelPassword")}</label>
                        <input
                            type="password"
                            name="password"
                            placeholder={t("placeholder")}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: t("errorPwd"),
                                },
                                maxLength: {
                                    value: 20,
                                    message: t("maxLengthPassword"),
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                    t("minLengthPassword") ,
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                                    message:
                                    t("patternPassword"),
                                },
                            })}
                        />
                        {errors?.password && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                    <div className="row">
                        <label htmlFor="password">{t("Confirm_Password")}</label>
                        <input
                            type="password"
                            name="password"
                            placeholder={t("placeholder")}
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: t("errorPwd"),
                                },
                            })}
                        />
                        {errors?.confirmPassword && (
                            <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                {errors?.confirmPassword?.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : t("Register")}
                        </button>
                    </div>
                </form>
                <div className="">
                    <p className="text-center text-[10px] font-semibold opacity-9 mt-3">
                            {t("Alredy")}
                        <Link className="ml-1 link" to="/login">
                            {t("Login_now")}
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
        font-size: calc(1rem + 0.3vw);
        font-weight: 600;
        color: var(--color-primary);
    }
    form {
        margin-top: calc(0.8rem + 0.7vw);
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

export default Register;

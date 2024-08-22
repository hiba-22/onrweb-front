/* eslint-disable react/prop-types */

import styled from "styled-components";
import Logo from "../Logo";
import LogoLight from "../Logo-ligth";
import { NavLink } from "react-router-dom";
import ThemeBtn from "../DarkMode/ThemeBtn";
import useTheme from "../../context/Theme"; 
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";

const Navbar = ({ navbarRef }) => {
    const {i18n,t} = useTranslation(["common"]);
    useEffect(()=>{
        if (localStorage.getItem("i18nextLng")?.length > 2){
            i18next.changeLanguage("en");

        }
    },[]);
    const handleLangageChange = (e)=>{
        i18n.changeLanguage(e.target.value);
    }
    const { themeMode } = useTheme();
    return (
        <Wrapper ref={navbarRef} className={themeMode === 'dark' ? 'dark' : '' } >
          
            <div className="container">
                {themeMode === 'dark' ? <LogoLight /> :  <Logo />} 
                <div className="flex justify-end items-center">
                    <NavLink className="nav-item" to="/all-services">
                        {t("service")}
                    </NavLink>
                    <NavLink className="nav-item" to="/all-jobs">
                        {t("offer")}
                    </NavLink>
                    <NavLink className="nav-item" to="/all-articles">
                        {t("article")}
                    </NavLink>
                    <NavLink className="nav-item" to="/contact">
                        {t("contact")}
                    </NavLink>
                    <NavLink className="nav-item hidden sm:block" to="/dashboard">
                        {t("dashboard")}
                    </NavLink>
                    <NavLink className="nav-item" to="/login">
                        <span className="bg-[#247BF7] text-white px-6 py-2 rounded">{t("login")}</span>
                    </NavLink>
                    <LanguageSelector>
                        <select value={localStorage.getItem("i18nextLng")} 
                        onChange={handleLangageChange}>
                            <option value="en"> {t("en")} </option>
                            <option value="fr"> {t("fr")} </option>
                            <option value="ar"> {t("ar")} </option>
                        </select>
                    </LanguageSelector>
                    <ThemeBtn/>
                </div>
                
            </div>
            
        </Wrapper>
    );
};
const LanguageSelector = styled.div`
    select {
        padding: 8px;
        font-size: 14px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        cursor: pointer;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        margin-right: 20px;
        color: var(--color-black);
    }
`;

const Wrapper = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 1rem 0;
    transition: box-shadow 0.3s ease;

    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .container .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
    }
    .container .nav-item.active {
        color: var(--color-primary);
    }
    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }
    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;
        .container {
            display: flex;
            /* justify-content: center; */
        }
    }
    &.dark {
        background-color: #1a2330;
        color: #f9fafb;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
        .container .nav-item{
            color: var( --color-white);
        }
        .container .nav-item.active {
            color: var(--color-primary);
        }
    }
`;

export default Navbar;

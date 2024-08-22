import React, { useEffect, useRef } from "react";
import Wrapper from "../assets/css/wrappers/LandingPage";
import { Link } from "react-router-dom";
import photo from "../assets/media/LandingPage/hero.png";
import Navbar from "../components/shared/Navbar";
import PopularCategory from "../components/Home Page/PopularCategory";
import HowWorks from "../components/Home Page/HowWorks";
import Brands from "../components/Home Page/Brands";
import Testimonial from "../components/Home Page/Testimonial";
import useTheme from "../context/Theme";
import { useTranslation } from "react-i18next";

const Landing = () => {
    const {t} = useTranslation(["home"]);
    const { themeMode } = useTheme();
    const navbarRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);
    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <Wrapper ref={heroRef}  className={themeMode === 'dark' ? 'dark' : '' }>
                <div className="hero-content">
                    <div className="text-content">
                        <h1> {t("home")}   <span className="fancy">{t("h1")} </span> 
                            {t("h2")} !
                        </h1>
                        <p>
                            {t("p1")}
                            <br></br>
                            {t("p1-1")}
                        </p>
                        <p>
                            {t("p2")}                        
                            <br></br>
                            {t("free")} : <strong><NavLink link="mailto:Contact@Onrtech.fr" label="Contact@Onrtech.Fr" /></strong>
                        </p>
                        <div className="btn-grp">
                            <Link className="btn" to="/all-jobs">
                                {t("apply")}
                            </Link>
                        </div> 
                        
                    </div>
                    <div className="placeholder">
                        <img src={photo} alt="job viva photo" />
                    </div>

                 
                </div>
            </Wrapper>
            <div className="dark:bg-[#1f2937]">
            <PopularCategory/>
            <HowWorks/>
            <Testimonial/>
            <Brands/>
            </div>
        </>
    );
};
const NavLink = ({ link, label }) => (
    
      <a
        href={link}
        className="hover:text-gray-800 dark:hover:text-gray-200"
      >
        {label}
      </a>
   
  );
  

export default Landing;

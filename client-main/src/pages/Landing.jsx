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

const Landing = () => {
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
                        <h1> We Make   <span className="fancy">Creativity Work </span> 
                            For Your Brand!
                        </h1>
                        <p>
                            Ours Is A Team Of Creatives That Is Brainstorming On Great Ideas,
                            <br></br>
                            With Our Skills Put Together, You Get An Ensemble Capable Of Doing Anything And Everything Your Brand Needs.
                        </p>
                        <p>
                            We regularly recruit and integrate partners into our international ecosystem.
                            <br></br>
                            Free application: <strong><NavLink link="mailto:Contact@Onrtech.fr" label="Contact@Onrtech.Fr" /></strong>
                        </p>
                        <div className="btn-grp">
                            <Link className="btn" to="/all-jobs">
                                Apply Now
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

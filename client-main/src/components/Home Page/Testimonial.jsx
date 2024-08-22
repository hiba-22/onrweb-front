import React from 'react'
import { Link } from "react-router-dom";
import contact from "../../assets/media/contact.png";
import styled from "styled-components";
import useTheme from "../../context/Theme";
import { useTranslation } from "react-i18next";
const Testimonial = () => {
  const {t} = useTranslation(["home"]);
  const { themeMode } = useTheme();
  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
    <section className="relative isolate overflow-hidden bg-white px-6 mb-20 lg:px-8  ">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]  dark:bg-[radial-gradient(45rem_50rem_at_top,#4f5165,#1f2937)] " />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] dark:bg-[#1f2937]  bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-24 mt-12" src={contact} alt="" />
                    
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 dark:text-white ">
            <p>
              “{t("p3")}”
            </p>
          </blockquote>
          <figcaption className="mt-10">
          <div className="mt-4 flex items-center justify-center space-x-3 text-base mb-12">
            <div className="btn-grp ">
                <Link className="inline-block px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" to="/Contact">
                               {t("contact")}
                </Link>
            </div> 
            </div>
            
          </figcaption>
        </figure>
      </div>
    </section>
    </Wrapper>
  )
}
const Wrapper = styled.section`
   

    margin: 0 auto;
    &.dark {
        background-color: #1f2937;
      
    }
`;
export default Testimonial
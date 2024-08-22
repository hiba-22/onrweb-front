import React from "react";
import Logo from "../../src/components/Logo";
import LogoLight from "../../src/components/Logo-ligth";
import styled from "styled-components";
import useTheme from "../context/Theme";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const {t} = useTranslation(["home"]);
  const { themeMode } = useTheme();
  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
    <footer className="footer" >
      <div className="container">
        <div className="flex">
          <div className="full">
            <div className="premier">
              <a href="/#" className="logo">
                {themeMode === 'dark' ? <LogoLight /> :  <Logo />} 
              </a>
              <p className="parg">
                  {t("footer")}
              </p>
            </div>
          </div>

          <LinkGroup header={t("about_US")}>
            <NavLink link="/" label={t("homeF")} />
            <NavLink link="/all-services" label={t("service")}  />
            <NavLink link="/all-jobs" label={t("offer")}  />
            <NavLink link="/all-articles" label={t("article")}  />
          </LinkGroup>
          <LinkGroup header={t("useful_links")} >
            <NavLink link="/contact" label={t("contactF")}  />
            <NavLink link="/dashboard" label={t("dashboard")}  />
          </LinkGroup>
          
          <LinkGroup header={t("contact_Us")}>
            <p className="adress">
                  {t("adress")}
            </p>
            <p className="flex items-center text-sm font-medium text-dark dark:text-white">
              <span className="mr-3 text-primary">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_941_15626)">
                    <path
                      d="M15.1875 19.4688C14.3438 19.4688 13.375 19.25 12.3125 18.8438C10.1875 18 7.84377 16.375 5.75002 14.2813C3.65627 12.1875 2.03127 9.84377 1.18752 7.68752C0.250019 5.37502 0.343769 3.46877 1.43752 2.40627C1.46877 2.37502 1.53127 2.34377 1.56252 2.31252L4.18752 0.750025C4.84377 0.375025 5.68752 0.562525 6.12502 1.18752L7.96877 3.93753C8.40627 4.59378 8.21877 5.46877 7.59377 5.90627L6.46877 6.68752C7.28127 8.00002 9.59377 11.2188 13.2813 13.5313L13.9688 12.5313C14.5 11.7813 15.3438 11.5625 16.0313 12.0313L18.7813 13.875C19.4063 14.3125 19.5938 15.1563 19.2188 15.8125L17.6563 18.4375C17.625 18.5 17.5938 18.5313 17.5625 18.5625C17 19.1563 16.1875 19.4688 15.1875 19.4688ZM2.37502 3.46878C1.78127 4.12503 1.81252 5.46877 2.50002 7.18752C3.28127 9.15627 4.78127 11.3125 6.75002 13.2813C8.68752 15.2188 10.875 16.7188 12.8125 17.5C14.5 18.1875 15.8438 18.2188 16.5313 17.625L18.0313 15.0625C18.0313 15.0313 18.0313 15.0313 18.0313 15L15.2813 13.1563C15.2813 13.1563 15.2188 13.1875 15.1563 13.2813L14.4688 14.2813C14.0313 14.9063 13.1875 15.0938 12.5625 14.6875C8.62502 12.25 6.18752 8.84377 5.31252 7.46877C4.90627 6.81252 5.06252 5.96878 5.68752 5.53128L6.81252 4.75002V4.71878L4.96877 1.96877C4.96877 1.93752 4.93752 1.93752 4.90627 1.96877L2.37502 3.46878Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18.3125 8.90633C17.9375 8.90633 17.6563 8.62508 17.625 8.25008C17.375 5.09383 14.7813 2.56258 11.5938 2.34383C11.2188 2.31258 10.9063 2.00008 10.9375 1.59383C10.9688 1.21883 11.2813 0.906333 11.6875 0.937583C15.5625 1.18758 18.7188 4.25008 19.0313 8.12508C19.0625 8.50008 18.7813 8.84383 18.375 8.87508C18.375 8.90633 18.3438 8.90633 18.3125 8.90633Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.2187 9.18755C14.875 9.18755 14.5625 8.93755 14.5312 8.56255C14.3437 6.87505 13.0312 5.56255 11.3437 5.3438C10.9687 5.31255 10.6875 4.93755 10.7187 4.56255C10.75 4.18755 11.125 3.9063 11.5 3.93755C13.8437 4.2188 15.6562 6.0313 15.9375 8.37505C15.9687 8.75005 15.7187 9.0938 15.3125 9.1563C15.25 9.18755 15.2187 9.18755 15.2187 9.18755Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_941_15626">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>
                +33 7 50 21 83 96 <br /> +33 6 25 98 27 27
              </span>
            </p>
            <NavLink className="email" link="mailto:Contact@Onrtech.fr" label="Contact@Onrtech.Fr" />
          </LinkGroup>

          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
                {t("Follow")}
              </h4>
              <div className="mb-6 flex items-center">
                <a
                  href="https://www.linkedin.com/company/onrtech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-6 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.225 0H1.775C0.794 0 0 0.794 0 1.775V22.225C0 23.206 0.794 24 1.775 24H22.225C23.206 24 24 23.206 24 22.225V1.775C24 0.794 23.206 0 22.225 0ZM7.375 20H4.145V9.424H7.375V20ZM5.760 7.528C4.735 7.528 4.145 6.840 4.145 6.065C4.145 5.289 4.735 4.600 5.760 4.600C6.775 4.600 7.365 5.289 7.365 6.065C7.365 6.840 6.775 7.528 5.760 7.528ZM20.445 20H17.215V14.780C17.215 13.536 17.200 12.076 15.745 12.076C14.295 12.076 14.050 13.227 14.050 14.826V20H10.820V9.424H13.620V10.936C13.983 10.226 15.003 9.424 16.712 9.424C19.527 9.424 20.445 11.131 20.445 14.065V20Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/ONRTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-6 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.25 4.56001C22.59 4.86501 21.865 5.09501 21.095 5.23501C21.865 4.83501 22.495 4.13501 22.785 3.33501C22.075 3.69501 21.305 3.93501 20.495 4.09501C19.85 3.33501 18.935 2.90501 17.975 2.90501C15.69 2.90501 13.785 4.94501 13.785 7.43001C13.785 7.87501 13.825 8.31501 13.885 8.74501C9.45501 8.54001 5.72501 6.69501 3.18501 3.56501C2.83501 4.04001 2.67501 4.60001 2.67501 5.17501C2.67501 6.10501 3.09501 7.00001 3.81501 7.63501C3.26501 7.62501 2.73501 7.40501 2.29501 7.06501C2.29501 7.07501 2.29501 7.09501 2.29501 7.11501C2.29501 9.34501 4.30501 11.105 6.97501 11.305C6.45501 11.465 5.91501 11.535 5.37501 11.535C5.06501 11.535 4.75501 11.515 4.45501 11.465C5.08501 13.165 6.82501 14.305 8.88501 14.335C7.31501 15.375 5.26501 15.935 3.11501 15.935C2.71501 15.935 2.33501 15.915 1.97501 15.895C4.19501 17.795 6.98501 19.065 10.075 19.065C17.965 19.065 21.545 12.505 21.545 7.94501C21.545 7.81501 21.535 7.68501 21.535 7.56501C22.235 7.02001 22.845 6.31001 23.25 5.53501L23.25 4.56001Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/ONRTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.225 0H1.775C0.794 0 0 0.794 0 1.775V22.225C0 23.206 0.794 24 1.775 24H22.225C23.206 24 24 23.206 24 22.225V1.775C24 0.794 23.206 0 22.225 0ZM20.477 2.433H18.398C16.635 2.433 15.894 3.332 15.894 5.201V7.688H20.093L19.734 11.165H15.894V20H12.446V11.168H10.085V7.688H12.446V5.552C12.446 2.914 14.118 1.544 16.652 1.544C17.792 1.544 18.907 1.639 19.734 1.683V5.168H17.507C16.607 5.168 15.894 5.949 15.894 7.639V9.847H20.093L20.477 2.433Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600">
          <div className="py-6 flex flex-wrap items-center justify-between px-4 mx-auto max-w-6xl">
            <div className="text-base text-body-color dark:text-dark-6">
              © {new Date().getFullYear()} {t("copie")}
            </div>
            <div className="flex flex-wrap items-center">
              <a
                href="/privacy-policy"
                className="text-base font-medium text-gray-600 dark:text-dark-6 hover:text-gray-800 dark:hover:text-white"
              >
                {t("Privacy")}
              </a>
              <span className="mx-3 text-gray-600 dark:text-dark-6">|</span>
              <a
                href="/terms-conditions"
                className="text-base font-medium text-gray-600 dark:text-dark-6 hover:text-gray-800 dark:hover:text-white"
              >
                {t("Terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
     </Wrapper>
  );
};

const LinkGroup = ({ header, children }) => (
  <div className="w-full px-4 sm:w-1/3 lg:w-2/12">
    <div className="mb-10 w-full">
      <h4 className="mb-8 text-lg font-semibold text-dark dark:text-white">
        {header}
      </h4>
      <ul className="text-base text-body-color dark:text-dark-6">
        {children}
      </ul>
    </div>
  </div>
);

const NavLink = ({ link, label }) => (
  <li className="mb-4">
    <a
      href={link}
      className="hover:text-gray-800 dark:hover:text-gray-200"
    >
      {label}
    </a>
  </li>
);
const Wrapper = styled.div`
      
      background-color: rgb(255 255 255 / var(--tw-bg-opacity));
      padding-bottom: 1.25rem; /* assuming 1rem = 16px */
      padding-top: 5rem; /* assuming 1rem = 16px */
    .footer{
      position: relative;
      z-index: 10;
      --tw-bg-opacity: 1;
    }
    .container{
      
      max-width: 72rem; /* assuming 6xl = 1280px */
      margin-left: auto;
      margin-right: auto;
    }
    .flex{
      flex-wrap: wrap;
      display: flex;
     }
     .full{
      padding-left: 1rem;
      padding-right: 1rem;
     }
     @media (min-width: 1024px) {
      .full {
          width: 25%;
      }
    
    .premier{
      margin-bottom: 1.75rem;
      margin-bottom: 2.5rem;
      margin-bottom: 1.5rem;
    }
    .logo{
      max-width: 160px;
      display: inline-block
      margin-bottom: 1.5rem;
    }
    .parg{
      font-size: 1rem;
      line-height: 1.5rem;
      margin-bottom: 1.75rem;
      margin-top: 1.75rem;
    }
    .adress{
      font-size: 1rem;
      line-height: 1.5rem;
      margin-bottom: 1.75rem;
    }
    .email{

    }
    &.dark {
      background-color: #1f2937;
      color: #f9fafb;
    }
}
`
export default Footer;

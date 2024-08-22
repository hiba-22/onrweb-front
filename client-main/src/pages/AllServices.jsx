import React from "react";
import styled from "styled-components";

import ServicesListCom from "../components/AllServicesPage/ServicesListCom";
import Head from "../components/AllServicesPage/Head"
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllServicesPage/PaginationCom";
import useTheme from "../context/Theme";

const AllServices = () => {
    const { themeMode } = useTheme();
    return (
        <> 
            <Navbar />
            <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
                <Head/>
                <ServicesListCom />
                <PaginationCom />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    padding: 2rem 1.5rem;
    width: 100%;

    margin: 0 auto;
    &.dark {
        background-color: #1f2937;
        color: #f9fafb;
    }
`;
export default AllServices;

import React from "react";
import styled from "styled-components";

import ServicesListCom from "../components/AllServicesPage/ServicesListCom";
import Head from "../components/AllServicesPage/Head"
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllServicesPage/PaginationCom";

const AllServices = () => {
    return (
        <> 
            <Navbar />
            <Wrapper>
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
    max-width: 1200px;
    margin: 0 auto;
`;
export default AllServices;

import React from "react";
import styled from "styled-components";

import JobsListCom from "../components/AllJobsPage/JobsListCom";
import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
import Head from "../components/AllJobsPage/Head"
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllJobsPage/PaginationCom";
import useTheme from "../context/Theme";

const AllJobs = () => {
    const { themeMode } = useTheme();
    return (
        <> 
            <Navbar />
            <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
                <Head/>
                <SearchAndFilter />
                <JobsListCom />
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
export default AllJobs;

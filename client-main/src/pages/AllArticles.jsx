import React from "react";
import styled from "styled-components";

import ArticlesListCom from "../components/AllArtcilesPage/ArticlesListCom";
import SearchAndFilter from "../components/AllArtcilesPage/SearchAndFilter";
import Head from "../components/AllArtcilesPage/Head"
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllArtcilesPage/PaginationCom";
import useTheme from "../context/Theme";

const AllArticles = () => {
    const { themeMode } = useTheme();
    return (
        <> 
            <Navbar />
            <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
                <div className="contenu">
                <Head/>
                <SearchAndFilter />
                <ArticlesListCom />
                <PaginationCom />
                </div>
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
export default AllArticles;

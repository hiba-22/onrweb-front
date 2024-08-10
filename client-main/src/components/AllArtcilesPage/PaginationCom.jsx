import React from "react";

import ReactPaginate from "react-paginate";
import { useArticleContext } from "../../context/ArticleContext";
import styled from "styled-components";

const PaginationCom = () => {
    const { handleArticleFetch, articles } = useArticleContext();

    const handlePageClick = (e) => {
        // const newOffset = (e.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${e.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
        handleArticleFetch(
            `https://onr-backend.vercel.app/api/v1/articles?page=${
                e.selected + 1
            }&limit=6`
        );
    };

    return (
        <Wrapper>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={articles?.pageCount}
                previousLabel="<"
                nextLabel=">"
                renderOnZeroPageCount={null}
                className="job-list"
                pageClassName="item"
                activeClassName="active"
                previousClassName="prev-item"
                nextClassName="next-item"
                disabledClassName="disabled-item"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
    .job-list {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .job-list .item,
    .prev-item,
    .next-item {
        font-size: 15px;
        font-weight: 500;
        color: #000;
        padding: 1px 8px;
        border: 1px solid var(--color-primary);
        border-radius: 3px;
    }
    .job-list .active {
        border: 1px solid var(--color-primary);
        background-color: var(--color-primary);
        color: var(--color-white);
    }
    .job-list .disabled-item {
        background-color: #d3d3d3;
        border: none;
        color: #000;
        cursor: not-allowed;
    }
`;
export default PaginationCom;

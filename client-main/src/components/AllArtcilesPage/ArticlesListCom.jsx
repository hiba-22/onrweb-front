import React from "react";
import { useArticleContext } from "../../context/ArticleContext";
import LoadingComTwo from "../shared/LoadingComTwo";
import styled from "styled-components";
import ArticleCard from "./ArticleCard";
import { useUserContext } from "../../context/UserContext";
import useTheme from "../../context/Theme"
import { useTranslation } from "react-i18next";
const ArticlesListCom = () => {
  const { t } = useTranslation(["common","article"]);
  const { themeMode } = useTheme();
  const { articleLoading, articles } = useArticleContext();
  const { user } = useUserContext();
  if (articleLoading) {
    return <LoadingComTwo />;
  }

  if (!articles?.result?.length) {
    return (
      <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
        {t("Found")}
      </h2>
    );
  }

  // Calculate total articles for recruiter
  const totalRecruiterArticles = articles?.result?.filter(
    (article) => article.createdBy === user._id
  ).length;

  // Calculate total published articles for non-recruiters
  const totalPublishedArticles = articles?.result?.filter(
    (article) => article.isPublished
  ).length;

  // Determine which count to display based on user role
  const totalCount =
    user?.role === "recruiter" ? totalRecruiterArticles : totalPublishedArticles;

  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }> 
      <h5 className="Article-count">
        {user?.role === "recruiter" ? (
          <>
             {t("common:shows")}{" "}
            <span className="fancy">
              {totalCount < 10 ? `0${totalCount}` : totalCount}
            </span>{" "}
            {t("common:total")}
            <span className="fancy">
              {totalCount < 10 ? `0${totalCount}` : totalCount}
            </span>{" "}
            {t("article:Articles")}
          </>
          
        ) : (
          <>
            {t("common:shows")}{" "}
            <span className="fancy">
              {totalPublishedArticles < 10
                ? `0${totalPublishedArticles}`
                : totalPublishedArticles}
            </span>{" "}
            {t("common:total")}{" "}
            <span className="fancy">
              {articles?.result?.length < 10
                ? `0${articles?.result?.length}`
                : articles?.result?.length}
            </span>{" "}
            {t("article:Articles")}
          </>
        )}
      </h5>

      <div className="list-container">
        {articles?.result?.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-gray);
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.2rem 1rem;
  border-radius: 6px;
  max-width: 1152px;
  margin-left: 130px;
  .Article-count {
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-black);
    opacity: 0.8;
  }
  .Article-count .fancy {
    color: var(--color-primary);
    margin: 0 5px;
    font-size: 13px;
    opacity: 1;
  }

  .list-container {
    width: 100%;
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    align-items: center;
    grid-gap: 1.5rem;
    flex-wrap: wrap;
  }
  @media (max-width: 1018px) {
    .list-container {
      grid-template-columns: 1fr 1fr;
      grid-gap: 1.5rem;
      justify-content: center;
    }
  }
  @media screen and (max-width: 670px) {
    .list-container {
      grid-template-columns: 1fr;
      grid-gap: 1.5rem;
      justify-content: center;
    }
  }
  &.dark {
    background-color: #1f2937;
    color: #f9fafb;
    .Article-count {
        color: var(--color-white);  
    }
}
`;

export default ArticlesListCom;

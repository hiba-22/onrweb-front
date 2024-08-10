import React from "react";
import { useServiceContext } from "../../context/ServiceContext";
import LoadingComTwo from "../shared/LoadingComTwo";
import styled from "styled-components";
import JobCard from "./ServiceCard";
import { useUserContext } from "../../context/UserContext";
import useTheme from "../../context/Theme";
const JobsListCom = () => {
  const { themeMode } = useTheme();
  const { serviceLoading, services } = useServiceContext();
  const { user } = useUserContext();
  if (serviceLoading) {
    return <LoadingComTwo />;
  }

  if (!services?.result?.length) {
    return (
      <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
        No service Found
      </h2>
    );
  }

  // Calculate total services for recruiter
  const totalRecruiterServices = services?.result?.filter(
    (service) => service.createdBy === user._id
  ).length;

  // Calculate total published services for non-recruiters
  const totalPublishedServices = services?.result?.filter(
    (service) => service.isPublished
  ).length;

  // Determine which count to display based on user role
  const totalCount =
    user?.role === "recruiter" ? totalRecruiterServices : totalPublishedServices;

  return (
    <Wrapper className={themeMode === 'dark' ? 'dark' : '' }> 
      <h5 className="job-count">
        {user?.role === "recruiter" ? (
          <>
            Shows{" "}
            <span className="fancy">
              {totalCount < 10 ? `0${totalCount}` : totalCount}
            </span>{" "}
            of total
            <span className="fancy">
              {totalCount < 10 ? `0${totalCount}` : totalCount}
            </span>{" "}
            services
          </>
          
        ) : (
          <>
          </>
        )}
      </h5>

      <div className="list-container">
        {services?.result?.map((service) => (
          <JobCard key={service._id} service={service} />
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
  .job-count {
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-black);
    opacity: 0.8;
  }
  .job-count .fancy {
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
    .job-count {
        color: var(--color-white);  
    }
}
`;

export default JobsListCom;

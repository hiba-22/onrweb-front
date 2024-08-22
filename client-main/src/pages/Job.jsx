import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getSingleHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);
import useTheme from "../context/Theme";
import { MdAccessTime } from "react-icons/md";
import Navbar from "../components/shared/Navbar";

// import advancedFormat from "dayjs/plugin/advancedFormat";
// import dayjs from "dayjs";
dayjs.extend(advancedFormat);

const Job = () => {
    const { themeMode } = useTheme();
    const { id } = useParams();
    const {
        isLoading,
        isError,
        data: job,
        error,
    } = useQuery({
        queryKey: ["job"],
        queryFn: () =>
            getSingleHandler(
                `https://onr-backend.vercel.app/api/v1/jobs/${id}`
            ),
    });

    const date = dayjs(job?.jobDeadline).format("MMM Do, YYYY");

    if (isLoading) {
        return <LoadingComTwo />;
    }
    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }
    // if (job) {
    //     console.log(job.result);
    // }
    return (
        <>
            <Navbar />
            <Wrapper className={themeMode === 'dark' ? 'dark' : '' }>
                <div className="content">
                    <div className="top-row">
                        <h2 className="title">
                            <span className="capitalize ">job title: </span>
                            {job?.titre}
                        </h2>
                        <h4 className="company">
                            <span className="fancy">posted by: </span>
                            {job?.company}
                        </h4>
                        <h4 className="post-date">
                            <MdAccessTime className="text-lg mr-1" />
                            {dayjs(job?.result?.createdAt).format("MMM Do, YYYY")}
                        </h4>
                    </div>
                    <div className="middle-row">
                        <div className="description">
                            <h3 className="sec-title">description</h3>
                            <p className="dark:text-[#f9fafb]">{job?.jobDescription}</p>
                        </div>
                        <div className="description">
                            <h3 className="sec-title">Job Details</h3>
                            <h4 className="vacancy">Modality : {job.jobModality}</h4>
                            <h4 className="vacancy">Location: <span className="">{job?.jobLocation}</span></h4>
                            <h4 className="vacancy">Type of Contract :<span className="">{job?.jobType}</span></h4>
                        </div>
                        <div className="description">
                            <h3 className="sec-title">Target Profile</h3>
                            <p className="dark:text-[#f9fafb]">{job?.TargetProfile}</p>
                        </div>
                        <div className="requirement">
                            <h3 className="sec-title">Requirements Skills</h3>
                            <ul className="dark:text-[#f9fafb]">
                                {job?.jobSkills?.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <h4 className="year">
                        Years Of Experience Required: <span className="">{job?.YearsOfExperienceRequired}</span>
                        </h4>
                        <h4 className="year">
                        Years Of Experience Recommanded: <span className="">{job?.YearsOfExperienceRecommanded}</span>
                        </h4>
                        <div className="requirement">
                            <h3 className="sec-title">Optional Qualifications</h3>
                            <ul className="dark:text-[#f9fafb]">
                                {job?.OptionalQualifications?.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        {/*<h4 className="deadline">
                            Deadline: <span className="">{date}</span>
                        </h4>*/}
                        <div className="facility">
                            <h3 className="sec-title">Job Benefits</h3>
                            <ul className="dark:text-[#f9fafb]">
                                {job?.jobBenefits?.map((Benefits) => (
                                    <li key={Benefits}>{Benefits}</li>
                                ))}
                            </ul>
                        </div>
                        <h4 className="salary">
                            Salary: <span className="">{job?.jobSalary} {job.IncomeCurrency}  {job.IncomePeriod}</span>
                        </h4>
                        <div className="apply">
                            <h3 className="sec-title">To apply</h3>
                            <p className="intro">send your cv/resume</p>
                            <p className="info">Email: {job?.jobContact}</p>
                            <h4 className="deadline"> Deadline:  {new Date(job.jobDeadline).toLocaleDateString()}</h4>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    padding: 2rem ;
   
    margin: 0 auto;
    
    width: 100%;
    &.dark {
        background-color: #1f2937;
        color: #f9fafb;
        .content {
            box-shadow: 2px 2px 4px rgb(254 254 254 / 61%),
            -2px -2px 4px  rgb(255 246 246 / 68%);
            background: #374151;
            
        }
        
        .middle-row .description h3,.middle-row .requirement .sec-title,.middle-row .facility .sec-title   
        {
            color: darkgrey;
        }
        .middle-row .apply h3 {
            color: #7a7a7a;
        }
        .middle-row .apply p.info{
            color: #a4a0a0d4;
        }
        
    }
    .content {
        background: #fff;
        max-width: 1150px;
        margin-left: 8rem;
        padding: 2rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .top-row {
        margin-bottom: calc(30px + 1vw);
    }
    .top-row .title {
        font-size: calc(14px + 1vw);
        text-align: center;
    }
    .top-row .company {
        font-size: calc(11px + 0.35vw);
        text-align: center;
        text-transform: capitalize;
        font-weight: 600;
        margin-top: 4px;
        opacity: 0.75;
        color: #a4a0a0d4;
    }
    .top-row .post-date {
        font-size: 11px;
        font-weight: 600;
        text-transform: capitalize;
        text-align: center;
        opacity: 0.75;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .middle-row .description h3 {
        
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .description p {
        margin-top: 6px;
        margin-left: 10px;
        
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .deadline {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-top: calc(10px + 0.3vw);
    }
    .middle-row .vacancy {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-left: 10px;
        margin-top: 4px;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .year {
        font-size: calc(14px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
       
        margin-top: 4px;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .requirement {
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .requirement .sec-title {
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .requirement p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .requirement ul {
        margin-top: 6px;
        list-style: circle;
        margin-left: calc(30px + 0.5vw);
    }
    .middle-row .requirement ul li {
       
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }

    .middle-row .facility .sec-title {
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .facility {
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .facility p {
        margin-top: 6px;
        
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .facility ul {
        margin-top: 6px;
        list-style: circle;
        margin-left: calc(30px + 0.5vw);
    }
    .middle-row .facility ul li {
     
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }
    .middle-row .salary {
        font-size: calc(14px + 0.1vw);
        font-weight: 600;
        opacity: 0.85;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .apply h3 {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .apply p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
    }
    .middle-row .apply p.intro {
        text-transform: capitalize;
    }
    .middle-row .apply p.info {
        font-weight: 600;
        opacity: 0.8;
    }
`;

export default Job;

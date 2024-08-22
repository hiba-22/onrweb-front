import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSingleHandler, updateHandler } from "../utils/FetchHandlers";
import { CiSquarePlus } from "react-icons/ci";

import { Job_Status, Job_Type, JOB_Modality, JOB_IncomePeriod, JOB_IncomeCurrency  } from "../utils/JobData";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

import { TagsInput } from "react-tag-input-component";

import LoadingComTwo from "../components/shared/LoadingComTwo";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useThemeDash from "../context/ThemeDash"; 
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient(); // Create a client

const EditJob = () => {
    const { themeDashMode } = useThemeDash();
    const { id } = useParams();
    const {
        isPending,
        isError,
        data: job,
        error,
    } = useQuery({
        queryKey: ["updateJob"],
        queryFn: () =>
            getSingleHandler(
                `https://onr-backend.vercel.app/api/v1/jobs/${id}`
            ),
    });

    const [deadline, setDeadline] = useState(new Date());
    const [skills, setSkills] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [OptionalQualifications,setOptionalQualifications]=useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset();
        if (job?.jobDeadline) {
            const dateObject = new Date(job?.jobDeadline);
            setDeadline(dateObject || new Date());
        }
        setSkills(job?.jobSkills || []);
        setOptionalQualifications(job?.OptionalQualifications || []);
        setBenefits(job?.jobBenefits || []);
       
    }, [job]);

    const updateJobMutation = useMutation({
        mutationFn: updateHandler,
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({ queryKey: ["updateJob"] });
            Swal.fire({
                icon: "success",
                title: "Job Updated",
                text: data?.message,
            });
        },
        onError: (error, variables, context) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message,
            });
        },
    });

    const onSubmit = async (data) => {
        const updateJob = {
            company: data?.company,
            titre: data?.titre,
            jobStatus: data?.status,
            jobType: data?.type,
            jobModality:data?.modality,
            jobLocation: data?.location,
            TargetProfile: data?.TargetProfile,
            jobSalary: data?.salary,
            IncomePeriod:data?.period,
            IncomeCurrency:data?.currency,
            YearsOfExperienceRequired:data?.YearsRequired,
            YearsOfExperienceRecommanded:data?.YearsRecommanded,
            jobDeadline: deadline + "",
            jobDescription: data?.description,
            jobSkills: skills,
            OptionalQualifications:OptionalQualifications,
            jobBenefits: benefits,
            jobContact: data?.contact,
        };
        // posting;
        updateJobMutation.mutate({
            body: updateJob,
            url: `https://onr-backend.vercel.app/api/v1/jobs/${id}`,
        });
    };
    // const onSubmit = (data) => {
    //     console.log({ data, skills, benefits });
    // };

    if (isPending) {
        return <LoadingComTwo />;
    }
    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }

    return (
        <Wrapper className={themeDashMode === 'dark' ? 'dark' : '' }>
            <div className="">
                <div className="title-row">
                    Update Job
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <div className="content-row">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form">
                            {/* titre */}
                            <div className="row">
                                <label htmlFor="titre">Title</label>
                                <input
                                    type="text"
                                    id="titre"
                                    name="titre"
                                    placeholder="Job titre"
                                    defaultValue={job?.titre}
                                    {...register("titre", {
                                        required: {
                                            value: true,
                                            message: "Job Positon is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.titre && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.titre?.message}
                                    </span>
                                )}
                            </div>

                            {/* Company */}
                            <div className="row">
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Company Name"
                                    defaultValue={job?.company}
                                    {...register("company", {
                                        required: {
                                            value: true,
                                            message: "Job Company is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.company && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.company?.message}
                                    </span>
                                )}
                            </div>

                            {/* Location */}
                            <div className="row">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Job Location"
                                    defaultValue={job?.jobLocation}
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: "Job Location is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.location && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.location?.message}
                                    </span>
                                )}
                            </div>

                            {/* Status */}
                            <div className="row">
                                <label htmlFor="status">Job Status</label>
                                <select
                                    defaultValue={job?.jobStatus}
                                    name="status"
                                    id="stauts"
                                    {...register("status", {
                                        required: {
                                            value: true,
                                            message: "Job Status is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Job Status is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Job Status
                                    </option>

                                    {Job_Status?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.status && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.status?.message}
                                    </span>
                                )}
                            </div>

                            {/* Type */}
                            <div className="row">
                                <label htmlFor="type">Job Type</label>
                                <select
                                    defaultValue={job?.jobType}
                                    name="type"
                                    id="type"
                                    {...register("type", {
                                        required: {
                                            value: true,
                                            message: "Job Type is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Job Type is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Job Type
                                    </option>
                                    {Job_Type?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.type && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.type?.message}
                                    </span>
                                )}
                            </div>
                            {/* Modality */}
                            <div className="row">
                                <label htmlFor="modality">JOB Modality</label>
                                <select
                                    defaultValue={job?.jobModality}
                                    name="modality"
                                    id="modality"
                                    {...register("modality", {
                                        required: {
                                            value: true,
                                            message: "Job Modality is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Job Modality is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Job Modality
                                    </option>
                                    {JOB_Modality?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.modality && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.modality?.message}
                                    </span>
                                )}
                            </div>
                            {/* Target Profile */}
                            <div className="row">
                                <label htmlFor="Benefits">Target Profile</label>
                                <input
                                    type="text"
                                    id="TargetProfile"
                                    name="TargetProfile"
                                    placeholder="Job TargetProfile"
                                    defaultValue={job?.TargetProfile}
                                    {...register("TargetProfile", {
                                        required: {
                                            value: true,
                                            message: "Job Target Profile is required",
                                        },
                                        max: {
                                            value: 2000,
                                            message:
                                                "Check number of job Target Profile(too much)",
                                        },
                                        min: {
                                            value: 10,
                                            message:
                                                "Job Target Profile can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.TargetProfile && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.TargetProfile?.message}
                                    </span>
                                )}
                            </div>
                            {/* Years Of Experience Require */}
                            <div className="row">
                                <label htmlFor="YearsRequired">Years Of Experience Require</label>
                                <input
                                    type="text"
                                    id="YearsRequired"
                                    name="YearsRequired"
                                    placeholder="Years Of Experience Require"
                                    defaultValue={job?.YearsOfExperienceRequired}
                                    {...register("YearsRequired", {
                                        required: {
                                            value: true,
                                            message: "Years Of Experience Required is required",
                                        },
                                        max: {
                                            value: 1000,
                                            message:
                                                "Check number of Years Of Experience Required(too much)",
                                        },
                                        min: {
                                            value: 1,
                                            message:
                                                "Years Of Experience Required can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.YearsRequired && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.YearsRequired?.message}
                                    </span>
                                )}
                            </div>
                            {/* Years Of Experience Recommanded */}
                            <div className="row">
                                <label htmlFor="YearsRecommanded">Years Of Experience Recommanded</label>
                                <input
                                    type="text"
                                    id="YearsRecommanded"
                                    name="YearsRecommanded"
                                    placeholder="Years Of Experience Recommanded"
                                    defaultValue={job?.YearsOfExperienceRecommanded}
                                    {...register("YearsRecommanded", {
                                        required: {
                                            value: true,
                                            message: "Years Of Experience Require is required",
                                        },
                                        max: {
                                            value: 1000,
                                            message:
                                                "Check number of Years Of Experience Recommanded(too much)",
                                        },
                                        min: {
                                            value: 1,
                                            message:
                                                "Years Of Experience Recommanded can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.YearsRecommanded && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.YearsRecommanded?.message}
                                    </span>
                                )}
                            </div>
                            {/* Salary */}
                            <div className="row">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    placeholder="Job salary"
                                    defaultValue={job?.jobSalary}
                                    {...register("salary", {
                                        required: {
                                            value: true,
                                            message: "Job salary is required",
                                        },
                                        max: {
                                            value: 1000000,
                                            message:
                                                "Check number of job salary(too much)",
                                        },
                                        min: {
                                            value: 10,
                                            message:
                                                "Job Benefits can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.salary && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.salary?.message}
                                    </span>
                                )}
                            </div>
                            {/* Income Period */}
                            <div className="row">
                                <label htmlFor="period">JOB Income Period</label>
                                <select
                                    defaultValue={job?.IncomePeriod}
                                    name="period"
                                    id="period"
                                    {...register("period", {
                                        required: {
                                            value: true,
                                            message: "Job Income Period is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Job Income Period is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Job Income Period
                                    </option>
                                    {JOB_IncomePeriod?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.period && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.period?.message}
                                    </span>
                                )}
                            </div>
                             {/* Income Currency */}
                             <div className="row">
                                <label htmlFor="currency">JOB Income Currency</label>
                                <select
                                    defaultValue={job?.IncomeCurrency}
                                    name="currency"
                                    id="currency"
                                    {...register("currency", {
                                        required: {
                                            value: true,
                                            message: "Job Income Currency is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Job Income Currency is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Job Income Currency
                                    </option>
                                    {JOB_IncomeCurrency?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.currency && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.currency?.message}
                                    </span>
                                )}
                            </div>
                            {/* Deadline */}
                            <div className="row">
                                <label htmlFor="deadline">Job Deadline</label>
                                <DatePicker
                                    selected={deadline}
                                    onChange={(date) => setDeadline(date)}
                                />
                            </div>

                            {/* Contact */}
                            <div className="row">
                                <label htmlFor="contact">Contact Mail</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Job Contact"
                                    defaultValue={job?.jobContact}
                                    {...register("contact", {
                                        required: {
                                            value: true,
                                            message: "Job contact is required",
                                        },
                                    })}
                                />
                                {errors?.contact && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.contact?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tag inputs */}
                        <div className="flex flex-col  min-[600px]:flex-row  justify-between items-center gap-4 mt-5">
                            <div className="row gap-y-2">
                                <label htmlFor="titre">
                                    Required Skills
                                </label>
                                <TagsInput
                                    value={skills}
                                    onChange={setSkills}
                                    name="skills"
                                    placeHolder="HTML, CSS"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>
                            <div className="row gap-y-2">
                                <label htmlFor="titre">
                                    Optional Skills
                                </label>
                                <TagsInput
                                    value={OptionalQualifications}
                                    onChange={setOptionalQualifications}
                                    name="OptionalQualifications"
                                    placeHolder="HTML, CSS"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>
                            <div className="row gap-y-2">
                                <label htmlFor="titre">Job Benefits</label>
                                <TagsInput
                                    value={benefits}
                                    onChange={setBenefits}
                                    name="benefits"
                                    placeHolder="Type here"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row  mt-5">
                            <label htmlFor="description">Job Description</label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Job Description"
                                className="w-full max-w-none"
                                defaultValue={job?.jobDescription}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Job description is required",
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "Too long (max 2000char)",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Too short (max 10char)",
                                    },
                                })}
                            />
                            {errors?.description && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.description?.message}
                                </span>
                            )}
                        </div>

                        <div className="row mt-4 sm:mt-0">
                            <label htmlFor="" className="invisible">
                                delete
                            </label>
                            <input
                                type="submit"
                                value="update"
                                className="btn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
.title-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: calc(0.9rem + 0.4vw);
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: 600;
    opacity: 0.85;
    color: var(--color-black);
    position: relative;
}
.title-row:before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: calc(30px + 0.7vw);
    height: calc(2px + 0.1vw);
    background-color: var(--color-primary);
}
    .content-row {
        margin-top: calc(2rem + 0.5vw);
    }
    .form {
        margin-top: calc(30px + 1vw);
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        align-items: center;
        grid-gap: calc(1rem + 0.5vw);
    }
    @media screen and (max-width: 1000px) {
        .form {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 600px) {
        .form {
            grid-template-columns: 1fr;
        }
    }
    .row {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .row label {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--color-black);
        opacity: 0.95;
    }
    input,
    select,
    textarea {
        width: 100%;
        max-width: 500px;
        padding: 8px 14px;
        margin-top: 6px;
        display: inline-block;
        border: 1px solid #0000004a;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: calc(0.8rem + 0.1vw);
        outline: none;
        color: var(--color-black);
    }
    textarea {
        max-width: none;
        min-height: 100px;
    }
    select {
        padding-left: 2px;
        text-transform: capitalize;
    }
    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        border: 1px solid #00000086;
    }
    .input-cls {
        max-width: none;
        width: 100%;
        font-size: 13px;
        padding: 5px 10px;
    }
    .tag-cls {
        font-size: 14px;
    }
    /* .rti--container {
        border: 1px solid #00000086;
    } */
    .btn {
        width: 100%;
        max-width: 150px;
        height: 100%;
        display: inline-block;
        background-color: var(--color-black);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s linear;
        text-transform: capitalize;
        font-size: calc(0.9rem + 0.1vw);
    }
    .btn:hover {
        background-color: var(--color-primary);
    }
    @media screen and (max-width: 600px) {
        .btn {
            margin: 0 auto;
            margin-top: -6px;
        }
    }
    &.dark {
        background-color: #1f2937;
        
        .title-row{
            color: #cccfd3;
        }
        .row label{
            color: var( --color-white);
        }
        .img {
            background-color: var( --color-white);
        }
        .textarea{
            background-color: var( --color-white);
            color: var( --color-black);
        }
        .rti--container {
            --rti-tag: #4d92d8;
        } 
    }
`;

export default EditJob;

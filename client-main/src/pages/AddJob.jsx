/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";

import { Job_Status, Job_Type, JOB_Modality, JOB_IncomePeriod, JOB_IncomeCurrency } from "../utils/JobData";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useThemeDash from "../context/ThemeDash"; 
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import "react-day-picker/dist/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TagsInput } from "react-tag-input-component";

const AddJob = () => {
    const { themeDashMode } = useThemeDash();
    const [isLoading, setIsLoading] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const [skills, setSkills] = useState([]);
    const [OptionalQualifications,setOptionalQualifications]=useState([]);
    const [benefits, setBenefits] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const newJob = {
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

        console.log(newJob)
        // posting;
        try {
            const response = await axios.post(
                "https://onr-backend.vercel.app/api/v1/jobs",
                newJob,
                {
                    withCredentials: true,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Done...",
                text: response?.data?.message,
            });

            reset();
            setDeadline(new Date());
            setSkills([]);
            setOptionalQualifications([]);
            setBenefits([]);
            // navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        }
        setIsLoading(false);
    };

    return (
        <Wrapper className={themeDashMode === 'dark' ? 'dark' : '' }>
            <div className="">
                <div className="title-row">
                    Create Job
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
                                    placeholder="Job Titre"
                                    {...register("titre", {
                                        required: {
                                            value: true,
                                            message: "Job Titre is required",
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
                                    defaultValue={"none"}
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
                                    defaultValue={"none"}
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
                                    defaultValue={"none"}
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
                                <label htmlFor="TargetProfile">Target Profile</label>
                                <input
                                    type="text"
                                    id="TargetProfile"
                                    name="TargetProfile"
                                    placeholder="Job Target Profile"
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
                                <label htmlFor="YearsRequired">Years Of Experience Required</label>
                                <input
                                    type="text"
                                    id="YearsRequired"
                                    name="YearsRequired"
                                    placeholder="Years Of Experience Require"
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
                                                "Job Vacancy can't 0 or smaller",
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
                                    defaultValue={"none"}
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
                                    defaultValue={"none"}
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
                                    minDate={
                                        new Date(
                                            new Date().getTime() +
                                                3 * 24 * 60 * 60 * 1000
                                        )
                                    }
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
                                <label htmlFor="titre">Job Benefits </label>
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
                            
                            <input
                                type="submit"
                                value="submit"
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
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-top: 0.5px;
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
        font-size: 1.3rem;
        font-weight: 700;
        display: flex;
        align-items: center;
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
        color: #f9fafb;
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
        }
        .rti--container {
            --rti-tag: #4d92d8;
        } 
        .content-row { box-shadow: 2px 2px 4px rgb(255 255 255 / 10%), -2px -2px 4px rgb(255 255 255 / 10%);}
    
    }
`;
export default AddJob;

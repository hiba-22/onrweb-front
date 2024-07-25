import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaCheck } from "react-icons/fa";
import Navbar from "../components/shared/Navbar";

dayjs.extend(advancedFormat);

const Service = () => {
    const { id } = useParams();

    const {
        isLoading,
        isError,
        data: service,
        error,
    } = useQuery({
        queryKey: ["Service", id],
        queryFn: () => getSingleHandler(`http://onr-backend.vercel.app/api/v1/services/${id}`),
    });

    if (isLoading) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }

    const formattedDate = dayjs(service?.publishedAt).format("MMM Do, YYYY");

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="content">
                    <div className="header">
                        <h2>{service?.titre}</h2>
                    </div>
                    <div className="body">
                        <div className="section">
                            
                            <div
                                className="description"
                                dangerouslySetInnerHTML={{ __html: service?.description }}
                            />
                        </div>
                        <div className="section">
                            <div className="form-1">
                                <div className="form">
                                    <h3>Our service offering :</h3>
                                    <ul>
                                        {service.services.map((service, index) => (
                                            <li key={index}>
                                                <strong>{service.split(':')[0]}</strong> : {service.split(':')[1]}
                                            </li>
                                        ))}
                                    </ul>
                                    <h3>Our community of experts :</h3>
                                    <ul>
                                        {service?.community?.map((comm, index) => (
                                            <li key={index}>{comm}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="images">
                                {service?.images?.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Image ${index}`}
                                        className={`image image-${index}`}
                                    />
                                ))}
                            </div>
                        </div>
                        </div>
                        {service?.principaux_outils_experts?.length > 0 && (
                             <div className="section">
                                <h2>Our experts' main tools :</h2>
                                    
                                    {service.principaux_outils_experts.map((comm, index) => (
                                        <p  className="p" key={index}>{comm}</p>
                                    ))}
                                    
                            </div>
                        )}
                       
                        <div className="section1">
                            <h2>Examples of references:</h2>
                            <ul>
                                {service?.references?.map((ref, index) => (
                                    <li  key={index}>
                                    <strong>{ref.split(':')[0]}</strong> : {ref.split(':')[1]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    .content {
        background: #fff;
        padding: 2rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .header h2 {
        font-size: 2rem;
        font-weight: bold;
    }

    .header .date {
        font-size: 1rem;
        color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header .icon {
        margin-right: 0.5rem;
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 2rem;
       
    }
    .p{
        color: #7a7a7a;
    }
    .section {
        padding: 1rem;
        
        border-radius: 8px;
    }


    .section h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        -webkit-text-stroke-width: thin;
    }
    .section h2 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        -webkit-text-stroke-width: thin;
        color: #7a7a7a;
    }
    .section ul {
        list-style-type: disc;
        margin-left: 2rem;
    }

    .section ul li {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #3f3f3f !important;
    }
    .section1 {
        padding: 1rem;
       
        border-radius: 8px;
    }


    .section1 h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        -webkit-text-stroke-width: thin;
    }
    .section1 h2 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        -webkit-text-stroke-width: thin;
        color: #7a7a7a;
    }
    .section1 ul {
        list-style-type: disc;
        margin-left: 2rem;
    }

    .section1 ul li {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #7a7a7a !important
    }


    .images {
        display: block;
        unicode-bidi: isolate;
        grid-template-areas:
            "image0 image0 image1"
            "image2 image2 image1";
        grid-gap: 1rem;
        justify-content: center;
        align-items: center;
        text-align: right;
        box-sizing: border-box;
    }

    .images .image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
    }

    .images .image-0 {
        grid-area: image0;
        transform: rotate(-3deg);
    }

    .images .image-1 {
        max-width: 55%;
    border-style: solid;
    border-width: 15px 15px 15px 15px;
    border-color: #FFFFFF;
    vertical-align: middle;
    display: inline-block;
    box-shadow: none;
    transition: opacity 1s;
    opacity: 1;
    margin-top: -50px;
    transform: rotate(1deg);
    }
    

    .images .image-2 {
        grid-area: image2;
    }
    .form-1 {
        margin-top: calc(30px + 1vw);
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
     
        grid-gap: calc(1rem + 0.5vw);
    }
`;

export default Service;

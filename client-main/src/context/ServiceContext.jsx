import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllHandler } from "../utils/FetchHandlers";

const serviceContext = React.createContext();

const ServiceContext = ({ children }) => {
    const [serviceLoading, setServiceLoading] = useState(true);
    const [serviceError, setServiceError] = useState({ status: false, message: "" });
    const [services, setServices] = useState({});

    const handleServiceFetch = async (url) => {
        setServiceLoading(true);
        try {
            const response = await axios.get(url, { withCredentials: true });
            setServiceError({ status: false, message: "" });
            setServices(response?.data);
        } catch (error) {
            setServiceError({ status: true, message: error?.message });
            setServices({ status: false });
            setServiceLoading(false);
        }
        setServiceLoading(false);
    };

    useEffect(() => {
        handleServiceFetch(
            `http://onr-backend.vercel.app/api/v1/services?page=1`
        );
    }, []);
    const passing = {
        serviceLoading,
        serviceError,
        services,
        setServices,
        handleServiceFetch,
    };

    return (
        <serviceContext.Provider value={passing}>{children}</serviceContext.Provider>
    );
};

const useServiceContext = () => useContext(serviceContext);

export { useServiceContext, ServiceContext };

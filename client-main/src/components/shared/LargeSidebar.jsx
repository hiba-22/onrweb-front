import React from "react";
import { BiUserCircle } from "react-icons/bi";
import styled from "styled-components";
import DashboardNavLinks from "./DashboardNavLinks";
import { useDashboardContext } from "../../Layout/DashboardLayout";
import { useUserContext } from "../../context/UserContext";
import useThemeDash from "../../context/ThemeDash"; 

const LargeSidebar = () => {
    const { themeDashMode } = useThemeDash();
    const { user } = useUserContext();
    const { showSidebar } = useDashboardContext();
    return (
        <Wrapper className={themeDashMode === 'dark' ? 'dark' : '' } >
            <div
                className={
                    !showSidebar
                        ? "sidebar-container show-sidebar"
                        : "sidebar-container"
                }
            >
                <div className="profile">
                    <BiUserCircle className="text-5xl font-normal" />
                    <h6 className="text-sm font-semibold capitalize mt-1">
                        {user?.username}
                    </h6>
                    <p className="text-xs capitalize -mt-1 font-medium">
                        {user?.role}
                    </p>
                </div>
                <div className="content">
                    <DashboardNavLinks />
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.aside`
    display: none;

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &.dark {
        background-color: #1a2330;
        color: #f9fafb;
        box-shadow: 2px 0px 0 0 rgb(58 148 210 / 56%);
        .start .toggler {
            
            color: var(--color-primary);
            cursor: pointer;
            border-radius: 6px;
            border: 1px solid var(--color-primary);
            
        }
    }
    @media (min-width: 992px) {
        display: block;
        box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
        .sidebar-container {
            background: var(--background-secondary-color);
            min-height: 100vh;
            height: 100%;
            width: 250px;
            margin-left: -250px;
            transition: margin-left 0.3s ease-in-out;
            padding: 2rem 0;
        }
        .content {
            position: sticky;
            top: 0;
        }
        .show-sidebar {
            margin-left: 0;
        }
        /* header {
            height: 6rem;
            display: flex;
            align-items: center;
            padding-left: 2.5rem;
        } */
        .nav-links {
            padding-top: 1.5rem;
            display: flex;
            flex-direction: column;
        }
        .nav-link {
            display: flex;
            align-items: center;
            color: var(--text-secondary-color);
            padding: 0.5rem 0;
            margin: 0.1rem 0;
            padding-left: 2.5rem;
            text-transform: capitalize;
            transition: all 0.3s linear;
            font-weight: 400;
            font-size: 16px;
            opacity: 0.8;
        }
        .nav-link:hover {
            background-color: rgba(0, 0, 0, 0.05);
            opacity: 0.9;
        }
        .icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            display: grid;
            place-items: center;
        }
        .active {
            color: var(--color-primary);
            font-weight: 600;
            background-color: rgba(0, 0, 0, 0.04);
            opacity: 0.9;
        }
        /* .pending {
            background: var(--background-color);
        } */
    }
`;

export default LargeSidebar;

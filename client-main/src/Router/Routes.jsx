import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Pages
import {
    Register,
    Activate,
    Login,
    Landing,
    SetPasswordGeust,
    ContactPage,
    Error,
    AllJobs,
    Stats,
    Profile,
    Admin,
    EditJob,
    AddJob,
    ManageJobs,
    Job,
    MyJobs,
    EditProfile,
    ManageUsers,
    ForgotPassword,
    ResetPassword,
    AddArticle,
    AllArticles,
    EditArticle,
    Article,
    ManageArticles,
    AddService,
    AllServices,
    EditService,
    Service,
    ManageServices,
} from "../pages";

import { JobContext } from "../context/JobContext";
import { ArticleContext  } from "../context/ArticleContext";
import { ServiceContext } from "../context/ServiceContext";
import CommonProtectRoute from "../components/shared/CommonProtectRoute";
import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
import RecruiterRoute from "../components/shared/RecruiterRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "contact",
                element: (
                    <ContactPage />

                ),
            },
        
            {
                path: "all-jobs",
                element: (
                    <JobContext>
                        <AllJobs />
                    </JobContext> 
                ),
            },
            {
                path: "job/:id",
                element: (
                    <JobContext>
                        <Job />
                    </JobContext>
                ),
            },
            {
                path: "all-articles",
                element: (
                    <ArticleContext>
                        <AllArticles/>
                    </ArticleContext>   
                ),
            },
            {
                path: "article/:id",
                element: (
                    <ArticleContext>
                        <Article />
                    </ArticleContext>
                ),
            },
            {
                path: "all-services",
                element: (
                    <ServiceContext>
                        <AllServices/>
                    </ServiceContext>   
                ),
            },
            {
                path: "service/:id",
                element: (
                    <ServiceContext>
                        <Service />
                    </ServiceContext>
                ),
            },

            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "activate/:token",
                element: <Activate></Activate>,
            },
            {
                path: "setPassword/:id/:token",
                element: <SetPasswordGeust></SetPasswordGeust>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "forgot_password",
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: "reset/:id/:token",
                element: <ResetPassword></ResetPassword>,
            },
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <DashboardLayout></DashboardLayout>
                        </JobContext>
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectAdminRoute>
                                <Stats />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "add-jobs",
                        element: (
                            <RecruiterRoute>
                                <AddJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-jobs",
                        element: (
                            <RecruiterRoute>
                                <ManageJobs />
                            </RecruiterRoute>
                        ),
                    },
                    
                    {
                        path: "add-articles",
                        element: (
                            <RecruiterRoute>
                                <AddArticle />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-articles",
                        element: (
                            <RecruiterRoute>
                                <ManageArticles />
                            </RecruiterRoute>
                        ),
                    },
                    
                    {
                        path: "add-services",
                        element: (
                            <RecruiterRoute>
                                <AddService />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-services",
                        element: (
                            <RecruiterRoute>
                                <ManageServices />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <ProtectAdminRoute>
                                <ManageUsers />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin",
                        element: (
                            <ProtectAdminRoute>
                                <Admin />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "edit-job/:id",
                        element: (
                            <RecruiterRoute>
                                <EditJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "edit-article/:id",
                        element: (
                            <RecruiterRoute>
                                <EditArticle />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "edit-service/:id",
                        element: (
                            <RecruiterRoute>
                                <EditService />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "my-jobs",
                        element: (
                            <CommonProtectRoute>
                                <MyJobs />
                            </CommonProtectRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;

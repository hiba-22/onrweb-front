import React, { useEffect, useState ,Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './App.css';
import router from "./Router/Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { ThemeProvider } from "./context/Theme";
import { ThemeDashProvider } from "./context/ThemeDash";
import "./i18n"
import BackToTopButton from "../src/components/shared/BackToTopButton";
import ChatBot from "../src/components/shared/ChatBot";
axios.defaults.withCredentials = true;

// Create a client
const queryClient = new QueryClient();

const Main = () => {
  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    setThemeMode('dark');
  };

  const lightTheme = () => {
    setThemeMode('light');
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  //dashbord themeMode 

  const [themeDashMode, setThemeDashMode] = useState('light');

  const darkThemeDash = () => {
    setThemeDashMode('dark');
  };

  const lightThemeDash = () => {
    setThemeDashMode('light');
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(themeDashMode);
  }, [themeDashMode]);

  return (
    <Suspense fallback={null}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
            <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
            <ThemeDashProvider value={{ themeDashMode, darkThemeDash, lightThemeDash}}>
              <UserContext>
                <RouterProvider router={router} ></RouterProvider>
                <BackToTopButton />
                <ChatBot/>
               
              </UserContext>
              </ThemeDashProvider>
              </ThemeProvider>
            </QueryClientProvider>
        </React.StrictMode>
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

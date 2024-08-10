import React, { useEffect, useState } from "react";
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
    <React.StrictMode>
     
        <QueryClientProvider client={queryClient}>
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <ThemeDashProvider value={{ themeDashMode, darkThemeDash, lightThemeDash}}>
          <UserContext>
            <RouterProvider router={router} ></RouterProvider>
          </UserContext>
          </ThemeDashProvider>
          </ThemeProvider>
        </QueryClientProvider>
      
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

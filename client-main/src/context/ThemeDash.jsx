import React, { createContext, useContext } from "react";

export const ThemeDashContext = createContext({
    themeDashMode: "light",
    darkThemeDash: () => {},
    lightThemeDash: () => {},
});

export const ThemeDashProvider = ({ children, value }) => (
    <ThemeDashContext.Provider value={value}>
        {children}
    </ThemeDashContext.Provider>
);

export default function useThemeDash() {
    return useContext(ThemeDashContext);
}

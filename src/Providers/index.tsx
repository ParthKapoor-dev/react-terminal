import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (

        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}
import { type ReactNode } from "react";
import type { AuthContextType } from "../types/interfaces";
export declare const AuthProvider: ({ children }: {
    children: ReactNode;
}) => import("react").JSX.Element;
export declare const useAuth: () => AuthContextType;

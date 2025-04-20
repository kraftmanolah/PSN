"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname
import axios, { AxiosError } from "axios";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const router = useRouter();
    const pathname = usePathname(); // Use usePathname to get the current route

    useEffect(() => {
        // Define routes where redirect to /signin should be skipped
        const publicRoutes = ["/signin", "/signup/individual", "/signup/company"];
        const isPublicRoute = publicRoutes.some(route => pathname === route);

        const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (savedToken) {
            setToken(savedToken);
            axios
                .get(`${backendUrl}/api/accounts/user/`, {
                    headers: { Authorization: `Token ${savedToken}` },
                })
                .then((res) => {
                    setUser(res.data);
                    setError(null);
                    setLoading(false);
                })
                .catch((err: AxiosError | any) => {
                    console.error("Failed to fetch user data:", err);
                    setError("Failed to load user data. Please sign in again.");
                    setLoading(false);
                    if (err.response?.status === 401) {
                        // Clear invalid token and redirect to signin, unless on a public route
                        localStorage.removeItem("token");
                        setToken(null);
                        setUser(null);
                        if (!isPublicRoute) {
                            router.push("/signin");
                        }
                    }
                });
        } else {
            setLoading(false);
            // Only redirect to /signin if not on a public route
            if (!isPublicRoute) {
                router.push("/signin");
            }
        }
    }, [router, pathname]); // Added pathname to dependencies

    const login = async (newToken: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", newToken);
        }
        setToken(newToken);
        setError(null);
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/api/accounts/user/`, {
                headers: { Authorization: `Token ${newToken}` },
            });
            setUser(res.data);
            setLoading(false);
        } catch (err: AxiosError | any) {
            console.error("Failed to fetch user data on login:", err);
            setError("Failed to fetch user data after login.");
            setLoading(false);
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
                router.push("/signin");
            }
        }
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        setToken(null);
        setUser(null);
        setError(null);
        router.push("/signin");
    };

    return { token, user, error, loading, login, logout };
}
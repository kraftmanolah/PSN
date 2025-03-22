
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // New loading state
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const router = useRouter();

    useEffect(() => {
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
                    setLoading(false); // Auth check complete
                })
                .catch((err: AxiosError | any) => {
                    console.error("Failed to fetch user data:", err);
                    setError("Failed to load user data. Please sign in again.");
                    setLoading(false);
                    if (err.response?.status === 401) {
                        localStorage.removeItem("token");
                        setToken(null);
                    }
                });
        } else {
            setLoading(false); // No token, auth check complete
        }
    }, []); // Run only once on mount

    const login = async (newToken: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", newToken);
        }
        setToken(newToken);
        setError(null);
        setLoading(true); // Start loading for user fetch
        try {
            const res = await axios.get(`${backendUrl}/api/accounts/user/`, {
                headers: { Authorization: `Token ${newToken}` },
            });
            setUser(res.data);
            setLoading(false);
            router.push("/dashboard"); // Redirect after successful login
        } catch (err: AxiosError | any) {
            console.error("Failed to fetch user data on login:", err);
            setError("Failed to fetch user data after login.");
            setLoading(false);
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                setToken(null);
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
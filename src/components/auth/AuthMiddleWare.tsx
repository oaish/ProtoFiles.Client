"use client"

import {useCallback, useEffect} from "react";
import {useSlider} from "@/components/shared/Provider";
import AuthCredentials from "@/components/auth/AuthCredentials";
import {useAtom} from "jotai/index";
import {userAtom} from "@/lib/atom";

export default function AuthMiddleWare() {
    const {handleSlider} = useSlider();
    const [, setUser] = useAtom(userAtom);

    const isLoggedIn = useCallback(async () => {
        if (!localStorage) return

        const jwt = localStorage.getItem("jwt");
        const user = JSON.parse(localStorage.getItem("user") as string);
        const res = await fetch(`${process.env.apiUrl}/api/User/VerifyJwt?username=${user?.username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        });

        if (res.ok) {
            setUser({
                id: user.id,
                email: user.email,
                username: user.username,
                isPinSet: user.isPinSet,
                isPinUnlock: user.isPinUnlock
            });
            const data = await res.json();
            data.exists && handleSlider(false);
        } else {
            handleSlider(true, <AuthCredentials/>);
        }
    }, [handleSlider, setUser]);

    useEffect(() => {
        handleSlider(true, <AuthCredentials/>);
        isLoggedIn().then();
    }, [handleSlider, isLoggedIn])

    return null;
}
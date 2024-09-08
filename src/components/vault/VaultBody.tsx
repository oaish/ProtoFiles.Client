"use client"

import {useAtom} from "jotai";
import {useEffect} from "react";
import s from "./VaultBody.module.css";
import {isPinDrawerOpenAtom, isProfileDrawerOpenAtom, pinVerifiedAtom} from "@/lib/atom";
import {FaLock} from "react-icons/fa6";

export default function VaultBody() {
    const [pinVerified] = useAtom(pinVerifiedAtom);
    const [, setPinDrawerOpen] = useAtom(isPinDrawerOpenAtom);
    const [, setProfileDrawerOpen] = useAtom(isProfileDrawerOpenAtom);

    useEffect(() => {
        if (!pinVerified) {
            setPinDrawerOpen(true);
            setProfileDrawerOpen(false);
        }
    }, [pinVerified, setPinDrawerOpen, setProfileDrawerOpen]);

    return (
        <>
            {!pinVerified && <VaultIsLocked/>}
        </>
    );
}

function VaultIsLocked() {
    return (
        <div className={s.vaultLockedBase}>
            <FaLock className={s.lockedIcon}/>
        </div>
    )
}
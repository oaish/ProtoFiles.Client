"use client"

import React from "react";
import {useAtom} from "jotai";
import {userAtom} from "@/lib/atom";
import s from "./HomeBody.module.css";
import {PiHardDrivesFill, PiVaultFill} from "react-icons/pi";
import {IoCreate} from "react-icons/io5";
import Link from "next/link";

export default function HomeBody() {
    const [user] = useAtom(userAtom);

    return (
        <div className={s.homeLayout}>
            <h3>Welcome, {user?.username}</h3>
            <DashBoard/>

            <h3>Collections</h3>

            <div className={s.underConstruction}>

            </div>

        </div>
    );
}

function DashBoard() {
    return (
        <div className={s.dashboard}>
            <Link className={s.dbItem} href="/issued">
                <PiHardDrivesFill className={s.dbItemIcon}/>
                <div className={s.dbItemContent}>
                    <div className={s.title}>Issued Documents</div>
                    <div className={s.desc}>Check your files in the cloud</div>
                </div>
            </Link>
            <Link className={s.dbItem} href="/create">
                <div className={s.dbItemContent}>
                    <div className={s.title}>Create Files</div>
                    <div className={s.desc}>Save your docs to cloud</div>
                </div>
                <IoCreate className={s.dbItemIcon}/>
            </Link>
            <Link className={s.dbItem} href="/vault">
                <PiVaultFill className={s.dbItemIcon}/>
                <div className={s.dbItemContent}>
                    <div className={s.title}>Vault Manager</div>
                    <div className={s.desc}>Save your secrets to cloud</div>
                </div>
            </Link>
        </div>
    )
}
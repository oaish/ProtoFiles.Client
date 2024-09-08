"use client"

import React from "react";
import Image from "next/image";
import s from "@/components/shared/Banner.module.css";
import {useSlider} from "@/components/shared/Provider";

export default function Banner({children, isActive}: {
    children: React.ReactNode;
    isActive: boolean | undefined;
}) {
    return (
        <div className={s.bannerBase + " " + (isActive && s.coverUp)}>
            <div className={s.bannerBody}>
                {children}
            </div>
            <div className={s.banner}>
                <Image src="/images/icon-192.png" width={25} height={25} priority={true} alt=""/>
                <Image src="/images/drive-text.png" width={130} height={20} priority={true} alt=""/>
            </div>
        </div>
    )
}
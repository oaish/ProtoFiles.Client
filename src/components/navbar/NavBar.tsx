"use client"

import s from "./NavBar.module.css"
import React, {useEffect, useMemo} from "react";
import {BsFillHouseFill} from "react-icons/bs";
import {FaSquarePlus} from "react-icons/fa6";
import {FaAward, FaUserCircle} from "react-icons/fa";
import {RiShieldStarFill} from "react-icons/ri";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PinInput} from "@/components/shared/PinInput";
import {useAtom} from "jotai";
import {isPinDrawerOpenAtom, isProfileDrawerOpenAtom} from "@/lib/atom";

const NavItem = (props: {
    icon: React.ReactNode;
    children?: React.ReactNode;
    title: string;
    link?: string;
    action?: Function;
    isDrawerOpen?: boolean;
}) => {
    const {icon, title, link, action, isDrawerOpen} = props;
    const pathname = usePathname();

    const isActive = () => pathname === link;

    return (
        <Link href={{pathname: link}}
              className={s.navItem + " " + ((isActive() || isDrawerOpen) ? s.active : s.inactive)}
              onClick={() => action && action()}>
            <span className={s.icon}>{icon}</span>
            <span className={s.title}>{title}</span>
        </Link>
    )
};

export const NavBar = () => {
    const [isPinDrawerOpen, setPinDrawerOpen] = useAtom(isPinDrawerOpenAtom);
    const [isProfileDrawerOpen, setProfileDrawerOpen] = useAtom(isProfileDrawerOpenAtom);

    useEffect(() => {
        if (isProfileDrawerOpen) setPinDrawerOpen(false);
        if (isPinDrawerOpen) setProfileDrawerOpen(false);
    }, [isPinDrawerOpen, isProfileDrawerOpen, setPinDrawerOpen, setProfileDrawerOpen]);

    const height = useMemo(() => (isProfileDrawerOpen ? 500 : (isPinDrawerOpen ? 200 : 0)) + "%", [isPinDrawerOpen, isProfileDrawerOpen]);

    return (
        <div className={s.navbar}>
            <NavItem icon={<BsFillHouseFill/>} title="Home" link="/"
                     action={() => {
                         if (isProfileDrawerOpen) setProfileDrawerOpen(false);
                         if (isPinDrawerOpen) setPinDrawerOpen(false);
                     }}
            />
            <NavItem icon={<FaAward/>} title="Issued" link="/docs"
                     action={() => {
                         if (isProfileDrawerOpen) setProfileDrawerOpen(false);
                         if (isPinDrawerOpen) setPinDrawerOpen(false);
                     }}
            />
            <NavItem icon={<FaSquarePlus/>} title="Create" link="/create"
                     action={() => {
                         if (isProfileDrawerOpen) setProfileDrawerOpen(false);
                         if (isPinDrawerOpen) setPinDrawerOpen(false);
                     }}
            />
            <NavItem icon={<RiShieldStarFill/>} title="Vault" link="/vault"
                     action={() => {
                         if (isProfileDrawerOpen) setProfileDrawerOpen(false);
                         if (isPinDrawerOpen) setPinDrawerOpen(false);
                     }}
                     isDrawerOpen={isPinDrawerOpen}
            />
            <NavItem icon={<FaUserCircle/>} title="Profile"
                     action={() => {
                         setPinDrawerOpen(false);
                         setProfileDrawerOpen(!isProfileDrawerOpen);
                     }}
                     isDrawerOpen={isProfileDrawerOpen}
            />

            <div className={s.drawer} style={{height: height}}>
                {isPinDrawerOpen && <PinInput/>}
            </div>
        </div>
    );
};

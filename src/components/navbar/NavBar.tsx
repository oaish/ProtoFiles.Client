"use client"

import s from "./NavBar.module.css"
import React from "react";
import {BsFillHouseFill} from "react-icons/bs";
import {IoSearch} from "react-icons/io5";
import {FaSquarePlus} from "react-icons/fa6";
import {FaUserCircle} from "react-icons/fa";
import {RiShieldStarFill} from "react-icons/ri";
import Link from "next/link";
import {usePathname} from "next/navigation";

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
        <Link href={{pathname: link}} className={s.navItem + " " + ((isActive() || isDrawerOpen) ? s.active : s.inactive)}
              onClick={() => action && action()}>
            <span className={s.icon}>{icon}</span>
            <span className={s.title}>{title}</span>
        </Link>
    )
};

export const NavBar = () => {
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <div className={s.navbar}>
            <NavItem icon={<BsFillHouseFill/>} title="Home" link="/"/>
            <NavItem icon={<IoSearch/>} title="Search" link="/search"/>
            <NavItem icon={<FaSquarePlus/>} title="Create" link="/create"/>
            <NavItem icon={<RiShieldStarFill/>} title="Vault" link="/vault"/>
            <NavItem icon={<FaUserCircle/>} title="Profile" action={() => setDrawerOpen(!isDrawerOpen)} isDrawerOpen={isDrawerOpen}/>

            <div className={s.drawer + " " + (isDrawerOpen ? s.active : s.inactive)}>

            </div>
        </div>
    );
};

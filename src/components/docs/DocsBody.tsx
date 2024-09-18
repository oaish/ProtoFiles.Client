"use client";
import s from "./DocsBody.module.css";
import {HiOutlineViewGrid} from "react-icons/hi";
import {FaChevronLeft} from "react-icons/fa6";
import Link from "next/link";
import {useState} from "react";

export default function DocsBody() {
    return (
        <div className={s.docsContainer}>
            <div className={s.header}>
                <Link href="/" className={s.back}><FaChevronLeft/></Link>
                <div className={s.title}>Docs Manager</div>
                <div className={s.switch}><HiOutlineViewGrid/></div>
            </div>
            <div className={s.container}>
                <DocItem/>
                <DocItem/>
                <DocItem/>
            </div>
        </div>
    );
}

const DocItem = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return <>
        <div className={`${s.docItemBase} ${isExpanded && s.expanded}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className={s.coverImageBase}>
                <img src="/images/question.svg" alt="" className={s.coverImage}/>
            </div>

        </div>
    </>;
}
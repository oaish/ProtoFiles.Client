"use client";
import s from "./DocsBody.module.css";
import {HiOutlineViewGrid} from "react-icons/hi";
import {FaChevronLeft} from "react-icons/fa6";
import Link from "next/link";
import {IoEye} from "react-icons/io5";
import {MdDelete, MdOutlineFileDownload} from "react-icons/md";
import Image from "next/image";

export default function DocsBody() {


    return (
        <div className={s.docsContainer}>
            <div className={s.header}>
                <Link href="/" className={s.back}><FaChevronLeft/></Link>
                <div className={s.title}>Docs Manager</div>
                <div className={s.switch}><HiOutlineViewGrid/></div>
            </div>
            <div className={s.container}>
                <DocItem coverImage="/images/Question.svg" title="SE-COMPS B Timetable" type="pdf"/>
                <DocItem coverImage="/images/Question.svg" title="IA1 Solution" type="png"/>
                <DocItem coverImage="/images/Question.svg" title="Question" type="pdf"/>
            </div>
        </div>
    );
}

type DocItemProps = {
    title: string,
    type: string,
    fileId?: string,
    coverImage: string
}

const DocItem = ({
                     title, type, coverImage, fileId
                 }: DocItemProps) => {
    return <>
        <div className={s.docItemBase}>
            <div className={s.coverImageBase}>
                <Image src={coverImage} width={40} height={40} alt="" className={s.coverImage}/>
            </div>
            <div className={s.docDetails}>
                <div className={s.docTitle}>{title}</div>
                <div className={s.tags}>
                    <div className={s.tag} style={{backgroundColor: `var(--${type}-tag-color)`}}>{type}</div>
                    <button className={`${s.tag} ${s.viewTag}`}><IoEye/> view</button>
                    <button className={`${s.tag} ${s.downloadTag}`}><MdOutlineFileDownload/> download</button>
                    <button className={`${s.tag} ${s.deleteTag}`}><MdDelete/> delete</button>
                </div>
            </div>
        </div>
    </>;
}

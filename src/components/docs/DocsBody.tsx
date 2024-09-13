import s from "./DocsBody.module.css";
import {HiOutlineViewGrid} from "react-icons/hi";

export default function DocsBody() {
    return (
        <div className={s.docsContainer}>
            <div className={s.header}>
                <div className={s.title}>Docs Manager</div>
                <div className={s.switch}><HiOutlineViewGrid/></div>
            </div>
            <div className={s.container}>

            </div>
        </div>
    );
}
import s from "./Loader.module.css"

export default function Loader() {
    return (
        <div className={s.container}>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
        </div>
    );
}
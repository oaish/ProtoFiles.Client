import s from "./CreateBody.module.css";
import {LuUpload} from "react-icons/lu";
import {RxReset} from "react-icons/rx";

export default function CreateBody() {
    return (
        <form className={s.createContainer}>
            <div className={s.header}>
                <div className={s.title}>Create Files</div>
                <button type="reset" className={s.switch}><RxReset/></button>
            </div>
            <div className={s.container}>
                <div className={s.createForm}>
                    <div className={s.coverImageContainer}>
                        <div className={s.title}>Upload Cover Image</div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={s.coverImage} src="/images/404.png" alt=""/>
                        <div className={s.coverImageEdit}>
                            <div className={s.text}>Cover Image</div>
                            <button type="button">Upload <LuUpload/>
                                <input type="file" name="file" accept="image/*"/>
                            </button>
                        </div>
                    </div>

                    <div className={s.inputContainer}>
                        <div className={s.title}>Upload File</div>
                        <div className={s.content}>
                            <input type="file" name="file"/>
                        </div>
                    </div>
                    <div className={s.inputContainer}>
                        <div className={s.title}>File Name</div>
                        <div className={s.content}>
                            <input type="text" name="fileName" id="" placeholder="Enter file name"/>
                        </div>
                    </div>
                    <button type="submit" className={s.submitButton}>Submit</button>
                </div>
            </div>
        </form>
    );
}
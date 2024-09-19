"use client"

import s from "./CreateBody.module.css";
import {LuUpload} from "react-icons/lu";
import {RxReset} from "react-icons/rx";
import {ChangeEvent, FormEvent, useState} from "react";
import {convertBlobToBase64} from "@/lib/helpers";

export default function CreateBody() {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState<File | null>();
    const [coverImage, setCoverImage] = useState("/images/question.svg");

    const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file (Blob)
        if (file) {
            try {
                const base64String = await convertBlobToBase64(file);
                setCoverImage(base64String);
            } catch (error) {
                console.error("Failed to convert blob to base64", error);
            }
        }
    }

    const validatePayload = (): { isInvalid: boolean, messages: string[] } => {
        let isInvalid = false;
        let messages = []

        if (!fileName || fileName?.length < 2) {
            isInvalid = true;
            messages.push("File name should have atleast 2 characters");
        }

        if (!file) {
            isInvalid = true;
            messages.push("Please upload a file");
        }

        return {
            isInvalid: isInvalid,
            messages: messages
        }
    }

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file?.size < 104900000)
            setFile(file);
        else {
            console.log("File size exceeds 100 MB");
            e.target.value = '';
        }
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const jwt = localStorage?.getItem("jwt");
        const userString = localStorage?.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        const validRes = validatePayload();
        if (validRes.isInvalid) {
            console.log("Invalid payload");
            return;
        }

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("userGuid", user?.id);
        formData.append("coverImage", coverImage);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Drive/AddFile`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            body: formData
        });

        try {
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.error("Something Went Wrong");
        }

    }

    return (
        <form className={s.createContainer} onSubmit={handleFormSubmit}>
            <div className={s.header}>
                <div className={s.title}>Create Files</div>
                <button type="reset" className={s.switch} onClick={() => {
                    setFileName("");
                    setFile(null);
                    setCoverImage("/images/question.svg");
                }}><RxReset/></button>
            </div>
            <div className={s.container}>
                <div className={s.createForm}>
                    <div className={s.coverImageContainer}>
                        <div className={s.title}>Upload Cover Image</div>
                        <div className={s.coverImageBase}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={`${s.coverImage} ${coverImage != "/images/question.svg" && s.active}`}
                                 src={coverImage} alt="cover-image"
                            />
                        </div>
                        <div className={s.coverImageEdit}>
                            <div className={s.text}>Cover Image</div>
                            <button type="button">Upload <LuUpload/>
                                <input type="file" name="file" accept="image/*" onChange={handleCoverImageUpload}/>
                            </button>
                        </div>
                    </div>

                    <div className={s.inputContainer}>
                        <div className={s.title}>Upload File</div>
                        <div className={s.content}>
                            <input type="file" name="file" onChange={handleFileUpload}/>
                        </div>
                    </div>
                    <div className={s.inputContainer}>
                        <div className={s.title}>File Name</div>
                        <div className={s.content}>
                            <input type="text" name="fileName" id="" placeholder="Enter file name"
                                   value={fileName} onChange={(e) => setFileName(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className={s.submitButton}>Submit</button>
                </div>
            </div>
        </form>
    );
}
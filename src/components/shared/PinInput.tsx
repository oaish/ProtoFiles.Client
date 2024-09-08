import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./PinInput.module.css"
import {useAtom} from "jotai/index";
import {isPinDrawerOpenAtom, isProfileDrawerOpenAtom, pinVerifiedAtom, userAtom} from "@/lib/atom";
import {API_URI} from "@/lib/declarations";
import {useRouter} from "next/navigation";

export function PinInput() {
    const [user] = useAtom(userAtom);
    const [pin, setPin] = useState<string[]>(new Array(4).fill(""));
    const [, setPinVerified] = useAtom(pinVerifiedAtom);
    const [, setPinDrawerOpen] = useAtom(isPinDrawerOpenAtom);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (index < 3 && value !== "") {
                const nextInput = document.getElementById(`pin-${index + 1}`);
                nextInput?.focus();
            }

            if (index === 3 && newPin.join("").length === 4) {
                verifyPin(newPin).then();
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (index > 0) {
                const prevInput = document.getElementById(`pin-${index - 1}`);
                prevInput?.focus();
            }
            const newPin = [...pin];
            newPin[index] = "";
            setPin(newPin);
        } else if (e.key === "ArrowLeft") {
            if (index > 0) {
                const prevInput = document.getElementById(`pin-${index - 1}`);
                prevInput?.focus();
            }
        } else if (e.key === "ArrowRight") {
            if (index < 4) {
                const nextInput = document.getElementById(`pin-${index + 1}`);
                nextInput?.focus();
            }
        } else if (e.key === "Enter") {
            verifyPin().then();
        }
    };

    const verifyPin = async (newPin: string[] = pin) => {
        const str = newPin.join("");
        const value = parseInt(str);

        if (str.length < 4) return;

        let username: string = "";

        if (!user) {
            if (localStorage)
                username = JSON.parse(localStorage.getItem("user") as string).username;
        } else {
            username = user.username;
        }

        const res = await fetch(`${API_URI}/User/VerifyPin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                pin: value
            })
        })

        if (res.ok) {
            const response = await res.json();
            if (response.isValid) {
                setPinDrawerOpen(false);
                setPinVerified(true);
            }
        }
    }

    return (
        <div className={s.pinInputBase}>
            {pin.map((digit, index) => (
                <input
                    key={index}
                    id={`pin-${index}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    inputMode="numeric"
                    className={s.inputBox}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
}
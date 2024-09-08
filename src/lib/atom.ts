import {atom} from "jotai";

type User = {
    id: string,
    email: string,
    username: string,
    isPinSet: boolean,
    isPinUnlock: boolean,
};

export const userAtom = atom<User>();
export const pinVerifiedAtom = atom(false);
export const isPinDrawerOpenAtom = atom(false);
export const isProfileDrawerOpenAtom = atom(false);
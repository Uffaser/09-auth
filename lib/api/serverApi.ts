import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export async function fetchNotes() {

}

export async function fetchNoteById() {

}

export async function checkSession() {
    const cookiesStore = await cookies();
    const res = nextServer.get('/auth/session', {
        headers: { Cookie: cookiesStore.toString() }
    })
    return res;
}

export async function getMe(): Promise<User> {
    const cookiesStore = await cookies();
    const {data} = await nextServer.get<User>('/users/me', {
        headers: { Cookie: cookiesStore.toString() }
    })
    return data;
}
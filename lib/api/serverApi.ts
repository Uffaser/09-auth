import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { GetNotesResponse } from "./clientApi";

const cookiesStore = await cookies();

export async function fetchNotes(page:number, search:string, tag?:string):Promise<GetNotesResponse>{
    const { data } = await nextServer.get<GetNotesResponse>('/notes', {
        params: {
            page: page,
            perPage: 12,
            search: search,
            tag: tag,
        }, 
        headers: { Cookie: cookiesStore.toString() }
    });
    return data
}
    
export async function fetchNoteById(id: string) {
    const { data } = await nextServer.get<Note>(`/notes/${id}`, {
        headers: { Cookie: cookiesStore.toString() }
    });
    return data
}

export async function checkSession() {
    const res = nextServer.get('/auth/session', {
        headers: { Cookie: cookiesStore.toString() }
    })
    return res;
}

export async function getMe(): Promise<User> {
    const {data} = await nextServer.get<User>('/users/me', {
        headers: { Cookie: cookiesStore.toString() }
    })
    return data;
}
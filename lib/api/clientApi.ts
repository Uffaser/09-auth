import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface GetNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface PostNote {
    title: string;
    content: string;
    tag: string;
}

export interface RegisterRequest {
    email: string,
    password: string,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface CheckSessionRequest {
	success: boolean,
}

interface updateUser {
    username: string
}

export async function fetchNotes(page:number, search:string, tag?:string):Promise<GetNotesResponse> {
	const { data } = await nextServer.get<GetNotesResponse>('/notes', {
		params: {
			page: page,
			perPage: 12,
			search: search,
			tag: tag,
		},
	});
    return data
}

export async function fetchNoteById(id: string) {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data
}

export async function createNote(newNote:PostNote):Promise<Note> {
    const { data } = await nextServer.post<Note>('/notes', newNote);
    return data
}


export async function deleteNote(id: string):Promise<Note> {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data
}

export async function register(userInfo: RegisterRequest) {
    const { data } = await nextServer.post<User>('/auth/register', userInfo);
    return data
}

export async function login(userInfo: LoginRequest){
    const { data } = await nextServer.post<User>('/auth/login', userInfo);
    return data
}

export async function logout():Promise<void>{
    await nextServer.post('/auth/logout')
};

export async function checkSession(){
    const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
    return data.success
}

export async function getMe(){
    const { data } = await nextServer.get<User>('/users/me')
    return data
}

export async function updateMe(updateUser: updateUser) {
    const { data } = await nextServer.patch<User>('/users/me', updateUser);
    return data;
}

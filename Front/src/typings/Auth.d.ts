export type LoginRequestModel = {
    email: string;
    password: string;
}

export type RegisterRequestModel = {
    username: string;
    email: string;
    password: string;
    language_iso: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}
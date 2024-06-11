export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role_id: string;
    role_name?: string;
    faculty: string;
    gender: string;
    nim: string;
    created_at?: string;
    updated_at?: string;
}

export interface ISubject {
    id: number;
    lecturer_id: number;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
}

export interface IAttendance {
    id: number;
    subject_id: string;
    name: string;
    desc: string;
    subject_name: string;
    start_at: string;
    end_at: string;
}

export interface IRole {
    id: number;
    name: string;
}

interface ISubmission {
    id: number;
    status: string;
    created_at: string;
    user_name: string;
    user_nim: string;
    subject_name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: IUser;
    };
    subjects?: ISubject[];
    attendances?: IAttendance[];
    users?: IUser[];
    roles?: IRole[];
    submissions?: ISubmission[];
};

export type MenuItemProp = {
    title: string;
    href: string;
    icon: React.ReactNode;
    variant:
        | "link"
        | "default"
        | "ghost"
        | "destructive"
        | "outline"
        | "secondary"
        | null
        | undefined;
};

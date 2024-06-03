export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role_id: string;
    faculty: string;
    gender: string;
    nim: string;
}

export interface ISubject {
    id: number;
    lecturer_id: number;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: IUser;
    };
    subjects?: ISubject[];
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

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role_id: string;
    faculty:string;
    gender: string;
    nim: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: IUser;
    };
};

export type MenuItemProp = {
    title: string;
    href: string;
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

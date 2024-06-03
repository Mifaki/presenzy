import { ChevronsDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/Components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ISubject } from "@/types";

const convertUTCToWIB = (utcTime: string): string => {
    const utcDate = new Date(utcTime);
    const wibDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
    return wibDate.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
};

export const columns: ColumnDef<ISubject>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "lecturer_id",
        header: "Lecturer ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "desc",
        header: "Description",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => convertUTCToWIB(row.original.created_at),
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => convertUTCToWIB(row.original.updated_at),
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="flex items-center gap-1 p-2 bg-slate-100 rounded-lg">
                        Action
                        <ChevronsDown className="size-4" />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

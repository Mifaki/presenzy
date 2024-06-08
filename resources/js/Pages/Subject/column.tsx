import { ChevronsDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { ISubject } from "@/types";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

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
        cell: ({ row }) => row.original.created_at,
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => row.original.updated_at,
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const handleEdit = () => {
                router.visit(route("subject.edit", row.original.id));
            };

            const handleDelete = () => {
                Inertia.delete(route("subject.destroy", row.original.id));
                window.location.reload();
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="flex items-center gap-1 p-2 bg-blue-50 dark:bg-gray-800 dark:text-white rounded-lg">
                            Action
                            <ChevronsDown className="size-4" />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

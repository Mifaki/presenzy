import { ChevronsDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { IUser } from "@/types";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "role_name",
        header: "Role",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "faculty",
        header: "Faculty",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "nim",
        header: "NIM",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const handleEdit = () => {
                router.visit(route("user.edit", row.original.id));
            };

            const handleDelete = () => {
                Inertia.delete(route("user.destroy", row.original.id));
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

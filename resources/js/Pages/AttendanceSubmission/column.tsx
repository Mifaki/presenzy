import { ColumnDef } from "@tanstack/react-table";
import { ISubmission } from "@/types";

const formatIndonesianDate = (utcDateString: string): string => {
    const date = new Date(utcDateString);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return date.toLocaleString('id-ID', options) + ' WIB';
}

export const columns: ColumnDef<ISubmission>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "user_name",
        header: "Student Name",
    },
    {
        accessorKey: "user_nim",
        header: "Student NIM",
    },
    {
        accessorKey: "subject_name",
        header: "Subject Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "created_at",
        header: "Time Stamp",
         cell: ({ row }) => formatIndonesianDate(row.original.created_at),
    },
];

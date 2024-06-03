import { columns } from "./column";
import { DataTable } from "@/Components/DataTable";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { IAttendance, PageProps } from "@/types";
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { DiamondPlus } from "lucide-react";

const Attendance = ({ attendances, auth }: PageProps<{ attendances: IAttendance[] }>) => {
    const [nameFilter, setNameFilter] = useState("");
    const [debouncedNameFilter] = useDebounce(nameFilter, 800);

    const filteredAttendances = debouncedNameFilter
        ? attendances.filter(attendance => attendance.name.toLowerCase().includes(debouncedNameFilter.toLowerCase()))
        : attendances;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Attendance
                </h2>
            }
        >
            <Head title="Attendance" />

            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex items-center justify-between">
                    <Input
                        type="text"
                        placeholder="Filter by name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button
                        onClick={() => router.visit(route("attendance.create"))}
                    >
                        <DiamondPlus className="text-white dark:text-black size-5 font-semibold mr-2" />
                        Create New Attendance
                    </Button>
                </div>
                <DataTable columns={columns} data={filteredAttendances} />
            </div>
        </AuthenticatedLayout>
    );
}

export default Attendance;

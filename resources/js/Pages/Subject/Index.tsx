import { columns } from "./column";
import { DataTable } from "@/Components/DataTable";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { ISubject, PageProps } from "@/types";
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { DiamondPlus } from "lucide-react";

const Subjects = ({ subjects, auth }: PageProps<{ subjects: ISubject[] }>) => {
    const [nameFilter, setNameFilter] = useState("");
    const [debouncedNameFilter] = useDebounce(nameFilter, 800);

    const filteredSubjects = debouncedNameFilter
        ? subjects.filter(subject => subject.name.toLowerCase().includes(debouncedNameFilter.toLowerCase()))
        : subjects;


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Subject
                </h2>
            }
        >
            <Head title="Subject" />

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
                     onClick={() => router.visit(route("subject.create"))}
                    >
                        <DiamondPlus className="text-white dark:text-black size-5 font-semibold mr-2" />
                        Create New Subject
                    </Button>
                </div>
                <DataTable columns={columns} data={filteredSubjects} />
            </div>
        </AuthenticatedLayout>
    );
}

export default Subjects;

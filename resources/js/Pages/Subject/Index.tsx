import { DataTable } from "@/Components/DataTable"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { ISubject, PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import { columns } from "./column"

const Subjects = ({ subjects, auth }: PageProps<{ subjects: ISubject[] }>) => {
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
                <DataTable columns={columns} data={subjects} />
            </div>
        </AuthenticatedLayout>
    )
}

export default Subjects

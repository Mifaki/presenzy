import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

const Attendance = ({ auth }: PageProps) => {
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

            <div className="flex flex-col gap-4 md:gap-8"></div>
        </AuthenticatedLayout>
    )
}

export default Attendance

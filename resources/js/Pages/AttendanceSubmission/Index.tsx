import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { columns } from './column';

const AttendanceSubmissionIndex = ({ submissions = [], auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Attendance Submissions
                </h2>
            }
        >
            <Head title="Attendance Submissions" />
            <DataTable columns={columns} data={submissions} />
        </AuthenticatedLayout>
    );
};

export default AttendanceSubmissionIndex;

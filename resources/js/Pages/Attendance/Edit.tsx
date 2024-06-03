import React, { FormEventHandler } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IAttendance, PageProps, ISubject } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from '@/Components/ui/input';
import { TimeInput } from '@/Components/TimeInput';
import { InputError } from '@/Components/ui/InputError';

const Edit = ({ attendance, auth, subjects }: PageProps<{ attendance: IAttendance, subjects: ISubject[] }>) => {
    const { data, setData, put, errors, processing } = useForm({
        subject_id: attendance.subject_id.toString(),
        name: attendance.name,
        desc: attendance.desc,
        start_at: attendance.start_at.split(" ")[1].slice(0, 5),
        end_at: attendance.end_at.split(" ")[1].slice(0, 5),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('attendance.update', attendance.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Edit Attendance
                </h2>
            }
        >
            <Head title="Edit Attendance" />

            <section>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <label htmlFor="subject_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                        </label>
                        <Select
                            defaultValue={data.subject_id}
                            onValueChange={(value) => setData('subject_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>{subjects.find(subject => subject.id === parseInt(data.subject_id))?.name || 'Select a subject'}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map(subject => (
                                    <SelectItem key={subject.id} value={subject.id.toString()}>
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError className="mt-2" message={errors.subject_id} />
                    </div>

                    <div>
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Input
                            id="desc"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.desc}
                            onChange={(e) => setData('desc', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.desc} />
                    </div>

                    <div>
                        <label htmlFor="start_at" className="block text-sm font-medium text-gray-700">
                            Start At
                        </label>
                        <TimeInput
                            id="start_at"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.start_at}
                            onChange={(e: any) => setData('start_at', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.start_at} />
                    </div>

                    <div>
                        <label htmlFor="end_at" className="block text-sm font-medium text-gray-700">
                            End At
                        </label>
                        <TimeInput
                            id="end_at"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.end_at}
                            onChange={(e: any) => setData('end_at', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.end_at} />
                    </div>

                    <div>
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                        </div>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
};

export default Edit;

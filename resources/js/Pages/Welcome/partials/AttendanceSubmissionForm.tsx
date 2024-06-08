import { InputError } from '@/Components/ui/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { useForm } from '@inertiajs/react'
import React, { FormEventHandler, useEffect } from 'react'

const AttendanceSubmissionForm = ({
    className = "",
    userData = {}
}: {
    className?: string;
    userData?: any;
})  => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        id: userData.id || "",
        name: userData.name || "",
        nim: userData.nim || "",
        email: userData.email || "",
        faculty: userData.faculty || "",
        gender: userData.gender || "",
    });

    const createAttendanceSubmission: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("attendance-submission.create"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <section className={className}>
            <form onSubmit={createAttendanceSubmission} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="id">ID</Label>
                    <Input
                        id="id"
                        value={data.id}
                        onChange={(e) => setData("id", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="id"
                    />
                    <InputError message={errors.id} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        disabled={true}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="email"
                        disabled={true}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="nim">NIM</Label>
                    <Input
                        id="nim"
                        value={data.nim}
                        onChange={(e) => setData("nim", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="nim"
                        disabled={true}
                    />
                    <InputError message={errors.nim} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="faculty">Fakultas</Label>
                    <Input
                        id="faculty"
                        value={data.faculty}
                        onChange={(e) => setData("faculty", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="faculty"
                        disabled={true}
                    />
                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <Input
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData("gender", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="gender"
                        disabled={true}
                    />
                    <InputError message={errors.gender} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Submit</Button>
                </div>
            </form>
        </section>
    )
}

export default AttendanceSubmissionForm;

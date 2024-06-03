import { InputError } from '@/Components/ui/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { useForm } from '@inertiajs/react'
import React, { FormEventHandler } from 'react'

const AttendanceSubmissionForm = ({
    className = "",
}: {
    className?: string;
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
        name: "",
        nim: "",
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
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) =>
                            setData("name", e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                    />

                    <InputError
                        message={errors.name}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="nim">NIM</Label>

                    <Input
                        id="nim"
                        value={data.nim}
                        onChange={(e) =>
                            setData("nim", e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="nim"
                    />

                    <InputError
                        message={errors.nim}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Submit</Button>
                </div>
            </form>
        </section>
    )
}

export default AttendanceSubmissionForm

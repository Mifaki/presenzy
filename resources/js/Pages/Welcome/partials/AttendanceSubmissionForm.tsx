import { InputError } from '@/Components/ui/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { useForm } from '@inertiajs/react'
import React, { FormEventHandler, useEffect } from 'react'

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
        id: "",
        name: "",
        nim: "",
    });

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                if (data.id.trim() !== "") {
                    const requestBody = new URLSearchParams({
                        id: data.id.trim(),
                    }).toString();

                    const response = await fetch('/user-by-id', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: requestBody,
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setData(userData);
                    } else {
                        console.error('Failed to fetch user data', response);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserById();
    }, [data.id, setData]);

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
                        onChange={(e) =>
                            setData("id", e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="id"
                    />

                    <InputError
                        message={errors.id}
                        className="mt-2"
                    />
                </div>
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
                        disabled={true}
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
                        disabled={true}
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

export default AttendanceSubmissionForm;

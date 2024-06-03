import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, ISubject } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/InputError";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { TimeInput } from "@/Components/TimeInput";

const Create = ({ auth, subjects }: PageProps<{ subjects: ISubject[] }>) => {
    const { data, setData, post, errors, processing } = useForm({
        subject_id: "",
        name: "",
        desc: "",
        start_at: "",
        end_at: ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create New Attendance
                </h2>
            }
        >
            <Head title="Create Attendance" />

            <section>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="subject_id">Subject</Label>
                        <Select
                            onValueChange={(value) => setData("subject_id", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
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
                        <Label htmlFor="desc">Description</Label>
                        <Input
                            id="desc"
                            className="mt-1 block w-full"
                            value={data.desc}
                            onChange={(e) => setData("desc", e.target.value)}
                            required
                            autoComplete="desc"
                        />
                        <InputError className="mt-2" message={errors.desc} />
                    </div>

                    <div>
                        <Label htmlFor="start_at">Start At</Label>
                        <TimeInput
                            id="start_at"
                            className="mt-1 block w-full"
                            value={data.start_at}
                            onChange={(e: any) => setData("start_at", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.start_at} />
                    </div>

                    <div>
                        <Label htmlFor="end_at">End At</Label>
                        <TimeInput
                            id="end_at"
                            className="mt-1 block w-full"
                            value={data.end_at}
                            onChange={(e: any) => setData("end_at", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.end_at} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create</Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}

export default Create;

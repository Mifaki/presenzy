import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/InputError";
import { Button } from "@/Components/ui/button";

const Create = ({ auth }: PageProps) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
        desc: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("subject.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create New Subject
                </h2>
            }
        >
            <Head title="Subject" />

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

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create</Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}

export default Create

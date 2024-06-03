import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/InputError";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            faculty: user.faculty,
            gender: user.gender,
            nim: user.nim,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <Label htmlFor="role_id">Role</Label>
                    <Select
                        onValueChange={(value) => setData("role_id", value)}
                        defaultValue={data.role_id}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Admin</SelectItem>
                            <SelectItem value="2">Lecturer</SelectItem>
                            <SelectItem value="3">Student</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError className="mt-2" message={errors.role_id} />
                </div>

                <div>
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input
                        id="faculty"
                        className="mt-1 block w-full"
                        value={data.faculty}
                        onChange={(e) => setData("faculty", e.target.value)}
                        required
                        autoComplete="faculty"
                    />
                    <InputError className="mt-2" message={errors.faculty} />
                </div>

                <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        onValueChange={(value) => setData("gender", value)}
                        defaultValue={data.gender}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError className="mt-2" message={errors.gender} />
                </div>

                <div>
                    <Label htmlFor="nim">NIM</Label>
                    <Input
                        id="nim"
                        className="mt-1 block w-full"
                        value={data.nim}
                        onChange={(e) => setData("nim", e.target.value)}
                        required
                        autoComplete="nim"
                    />
                    <InputError className="mt-2" message={errors.nim} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

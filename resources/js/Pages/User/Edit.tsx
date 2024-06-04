import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IRole, IUser, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/InputError";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const Edit = ({ auth, users, roles }: PageProps<{ auth: IUser, users: IUser, roles: IRole[] }>) => {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        id: users.id || "",
        name: users.name || "",
        email: users.email || "",
        faculty: users.faculty || "",
        gender: users.gender || "",
        nim: users.nim || "",
        role_id: users.role_id || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("user.update", users.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create New User
                </h2>
            }
        >
            <Head title="User" />

            <section>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="id">ID</Label>
                        <Input
                            id="id"
                            className="mt-1 block w-full"
                            value={data.id}
                            onChange={(e) => setData("id", e.target.value)}
                            required
                            autoComplete="id"
                        />
                        <InputError className="mt-2" message={errors.id} />
                    </div>

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
                            autoComplete="email"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <Label htmlFor="role_id">Role</Label>
                        <Select
                            defaultValue={data.role_id}
                            onValueChange={(value) => setData('role_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>{roles.find(role => role.id === parseInt(data.role_id))?.name || 'Select a role'}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map(role => (
                                    <SelectItem key={role.id} value={role.id.toString()}>
                                        {role.name}
                                    </SelectItem>
                                ))}
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
                        />
                        <InputError className="mt-2" message={errors.faculty} />
                    </div>

                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            defaultValue={data.gender}
                            onValueChange={(value) => setData("gender", value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>{data.gender || 'Select a gender'}</SelectValue>
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
                        />
                        <InputError className="mt-2" message={errors.nim} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create</Button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}

export default Edit;

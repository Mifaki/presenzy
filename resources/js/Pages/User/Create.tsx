import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/InputError";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import axios from "axios";

const Create = ({ auth }: PageProps) => {
    const [newUid, setNewUid] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUid();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchUid = async () => {
        try {
            const response = await axios.get('/UIDContainer.php');
            console.log('inisiate')
            if (newUid !== response.data) {
                console.log('called')
                setNewUid(response.data);
                setData(prevState => ({
                    ...prevState,
                    id: response.data
                }));

            }
        } catch (error) {
            console.error('Error fetching UID:', error);
        }
    };

    const {
        data,
        setData,
        errors,
        post,
        processing,
    } = useForm({
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        faculty: "",
        gender: "",
        nim: "",
        role_id: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("user.store"));
    };


    useEffect(() => {
        console.log('newUid', newUid)
        console.log('data', data.id)
    }, [data])

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
                            disabled={true}
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
                            onValueChange={(value) => setData("role_id", value)}
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Retype Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.password_confirmation} />
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
                            onValueChange={(value) => setData("gender", value)}
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

export default Create;

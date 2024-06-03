import { FormEventHandler, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { InputError } from "@/Components/ui/InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        role_id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        faculty: "",
        gender: "",
        nim: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    value={data.name}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    value={data.email}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    value={data.password}
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Retype Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    value={data.password_confirmation}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="faculty">Faculty</Label>
                                <Input
                                    id="faculty"
                                    placeholder="Faculty of Computer Science"
                                    onChange={(e) =>
                                        setData("faculty", e.target.value)
                                    }
                                    value={data.faculty}
                                    required
                                />
                                <InputError message={errors.faculty} />
                            </div>
                            <div className="grid gap-2">
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
                                <InputError message={errors.role_id} />
                            </div>
                            <div className="grid gap-2">
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
                                <InputError message={errors.gender} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nim">NIM</Label>
                                <Input
                                    id="nim"
                                    placeholder="Student Number"
                                    onChange={(e) =>
                                        setData("nim", e.target.value)
                                    }
                                    value={data.nim}
                                    required
                                />
                                <InputError message={errors.nim} />
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </GuestLayout>
    );
}

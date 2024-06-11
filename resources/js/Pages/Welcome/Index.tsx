import { InputError } from '@/Components/ui/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

const Welcome = ({ className = "" }) => {
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        nim: "",
        email: "",
        faculty: "",
        gender: "",
    });
    const [message, setMessage] = useState("");
    const [newUid, setNewUid] = useState("");

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        id: "",
        name: "",
        nim: "",
        email: "",
        faculty: "",
        gender: "",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUid();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchUid = async () => {
        try {
            const response = await axios.get('/UIDContainer.php');
            if (newUid !== response.data) {
                setNewUid(response.data);
            }
        } catch (error) {
            console.error('Error fetching UID:', error);
        }
    };

    const fetchUserData = async (uid: any) => {
        try {
            const response = await axios.post('/api/user-by-id', new URLSearchParams({ id: uid }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            setUserData(response.data);
            setMessage(response.data.message || '');
            setData({
                id: response.data.id,
                name: response.data.name,
                nim: response.data.nim,
                email: response.data.email,
                faculty: response.data.faculty,
                gender: response.data.gender,
            });

        } catch (error: any) {
            console.error('Error fetching user data:', error);
            Swal.fire({
                title: 'Error',
                text: 'User tidak terdaftar',
                icon: 'error',
            });
            reset();
        }
    };

    const createAttendanceSubmission: FormEventHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("attendance-submission.create"), {
                name: data.name,
                nim: data.nim
            });

            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            });
        } catch (error: any) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Absensi gagal',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        if (newUid != data.id && newUid != '0') {
            console.log('fetch user data called')
            fetchUserData(newUid);
        }
    }, [newUid])

    useEffect(() => {
        if (data.id && data.name && data.nim && data.email && data.faculty && data.gender) {
            console.log('form submit')
            const submitButton = document.getElementById('submit-button');
            if (submitButton) {
                submitButton.click();
            }
        }
    }, [data])

    return (
        <>
            <Head title="Welcome" />
            <main className="container w-full h-screen flex items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Presenzy</CardTitle>
                        <CardDescription>
                            Please tap your card to record your attendance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="attendance-form" onSubmit={createAttendanceSubmission} className="mt-6 space-y-6 container">
                            <div>
                                <Label htmlFor="id">ID</Label>
                                <Input
                                    id="id"
                                    value={data.id}
                                    onChange={(e) => setData("id", e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="id"
                                    disabled={true}
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
                                <Button id='submit-button' disabled={processing}>Submit</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </>
    );
};

export default Welcome;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Link, Head } from "@inertiajs/react";
import AttendanceSubmissionForm from "./partials/AttendanceSubmissionForm";

export default function Welcome() {
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
                        <AttendanceSubmissionForm />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}

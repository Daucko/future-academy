import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimetablePage() {
    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Timetable</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This feature is currently under development.</p>
                </CardContent>
            </Card>
        </div>
    );
}

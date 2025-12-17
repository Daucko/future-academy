import { getMessages } from "@/app/actions/messages";
import MessagesClient from "./client";

export default async function MessagesPage() {
    // TODO: Replace 'demo-user-id' with actual logged-in user ID after auth implementation
    const { data: messages } = await getMessages('demo-user-id');
    return <MessagesClient initialMessages={messages || []} />;
}

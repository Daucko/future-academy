import { getMessages } from "@/app/actions/messages";
import MessagesClient from "./client";

export default async function MessagesPage() {
    const { data: messages } = await getMessages();
    return <MessagesClient initialMessages={messages || []} />;
}

'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const messageSchema = z.object({
    senderId: z.string().min(1),
    recipientId: z.string().min(1),
    subject: z.string().min(1),
    content: z.string().min(1),
    isRead: z.boolean().default(false),
});

export async function getMessages(userId: string, type: 'received' | 'sent' = 'received') {
    try {
        const where = type === 'received' ? { recipientId: userId } : { senderId: userId };
        const messages = await prisma.message.findMany({
            where,
            include: {
                sender: true,
                recipient: true,
            },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, data: messages };
    } catch (error) {
        return { success: false, error: "Failed to fetch messages" };
    }
}

export async function getMessage(id: string) {
    try {
        const message = await prisma.message.findUnique({
            where: { id },
            include: { sender: true, recipient: true }
        });
        return { success: true, data: message };
    } catch (error) {
        return { success: false, error: "Failed to fetch message" };
    }
}

export async function createMessage(data: z.infer<typeof messageSchema>) {
    try {
        const validated = messageSchema.parse(data);
        const newMessage = await prisma.message.create({
            data: validated
        });
        revalidatePath("/messages");
        return { success: true, data: newMessage };
    } catch (error) {
        return { success: false, error: "Failed to send message" };
    }
}

export async function markMessageAsRead(id: string) {
    try {
        const updated = await prisma.message.update({
            where: { id },
            data: { isRead: true }
        });
        revalidatePath("/messages");
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to mark message as read" };
    }
}

export async function deleteMessage(id: string) {
    try {
        await prisma.message.delete({ where: { id } });
        revalidatePath("/messages");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete message" };
    }
}

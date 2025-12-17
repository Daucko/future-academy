"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Search,
    Plus,
    MoreVertical,
    Send,
    Paperclip,
    Archive,
    Trash2,
    Star,
    StarOff,
    Reply,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createMessage } from "@/app/actions/messages";
import { useToast } from "@/hooks/use-toast";

const recipients = [
    { id: "1", name: "Principal Office", role: "Administration" },
    { id: "2", name: "Dr. Sarah Johnson", role: "Teacher" },
    { id: "3", name: "IT Department", role: "Support" },
    { id: "4", name: "Coach Williams", role: "Teacher" },
    { id: "5", name: "All Teachers", role: "Group" },
];

export default function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
    const [messages, setMessages] = useState<any[]>(initialMessages);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(initialMessages[0] || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const { toast } = useToast();

    const filteredMessages = messages.filter(
        (msg) =>
            msg.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const unreadCount = messages.filter((m) => !m.isRead).length;

    const toggleStar = (id: string) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
        );
    };

    const markAsRead = (id: string) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
        );
    };

    async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            senderId: "current-user-id", // Hardcoded for now until Auth
            recipientId: formData.get("recipient") as string,
            subject: formData.get("subject") as string,
            content: formData.get("message") as string,
            isRead: false,
        };

        const res = await createMessage(data);
        if (res.success) {
            toast({ title: "Message sent" });
            setIsComposeOpen(false);
            // Refresh messages or append
        } else {
            toast({ title: "Error sending message", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-semibold" data-testid="text-page-title">
                        Messages
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Communicate with staff, parents, and administration
                    </p>
                </div>
                <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" data-testid="button-compose">
                            <Plus className="h-4 w-4 mr-1" />
                            Compose
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>New Message</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSendMessage} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="recipient">To</Label>
                                <Select name="recipient" required>
                                    <SelectTrigger data-testid="select-recipient">
                                        <SelectValue placeholder="Select recipient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {recipients.map((r) => (
                                            <SelectItem key={r.id} value={r.id}>
                                                {r.name} ({r.role})
                                            </SelectItem>
                                        ))}
                                        {/* Allow simple text input logic? */}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input name="subject" id="subject" placeholder="Enter subject" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    name="message"
                                    id="message"
                                    placeholder="Type your message here..."
                                    className="min-h-[150px]"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-2">
                                    <Button variant="outline" type="button" onClick={() => setIsComposeOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        <Send className="h-4 w-4 mr-1" />
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                <Card className="lg:col-span-1 flex flex-col">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search messages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <Badge variant="secondary">{unreadCount} Unread</Badge>
                            <Badge variant="outline">
                                {messages.filter((m) => m.isStarred).length} Starred
                            </Badge>
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="divide-y">
                            {filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-4 cursor-pointer transition-colors ${selectedMessage?.id === message.id
                                        ? "bg-accent"
                                        : "hover:bg-muted/50"
                                        } ${!message.isRead ? "bg-primary/5" : ""}`}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        markAsRead(message.id);
                                    }}
                                    data-testid={`message-item-${message.id}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10 shrink-0">
                                            <AvatarImage src={message.senderAvatar || ""} />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                {message.sender ? message.sender[0] : "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p
                                                    className={`text-sm truncate ${!message.isRead ? "font-semibold" : "font-medium"
                                                        }`}
                                                >
                                                    {message.sender}
                                                </p>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {message.isStarred && (
                                                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                    )}
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(message.createdAt || message.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <p
                                                className={`text-sm truncate ${!message.isRead ? "font-medium" : ""
                                                    }`}
                                            >
                                                {message.subject}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate mt-1">
                                                {message.preview || message.content?.substring(0, 50)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredMessages.length === 0 && (
                                <div className="p-8 text-center">
                                    <p className="text-muted-foreground">No messages found</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

                <Card className="lg:col-span-2 flex flex-col">
                    {selectedMessage ? (
                        <>
                            <div className="p-4 border-b">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={selectedMessage.senderAvatar || ""} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {selectedMessage.sender ? selectedMessage.sender[0] : "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{selectedMessage.sender}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(selectedMessage.createdAt || new Date()).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleStar(selectedMessage.id)}
                                        >
                                            {selectedMessage.isStarred ? (
                                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            ) : (
                                                <StarOff className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Archive className="h-4 w-4 mr-2" />
                                                    Archive
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold mt-4">
                                    {selectedMessage.subject}
                                </h2>
                            </div>

                            <ScrollArea className="flex-1 p-4">
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {selectedMessage.content}
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t">
                                <div className="flex items-start gap-3">
                                    <Reply className="h-4 w-4 text-muted-foreground mt-3" />
                                    <div className="flex-1">
                                        <Textarea
                                            placeholder="Type your reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="min-h-[80px]"
                                        />
                                        <div className="flex items-center justify-between mt-3">
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                            <Button>
                                                <Send className="h-4 w-4 mr-1" />
                                                Send Reply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-muted-foreground">
                                    Select a message to read
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

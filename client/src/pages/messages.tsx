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

const mockMessages = [
  {
    id: "1",
    sender: "Principal Office",
    senderAvatar: null,
    subject: "Staff Meeting Tomorrow",
    preview: "Reminder: There will be a mandatory staff meeting tomorrow at 3 PM in the main conference room...",
    content: "Dear Teacher,\n\nReminder: There will be a mandatory staff meeting tomorrow at 3 PM in the main conference room. Please ensure you arrive on time as we have several important topics to discuss including the upcoming parent-teacher conference schedule.\n\nBest regards,\nPrincipal Office",
    time: "10:30 AM",
    date: "Today",
    isRead: false,
    isStarred: true,
  },
  {
    id: "2",
    sender: "Dr. Sarah Johnson",
    senderAvatar: null,
    subject: "Re: Class 302 Exam Schedule",
    preview: "Thank you for sharing the exam schedule. I have reviewed it and everything looks good...",
    content: "Thank you for sharing the exam schedule. I have reviewed it and everything looks good. Let me know if you need any assistance with the exam preparation.",
    time: "9:15 AM",
    date: "Today",
    isRead: true,
    isStarred: false,
  },
  {
    id: "3",
    sender: "Parent: Mrs. Thompson",
    senderAvatar: null,
    subject: "Emma's Absence Next Week",
    preview: "I wanted to inform you that Emma will be absent next week due to a family commitment...",
    content: "Dear Teacher,\n\nI wanted to inform you that Emma will be absent next week (Dec 18-22) due to a family commitment. We will ensure she catches up on all assignments.\n\nThank you for your understanding.\n\nBest regards,\nMrs. Thompson",
    time: "Yesterday",
    date: "Dec 15",
    isRead: true,
    isStarred: false,
  },
  {
    id: "4",
    sender: "IT Department",
    senderAvatar: null,
    subject: "System Maintenance Notice",
    preview: "The school portal will undergo scheduled maintenance this Saturday from 10 PM to 2 AM...",
    content: "Dear Staff,\n\nThe school portal will undergo scheduled maintenance this Saturday from 10 PM to 2 AM. During this time, access to grades, attendance, and messaging systems will be temporarily unavailable.\n\nWe apologize for any inconvenience.\n\nIT Department",
    time: "Dec 14",
    date: "Dec 14",
    isRead: true,
    isStarred: false,
  },
  {
    id: "5",
    sender: "Coach Williams",
    senderAvatar: null,
    subject: "Sports Day Coordination",
    preview: "Hi, I wanted to coordinate with you regarding the upcoming Sports Day event...",
    content: "Hi,\n\nI wanted to coordinate with you regarding the upcoming Sports Day event. We need to discuss the class schedules and which students will be participating in various events.\n\nCan we meet sometime this week?\n\nBest,\nCoach Williams",
    time: "Dec 13",
    date: "Dec 13",
    isRead: true,
    isStarred: true,
  },
];

const recipients = [
  { id: "1", name: "Principal Office", role: "Administration" },
  { id: "2", name: "Dr. Sarah Johnson", role: "Teacher" },
  { id: "3", name: "IT Department", role: "Support" },
  { id: "4", name: "Coach Williams", role: "Teacher" },
  { id: "5", name: "All Teachers", role: "Group" },
];

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(mockMessages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">To</Label>
                <Select>
                  <SelectTrigger data-testid="select-recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} ({r.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter subject" data-testid="input-subject" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                  data-testid="textarea-message"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button data-testid="button-send-message">
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
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
                data-testid="input-search"
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
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
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
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm truncate ${
                            !message.isRead ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {message.sender}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          {message.isStarred && (
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {message.time}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          !message.isRead ? "font-medium" : ""
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {message.preview}
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
                        {selectedMessage.sender
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedMessage.sender}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedMessage.date} at {selectedMessage.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleStar(selectedMessage.id)}
                      data-testid="button-star"
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
                      data-testid="textarea-reply"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button data-testid="button-send-reply">
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { users } from "@/lib/data";
import { Paperclip, Search, Send } from "lucide-react";

export default function ChatPage() {
  const currentUser = users[0];
  const chatPartner = users[1];

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] flex-1">
      <aside className="hidden h-full w-80 flex-col border-r bg-card md:flex">
        <div className="p-4">
          <h1 className="font-headline text-2xl font-bold">Conversations</h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-10" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-4 pt-0">
            {users.map((user, i) => (
              <Button
                key={user.id}
                variant={i === 1 ? "secondary" : "ghost"}
                className="h-auto w-full justify-start p-3"
              >
                <Avatar className="mr-3 h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-left">{user.name}</p>
                  <p className="text-sm text-muted-foreground text-left">Hey, how is it going?</p>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center gap-4 border-b p-4">
          <Avatar>
            <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} />
            <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatPartner.name}</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-4">
            {/* Chat Messages */}
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8">
                 <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} />
                 <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="max-w-xs rounded-lg bg-secondary p-3">
                <p>Hey! I saw your profile and I'm really impressed with your React skills. I'm looking for a mentor.</p>
              </div>
            </div>

            <div className="flex items-end justify-end gap-2">
              <div className="max-w-xs rounded-lg bg-primary text-primary-foreground p-3">
                <p>Hi there! Thanks, I'd be happy to help. What are you working on?</p>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
             <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8">
                 <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} />
                 <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="max-w-xs rounded-lg bg-secondary p-3">
                <p>I'm trying to build a complex dashboard with real-time data. I'm struggling with state management.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t p-4">
          <div className="relative">
            <Input placeholder="Type your message..." className="pr-24" />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

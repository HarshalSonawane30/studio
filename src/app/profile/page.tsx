import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/lib/data";
import { Mail, MessageSquare, Pencil, Star } from "lucide-react";

export default function ProfilePage() {
  const user = users[0]; // Display the first user as a sample

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint}/>
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="font-headline text-2xl md:text-3xl">{user.name}</CardTitle>
            <CardDescription className="text-lg">{user.title}</CardDescription>
            <p className="mt-2 text-muted-foreground">{user.bio}</p>
          </div>
          <Button>
            <Pencil className="mr-2" /> Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
            <Button variant="outline"><Mail className="mr-2"/> Email</Button>
            <Button><MessageSquare className="mr-2"/> Message</Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill} className="px-3 py-1 text-sm">{skill}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Interests</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="px-3 py-1 text-sm">{interest}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
           <CardHeader>
            <CardTitle className="font-headline">Feedback Received</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage src={users[1].avatarUrl} alt={users[1].name} />
                    <AvatarFallback>{users[1].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">{users[1].name}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent"/>)}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"An amazing mentor for React. Highly recommended!"</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage src={users[2].avatarUrl} alt={users[2].name} />
                    <AvatarFallback>{users[2].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">{users[2].name}</p>
                         <div className="flex items-center">
                             {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent"/>)}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"Helped me grasp complex AI concepts. Very patient."</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

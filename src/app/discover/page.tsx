'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { users, skills as allSkills, interests as allInterests } from '@/lib/data';
import type { User } from '@/lib/data';
import { Search, UserPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const skillMatch = skillFilter ? user.skills.includes(skillFilter) : true;
    const interestMatch = interestFilter ? user.interests.includes(interestFilter) : true;
    return nameMatch && skillMatch && interestMatch;
  });

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b p-4 md:p-6">
        <h1 className="font-headline text-2xl font-bold md:text-3xl">Discover Talent</h1>
        <p className="text-muted-foreground">Find and connect with skilled individuals in the community.</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-1 gap-4 md:flex-initial">
             <Select value={skillFilter} onValueChange={(value) => setSkillFilter(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {allSkills.map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={interestFilter} onValueChange={(value) => setInterestFilter(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interests</SelectItem>
                {allInterests.map(interest => <SelectItem key={interest} value={interest}>{interest}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-lg font-medium text-muted-foreground">No users found.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="font-headline text-lg">{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.title}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0">
        <div>
          <h4 className="mb-2 text-sm font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            {user.skills.length > 3 && <Badge variant="secondary">+{user.skills.length - 3}</Badge>}
          </div>
        </div>
        <Button className="mt-4 w-full">
          <UserPlus className="mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}

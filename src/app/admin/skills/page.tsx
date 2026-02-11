'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skills as allSkills } from '@/lib/data';
import { PlusCircle, Pencil, Trash2, Code, Palette, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const assessments = [
  {
    title: 'React Proficiency Test',
    category: 'Frontend',
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: 'UI/UX Design Principles',
    category: 'Design',
    icon: <Palette className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Python for Data Science',
    category: 'Data Science',
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
];

function SkillsManager() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Add, edit, or remove skills from the platform.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Fill in the details for the new skill.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skill-name" className="text-right">
                  Name
                </Label>
                <Input id="skill-name" value="New Skill" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skill-desc" className="text-right">
                  Description
                </Label>
                <Textarea id="skill-desc" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skill-category" className="text-right">
                  Category
                </Label>
                <Input id="skill-category" value="Development" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Skill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {allSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <span className="font-medium">{skill}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AssessmentsManager() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Assessments</CardTitle>
          <CardDescription>
            Create, edit, or manage skill assessments.
          </CardDescription>
        </div>
         <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Assessment</DialogTitle>
              <DialogDescription>
                Define a new assessment for a skill.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="assessment-title">Title</Label>
                <Input id="assessment-title" placeholder="e.g. Advanced TypeScript" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="assessment-skill">Associated Skill</Label>
                <Input id="assessment-skill" placeholder="e.g. TypeScript" />
              </div>
               <div className="space-y-1">
                <Label htmlFor="assessment-questions">Questions (JSON)</Label>
                <Textarea id="assessment-questions" placeholder='[{ "question": "...", "options": [], "answer": "..."}]' rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Assessment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
         {assessments.map((assessment) => (
          <div
            key={assessment.title}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className='flex items-center gap-3'>
              <div className="rounded-lg bg-primary/10 p-2">
                {assessment.icon}
              </div>
              <div>
                <p className="font-medium">{assessment.title}</p>
                <Badge variant="outline">{assessment.category}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function AdminSkillsPage() {
  return (
    <div className="p-4 md:p-6">
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        <TabsContent value="skills" className="mt-4">
          <SkillsManager />
        </TabsContent>
        <TabsContent value="assessments" className="mt-4">
          <AssessmentsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart, Code, Palette } from "lucide-react";

const assessments = [
  {
    title: "React Proficiency Test",
    category: "Frontend",
    description: "Assess your knowledge of React hooks, components, and state management. Covers core concepts and advanced patterns.",
    duration: "45 min",
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: "UI/UX Design Principles",
    category: "Design",
    description: "Test your understanding of fundamental design principles, including hierarchy, contrast, and user-centric design.",
    duration: "30 min",
    icon: <Palette className="h-8 w-8 text-primary" />,
  },
  {
    title: "Python for Data Science",
    category: "Data Science",
    description: "Evaluate your skills in using Python libraries like Pandas, NumPy, and Scikit-learn for data analysis and modeling.",
    duration: "60 min",
    icon: <BarChart className="h-8 w-8 text-primary" />,
  },
];

export default function AssessmentsPage() {
  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-2xl font-bold md:text-3xl">Skill Assessments</h1>
        <p className="text-muted-foreground">Verify your expertise and earn badges for your profile.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <Card key={assessment.title} className="flex flex-col transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-3">
                  {assessment.icon}
                </div>
                <Badge variant="outline">{assessment.category}</Badge>
              </div>
              <CardTitle className="font-headline text-lg">{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Duration: {assessment.duration}
              </span>
              <Button>
                Start Assessment <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

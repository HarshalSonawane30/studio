import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Search, Star, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images.json";

const features = [
  {
    title: "Personalized Learning Path",
    description: "Get AI-powered recommendations tailored to your goals.",
    href: "/#",
    icon: <BrainCircuit className="size-8 text-primary" />,
  },
  {
    title: "Find Your Perfect Match",
    description: "Connect with mentors and peers who complement your skills.",
    href: "/matches",
    icon: <Users className="size-8 text-primary" />,
  },
  {
    title: "Explore the Community",
    description: "Discover and connect with talented individuals.",
    href: "/discover",
    icon: <Search className="size-8 text-primary" />,
  },
  {
    title: "Verify Your Skills",
    description: "Take assessments to get your skills certified and stand out.",
    href: "/assessments",
    icon: <Star className="size-8 text-primary" />,
  },
];

export default function DashboardPage() {
  const heroImage = placeholderImages.find(img => img.id === "dashboard-hero");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
        )}
        <div className="relative grid gap-4 p-8 md:p-12">
            <div className="max-w-2xl text-white">
                <h1 className="font-headline text-3xl font-bold md:text-5xl">
                    Welcome to Emergent
                </h1>
                <p className="mt-2 max-w-lg text-lg text-white/90">
                    Your journey to mastery starts here. Connect, learn, and grow with a community of passionate builders.
                </p>
            </div>
            <div className="mt-4 flex gap-3">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                    <Link href="/discover">
                        Find a Mentor <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                    <Link href="/profile">
                        Complete Your Profile
                    </Link>
                </Button>
            </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transition-all hover:shadow-lg">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="rounded-lg bg-primary/10 p-3">
                    {feature.icon}
                </div>
                <div className="flex-1">
                    <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="flex-1 text-muted-foreground">{feature.description}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

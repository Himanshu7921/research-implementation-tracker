import { useQuery } from "@tanstack/react-query";
import { Settings, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { ResearchProject } from "@shared/schema";

const statusColors = {
  "in-progress": "bg-yellow-100 text-yellow-800",
  "completed": "bg-green-100 text-green-800",
  "planned": "bg-purple-100 text-purple-800",
  "paused": "bg-red-100 text-red-800",
};

const projectBorderColors = {
  "in-progress": "border-l-yellow-500",
  "completed": "border-l-green-500",
  "planned": "border-l-purple-500",
  "paused": "border-l-red-500",
};

export default function ProgressSection() {
  const { data: projects, isLoading } = useQuery<ResearchProject[]>({
    queryKey: ["/api/research-projects"],
  });

  const currentProjects = projects?.filter(project => project.category === "current") || [];
  const futureProjects = projects?.filter(project => project.category === "future") || [];

  if (isLoading) {
    return (
      <section id="progress" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-blue mb-4">Research Progress & Future Work</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Track ongoing research projects and planned future investigations across multiple research domains.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-academic-blue mb-8 flex items-center">
                <Settings className="mr-3 text-accent-indigo" size={24} />
                Current Research
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-2 w-full mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-academic-blue mb-8 flex items-center">
                <Lightbulb className="mr-3 text-accent-indigo" size={24} />
                Future Research Plans
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-18" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="progress" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-academic-blue mb-4">Research Progress & Future Work</h2>
          <p className="text-xl text-academic-gray max-w-3xl mx-auto">
            Track ongoing research projects and planned future investigations across multiple research domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Current Research */}
          <div>
            <h3 className="text-2xl font-semibold text-academic-blue mb-8 flex items-center">
              <Settings className="animate-spin-slow mr-3 text-accent-indigo" size={24} />
              Current Research
            </h3>
            
            <div className="space-y-6">
              {currentProjects.length === 0 ? (
                <Card className="p-6">
                  <p className="text-academic-gray text-center" data-testid="text-no-current-projects">
                    No current research projects found.
                  </p>
                </Card>
              ) : (
                currentProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`bg-white shadow-sm border-l-4 ${projectBorderColors[project.status]}`}
                    data-testid={`card-current-project-${project.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-academic-blue" data-testid={`title-${project.id}`}>
                          {project.title}
                        </h4>
                        <Badge className={statusColors[project.status]} data-testid={`status-${project.id}`}>
                          {project.status === 'in-progress' ? 'In Progress' : 
                           project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-academic-gray mb-4" data-testid={`description-${project.id}`}>
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-academic-gray">Progress</span>
                          <span className="text-sm font-medium text-academic-blue" data-testid={`progress-${project.id}`}>
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                      </div>
                      <div className="flex justify-between text-sm text-academic-gray">
                        <span data-testid={`start-date-${project.id}`}>
                          Started: {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </span>
                        <span data-testid={`expected-completion-${project.id}`}>
                          Expected: {project.expectedCompletion ? new Date(project.expectedCompletion).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'TBD'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Future Research */}
          <div>
            <h3 className="text-2xl font-semibold text-academic-blue mb-8 flex items-center">
              <Lightbulb className="mr-3 text-accent-indigo" size={24} />
              Future Research Plans
            </h3>
            
            <div className="space-y-6">
              {futureProjects.length === 0 ? (
                <Card className="p-6">
                  <p className="text-academic-gray text-center" data-testid="text-no-future-projects">
                    No future research projects planned.
                  </p>
                </Card>
              ) : (
                futureProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`bg-white shadow-sm border-l-4 ${projectBorderColors[project.status]}`}
                    data-testid={`card-future-project-${project.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-academic-blue" data-testid={`future-title-${project.id}`}>
                          {project.title}
                        </h4>
                        <Badge className={statusColors[project.status]} data-testid={`future-status-${project.id}`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-academic-gray mb-4" data-testid={`future-description-${project.id}`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-gray-100 text-gray-700" data-testid={`future-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-academic-gray" data-testid={`future-planned-start-${project.id}`}>
                        Planned Start: {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Research Implementation Metrics */}
        <Card className="mt-16 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-academic-blue text-center">Research Implementation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center" data-testid="metric-papers-read">
                <div className="text-3xl font-bold text-academic-blue mb-2">4</div>
                <div className="text-academic-gray">Papers Read</div>
              </div>
              <div className="text-center" data-testid="metric-implementations">
                <div className="text-3xl font-bold text-academic-blue mb-2">2</div>
                <div className="text-academic-gray">Implementations</div>
              </div>
              <div className="text-center" data-testid="metric-projects">
                <div className="text-3xl font-bold text-academic-blue mb-2">2</div>
                <div className="text-academic-gray">Active Projects</div>
              </div>
              <div className="text-center" data-testid="metric-research-areas">
                <div className="text-3xl font-bold text-academic-blue mb-2">3</div>
                <div className="text-academic-gray">Research Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

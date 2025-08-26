import { useQuery } from "@tanstack/react-query";
import { Github, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { GithubRepo } from "@shared/schema";

const languageColors: Record<string, string> = {
  Python: "bg-blue-500",
  PyTorch: "bg-green-500", 
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-600",
  Java: "bg-orange-500",
  "C++": "bg-pink-500",
};

export default function GithubSection() {
  const { data: repos, isLoading } = useQuery<GithubRepo[]>({
    queryKey: ["/api/github-repos/featured"],
  });

  const githubProfile = "https://github.com/Himanshu7921";

  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Updated today";
    if (diffInDays === 1) return "Updated 1 day ago";
    if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 30) return `Updated ${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `Updated ${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  if (isLoading) {
    return (
      <section id="github" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-blue mb-4">Technical Implementation & Code</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Explore the technical implementations, open-source contributions, and code repositories supporting my research work.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Github size={48} className="mr-4" />
                  <div>
                    <Skeleton className="h-8 w-32 mb-2 bg-white/20" />
                    <Skeleton className="h-4 w-24 bg-white/20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-full mb-4 bg-white/20" />
                <Skeleton className="h-6 w-3/4 mb-8 bg-white/20" />
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4">
                      <Skeleton className="h-6 w-12 mb-2 bg-white/20" />
                      <Skeleton className="h-4 w-16 bg-white/20" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-6">Featured Repositories</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4">
                      <Skeleton className="h-5 w-3/4 mb-2 bg-white/20" />
                      <Skeleton className="h-4 w-full mb-3 bg-white/20" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16 bg-white/20" />
                        <Skeleton className="h-4 w-20 bg-white/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-academic-blue mb-4">Technical Implementation & Code</h2>
          <p className="text-xl text-academic-gray max-w-3xl mx-auto">
            Explore the technical implementations, open-source contributions, and code repositories supporting my research work.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Github size={48} className="mr-4" />
                <div>
                  <h3 className="text-2xl font-bold" data-testid="github-profile-title">GitHub Profile</h3>
                  <p className="text-gray-300">@Himanshu7921</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg mb-8">
                Access comprehensive code repositories, implementations of research papers, and collaborative projects. All code is well-documented and follows best practices for reproducible research.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4" data-testid="stat-repositories">
                  <div className="text-2xl font-bold mb-1">10+</div>
                  <div className="text-gray-300 text-sm">Repositories</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4" data-testid="stat-stars">
                  <div className="text-2xl font-bold mb-1">10+</div>
                  <div className="text-gray-300 text-sm">Total Stars</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4" data-testid="stat-contributions">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-gray-300 text-sm">Contributions</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4" data-testid="stat-languages">
                  <div className="text-2xl font-bold mb-1">Python</div>
                  <div className="text-gray-300 text-sm">Language</div>
                </div>
              </div>

              <Button 
                onClick={() => window.open(githubProfile, '_blank')}
                className="bg-white text-gray-900 hover:bg-gray-100"
                data-testid="button-visit-github"
              >
                <Github size={20} className="mr-3" />
                Visit GitHub Profile
                <ExternalLink size={16} className="ml-3" />
              </Button>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6">Featured Repositories</h4>
              <div className="space-y-4">
                {repos?.length === 0 ? (
                  <Card className="bg-white/10 p-4">
                    <p className="text-gray-300 text-center">No featured repositories found.</p>
                  </Card>
                ) : (
                  repos?.map((repo) => (
                    <Card 
                      key={repo.id}
                      className="bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      onClick={() => window.open(repo.url, '_blank')}
                      data-testid={`card-repo-${repo.name}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-white" data-testid={`repo-name-${repo.name}`}>
                            {repo.name}
                          </h5>
                          <div className="flex items-center text-sm text-gray-300">
                            <Star size={14} className="mr-1" />
                            <span data-testid={`repo-stars-${repo.name}`}>{repo.stars}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3" data-testid={`repo-description-${repo.name}`}>
                          {repo.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {repo.language && (
                            <Badge 
                              className={`text-xs text-white ${languageColors[repo.language] || 'bg-gray-500'}`}
                              data-testid={`repo-language-${repo.name}`}
                            >
                              {repo.language}
                            </Badge>
                          )}
                          <span className="text-gray-400 text-xs" data-testid={`repo-updated-${repo.name}`}>
                            {getTimeAgo(repo.updatedAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

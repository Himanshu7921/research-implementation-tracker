import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Eye, Download, Quote, FileText, Github, Play, BarChart3, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ResearchPaper } from "@shared/schema";

const statusColors = {
  "published": "bg-purple-100 text-purple-800",
  "under-review": "bg-yellow-100 text-yellow-800",
  "accepted": "bg-green-100 text-green-800",
  "completed": "bg-blue-100 text-blue-800",
};

const tagColors: Record<string, string> = {
  "Computer Vision": "bg-blue-100 text-blue-800",
  "Machine Learning": "bg-green-100 text-green-800",
  "NLP": "bg-orange-100 text-orange-800",
  "Privacy": "bg-red-100 text-red-800",
  "Algorithms": "bg-indigo-100 text-indigo-800",
  "Neural Architecture Search": "bg-purple-100 text-purple-800",
  "Federated Learning": "bg-pink-100 text-pink-800",
  "Code Generation": "bg-cyan-100 text-cyan-800",
  "Transformers": "bg-lime-100 text-lime-800",
  "Neural Networks": "bg-indigo-100 text-indigo-800",
  "Language Modeling": "bg-violet-100 text-violet-800",
  "Deep Learning": "bg-emerald-100 text-emerald-800",
  "Statistical Models": "bg-amber-100 text-amber-800",
  "BatchNorm": "bg-teal-100 text-teal-800",
};

export default function ResearchSection() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: papers, isLoading } = useQuery<ResearchPaper[]>({
    queryKey: ["/api/research-papers"],
  });

  const allTags = papers ? Array.from(new Set(papers.flatMap(paper => paper.tags))) : [];
  
  const filteredPapers = papers?.filter(paper => {
    const matchesTag = selectedTag === "All" || paper.tags.includes(selectedTag);
    const matchesSearch = searchQuery === "" || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTag && matchesSearch;
  }) || [];

  const handleViewPaper = (paperId: string) => {
    // Increment views - in a real app, this would be tracked
    console.log("Viewing paper:", paperId);
  };

  if (isLoading) {
    return (
      <section id="research" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-blue mb-4">Research Publications & Implementations</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              A comprehensive collection of research papers, technical implementations, and scholarly contributions spanning multiple domains of computer science.
            </p>
          </div>
          
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-academic-blue mb-4">Research Publications & Implementations</h2>
          <p className="text-xl text-academic-gray max-w-3xl mx-auto">
            A comprehensive collection of research papers, technical implementations, and scholarly contributions spanning multiple domains of computer science.
          </p>
        </div>

        {/* Filtering and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === "All" ? "default" : "outline"}
                onClick={() => setSelectedTag("All")}
                className={selectedTag === "All" ? "bg-academic-blue text-white" : "bg-gray-100 text-academic-gray hover:bg-gray-200"}
                data-testid="filter-all"
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag ? "bg-academic-blue text-white" : "bg-gray-100 text-academic-gray hover:bg-gray-200"}
                  data-testid={`filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search research papers..."
                className="pl-10 pr-4 py-2 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>
        </div>

        {/* Research Papers */}
        <div className="space-y-8">
          {filteredPapers.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-academic-gray text-lg" data-testid="text-no-papers">
                No research papers found matching your criteria.
              </p>
            </Card>
          ) : (
            filteredPapers.map((paper) => (
              <Card key={paper.id} className="academic-card p-8" data-testid={`card-paper-${paper.id}`}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-academic-blue mb-2" data-testid={`title-${paper.id}`}>
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {paper.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className={tagColors[tag] || "bg-gray-100 text-gray-800"}
                              data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                          <Badge className={statusColors[paper.status]} data-testid={`status-${paper.status}`}>
                            {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-academic-gray text-sm" data-testid={`date-${paper.id}`}>
                          {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-academic-gray-light text-sm" data-testid={`venue-${paper.id}`}>
                          {paper.venue}
                        </p>
                      </div>
                    </div>
                    <p className="text-academic-gray mb-4 leading-relaxed" data-testid={`abstract-${paper.id}`}>
                      {paper.abstract}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center text-academic-gray" data-testid={`views-${paper.id}`}>
                        <Eye size={16} className="mr-2" />
                        {paper.views} views
                      </span>
                      <span className="flex items-center text-academic-gray" data-testid={`downloads-${paper.id}`}>
                        <Download size={16} className="mr-2" />
                        {paper.downloads} downloads
                      </span>
                      <span className="flex items-center text-academic-gray" data-testid={`citations-${paper.id}`}>
                        <Quote size={16} className="mr-2" />
                        {paper.citations} citations
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => handleViewPaper(paper.id)}
                      className="bg-academic-blue text-white hover:bg-academic-blue-light"
                      data-testid={`button-read-${paper.id}`}
                    >
                      <FileText size={16} className="mr-2" />
                      Read Paper
                    </Button>
                    {paper.codeUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(paper.codeUrl!, '_blank')}
                        className="bg-gray-100 text-academic-gray hover:bg-gray-200"
                        data-testid={`button-code-${paper.id}`}
                      >
                        <Github size={16} className="mr-2" />
                        View Code
                      </Button>
                    )}
                    {paper.demoUrl && (
                      <Button
                        variant="outline"
                        className="border-academic-blue text-academic-blue hover:bg-academic-blue hover:text-white"
                        data-testid={`button-demo-${paper.id}`}
                      >
                        {paper.status === 'published' ? (
                          <>
                            <Play size={16} className="mr-2" />
                            Demo
                          </>
                        ) : (
                          <>
                            <BarChart3 size={16} className="mr-2" />
                            Results
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="bg-gray-100 text-academic-blue hover:bg-gray-200"
            data-testid="button-load-more"
          >
            Load More Papers <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

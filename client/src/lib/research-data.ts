// This file contains utility functions for research data formatting and processing

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short'
  });
};

export const getStatusColor = (status: string): string => {
  const colors = {
    'published': 'bg-purple-100 text-purple-800',
    'under-review': 'bg-yellow-100 text-yellow-800',
    'accepted': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'planned': 'bg-gray-100 text-gray-800',
    'paused': 'bg-red-100 text-red-800',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getTagColor = (tag: string): string => {
  const colors: Record<string, string> = {
    'Machine Learning': 'bg-blue-100 text-blue-800',
    'Computer Vision': 'bg-green-100 text-green-800',
    'NLP': 'bg-orange-100 text-orange-800',
    'Privacy': 'bg-red-100 text-red-800',
    'Algorithms': 'bg-indigo-100 text-indigo-800',
    'Neural Architecture Search': 'bg-purple-100 text-purple-800',
    'Federated Learning': 'bg-pink-100 text-pink-800',
    'Code Generation': 'bg-cyan-100 text-cyan-800',
    'Transformers': 'bg-lime-100 text-lime-800',
    'Quantum Computing': 'bg-violet-100 text-violet-800',
    'Healthcare': 'bg-emerald-100 text-emerald-800',
    'IoT': 'bg-teal-100 text-teal-800',
    'Edge Computing': 'bg-amber-100 text-amber-800',
    'Hardware': 'bg-slate-100 text-slate-800',
    'AI': 'bg-sky-100 text-sky-800',
    'Efficiency': 'bg-rose-100 text-rose-800',
    'Optimization': 'bg-fuchsia-100 text-fuchsia-800',
    'Sustainability': 'bg-green-100 text-green-800',
    'Green AI': 'bg-lime-100 text-lime-800',
  };
  return colors[tag] || 'bg-gray-100 text-gray-800';
};

export const calculateProgress = (startDate: Date, endDate?: Date): number => {
  if (!endDate) return 0;
  
  const now = new Date();
  const totalTime = endDate.getTime() - startDate.getTime();
  const elapsedTime = now.getTime() - startDate.getTime();
  
  const progress = Math.max(0, Math.min(100, (elapsedTime / totalTime) * 100));
  return Math.round(progress);
};

export const getProjectBorderColor = (status: string): string => {
  const colors = {
    'in-progress': 'border-l-yellow-500',
    'completed': 'border-l-green-500',
    'planned': 'border-l-purple-500',
    'paused': 'border-l-red-500',
  };
  return colors[status as keyof typeof colors] || 'border-l-gray-500';
};

export const searchPapers = (papers: any[], query: string) => {
  if (!query) return papers;
  
  const lowercaseQuery = query.toLowerCase();
  return papers.filter(paper => 
    paper.title.toLowerCase().includes(lowercaseQuery) ||
    paper.abstract.toLowerCase().includes(lowercaseQuery) ||
    paper.authors.some((author: string) => author.toLowerCase().includes(lowercaseQuery)) ||
    paper.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)) ||
    paper.venue.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterPapersByTag = (papers: any[], tag: string) => {
  if (tag === 'All') return papers;
  return papers.filter(paper => paper.tags.includes(tag));
};

export const sortPapersByDate = (papers: any[], ascending = false) => {
  return [...papers].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const getUniqueTagsFromPapers = (papers: any[]): string[] => {
  const allTags = papers.flatMap(paper => paper.tags);
  return Array.from(new Set(allTags)).sort();
};

export interface Job {
  id: string | number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export const addJobFilter = (filter: string, filterList: string[]): string[] => {
  const filterEntitis: { [key: string]: boolean } = filterList.reduce((acc, value) => {
    return { ...acc, [value]: true };
  }, {});
  filterEntitis[filter] = true;
  const filters = Object.keys(filterEntitis);

  return filters;
};

export const removeJobFilter = (filter: string, filterList: string[]): string[] => {
  return filterList.filter((item) => item !== filter);
};

export const filterJobs = (jobs: Job[], filters: string[]): Job[] => {
  if (filters.length === 0) {
    return jobs;
  }
  return jobs.filter((job) => {
    const tags: string[] = [job.role, job.level, ...job.languages, ...job.tools];
    return filters.every((filter) => tags.includes(filter));
  });
};

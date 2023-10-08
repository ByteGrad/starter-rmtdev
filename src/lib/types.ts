export type JobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  duration: string;
  salary: string;
  location: string;
  relevanceScore: number;
  daysAgo: number;
  coverImgURL: string;
  companyURL: string;
};

export type JobItemDetailed = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
};

export type SortMethod = "relevant" | "recent";

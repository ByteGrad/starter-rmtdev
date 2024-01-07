export type jobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type jobItemDescription = jobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
  location: string;
};

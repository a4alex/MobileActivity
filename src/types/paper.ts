export interface PaperSection {
  id: string;
  title: string;
  content: string;
  chart?: {
    title: string;
    image: string;
  };
}

export interface Paper {
  title: string;
  author: string;
  sections: PaperSection[];
}
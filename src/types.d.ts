export interface IArticle {
  body: string;
  title: string;
  tagList: string[];
  author: { [key: string]: string };
  createdAt: string;
  favoritesCount: number;
  slug: string;
}

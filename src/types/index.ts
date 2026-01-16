/**
 * Article type definition - used to define the shape of the posts/articles.
 * This helps to check for errors.
 */

export interface Article {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
}

export interface Props {
  article: {
    title: string
    body: string
    category: string
    created_at: string
  }
}
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

export interface CreateNewProps {
  article: {
    title: string
    body: string
    category: string
    created_at: string
  }
}

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface AlertProps {
  type: AlertType;
  message: string;
}

export type AlertState = {
  type: AlertType
  message: string
} | null

export type AlertContextType = {
  showAlert: (type: AlertType, message: string) => void
}
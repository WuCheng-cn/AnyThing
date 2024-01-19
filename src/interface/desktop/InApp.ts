export interface InApp {
  name?: string;

  icon: string;

  description?: string;

  handler?: () => void;
}
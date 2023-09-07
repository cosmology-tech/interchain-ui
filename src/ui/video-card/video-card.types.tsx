import { container } from "./video-card.css";

export interface VideoCardProps {
  thumbnail: string;
  title: string;
  duration: string;
  onClick: (event?: any) => void;
  size?: keyof typeof container;
}

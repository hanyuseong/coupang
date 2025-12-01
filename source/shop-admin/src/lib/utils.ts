import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path: string | undefined | null) => {
  if (!path) return "/images/placeholder.png";
  if (path.startsWith("http")) return path;

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // If path already starts with "images/", append to base URL directly
  if (cleanPath.startsWith("images/")) {
    return `http://localhost:3000/${cleanPath}`;
  }

  // Otherwise, add "images/" prefix
  return `http://localhost:3000/images/${cleanPath}`;
};

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to strip HTML tags from content
export function stripHtml(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  const stripped = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decoded = stripped
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace
  return decoded.replace(/\s+/g, ' ').trim();
}

// Create a clean excerpt from content
export function createExcerpt(content: string, maxLength: number = 150): string {
  const cleanContent = stripHtml(content);
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Find the last complete word within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

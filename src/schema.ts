// Define the structure of the author
export interface Author {
  _id: string;
  username: string;
  email: string;
  password: string; // Optionally omit this if it's sensitive
  createdAt: string; // ISO date string
}

// Define the structure of BlogInfo
export interface BlogInfo {
  [key: string]: any; // Adjust fields as per your specific structure
}

// Define the structure of a comment
export interface Comment {
  [key: string]: any; // Adjust fields as per your specific structure
}

// Define the structure of a single blog
export interface Blog {
  _id: string;
  title: string;
  author: Author; // Author now references the Author interface
  blogInfo: BlogInfo[];
  category: string;
  value: string;
  comments: Comment[];
  likes: string[]; // Array of user IDs or entities who liked the post
  createdAt?: string; // Optional ISO date string
  updatedAt?: string; // Optional ISO date string
  __v?: number; // Optional field for versioning
}

// Example response structure containing multiple blogs
export interface BlogResponse {
  blogs: Blog[];
}

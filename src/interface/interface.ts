export interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
  created: string;
  avatar?: string;
}

export interface Post {
  id: string;
  title: string;
  picture?: string;
  content: string;
  created: string;
  authorId: string;
  author: User
}


export interface AddPost {
    title: string;
    picture?: File | null | any;
    content: string;
    authorId: string;
}
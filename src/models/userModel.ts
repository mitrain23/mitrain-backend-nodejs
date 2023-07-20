import { Post } from "@prisma/client";

export interface UserModel {
    id?: number;
    email: string;
    password: string;
    name: string;
    posts?: Post[];
  }
  
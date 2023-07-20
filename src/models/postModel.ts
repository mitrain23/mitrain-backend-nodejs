import { Image, User } from "@prisma/client";

export interface PostModel {
    id: number;
    title: string;
    description?: string;
    price_min: string;
    price_max: string;
    location: string;
    phone_number_whatsapp: string;
    phone_number_contact: string;
    authorId: string | number;
    author: User; 
    image: Image[];
  }
  
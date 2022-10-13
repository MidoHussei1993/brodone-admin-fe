import { Timing } from "src/app/shared/models"

export class Tag extends Timing{
    id: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    slug: string;
    isActive: boolean;
    restaurants: any[]
  }
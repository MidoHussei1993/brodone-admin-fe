export class EmployeeBranches {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  slug: string;
  location: {};
  lat: number;
  lng: number;
  address: string;
  featuredImage: string;
  images: string[];
  phoneNumbers: string[];
  restaurantId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  restaurant: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    slug: string;
    featuredImage: string;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    menuId: number;
    branches: string[];
    tags: [
      {
        id: number;
        title: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
        icon: string;
        slug: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        restaurants: any[];
      }
    ];
  };
}

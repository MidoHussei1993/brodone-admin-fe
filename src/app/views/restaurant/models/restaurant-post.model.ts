export class RestaurantPost {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  featuredImage: string;
  images: string[];
  tagsId: string[];
  restaurantAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phoneNumber: string;
  };
  branch: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    lat: 0;
    lng: 0;
    address: string;
    featuredImage: string;
    images: string[];
    phoneNumbers: string[];
  };
}

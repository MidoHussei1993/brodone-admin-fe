export class Order {
  id: number;
  username: string;
  customerName: string;
  refrenceCode: string;
  itemsCount: number;
  providerId: number;
  cost: number;
  taxes: number;
  shippingCost: number;
  paymentId: number;
  orderDate: string;
  cancelReasone: string;
  cancelDate: string;
  assignedDate: string;
  assignedTo: string;
  assignedCompany: string;
  orderStatus: string;
  shippmentAddressConfig: boolean;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
}

export class ShippingAddress {
  id: number;
  person: string;
  address: string;
  email: string;
  mobile: number;
  postCode: number;
  buildingNo: number;
  cities: cities;
}

export class cities {
  id: number;
  nameAr: string;
  nameEn: string;
  region: Region;
}

export class Region {
  id: number;
  nameAr: string;
  nameEn: string;
  shipmentCost: number;
}

export class OrderItem{
    id: number;
    productId: number;
    categoryId: number;
    quantity: number;
    productName: string;
    productDesc: string;
    costPerPiece: number;
    designCostPerPiece: number;
    total: number;
    imageUrl: string;
    basicImageUrl: string;
    logoUrl: string;
    designImageUrl: string;
  }

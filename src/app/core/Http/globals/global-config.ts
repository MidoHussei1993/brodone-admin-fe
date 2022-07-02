import { environment } from "src/environments/environment";

export const BaseURL: string = environment.apiURL;

export const FasterAPI = BaseURL + "/api";

class services {
  public static mkt = `${BaseURL}mkt/api/v1/`;
  public static usr = `${BaseURL}usr/api/v1/`;
  public static usrApi = `${BaseURL}usr/`;
  public static uaa = `${BaseURL}uaa/`;
  public static pay = `${BaseURL}pay/v1/api/`;
}

export class END_POINTS {
  // faster login

  public static AUTH = {
    login: services.uaa + "oauth/login",
    register: services.uaa + "customer/register",
    otp: services.uaa + "customer/otp",
    LOGOUT: services.uaa + "oauth/logout",
  };

  public static orders = {
    get: services.mkt + "admin/dashboard/allOrders",
    assign: services.mkt + "admin/dashboard/assign",
    revoke: services.mkt + "admin/dashboard/revoke",
    withdraw: services.mkt + "admin/dashboard/withdraw",
    printhouse: services.mkt + "admin/dashboard/printhouse",
  };
  public static printhouse = {
    printhouse: services.mkt + "admin/dashboard/printhouse",
    get: services.usrApi + "v1/admin/printing/all/pages",
    add: services.usrApi + "v1/admin/printing",
    edit: services.usrApi + "v1/admin/printing",
    getById: (categoryId: number): string =>
      services.usrApi + "v1/admin/printing/" + categoryId,
    cityDropdown: services.mkt + "city/region",
  };

  public static message = {
    sent: services.mkt + "message",
    reply: services.mkt + "message/reply",
    view: (id: number) => services.mkt + `message/view/${id}`,
    delete: (id: number) => services.mkt + `message/${id}`,
    getAll: services.mkt + "message/view/all",
    getAllSent: services.mkt + "message/view/sent",
    getAllReceived: services.mkt + "message/view/recieve",
    getCountOfUnRead: services.mkt + "message/count",
  };

  public static users = {
    getUsers: services.mkt + "admin/dashboard/users",
  };

  public static category = {
    getById: (categoryId: number): string =>
      services.mkt + "category/" + categoryId,
    delete: (categoryId: number): string =>
      services.mkt + "category/" + categoryId,
    addEditcategory: services.mkt + "admin/category",
    getAll: services.mkt + "category/all/pages",
    dropDown: services.mkt + "category/all",
    getCategoryImage: (categoryId: number): string =>
      services.mkt + "images/category/" + categoryId,
    getCategoryCanvas: (categoryId: number): string =>
      services.mkt + "images/canvas/" + categoryId,
    uploadCategoryImage: services.mkt + "images/category",
    uploadCategoryCanvas: services.mkt + "images/canvas",
  };

  public static product = {
    delete: (productId: number): string =>
      services.mkt + "admin/product/" + productId,
    getColors: services.mkt + "admin/product/colors",
    add: services.mkt + "admin/product",
    edit: services.mkt + "admin/product",
    getSizes: services.mkt + "admin/product/sizes",
    getAll: services.mkt + "product/all/pages",
    uploadImage: services.mkt + "images/product",
    getById: (productId: number): string =>
      services.mkt + "product?id=" + productId,
  };
}

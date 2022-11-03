import { environment } from "src/environments/environment";

export const BaseURL: string = environment.apiURL + "dashboard";

export const brodoneUrl = environment.apiURL;

export class END_POINTS {
  public static AUTH = {
    login: environment.apiURL + "admins/login",
  };

  public static tags = {
    add: BaseURL + "/tags",
    getAll: BaseURL + "/tags",
    getById: (productId: number): string => BaseURL + "/tags/" + productId,
    update: (id: number): string => BaseURL + "/tags/" + id,
    delete: (id: number): string => BaseURL + "/tags/" + id,
  };
  public static restaurants = {
    add: BaseURL + "/restaurants",
    getAll: BaseURL + "/restaurants",
    getById: (restaurantId: number): string =>
      BaseURL + "/restaurants/" + restaurantId,
    update: (id: number): string => BaseURL + "/restaurants/" + id,
    delete: (id: number): string => BaseURL + "/restaurants/" + id,
  };
  public static EmployeesRoles = {
    add: (restaurantId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/employee-roles`,
    getAll: (restaurantId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/employee-roles`,
    getById: (restaurantId: string, roleId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/employee-roles/${roleId}`,
    update: (restaurantId: string, roleId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/employee-roles/${roleId}`,
    delete: (restaurantId: string, roleId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/employee-roles/${roleId}`,
  };
  public static restaurantBranches = {
    add: (restaurantId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/branches`,
    getAll: (restaurantId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/branches`,
    getById: (restaurantId: string, branchId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/branches/${branchId}`,
    update: (restaurantId: string, branchId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/branches/${branchId}`,
    delete: (restaurantId: string, branchId: string): string =>
      `${BaseURL}/restaurants/${restaurantId}/branches/${branchId}`,
  };

  public static categories = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/categories`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/categories`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/categories/` + id,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/categories/` + id,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/categories/` + id,
    getCategoriesItems: (id: number): string =>
      BaseURL + "/categories/" + id + "/items",
  };

  public static restaurantsEmployees = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/employees`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/employees`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/employees/${id}`,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/employees/${id}`,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/employees/${id}`,
  };

  public static menus = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menus`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menus`,
    update: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menus`,
    delete: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menus `,
  };

  public static menusItems = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menu-items`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menu-items`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menu-items/${id}`,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menu-items/${id}`,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/menu-items/${id}`,
  };

  public static menusItemsVariations = {
    add: (restaurantId: number, menuItemId: number): string =>
      BaseURL +
      `/restaurants/${restaurantId}/menu-items/${menuItemId}/variations`,
    getAll: (restaurantId: number, menuItemId: number): string =>
      BaseURL +
      `/restaurants/${restaurantId}/menu-items/${menuItemId}/variations`,
    getById: (restaurantId: number, menuItemId: number, id: number): string =>
      BaseURL +
      `/restaurants/${restaurantId}/menu-items/${menuItemId}/variations/${id}`,
    update: (restaurantId: number, menuItemId: number, id: number): string =>
      BaseURL +
      `/restaurants/${restaurantId}/menu-items/${menuItemId}/variations/${id}`,
    delete: (restaurantId: number, menuItemId: number, id: number): string =>
      BaseURL +
      `/restaurants/${restaurantId}/menu-items/${menuItemId}/variations${id}`,
  };

  public static permissions = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/permissions`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/permissions`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/permissions/` + id,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/permissions/` + id,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/permissions/` + id,
    getCategoriesItems: (id: number): string =>
      BaseURL + "/permissions/" + id + "/items",
  };
  public static tables = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/tables`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/tables`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/tables/` + id,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/tables/` + id,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/tables/` + id,
    getCategoriesItems: (id: number): string =>
      BaseURL + "/tables/" + id + "/items",
  };

  public static attributes = {
    add: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/attributes`,
    getAll: (restaurantId: number): string =>
      BaseURL + `/restaurants/${restaurantId}/attributes`,
    getById: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/attributes/` + id,
    update: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/attributes/` + id,
    delete: (restaurantId: number, id: number): string =>
      BaseURL + `/restaurants/${restaurantId}/attributes/` + id,
    getCategoriesItems: (id: number): string =>
      BaseURL + "/attributes/" + id + "/items",
  };

  public static resources = {
    add: brodoneUrl + "resources",
    getAll: brodoneUrl + "resources",
    getById: (restaurantId: number): string =>
      brodoneUrl + "resources/" + restaurantId,
    update: (id: number): string => brodoneUrl + "resources/" + id,
    delete: (id: number): string => brodoneUrl + "resources/" + id,
  };

  public static variations = {
    add: (restaurantId: string, attributeId: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/menu-items/${attributeId}/variations`,
    getAll: (restaurantId: string, attributeId: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/menu-items/${attributeId}/variations`,
    getById: (restaurantId: string, attributeId: any, id: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/menu-items/${attributeId}/variations/${id}`,
    update: (restaurantId: string, attributeId: any, id: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/menu-items/${attributeId}/variations/${id}`,
    delete: (restaurantId: string, attributeId: any, id: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/menu-items/${attributeId}/variations/${id}`,
  };

  public static attributesValues = {
    add: (restaurantId: number, attributeId: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/attributes/${attributeId}/attribute-values`,
    getAll: (restaurantId: number, attributeId: any): string =>
      `${BaseURL}/restaurants/${restaurantId}/attributes/${attributeId}/attribute-values`,
    getById: (restaurantId: number, attributeId: any, id: number): string =>
      `${BaseURL}/restaurants/${restaurantId}/attributes/${attributeId}/attribute-values/${id}`,
    update: (restaurantId: number, attributeId: any, id: number): string =>
      `${BaseURL}/restaurants/${restaurantId}/attributes/${attributeId}/attribute-values/${id}`,
  };

  public static fileUpload = {
    upload: BaseURL + "/file-upload",
    delete: (fileKey: string): string =>
      `${BaseURL}/file-upload/${fileKey}`,
  };

  
}

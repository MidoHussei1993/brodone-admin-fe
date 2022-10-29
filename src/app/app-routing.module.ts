import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGaurd } from "./shared/services/auth.gaurd";
import { BlankLayoutComponent } from "./shared/components/layouts/blank-layout/blank-layout.component";
import { AdminLayoutSidebarCompactComponent } from "./shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component";
import { AdminLayoutSidebarLargeComponent } from "./shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component";

const adminRoutes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./views/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "tags",
    loadChildren: () =>
      import("./views/tags/tags.module").then((m) => m.TagsModule),
  },
  {
    path: "employee-branches/:restaurantId",
    loadChildren: () =>
      import("./views/employee-branches/employee-branches.module").then((m) => m.EmployeeBranchesModule),
  },
  {
    path: "employee-roles/:restaurantId",
    loadChildren: () =>
      import("./views/employee-roles/employee-roles.module").then((m) => m.EmployeeRolesModule),
  },
  {
    path: "restaurant",
    loadChildren: () =>
      import("./views/restaurant/restaurant.module").then((m) => m.RestaurantModule),
  },
  {
    path: "resources",
    loadChildren: () =>
      import("./views/resources/resources.module").then((m) => m.ResourcesModule),
  },
  {
    path: "category/:restaurantId",
    loadChildren: () =>
      import("./views/category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "restaurant-employee/:restaurantId",
    loadChildren: () =>
      import("./views/restaurant-employee/restaurant-employee.module").then((m) => m.RestaurantEmployeeModule),
  },
  {
    path: "attributes/:restaurantId",
    loadChildren: () =>
      import("./views/attributes/attributes.module").then((m) => m.AttributesModule),
  },
  {
    path: "tables/:restaurantId",
    loadChildren: () =>
      import("./views/tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "permissions/:restaurantId",
    loadChildren: () =>
      import("./views/permissions/permissions.module").then((m) => m.PermissionsModule),
  },
  {
    path: "menus/:restaurantId",
    loadChildren: () =>
      import("./views/menus/menus.module").then((m) => m.MenusModule),
  },
  {
    path: "menus-items/:restaurantId",
    loadChildren: () =>
      import("./views/menus-items/menus-items.module").then((m) => m.MenusItemsModule),
  },
  {
    path: "attributes/:restaurantId",
    loadChildren: () =>
      import("./views/attributes/attributes.module").then((m) => m.AttributesModule),
  },
  {
    path: "attribute-values/:restaurantId",
    loadChildren: () =>
      import("./views/attributes-values/attributes-values.module").then((m) => m.AttributesValuesModule),
  },
  {
    path: "variation/:restaurantId",
    loadChildren: () =>
      import("./views/variation/variation.module").then((m) => m.VariationModule),
  },
];

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard/v1",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
      },
    ],
  },
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "others",
        loadChildren: () =>
          import("./views/others/others.module").then((m) => m.OthersModule),
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutSidebarCompactComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes,
  },
  {
    path: "**",
    redirectTo: "others/404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

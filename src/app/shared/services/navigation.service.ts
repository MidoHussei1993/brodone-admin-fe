import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IMenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string; // Possible values: link/dropDown/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  role?: string[];
  active?: boolean;
}
export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

interface ISidebarState {
  sidenavOpen?: boolean;
  childnavOpen?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  public sidebarState: ISidebarState = {
    sidenavOpen: true,
    childnavOpen: false,
  };
  selectedItem: IMenuItem;

  constructor() {}

  defaultMenu: IMenuItem[] = [
    {
      name: "الاحصائيات",
      role: ["AUTH_ADMIN", "AUTH_PRINTING_HOUSE"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      type: "dropDown",
      icon: "i-Bar-Chart",
      sub: [
        {
          icon: "i-Clock-3",
          name: "مدير اللنظام",
          state: "/dashboard/v1",
          type: "link",
        },
        {
          icon: "i-Clock-4",
          name: "التقارير",
          state: "/dashboard/v2",
          type: "link",
        },
        {
          icon: "i-Over-Time",
          name: "صيانه النظام",
          state: "/dashboard/v3",
          type: "link",
        },
        {
          icon: "i-Clock",
          name: "الاحصائيات",
          state: "/dashboard/v4",
          type: "link",
        },
      ],
    },
    // {
    //     name: 'UI kits',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    //     type: 'dropDown',
    //     icon: 'i-Library',
    //     sub: [
    //         { icon: 'i-Bell', name: 'Alerts', state: '/uikits/alerts', type: 'link' },
    //         { icon: 'i-Split-Horizontal-2-Window', name: 'Accordions', state: '/uikits/accordions', type: 'link' },
    //         { icon: 'i-Medal-2', name: 'Badges', state: '/uikits/badges', type: 'link' },
    //         {
    //             icon: 'i-Arrow-Right-in-Circle',
    //             name: 'Buttons',
    //             type: 'dropDown',
    //             sub: [
    //                 { name: 'Bootstrap Buttons', state: '/uikits/buttons', type: 'link' },
    //                 { name: 'Loding Buttons', state: '/uikits/buttons-loading', type: 'link' }
    //             ]
    //         },
    //         { icon: 'i-ID-Card', name: 'Cards', state: '/uikits/cards', type: 'link' },
    //         { icon: 'i-Line-Chart-2', name: 'Cards metrics', state: '/uikits/cards-metrics', type: 'link' },
    //         { icon: 'i-Credit-Card', name: 'Cards widget', state: '/uikits/cards-widget', type: 'link' },
    //         { icon: 'i-Full-Cart', name: 'Cards ecommerce', state: '/uikits/cards-ecommerce', type: 'link' },
    //         { icon: 'i-Duplicate-Window', name: 'Modals', state: '/uikits/modals', type: 'link' },
    //         { icon: 'i-Speach-Bubble-3', name: 'Popover', state: '/uikits/popover', type: 'link' },
    //         { icon: 'i-Like', name: 'Rating', state: '/uikits/rating', type: 'link' },
    //         { icon: 'i-Loading-3', name: 'Loaders', state: '/uikits/loaders', type: 'link' },
    //     ]
    // },
    {
      name: "المطابع",
      description: "ادار حسابات المطابع",
      type: "dropDown",
      icon: "i-Computer-2",
      role: ["AUTH_ADMIN"],
      sub: [
        {
          icon: "i-Clock-3",
          name: "القائمة",
          state: "/print-house",
          type: "link",
        },
      ],
    },
    {
      name: "التصنيفات",
      role: ["AUTH_ADMIN"],
      description: "ادارة الاصناف الرئيسية والفئات.",
      type: "dropDown",
      icon: "i-Posterous",
      sub: [
        {
          icon: "i-Clock-3",
          name: "القائمة",
          state: "/category",
          type: "link",
        },
      ],
    },
    {
      name: "المنتجات",
      role: ["AUTH_ADMIN"],
      description: "ادارة المنتجات",
      type: "dropDown",
      icon: "i-Car-Items",
      sub: [
        { icon: "i-Clock-3", name: "القائمة", state: "/product", type: "link" },
      ],
    },

    {
      name: "الرسائل",
      role: ["AUTH_ADMIN", "AUTH_PRINTING_HOUSE"],
      description: "رسائل العملاء",
      type: "dropDown",
      icon: "i-Mail-2",
      sub: [
        {
          icon: "i-Clock-3",
          name: "جميع الرسائل",
          state: "/message",
          type: "link",
        },
        {
          icon: "i-Add-User",
          name: "الرسائل المستلمة",
          state: "/message/recieved",
          type: "link",
        },
        {
          icon: "i-Email",
          name: "الرسائل المرسلة",
          state: "/message/send",
          type: "link",
        },
      ],
    },
    {
      name: "الطلبات",
      role: ["AUTH_ADMIN", "AUTH_PRINTING_HOUSE"],
      description: "ادارة  وتوزيع الطلبات",
      type: "dropDown",
      icon: "i-Financial",
      sub: [
        { icon: "i-Clock-3", name: "القائمة", state: "/order", type: "link" },
      ],
    },
    {
      name: "التقارير",
      role: ["AUTH_ADMIN"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      type: "dropDown",
      icon: "i-Bar-Chart-2",
      sub: [
        {
          icon: "i-Error-404-Window",
          name: "Not found",
          state: "/others/404",
          type: "link",
        },
      ],
    },
    // {
    //     name: 'Doc',
    //     type: 'extLink',
    //     tooltip: 'Documentation',
    //     icon: 'i-Safe-Box1',
    //     state: 'gull-doc'
    // }
  ];

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // You can customize this method to supply different menu for
  // different user type.
  // publishNavigationChange(menuType: string) {
  //   switch (userType) {
  //     case 'admin':
  //       this.menuItems.next(this.adminMenu);
  //       break;
  //     case 'user':
  //       this.menuItems.next(this.userMenu);
  //       break;
  //     default:
  //       this.menuItems.next(this.defaultMenu);
  //   }
  // }
}

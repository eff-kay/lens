/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";

import roleBindingsRouteInjectable from "./role-bindings-route.injectable";
import {
  userManagementChildSidebarItemsInjectionToken,
} from "../user-management-sidebar-items.injectable";
import navigateToRouteInjectable from "../../../routes/navigate-to-route.injectable";
import currentRouteInjectable from "../../../routes/current-route.injectable";

const roleBindingsSidebarItemsInjectable = getInjectable({
  id: "role-bindings-sidebar-items",

  instantiate: (di) => {
    const route = di.inject(roleBindingsRouteInjectable);
    const currentRoute = di.inject(currentRouteInjectable);
    const navigateToRoute = di.inject(navigateToRouteInjectable);

    return computed(() => [
      {
        title: "Role Bindings",
        onClick: () => navigateToRoute(route),
        isActive: route === currentRoute.get(),
        isVisible: route.isEnabled(),
      },
    ]);
  },

  injectionToken: userManagementChildSidebarItemsInjectionToken,
});

export default roleBindingsSidebarItemsInjectable;

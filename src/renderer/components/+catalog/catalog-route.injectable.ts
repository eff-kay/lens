/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { routeInjectionToken } from "../../routes/all-routes.injectable";
import { Catalog } from "./catalog";

const catalogRouteInjectable = getInjectable({
  id: "catalog-route",

  instantiate: () => ({
    path: "/catalog/:group?/:kind?",
    Component: Catalog,
    clusterFrame: false,
    isEnabled: () => true,
  }),

  injectionToken: routeInjectionToken,
});

export default catalogRouteInjectable;

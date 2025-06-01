import { App } from "astal/gtk3";

import { initCore } from "@core/core";

import bar from "@apps/bar/bar";
import { monitorCorner, barCorner } from "./apps/corner/corner";

import { CSS_ENTRYPOINT } from "./path";

App.start({
  instanceName: "shell",
  css: CSS_ENTRYPOINT,
  async main(): Promise<void> {
    await initCore();
    bar();
    barCorner();
    monitorCorner();
  },
});

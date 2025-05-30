import { GLib, monitorFile } from 'astal';
import { App } from 'astal/gtk3';

import { CSS_DIR, CSS_ENTRYPOINT } from '@src/path';

export function initCSS(): void {
  const dir = GLib.Dir.open(CSS_DIR, 0);

  let fileName = undefined;

  while ((fileName = dir.read_name()) !== null) {
    if (fileName.endsWith('.css')) {
      monitorFile(`${CSS_DIR}/${fileName}`, (_): void => {
        App.apply_css(CSS_ENTRYPOINT, true);
      });
    }
  }

  dir.close();
}

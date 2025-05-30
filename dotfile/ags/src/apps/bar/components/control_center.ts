import { Widget, Gtk } from 'astal/gtk3';
import { bind } from 'astal';

import { config } from '@src/context';
import { getComponents } from '@apps/bar/bar';

export default (vertical: boolean) => new Widget.Box({
  className: 'control-center',
  vertical,
  spacing: 16,
  halign: Gtk.Align.CENTER,
  valign: Gtk.Align.CENTER,
  children: bind(config.bar.components.controlCenter)
    .as((controlCenter: string[]): Gtk.Widget[] => getComponents(controlCenter, vertical)),
});

import { Gdk, Gtk, Astal, Widget } from 'astal/gtk3';
import { bind } from 'astal';

import { config } from '@src/context';
import { addFactor } from '@src/core/window/window';

import apps from './components/apps';
import battery from './components/battery';
import controlCenter from './components/control_center';
import datetime from './components/datetime';
import keylayout from './components/keylayout';
import network from './components/network';
import volume from './components/volume';
import workspace from './components/workspace';

export default (): void => {
  addFactor(factor);
};

export const componentMap = new Map<string, (_: boolean) => Gtk.Widget>([
  ['apps', apps],
  ['battery', battery],
  ['control_center', controlCenter],
  ['datetime', datetime],
  ['keylayout', keylayout],
  ['network', network],
  ['volume', volume],
  ['workspace', workspace],
]);

export const anchorMap = new Map<string, Astal.WindowAnchor>([
  [
    'bottom',
    Astal.WindowAnchor.BOTTOM |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT,
  ],
  [
    'left',
    Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.BOTTOM,
  ],
  [
    'right',
    Astal.WindowAnchor.RIGHT |
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.BOTTOM,
  ],
  [
    'top',
    Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT,
  ],
]);

export function getComponents(
  components: string[],
  vertical: boolean,
): Gtk.Widget[] {
  return components.reduce((acc: Gtk.Widget[], name: string): Gtk.Widget[] => {
    const component = componentMap.get(name);
    component && acc.push(component(vertical));
    return acc;
  }, [] as Gtk.Widget[]);
}

export function getAnchor(anchor: string): Astal.WindowAnchor {
  return anchorMap.get(anchor) ?? anchorMap.get('top')!;
}

function getLayout(anchor: string): Widget.CenterBox {
  const vertical = anchor === 'left' || anchor === 'right';

  return new Widget.CenterBox({
    className: vertical ? 'bar vertical' : 'bar horizontal',
    vertical,
    start_widget: new Widget.Box({
      className: 'start',
      vertical,
      spacing: 24,
      halign: vertical ? Gtk.Align.CENTER : Gtk.Align.START,
      valign: vertical ? Gtk.Align.START : Gtk.Align.CENTER,
      children: bind(config.bar.components.start).as(
        (start: string[]): Gtk.Widget[] => getComponents(start, vertical),
      ),
    }),
    center_widget: new Widget.Box({
      className: 'center',
      vertical,
      spacing: 24,
      halign: Gtk.Align.CENTER,
      valign: Gtk.Align.CENTER,
      children: bind(config.bar.components.center).as(
        (center: string[]): Gtk.Widget[] => getComponents(center, vertical),
      ),
    }),
    end_widget: new Widget.Box({
      className: 'end',
      vertical,
      spacing: 24,
      halign: vertical ? Gtk.Align.CENTER : Gtk.Align.END,
      valign: vertical ? Gtk.Align.END : Gtk.Align.CENTER,
      children: bind(config.bar.components.end).as(
        (end: string[]): Gtk.Widget[] => getComponents(end, vertical),
      ),
    }),
  });
}

function factor(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.TOP,
    exclusivity: Astal.Exclusivity.EXCLUSIVE,
    anchor: bind(config.bar.anchor).as((anchor: string) => getAnchor(anchor)),
    child: bind(config.bar.anchor).as((anchor: string) => getLayout(anchor)),
  });
}

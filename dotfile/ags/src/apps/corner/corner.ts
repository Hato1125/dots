import Cairo from 'gi://cairo';

import { Gtk, Gdk } from 'astal/gtk3';
import { Astal, Widget } from 'astal/gtk3';
import { addFactor } from '@src/core/window/window';
import { bind } from 'astal';

import { config } from '@src/context';

function cornerWidget(
  className: string,
  draw: (round: number, context: Cairo.Context) => void,
): Widget.DrawingArea {
  return new Widget.DrawingArea({
    className: className,
    setup: (self: Widget.DrawingArea) => {
      const color: Gdk.RGBA = self
        .get_style_context()
        .get_property('background-color', Gtk.StateFlags.NORMAL) as Gdk.RGBA;

      const round: number = self
        .get_style_context()
        .get_property('border-radius', Gtk.StateFlags.NORMAL) as number;

      self.set_size_request(round, round);

      self.connect('draw', (_, context: Cairo.Context) => {
        draw(round, context);

        //@ts-ignore
        context.closePath();
        //@ts-ignore
        context.setSourceRGBA(color.red, color.green, color.blue, color.alpha);
        //@ts-ignore
        context.fill();
      });
    }
  });
}

function topLeftCorner(className: string): Widget.DrawingArea {
  return cornerWidget(className, (round: number, context: Cairo.Context): void => {
    //@ts-ignore
    context.arc(round, round, round, Math.PI, 3 * Math.PI / 2);
    //@ts-ignore
    context.lineTo(0, 0);
  });
}

function topRightCorner(className: string): Widget.DrawingArea {
  return cornerWidget(className, (round: number, context: Cairo.Context): void => {
    //@ts-ignore
    context.arc(0, round, round, 3 * Math.PI / 2, 2 * Math.PI);
    //@ts-ignore
    context.lineTo(round, 0);
  });
}

function bottomLeftCorner(className: string): Widget.DrawingArea {
  return cornerWidget(className, (round: number, context: Cairo.Context): void => {
    //@ts-ignore
    context.arc(round, 0, round, Math.PI / 2, Math.PI);
    //@ts-ignore
    context.lineTo(0, round);
  });
}

function bottomRightCorner(className: string): Widget.DrawingArea {
  return cornerWidget(className, (round: number, context: Cairo.Context): void => {
    //@ts-ignore
    context.arc(0, 0, round, 0, Math.PI / 2);
    //@ts-ignore
    context.lineTo(round, round);
  });
}

function monitorTopLeftCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.OVERLAY,
    exclusivity: Astal.Exclusivity.IGNORE,
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT,
    child: topLeftCorner('monitor-corner'),
  });
}

function monitorTopRightCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.OVERLAY,
    exclusivity: Astal.Exclusivity.IGNORE,
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
    child: topRightCorner('monitor-corner'),
  });
}

function monitorBottomLeftCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.OVERLAY,
    exclusivity: Astal.Exclusivity.IGNORE,
    anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT,
    child: bottomLeftCorner('monitor-corner'),
  });
}

function monitorBottomRightCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.OVERLAY,
    exclusivity: Astal.Exclusivity.IGNORE,
    anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT,
    child: bottomRightCorner('monitor-corner'),
  });
}

function barStartCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.TOP,
    exclusivity: Astal.Exclusivity.EXCLUSIVE,
    anchor: bind(config.bar.anchor)
      .as((anchor: string): Astal.WindowAnchor => {
        switch (anchor) {
          case 'top':
          default:
            return Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT;
          case 'bottom':
            return Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT;
          case 'left':
            return Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT;
          case 'right':
            return Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT;
        }
      }),
    child: bind(config.bar.anchor)
      .as((anchor: string): Widget.DrawingArea => {
        switch (anchor) {
          case 'top':
          default:
            return topLeftCorner('bar-corner');
          case 'bottom':
            return bottomLeftCorner('bar-corner');
          case 'left':
              return topLeftCorner('bar-corner');
          case 'right':
            return topRightCorner('bar-corner');
        }
      }),
  });
}

function barEndCorner(monitor: Gdk.Monitor): Widget.Window {
  return new Widget.Window({
    gdkmonitor: monitor,
    layer: Astal.Layer.TOP,
    exclusivity: Astal.Exclusivity.EXCLUSIVE,
    anchor: bind(config.bar.anchor)
      .as((anchor: string): Astal.WindowAnchor => {
        switch (anchor) {
          case 'top':
          default:
            return Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT;
          case 'bottom':
            return Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT;
          case 'left':
            return Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT;
          case 'right':
            return Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT;
        }
      }),
    child: bind(config.bar.anchor)
      .as((anchor: string): Widget.DrawingArea => {
        switch (anchor) {
          case 'top':
          default:
            return topRightCorner('bar-corner');
          case 'bottom':
            return bottomRightCorner('bar-corner');
          case 'left':
              return bottomLeftCorner('bar-corner');
          case 'right':
            return bottomRightCorner('bar-corner');
        }
      }),
  });
}

export function barCorner(): void {
  addFactor(barStartCorner);
  addFactor(barEndCorner);
}

export function monitorCorner(): void {
  addFactor(monitorTopLeftCorner);
  addFactor(monitorTopRightCorner);
  addFactor(monitorBottomLeftCorner);
  addFactor(monitorBottomRightCorner);
}

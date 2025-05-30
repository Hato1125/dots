import { App, Gdk, Gtk, Widget } from 'astal/gtk3';

const monitorWindows = new Map<Gdk.Monitor, Gtk.Widget>();

export function addFactor(factor: (_: Gdk.Monitor) => Gtk.Widget): void {
  for (const monitor of App.get_monitors()) {
    monitorWindows.set(monitor, factor(monitor));
  }

  App.connect('monitor-added', (_, monitor: Gdk.Monitor) => {
    monitorWindows.set(monitor, factor(monitor));
  });

  App.connect('monitor-removed', (_, monitor: Gdk.Monitor) => {
    monitorWindows.get(monitor)?.destroy();
    monitorWindows.delete(monitor);
  });
}

export function removeFactor(title: string): void {
  for (const [monitor, widget] of monitorWindows) {
    if (widget instanceof Widget.Window) {
      if ((widget as Widget.Window).title === title) {
        monitorWindows.delete(monitor);
      }
    }
  }
}

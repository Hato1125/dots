import Hyprland from 'gi://AstalHyprland';
import Pango from 'gi://Pango?version=1.0';

import { Widget, Gtk } from 'astal/gtk3';
import { bind } from 'astal';

const hyprland = Hyprland.get_default();

function verticalWorkspace(): Widget.Label {
  return new Widget.Label({
    className: 'active-workspace',
    halign: Gtk.Align.START,
    label: bind(hyprland, 'focusedWorkspace')
      .as((workspace?: Hyprland.Workspace): string => {
        return `Workspace ${workspace?.id ?? 'none'}`;
      }),
    angle: 90,
  });
}

function horizontalWorkspace(): Widget.Box {
  return new Widget.Box({
    vertical: true,
    homogeneous: true,
    children: [
      new Widget.Label({
        className: 'active-workspace',
        halign: Gtk.Align.START,
        label: bind(hyprland, 'focusedWorkspace')
          .as((workspace?: Hyprland.Workspace): string => {
            return `Workspace ${workspace?.id ?? 'none'}`;
          }),
      }),
      new Widget.Label({
        className: 'active-client',
        halign: Gtk.Align.START,
        ellipsize: Pango.EllipsizeMode.END,
        maxWidthChars: 50,
        label: bind(hyprland, 'focusedClient')
          .as((client?: Hyprland.Client): string => {
            return client?.title ?? 'none';
          }),
      }),
    ],
  });
}

export default (vertical: boolean): Widget.Box | Widget.Label => vertical
  ? verticalWorkspace()
  : horizontalWorkspace();

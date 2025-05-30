import { Widget, Gtk } from 'astal/gtk3';
import { Variable, bind } from 'astal';

const date = Variable(new Date())
  .poll(1000, () => new Date());

function getYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yyyy}/${mm}/${dd}`;
}

function getMMDD(date: Date): string {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${mm}/${dd}`;
}

function getAMPMHHMM(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${ampm} ${hh}:${mm}`;
}

function getHHMM(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function verticalDatetime(): Widget.Box {
  return new Widget.Box({
    vertical: true,
    hexpand: true,
    halign: Gtk.Align.CENTER,
    children: [
      new Widget.Label({
        className: 'time',
        halign: Gtk.Align.CENTER,
        label: bind(date).as(getHHMM)
      }),
      new Widget.Label({
        className: 'date',
        halign: Gtk.Align.CENTER,
        label: bind(date).as(getMMDD)
      }),
    ],
  });
}

function horizontalDatetime(): Widget.Box {
  return new Widget.Box({
    vertical: true,
    hexpand: true,
    valign: Gtk.Align.CENTER,
    children: [
      new Widget.Label({
        className: 'time',
        halign: Gtk.Align.END,
        label: bind(date).as(getAMPMHHMM)
      }),
      new Widget.Label({
        className: 'date',
        halign: Gtk.Align.END,
        label: bind(date).as(getYYYYMMDD)
      }),
    ],
  });
}

export default (vertical: boolean): Widget.Box => vertical
  ? verticalDatetime()
  : horizontalDatetime();

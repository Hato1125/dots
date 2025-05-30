import Network from 'gi://AstalNetwork';

import { Widget } from 'astal/gtk3';
import { Variable, bind } from 'astal';

const network = Network.get_default();

const wifiIcons = [
  'network_wifi_1_bar',
  'network_wifi_2_bar',
  'network_wifi_3_bar',
  'signal_wifi_4_bar',
];

const icon = Variable.derive([
  bind(network, 'primary'),
  bind(network.wifi, 'strength'),
], (primary: Network.Primary, strength: number): string => {
  switch (primary) {
    case Network.Primary.WIRED:
      return 'lan';
    case Network.Primary.WIFI:
      return wifiIcons[
        Math.floor(strength * (wifiIcons.length - 1))
      ]!;
    case Network.Primary.UNKNOWN:
      return 'question_mark';
  }
});

export default (_: boolean) => new Widget.Label({
  className: 'symbol-outlined',
  label: bind(icon),
  tooltipMarkup: bind(network.wifi, 'ssid').as((ssid?: string): string => {
    return ssid ?? 'Wired';
  }),
});

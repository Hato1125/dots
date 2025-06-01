import Battery from 'gi://AstalBattery';

import { Widget } from 'astal/gtk3';
import { Variable, bind } from 'astal';

const battery = Battery.get_default();

interface BatteryIconSet {
  icons: string[],
  charginIcon: string,
  errorIcon: string,
}

const horizontalIconSet: BatteryIconSet = {
  icons: [
    'battery_android_0',
    'battery_android_1',
    'battery_android_2',
    'battery_android_3',
    'battery_android_4',
    'battery_android_5',
    'battery_android_6',
    'battery_android_full',
  ],
  charginIcon: 'battery_android_bolt',
  errorIcon: 'battery_android_question',
};

const verticalIconSet: BatteryIconSet = {
  icons: [
    'battery_0_bar',
    'battery_1_bar',
    'battery_2_bar',
    'battery_3_bar',
    'battery_4_bar',
    'battery_5_bar',
    'battery_6_bar',
    'battery_full',
  ],
  charginIcon: 'battery_charging_full',
  errorIcon: 'battery_unknown',
};

function getIcon(
  iconSet: BatteryIconSet,
  percentage: number,
  charging: boolean
): string {
  if (charging) {
    return iconSet.charginIcon;
  }

  if (percentage < 0 || percentage > 1) {
    return iconSet.errorIcon;
  }

  const length = iconSet.icons.length - 1;
  const index = Math.floor(percentage * length);

  return iconSet.icons[index]!;
}

function getPercentage(percentage: number): string {
  return percentage === -1 ? 'none' : `${percentage * 100}%`;
}

export default (vertical: boolean): Widget.Label => {
  const iconSet = vertical ? verticalIconSet : horizontalIconSet;

  const iconvariable = Variable.derive([
    bind(battery, 'percentage'),
    bind(battery, 'charging'),
  ], (percentage: number, charging: boolean): string => getIcon(iconSet, percentage, charging));

  return new Widget.Label({
    className: 'symbol-outlined',
    label: bind(iconvariable),
    tooltipText: bind(battery, 'percentage').as(getPercentage),
  });
}

import Battery from 'gi://AstalBattery';

import { Widget } from 'astal/gtk3';
import { Variable, bind } from 'astal';

const battery = Battery.get_default();

interface BatteryIconSet {
  percentageIcons: string[],
  charginIcon: string,
  errorIcon: string,
}

const horizontalIconSet: BatteryIconSet = {
  percentageIcons: [
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
  percentageIcons: [
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

  if (percentage === -1) {
    return iconSet.errorIcon;
  }

  return iconSet.percentageIcons[
    Math.floor(percentage * (iconSet.percentageIcons.length - 1))
  ]!;
}

const horizontalIcon = Variable.derive([
  bind(battery, 'percentage'),
  bind(battery, 'charging'),
], (percentage: number, charging: boolean): string => getIcon(horizontalIconSet, percentage, charging));

const verticalIcon = Variable.derive([
  bind(battery, 'percentage'),
  bind(battery, 'charging'),
], (percentage: number, charging: boolean): string => getIcon(verticalIconSet, percentage, charging));

export default (vertical: boolean) => new Widget.Label({
  className: 'symbol-outlined',
  label: bind(
    vertical
      ? verticalIcon
      : horizontalIcon
  ),
  tooltipText: bind(battery, 'percentage').as((percentage: number): string => {
    return percentage === -1 ? 'none' : `${percentage * 100}%`;
  }),
});

import { GLib } from 'astal';

export const CONFIG_DIR = `${GLib.get_user_config_dir()}/ags`;
export const MII_DIR = `${GLib.get_user_config_dir()}/mii`;

export const TEMP_DIR = '/tmp';
export const LONG_TEMP_DIR = '/var/tmp';

export const MAIN_FILE_DIR = `${LONG_TEMP_DIR}/mii.desktop`;
export const MAIN_FILE_PATH = `${MAIN_FILE_DIR}/main.js`;

export const CSS_DIR = `${CONFIG_DIR}/css`;
export const CSS_ENTRYPOINT = `${CSS_DIR}/main.css`;

export const COLOR_PATH = `${CSS_DIR}/color.css`;

export const CONFIG_PATH = `${MII_DIR}/config.json`;

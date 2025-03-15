from ..collection import Collection
from ..package import Package
from ..dotfile import Dotfile

from ..utils import connected_nvidia_gpu, is_asus_laptop

arch: Collection = Collection(
  [
    Package('firefox', None, None),
    Package('blueberry', None, None),
    Package('pavucontrol', None, None),
    Package('discord', None, None),
    Package('spotify', None, None),
    Package('eog', None, None),
    Package('nautilus', None, None),
    Package('totem', None, None),
    Package('snapshot', None, None),
    Package('pdfarranger', None, None),
    Package('pdfarranger', None, None),
    Package('mission-center', None, None),
    Package('gnome-music', None, None),
    Package('gnome-calculator', None, None),
    Package('gnome-text-editor', None, None),
    Package('hyprshot', None, None),
    Package('hyprpicker', None, None),
    Package('nvidia-settings', connected_nvidia_gpu, None),
    Package('rog-control-center', is_asus_laptop, None),

    Package('zed', None, None),
    Package('neovim', None, None),
    Package('ghostty', None, None),
    Package('oh-my-posh', None, None),
    Package('docker-desktop', None, None),
    Package('visual-studio-code-bin', None, None),
    Package('meson', None, None),
    Package('cmake', None, None),
    Package('clang', None, None),
    Package('libc++', None, None),

    Package('ttf-google-sans', None, None),
    Package('ttf-material-symbols-variable-git', None, None),
    Package('noto-fonts-cjk', None, None),
    Package('noto-color-emoji-fontconfig', None, None),

    Package('uwsm', None, None),
    Package('aylurs-gtk-shell', None, None),
    Package('adw-gtk-theme', None, None),
    Package('fcitx5-im', None, None),
    Package('fcitx5-mozc', None, None),
    Package('bluez', None, None),
    Package('bluez-utils', None, None),
    Package('brightnessctl', None, None),
    Package('swww', None, None),
    Package('switcheroo-control', None, None),
    Package('supergfxctl', None, None),
    Package('asusctl', is_asus_laptop, None),
  ],
  [
    Dotfile('dotfile/.zshrc', '.zshrc'),
    Dotfile('dotfile/ohmyposh', '.config/ohmyposh'),
    Dotfile('dotfile/ghostty', '.config/ghostty'),
  ]
)

from typing import List

from .utils import get_os_or_distro_name
from .package import Package, get_available_package_manager
from .dotfile import Dotfile

class Collection:
  _packages: List[Package]
  _dotfiles: List[Dotfile]

  def __init__(self, packages: List[Package], dotfiles: List[Dotfile]) -> None:
    self._packages = packages
    self._dotfiles = dotfiles

  def install(self) -> None:
    package_manager = get_available_package_manager()

    for package in self._packages:
      package.install(package_manager)

    for dotfile in self._dotfiles:
      dotfile.install()

  def uninstall(self) -> None:
    for dotfile in self._dotfiles:
      dotfile.uninstall()

@staticmethod
def install() -> None:
  match get_os_or_distro_name():
    case 'Arch Linux':
      from .target.arch import arch
      arch.install()

@staticmethod
def uninstall() -> None:
  match get_os_or_distro_name():
    case 'Arch Linux':
      from .target.arch import arch
      arch.uninstall()

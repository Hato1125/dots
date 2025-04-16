import subprocess

from typing import Callable
from abc import ABC, abstractmethod

from .utils import get_os_or_distro_name

class PackageManager(ABC):
  @abstractmethod
  def install_package(self, package: str) -> None:
    pass

  @abstractmethod
  def has_package(self, package: str) -> bool:
    pass

class YayPackageManager(PackageManager):
  def install_package(self, package: str) -> None:
    subprocess.run(['yay', '-S', package])

  def has_package(self, package: str) -> bool:
    return len(
      subprocess.run(['yay', '-Qs', package], capture_output=True).stdout
    ) > 0

  @staticmethod
  def has() -> bool:
    return len(
      subprocess.run(['pacman', '-Qs', 'yay'], capture_output=True).stdout
    ) > 0

class ParuPackageManager(PackageManager):
  def install_package(self, package: str) -> None:
    subprocess.run(['paru', '-S', package])

  def has_package(self, package: str) -> bool:
    return len(
      subprocess.run(['paru', '-Qs', package], capture_output=True).stdout
    ) > 0

  @staticmethod
  def has() -> bool:
    return len(
      subprocess.run(['pacman', '-Qs', 'paru'], capture_output=True).stdout
    ) > 0

class WingetPackageManager(PackageManager):
  def install_package(self, package: str) -> None:
    print('test')
    print(package)
    subprocess.run(['winget', 'install', package])

  def has_package(self, package: str) -> bool:
    try:
      result = subprocess.run(['winget', 'list', '--id', package], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        
      if package.lower() in result.stdout.decode('utf-8').lower():
        return True
      else:
        return False
    except subprocess.CalledProcessError:
      return False

  @staticmethod
  def has() -> bool:
    try:
      result = subprocess.run(
        ['winget', '--version'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True
      )

      return True
    except subprocess.CalledProcessError:
      return False

class Package:
  _name: str
  _condition: Callable[[], bool] | None
  _installed: Callable[[], None] | None

  def __init__(
    self,
    name: str,
    condition: Callable[[], bool] | None,
    installed: Callable[[], None] | None
  ):
    self._name = name
    self._condition = condition
    self._installed = installed

  def install(self, manager: PackageManager) -> None:
    if self._condition == None or self._condition():
      if not manager.has_package(self._name):
        manager.install_package(self._name)

        if self._installed is not None:
          self._installed()

@staticmethod
def get_available_package_manager() -> 'PackageManager':
  match get_os_or_distro_name():
    case 'Arch Linux':
      if YayPackageManager.has():
        return YayPackageManager()

      if ParuPackageManager.has():
        return ParuPackageManager()
    case 'Windows':
      if WingetPackageManager().has():
        return WingetPackageManager()

  raise RuntimeError('There is no package manager available.')

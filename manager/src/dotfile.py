import shutil

from pathlib import Path

class Dotfile:
  _src: Path
  _dest: Path

  def __init__(self, src: str, dest: str):
    self._src = Path(src)
    self._dest = Path(dest)

  def install(self) -> None:
    src_path = Path.cwd() / self._src
    dest_path = Path.home() / self._dest

    if not src_path.exists():
      raise FileNotFoundError('Source not found.')

    if dest_path == Path.home():
      raise RuntimeWarning('Destination cannot be home directory.')

    if dest_path.exists():
      if dest_path.is_dir():
        shutil.rmtree(dest_path)
      else:
        dest_path.unlink()

    Dotfile._new_create_symlink(src_path, dest_path)

  def uninstall(self) -> None:
    dest_path = Path.home() / self._dest

    if dest_path == Path.home():
      raise RuntimeWarning('Destination cannot be home directory.')

    if dest_path.exists():
      if dest_path.is_dir():
        shutil.rmtree(dest_path)
      else:
        dest_path.unlink()

  @staticmethod
  def _new_create_symlink(src: Path, dest: Path) -> None:
    if src.is_dir():
      dest.mkdir()

      for file in src.iterdir():
        if file.is_dir():
          Dotfile._new_create_symlink(file, dest / file.name)
        else:
          Path(dest / file.name).symlink_to(file)
    else:
      Path(dest).symlink_to(src)

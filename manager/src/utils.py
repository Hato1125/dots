import platform
import subprocess

def connected_nvidia_gpu() -> bool:
  devices = subprocess.run('lspci', capture_output=True, text=True)
  devices = devices.stdout.split('\n')

  for gpu in devices:
    if 'VGA' in gpu and 'NVIDIA' in gpu:
      return True

  return False

def is_asus_laptop() -> bool:
  mecker = subprocess.run(
    ['cat', '/sys/class/dmi/id/sys_vendor'],
    capture_output=True,
    text=True
  )

  return 'ASUSTeK COMPUTER INC.' in mecker.stdout

def get_os_or_distro_name():
  os = platform.system()

  if os != 'Linux':
    return os

  with open('/etc/os-release') as f:
    for line in f:
      if line.startswith('NAME='):
        return line.split('=')[1].strip('"\n')

  return None

#!/usr/bin/env python3

import sys

from src.collection import install, uninstall

def main() -> None:
  if len(sys.argv) > 1:
    match sys.argv[1]:
      case 'install':
        install()
      case 'uninstall':
        uninstall()

if __name__ == '__main__':
  main()

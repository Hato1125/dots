from ..collection import Collection
from ..package import Package
from ..dotfile import Dotfile

windows: Collection = Collection(
  [
    Package('Mozilla.Firefox', None, None),
    Package('Discord.Discord', None, None),
    Package('Microsoft.PowerShell', None, None),
    Package('Microsoft.VisualStudioCode', None, None),
    Package('Git.Git', None, None),
    Package('Neovim.Neovim', None, None),
    Package('Docker.DockerCLI', None, None),
    Package('Docker.DockerDesktopEdge', None, None),
  ],
  [
    Dotfile('dotfile\\nvim', 'AppData\\Local\\nvim'),
    Dotfile('dotfile\\ohmyposh', 'AppData\\Local\\ohmyposh'),
  ]
)
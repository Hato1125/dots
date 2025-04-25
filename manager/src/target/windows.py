from ..collection import Collection
from ..package import Package
from ..dotfile import Dotfile

windows: Collection = Collection(
  [
    Package('Mozilla.Firefox', None, None),
    Package('eloston.ungoogled-chromium', None, None),
    Package('Discord.Discord', None, None),
    Package('Inkdrop.Inkdrop', None, None),
    Package('Microsoft.PowerShell', None, None),
    Package('Microsoft.VisualStudioCode', None, None),
    Package('Git.Git', None, None),
    Package('JanDeDobbeleer.OhMyPosh', None, None),
    Package('Neovim.Neovim', None, None),
    Package('Docker.DockerCLI', None, None),
    Package('Docker.DockerDesktopEdge', None, None),
  ],
  [
    Dotfile('dotfile\\nvim', 'AppData\\Local\\nvim'),
    Dotfile('dotfile\\ohmyposh', 'AppData\\Local\\ohmyposh'),
  ]
)

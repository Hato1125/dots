local lazypath = vim.fn.stdpath("data") .. '/lazy/lazy.nvim'
local lazyrepo = 'https://github.com/folke/lazy.nvim.git'

if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local out = vim.fn.system({
    'git',
    'clone',
    '--filter=blob:none',
    '--branch=stable',
    lazyrepo,
    lazypath
  })

  if vim.v.shell_error ~= 0 then
    os.exit(1)
  end
end

vim.opt.rtp:prepend(lazypath)

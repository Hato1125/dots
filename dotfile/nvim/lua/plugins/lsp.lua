return {
  {
    'williamboman/mason.nvim',
    opts = {
    },
  },
  {
    'williamboman/mason-lspconfig.nvim',
    dependencies = {
      'neovim/nvim-lspconfig',
    },
    opts = {
      ensure_installed = {
        'lua_ls',
        'rust_analyzer',
        'glsl_analyzer',
        'zls',
        'html',
        'ruff',
        'cssls',
        'dartls',
        'eslint',
        'clangd',
        'bashls',
        'jsonls',
        'yamlls',
        'bashls',
        'taplo',
        'lemminx',
        'angularls',
      },
    },
    config = function()
      require('mason-lspconfig').setup_handlers {
        function(server_name)
          require('lspconfig')[server_name].setup {
          }
        end
      }
    end
  },
}

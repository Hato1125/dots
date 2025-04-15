return {
  {
    'lukas-reineke/indent-blankline.nvim',
    main = 'ibl',
    config = function()
      vim.api.nvim_create_autocmd('ColorScheme', {
        callback = function()
          vim.api.nvim_set_hl(0, 'IblIndent', { fg = '#2e2e2e' })
          vim.api.nvim_set_hl(0, 'IblScope', { fg = '#ffff55' })
        end,
      })

      vim.api.nvim_set_hl(0, 'IblIndent', { fg = '#2e2e2e' })
      vim.api.nvim_set_hl(0, 'IblScope', { fg = '#ffff55' })

      require('ibl').setup({
        indent = {
        }
      })
    end
  },
  {
    'nvim-treesitter/nvim-treesitter',
    opts = {
      ensure_installed = {
        'vim',
        'lua',
        'rust',
        'glsl',
        'python',
        'zig',
        'html',
        'scss',
        'javascript',
        'typescript',
        'c',
        'cpp',
        'dart',
        'gleam',
        'json',
        'yaml',
        'bash',
        'toml',
        'xml',
        'angular',
      },
      highlight = {
        enable = true,
      },
    },
    config = function(_, opts)
      require('nvim-treesitter.configs').setup(opts)
    end
  },
  {
    'hrsh7th/nvim-cmp',
    dependencies = {
      'hrsh7th/cmp-nvim-lsp',
      'hrsh7th/cmp-buffer',
      'hrsh7th/cmp-path',
    },
    opts = function()
      local cmp = require('cmp')
      local map = cmp.mapping

      vim.api.nvim_set_hl(0, 'Pmenu', { bg = 'NONE' })
      vim.api.nvim_set_hl(0, 'PmenuSel', { bg = '#333333', fg = '#ffffff' })
      vim.api.nvim_set_hl(0, 'FloatBorder', { bg = 'NONE', fg = '#ffffff' })

      return {
        window = {
          completion = {
            border = 'rounded',
            scrollbar = '║',
            winhighlight = 'Normal:Pmenu,FloatBorder:FloatBorder,CursorLine:PmenuSel,Search:None',
          },
        },
        mapping = map.preset.insert {
          ['<esc>'] = map.abort(),
          ['<tab>'] = map.confirm { select = false },
          ['<cr>'] = map.confirm { select = false },
        },
        sources = cmp.config.sources({
          { name = 'lazydev' },
          { name = 'nvim_lsp' },
          { name = 'path' },
        }),
      }
    end,
  },
}

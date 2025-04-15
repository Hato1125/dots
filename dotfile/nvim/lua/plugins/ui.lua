return {
  {
    'andreypopp/vim-colors-plain',
    config = function()
      vim.cmd([[colorscheme plain]])
    end
  },
  {
    'xiyaowong/transparent.nvim',
    config = function()
      vim.cmd([[TransparentEnable]])
    end
  },
  {
    'nvim-telescope/telescope-fzf-native.nvim',
    build = 'make',
  },
  {
    'nvim-telescope/telescope.nvim',
    dependencies = {
      'nvim-lua/plenary.nvim',
      'MunifTanjim/nui.nvim',
    },
    keys = {
      { '<leader>ff', '<cmd>Telescope find_files<cr>' }
    },
    opts = {
      defaults = {
        results_title = false,
        sorting_strategy = 'ascending',
        layout_strategy = 'center',
        layout_config = {
          width = 85,
          height = 30,
          prompt_position = 'top',
        },
        borderchars = {
          prompt = { '─', '│', ' ', '│', '╭', '╮', '│', '│' },
          results = { '─', '│', '─', '│',  '├', '┤', '╯', '╰' },
          preview = { '─', '│', '─', '│', '╭', '╮', '╯', '╰' },
        },
        path_display = {
          'tail',
        },
      },
      extensions = {
        fzf = {
          case_mode = 'ignore_case',
        },
      },
      pickers = {
        find_files = {
          previewer = false,
        },
      },
    },
    config = function(_, opts)
      require('telescope').load_extension('fzf')
      require('telescope').setup(opts)
    end,
  },
  {
    'nvim-neo-tree/neo-tree.nvim',
    dependencies = {
      'nvim-lua/plenary.nvim',
      'nvim-tree/nvim-web-devicons',
      'MunifTanjim/nui.nvim',
      '3rd/image.nvim',
    },
    keys = {
      {
        '<leader>fb',
        function()
          require('neo-tree.command').execute({ toggle = true, dir = vim.uv.cwd() })
        end,
        desc = 'File explorer',
      },
    },
    opts = {
      popup_border_style = 'rounded',
      default_component_configs = {
        indent = {
          indent_size = 2,
          indent_marker = ' ',
          last_indent_marker = '  ',
        },
      },
      renderers = {
        directory = {
          { 'indent' },
          { 'icon' },
          { 'name' },
        },
        file = {
          { 'indent' },
          { 'icon' },
          { 'name' },
        },
      },
    },
  },
}

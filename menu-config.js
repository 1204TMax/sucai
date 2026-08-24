/**
 * 菜单配置文件
 *
 * 所有菜单和页面的对应关系都在这里配置。
 * 新增页面只需要两步：
 *   1. 在对应文件夹里创建 .html 文件
 *   2. 在下面的配置里加一行
 *
 * 结构说明：
 *   - id：模块唯一标识（英文，不要改）
 *   - name：顶部一级菜单显示的名称
 *   - label：侧边栏顶部模块标题（可选，如"创作中心"）
 *   - children：二级菜单列表，支持两种写法：
 *       a) 平铺数组（兼容旧版）：直接放菜单项对象
 *       b) 分组数组（推荐）：每个分组包含 title 和 items
 *   - 菜单项字段：
 *       - name：侧边栏显示的名称
 *       - page：对应的 HTML 文件路径（相对于本文件所在目录）
 *       - icon：菜单图标（SVG 路径）
 *       - badge：角标对象，支持 text（自定义文本）或 generating / unviewed 数字
 *       - type: 'divider'：分割线（平铺模式下有效）
 */

const MENU_CONFIG = [
  {
    id: 'ai',
    name: 'AI创作',
    label: '创作中心',
    children: [
      {
        items: [
          {
            name: '通用生成',
            page: 'AI 创作/通用生成.html',
            icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>'
          },
          {
            name: '我的任务',
            page: 'AI 创作/我的任务.html',
            icon: '<path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
            badge: { text: '>4' }
          },
          {
            name: '工作流广场',
            page: 'AI 创作/工作流广场.html',
            icon: '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>'
          }
        ]
      },
      {
        title: '资源管理',
        items: [
          {
            name: '原料库',
            page: 'AI 创作/原料库.html',
            icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path>'
          },
          {
            name: '项目管理',
            page: 'AI 创作/项目管理.html',
            icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>'
          }
        ]
      },
      {
        title: '系统管理',
        items: [
          {
            name: 'ComfyUI 节点管理',
            page: 'AI 创作/ComfyUI 节点管理.html',
            icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96L12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path>'
          },
          {
            name: '节点类型管理',
            page: 'AI 创作/节点类型管理.html',
            icon: '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h2a3 3 0 0 1 3 3v6"></path><path d="M6 9v2a3 3 0 0 0 3 3h1"></path>'
          }
        ]
      },
      {
        title: '成本管理',
        items: [
          {
            name: '成本管理',
            page: 'AI 创作/成本管理.html',
            icon: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
          }
        ]
      }
    ]
  },
  {
    id: 'settings',
    name: '系统设置',
    label: '系统设置',
    children: [
      {
        items: [
          {
            name: '模型配置',
            page: '共享样式/该需求暂未完成.html',
            icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>'
          },
          {
            name: '算力成本',
            page: '共享样式/该需求暂未完成.html',
            icon: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
          }
        ]
      }
    ]
  }
];

// 默认页面（打开系统时加载）
const DEFAULT_PAGE = 'AI 创作/通用生成.html';
const DEFAULT_TAB_NAME = '通用生成';

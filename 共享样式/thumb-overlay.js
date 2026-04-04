/**
 * 缩略图悬浮操作按钮组件 - 逻辑
 *
 * 使用方式：
 *   <link rel="stylesheet" href="../共享样式/thumb-overlay.css">
 *   <script src="../共享样式/thumb-overlay.js"></script>
 *
 * 依赖：
 *   - 页面需定义 showToast(msg)
 *   - 缩略图容器需有 class="o-thumb" 和 position:relative
 *
 * 使用示例：
 *   在生成缩略图 HTML 时，调用 thumbOverlayHtml() 拼入 .o-thumb 容器内。
 *
 * 入库目标和编辑选项可通过常量自定义：
 *   STORAGE_TARGETS = ['素材库', '物料库', '原料库']
 *   EDIT_OPTIONS = [{l:'文本创作'}, {l:'图像创作'}, ...]
 */

/* ── 入库目标 ── */
var STORAGE_TARGETS = ['素材库', '物料库', '原料库'];

/* ── 编辑选项（含子菜单） ── */
var EDIT_OPTIONS = [
  { l: '文本创作' },
  { l: '图像创作' },
  { l: '视频创作' },
  { l: '工作流', children: ['图片衍生'] }
];

/* ── SVG 图标 ── */
var THUMB_ICONS = {
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  store:    '<svg width="14" height="14" viewBox="0 0 1024 1024" fill="currentColor"><path d="M102.4 69.12h819.2l102.4 204.8v716.8h-51.2H0v-716.8l102.4-204.8z m819.2 302.08H102.4v512h819.2v-512z m-22.016-107.52l-50.176-93.184H174.08l-50.176 93.184h775.68z"/><path d="M558.592 632.32h114.688l-153.088 153.088-152.576-153.088h114.688V479.232h76.288v153.088z"/></svg>',
  edit:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
};

/**
 * 生成悬浮操作按钮 HTML
 * @param {string} [downloadAction] - 下载按钮的 onclick 代码，默认提示"已下载"
 * @returns {string} HTML 片段，放在 .o-thumb 容器内
 */
function thumbOverlayHtml(downloadAction) {
  if (!downloadAction) downloadAction = "event.stopPropagation();showToast('已下载')";

  // 入库下拉
  var storeDD = STORAGE_TARGETS.map(function(t) {
    return '<div class="storage-dd-item" onclick="event.stopPropagation();showToast(\'已入库到' + t + '\');this.closest(\'.storage-dropdown\').style.display=\'none\'">' + t + '</div>';
  }).join('');

  // 编辑下拉
  var editDD = EDIT_OPTIONS.map(function(opt) {
    if (opt.children) {
      var subs = opt.children.map(function(s) {
        return '<div class="edit-submenu-item" onclick="event.stopPropagation();showToast(\'已添加到' + s + '工作流\');this.closest(\'.edit-menu\').style.display=\'none\'">' + s + '</div>';
      }).join('');
      return '<div class="edit-menu-item" style="position:relative">' + opt.l + ' <span class="sub-arrow">▸</span>'
        + '<div class="edit-submenu">' + subs + '</div></div>';
    }
    return '<div class="edit-menu-item" onclick="event.stopPropagation();showToast(\'已添加到' + opt.l + '\');this.closest(\'.edit-menu\').style.display=\'none\'">' + opt.l + '</div>';
  }).join('');

  return '<div class="thumb-overlay">'
    + '<button class="thumb-act" title="下载" onclick="' + downloadAction + '">' + THUMB_ICONS.download + '</button>'
    + '<button class="thumb-act" title="入库" onclick="event.stopPropagation();toggleThumbDD(this,\'store\')">' + THUMB_ICONS.store
    + '<div class="storage-dropdown" onclick="event.stopPropagation()">' + storeDD + '</div></button>'
    + '<button class="thumb-act" title="编辑" onclick="event.stopPropagation();toggleThumbDD(this,\'edit\')">' + THUMB_ICONS.edit
    + '<div class="edit-menu" onclick="event.stopPropagation()">' + editDD + '</div></button>'
    + '</div>';
}

/**
 * 切换悬浮按钮的下拉菜单
 */
function toggleThumbDD(btn, type) {
  var dd = btn.querySelector(type === 'store' ? '.storage-dropdown' : '.edit-menu');
  // 关闭同一 overlay 内的其他菜单
  var overlay = btn.closest('.thumb-overlay');
  if (overlay) {
    overlay.querySelectorAll('.storage-dropdown,.edit-menu').forEach(function(el) {
      if (el !== dd) el.style.display = 'none';
    });
  }
  dd.style.display = dd.style.display === 'none' ? '' : 'none';
}

// 点击空白处关闭所有悬浮菜单
document.addEventListener('click', function(e) {
  if (!e.target.closest('.thumb-act')) {
    document.querySelectorAll('.thumb-overlay .storage-dropdown,.thumb-overlay .edit-menu').forEach(function(el) {
      el.style.display = 'none';
    });
  }
});

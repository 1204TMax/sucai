/**
 * 图片预览组件 - 逻辑 + HTML
 *
 * 使用方式：
 *   <link rel="stylesheet" href="../共享样式/image-preview.css">
 *   <script src="../共享样式/image-preview.js"></script>
 *
 *   页面加载后调用 initImagePreview() 注入 HTML。
 *   任意位置调用 window.__previewImage(url, list, idx) 打开预览。
 *
 * 依赖：
 *   - 页面需定义 showToast(msg)
 *   - 入库/编辑选项复用 STORAGE_TARGETS / EDIT_OPTIONS（若已引入 thumb-overlay.js 则自动可用）
 */

/* ── 预览状态 ── */
var _pvList = [];
var _pvIdx = 0;

/* ── SVG 图标 ── */
var PV_ICONS = {
  close:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  download: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  store:    '<svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor"><path d="M102.4 69.12h819.2l102.4 204.8v716.8h-51.2H0v-716.8l102.4-204.8z m819.2 302.08H102.4v512h819.2v-512z m-22.016-107.52l-50.176-93.184H174.08l-50.176 93.184h775.68z"/><path d="M558.592 632.32h114.688l-153.088 153.088-152.576-153.088h114.688V479.232h76.288v153.088z"/></svg>',
  edit:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  prev:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>',
  next:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>'
};

/**
 * 注入预览组件 HTML 到 body 末尾
 * 页面加载后调用一次即可
 */
function initImagePreview() {
  if (document.getElementById('imgPreviewMask')) return;

  // 入库下拉选项
  var storageTargets = (typeof STORAGE_TARGETS !== 'undefined') ? STORAGE_TARGETS : ['素材库', '物料库', '原料库'];
  var storeItems = storageTargets.map(function(t) {
    return '<div class="pv-dd-item" onclick="showToast(\'已入库到' + t + '\');this.closest(\'.img-preview-store-dd\').classList.remove(\'show\')">' + t + '</div>';
  }).join('');

  // 编辑下拉选项
  var editOptions = (typeof EDIT_OPTIONS !== 'undefined') ? EDIT_OPTIONS : [
    { l: '文本创作' }, { l: '图像创作' }, { l: '视频创作' },
    { l: '工作流', children: ['图片衍生'] }
  ];
  var editItems = editOptions.map(function(opt) {
    if (opt.children) {
      var subs = opt.children.map(function(s) {
        return '<div class="pv-dd-item" onclick="showToast(\'已添加到' + s + '工作流\');this.closest(\'.img-preview-store-dd\').classList.remove(\'show\')">' + s + '</div>';
      }).join('');
      return '<div class="pv-dd-item">' + opt.l + ' <span class="sub-arrow">▸</span><div class="pv-dd-sub">' + subs + '</div></div>';
    }
    return '<div class="pv-dd-item" onclick="showToast(\'已添加到' + opt.l + '\');this.closest(\'.img-preview-store-dd\').classList.remove(\'show\')">' + opt.l + '</div>';
  }).join('');

  var html = ''
    + '<div class="img-preview-mask" id="imgPreviewMask" onclick="closeImagePreview()">'
    +   '<img class="img-preview-img" id="imgPreviewImg" src="" alt="" onclick="event.stopPropagation()">'
    +   '<div class="img-preview-bar" onclick="event.stopPropagation()">'
    +     '<button title="关闭" onclick="closeImagePreview()">' + PV_ICONS.close + '</button>'
    +     '<button title="下载" onclick="pvDownload()">' + PV_ICONS.download + '</button>'
    +     '<div class="img-preview-store-wrap">'
    +       '<button title="入库" onclick="pvToggleDD(this)">' + PV_ICONS.store + '</button>'
    +       '<div class="img-preview-store-dd" onclick="event.stopPropagation()">' + storeItems + '</div>'
    +     '</div>'
    +     '<div class="img-preview-store-wrap">'
    +       '<button title="编辑" onclick="pvToggleDD(this)">' + PV_ICONS.edit + '</button>'
    +       '<div class="img-preview-store-dd" onclick="event.stopPropagation()">' + editItems + '</div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="img-preview-nav" onclick="event.stopPropagation()">'
    +     '<button id="pvPrev" onclick="pvNav(-1)">' + PV_ICONS.prev + '</button>'
    +     '<button id="pvNext" onclick="pvNav(1)">' + PV_ICONS.next + '</button>'
    +   '</div>'
    + '</div>';

  document.body.insertAdjacentHTML('beforeend', html);
}

/**
 * 打开图片预览
 * @param {string} url - 图片地址
 * @param {string[]} [list] - 图片列表（支持左右切换）
 * @param {number} [idx] - 当前图片在列表中的索引
 */
window.__previewImage = function(url, list, idx) {
  var mask = document.getElementById('imgPreviewMask');
  var img = document.getElementById('imgPreviewImg');
  if (!mask || !img || !url) return;
  _pvList = list || [url];
  _pvIdx = typeof idx === 'number' ? idx : 0;
  img.src = url;
  mask.classList.add('show');
  pvUpdateNav();
};

/** 关闭预览 */
function closeImagePreview() {
  var mask = document.getElementById('imgPreviewMask');
  if (mask) {
    mask.classList.remove('show');
    // 关闭所有下拉
    mask.querySelectorAll('.img-preview-store-dd.show').forEach(function(el) {
      el.classList.remove('show');
    });
  }
}

/** 左右切换 */
function pvNav(dir) {
  var next = _pvIdx + dir;
  if (next < 0 || next >= _pvList.length) return;
  _pvIdx = next;
  document.getElementById('imgPreviewImg').src = _pvList[_pvIdx];
  pvUpdateNav();
}

/** 更新导航按钮状态 */
function pvUpdateNav() {
  var prev = document.getElementById('pvPrev');
  var next = document.getElementById('pvNext');
  if (prev) prev.disabled = _pvIdx <= 0;
  if (next) next.disabled = _pvIdx >= _pvList.length - 1;
}

/** 下载当前预览图 */
function pvDownload() {
  var img = document.getElementById('imgPreviewImg');
  if (!img || !img.src) return;
  var a = document.createElement('a');
  a.href = img.src;
  a.download = 'download.png';
  a.click();
}

/** 切换预览栏的下拉菜单 */
function pvToggleDD(btn) {
  var bar = btn.closest('.img-preview-bar');
  var dd = btn.parentElement.querySelector('.img-preview-store-dd');
  // 关闭同一栏内的其他下拉
  if (bar) {
    bar.querySelectorAll('.img-preview-store-dd.show').forEach(function(el) {
      if (el !== dd) el.classList.remove('show');
    });
  }
  dd.classList.toggle('show');
}

// ESC 关闭预览
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeImagePreview();
});

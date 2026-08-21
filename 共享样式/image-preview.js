/**
 * 图片预览组件 - 逻辑
 *
 * 包含：
 * - 小图 hover 操作按钮 HTML
 * - 入库 / 编辑菜单交互
 * - 大图预览初始化、打开、切换、关闭
 */

var CC_PREVIEW_STORAGE_TARGETS = ['素材库', '原料库'];
var CC_PREVIEW_GENERAL_EDIT_OPTIONS = ['文案', '图片', '视频'];
// 共享预览中的工作流菜单数据。lastUsedAt 表示当前用户最近一次使用时间；
// 未使用过的工作流按 createdAt 排序。
var CC_PREVIEW_WORKFLOWS = [
  { id: 'wf-image-derive', name: '爆款图片衍生0427', lastUsedAt: '2026-07-23T10:20:00', createdAt: '2026-04-27T10:20:00' },
  { id: 'wf-video-cover', name: '视频封面钩子提炼', lastUsedAt: '2026-07-22T16:40:00', createdAt: '2026-04-15T09:20:00' },
  { id: 'wf-poster-batch', name: '电商夏季大促商品图批量衍生', lastUsedAt: '', createdAt: '2026-04-18T14:30:00' },
  { id: 'wf-copy-rewrite', name: '小红书标题批量改写', lastUsedAt: '', createdAt: '2026-04-24T11:00:00' }
];
var CC_PREVIEW_WORKFLOW_FAVORITES_KEY = 'cc_preview_workflow_favorites';

var CC_PREVIEW_ICONS = {
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  store: '<svg width="14" height="14" viewBox="0 0 1024 1024" fill="currentColor"><path d="M102.4 69.12h819.2l102.4 204.8v716.8h-51.2H0v-716.8l102.4-204.8z m819.2 302.08H102.4v512h819.2v-512z m-22.016-107.52l-50.176-93.184H174.08l-50.176 93.184h775.68z"/><path d="M558.592 632.32h114.688l-153.088 153.088-152.576-153.088h114.688V479.232h76.288v153.088z"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  prev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>',
  next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>',
  downloadLg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  storeLg: '<svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor"><path d="M102.4 69.12h819.2l102.4 204.8v716.8h-51.2H0v-716.8l102.4-204.8z m819.2 302.08H102.4v512h819.2v-512z m-22.016-107.52l-50.176-93.184H174.08l-50.176 93.184h775.68z"/><path d="M558.592 632.32h114.688l-153.088 153.088-152.576-153.088h114.688V479.232h76.288v153.088z"/></svg>',
  editLg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
};

function ccPreviewAttr(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
    return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
  });
}

function ccPreviewJs(value) {
  return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
}

function ccPreviewInferType(url) {
  return /\.(mp4|mov|webm|m4v)(\?|#|$)/i.test(String(url || '')) ? 'video' : 'image';
}

function ccPreviewGetWorkflowFavorites() {
  try { return JSON.parse(localStorage.getItem(CC_PREVIEW_WORKFLOW_FAVORITES_KEY) || '[]'); }
  catch (e) { return []; }
}

function ccPreviewWorkflowMenuItems(menuClass) {
  var favorites = ccPreviewGetWorkflowFavorites();
  return CC_PREVIEW_WORKFLOWS.slice().sort(function(a, b) {
    var aFavorite = favorites.indexOf(a.id) >= 0;
    var bFavorite = favorites.indexOf(b.id) >= 0;
    if (aFavorite !== bFavorite) return aFavorite ? -1 : 1;
    if (a.lastUsedAt && b.lastUsedAt) return new Date(b.lastUsedAt) - new Date(a.lastUsedAt);
    if (a.lastUsedAt) return -1;
    if (b.lastUsedAt) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).map(function(workflow) {
    var favorite = favorites.indexOf(workflow.id) >= 0;
    var visibleName = workflow.name.length > 10 ? workflow.name.slice(0, 10) + '…' : workflow.name;
    return '<div class="workflow-menu-item">'
      + '<div class="workflow-menu-name" data-workflow-id="' + ccPreviewAttr(workflow.id) + '">'
      + '<span>' + ccPreviewAttr(visibleName) + '</span>'
      + (workflow.name.length > 10 ? '<span class="workflow-name-tip">' + ccPreviewAttr(workflow.name) + '</span>' : '')
      + '</div>'
      + '<span class="workflow-favorite' + (favorite ? ' active' : '') + '" role="button" tabindex="0" title="' + (favorite ? '取消收藏' : '收藏并置顶') + '" aria-label="' + (favorite ? '取消收藏' : '收藏并置顶') + '" onclick="event.stopPropagation();ccPreviewToggleWorkflowFavorite(\'' + ccPreviewJs(workflow.id) + '\', this.closest(\'.' + menuClass + '\'))">' + (favorite ? '★' : '☆') + '</span>'
      + '</div>';
  }).join('');
}

function ccPreviewToggleWorkflowFavorite(id, menu) {
  var favorites = ccPreviewGetWorkflowFavorites();
  var index = favorites.indexOf(id);
  if (index >= 0) favorites.splice(index, 1);
  else favorites.push(id);
  try { localStorage.setItem(CC_PREVIEW_WORKFLOW_FAVORITES_KEY, JSON.stringify(favorites)); } catch (e) {}
  if (menu) menu.innerHTML = ccPreviewEditMenuItems(menu.classList.contains('edit-menu') ? 'thumb' : 'preview');
}

function ccPreviewEditMenuItems(context) {
  var isThumb = context === 'thumb';
  var itemClass = isThumb ? 'edit-menu-item' : 'pv-dd-item';
  var subClass = isThumb ? 'edit-submenu' : 'pv-dd-sub';
  var subItemClass = isThumb ? 'edit-submenu-item' : 'pv-dd-item';
  var workflowItems = ccPreviewWorkflowMenuItems(isThumb ? 'edit-menu' : 'img-preview-store-dd');
  var generalItems = CC_PREVIEW_GENERAL_EDIT_OPTIONS.map(function(label) {
    return '<div class="' + subItemClass + '">' + label + '</div>';
  }).join('');
  return '<div class="' + itemClass + '">通用生成 <span class="sub-arrow">▸</span><div class="' + subClass + '">' + generalItems + '</div></div>'
    + '<div class="' + itemClass + '">工作流 <span class="sub-arrow">▸</span><div class="' + subClass + ' workflow-submenu">' + workflowItems + '</div></div>';
}

function ccPreviewOpenArchive(items, target) {
  if (typeof window.openAssetArchiveModal === 'function') {
    window.openAssetArchiveModal({ target: target || '原料库', items: items || [] });
    return;
  }
  if (typeof showToast === 'function') showToast('已入库到' + (target || '原料库'));
}

function ccPreviewOpenDownloadConfirm(items, onDownload) {
  if (typeof window.openDownloadArchiveConfirm === 'function') {
    window.openDownloadArchiveConfirm({ items: items || [], onDownload: onDownload, defaultTarget: '原料库' });
    return;
  }
  if (onDownload) onDownload();
  if (typeof showToast === 'function') showToast('已开始下载');
}

function openPreviewArchiveFromThumb(btn, url, target) {
  var host = btn && btn.closest ? btn.closest('[data-preview-url], .o-thumb, .cc-thumb-host, .detail-thumb-wrap') : null;
  var trigger = btn && btn.closest ? btn.closest('[data-archive-url]') : null;
  var resolvedUrl = (trigger && trigger.getAttribute ? trigger.getAttribute('data-archive-url') : '')
    || (btn && btn.getAttribute ? btn.getAttribute('data-archive-url') : '')
    || url || '';
  var type = '';
  if (host) {
    resolvedUrl = resolvedUrl || host.getAttribute('data-preview-url') || '';
    type = host.getAttribute('data-preview-type') || '';
    if (!resolvedUrl) {
      var mediaNode = host.querySelector('video,img');
      if (mediaNode) resolvedUrl = mediaNode.currentSrc || mediaNode.src || '';
    }
  }
  type = type || ccPreviewInferType(resolvedUrl);
  ccPreviewOpenArchive([{ type:type, url:resolvedUrl, thumb:resolvedUrl, name:type === 'video' ? '视频素材' : '图片素材' }], target || '原料库');
}

function thumbOverlayHtml(url, downloadAction) {
  if (arguments.length === 1) {
    downloadAction = url;
    url = '';
  }
  if (!downloadAction) {
    var safeUrl = ccPreviewJs(url);
    downloadAction = "event.stopPropagation();ccPreviewOpenDownloadConfirm([{type:ccPreviewInferType('" + safeUrl + "'),url:'" + safeUrl + "',thumb:'" + safeUrl + "',name:ccPreviewInferType('" + safeUrl + "')==='video'?'视频素材':'图片素材'}])";
  }

  var storeControl = '';
  var storeDD = CC_PREVIEW_STORAGE_TARGETS.map(function(t) {
    return '<div class="storage-dd-item" onclick="event.stopPropagation();openPreviewArchiveFromThumb(this, \'\', \'' + t + '\');this.closest(\'.storage-dropdown\').style.display=\'none\'">' + t + '</div>';
  }).join('');
  storeControl = '<button class="thumb-act" title="入库" data-archive-url="' + ccPreviewAttr(url) + '" onclick="event.stopPropagation();toggleThumbDD(this,\'store\')">' + CC_PREVIEW_ICONS.store
    + '<div class="storage-dropdown" onclick="event.stopPropagation()">' + storeDD + '</div></button>';

  var editDD = ccPreviewEditMenuItems('thumb');

  return '<div class="thumb-overlay">'
    + '<button class="thumb-act" title="下载" onclick="' + downloadAction + '">' + CC_PREVIEW_ICONS.download + '</button>'
    + storeControl
    + '<button class="thumb-act" title="编辑" onclick="event.stopPropagation();toggleThumbDD(this,\'edit\')">' + CC_PREVIEW_ICONS.edit
    + '<div class="edit-menu" onclick="event.stopPropagation()">' + editDD + '</div></button>'
    + '</div>';
}

function toggleThumbDD(btn, type) {
  var dd = btn.querySelector(type === 'store' ? '.storage-dropdown' : '.edit-menu');
  var overlay = btn.closest('.thumb-overlay');
  var shouldOpen = dd.style.display !== 'block';
  if (overlay) {
    overlay.querySelectorAll('.storage-dropdown,.edit-menu').forEach(function(el) {
      if (el !== dd) el.style.display = 'none';
    });
  }
  dd.style.display = shouldOpen ? 'block' : 'none';
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.thumb-act')) {
    document.querySelectorAll('.thumb-overlay .storage-dropdown,.thumb-overlay .edit-menu').forEach(function(el) {
      el.style.display = 'none';
    });
  }
});

var _ccPvList = [];
var _ccPvIdx = 0;
var _ccPvType = 'image';

function initImagePreview() {
  if (document.getElementById('imgPreviewMask')) return;

  var storeControl = '';
  var storeItems = CC_PREVIEW_STORAGE_TARGETS.map(function(t) {
    return '<div class="pv-dd-item" onclick="pvOpenArchive(\'' + t + '\');this.closest(\'.img-preview-store-dd\').classList.remove(\'show\')">' + t + '</div>';
  }).join('');
  storeControl = '<div class="img-preview-store-wrap">'
    + '<button title="入库" onclick="pvToggleDD(this)">' + CC_PREVIEW_ICONS.storeLg + '</button>'
    + '<div class="img-preview-store-dd" onclick="event.stopPropagation()">' + storeItems + '</div>'
    + '</div>';

  var editItems = ccPreviewEditMenuItems('preview');

  var html = '<div class="img-preview-mask" id="imgPreviewMask" onclick="closeImagePreview()">'
    + '<img class="img-preview-img" id="imgPreviewImg" src="" alt="" onclick="event.stopPropagation()">'
    + '<video class="img-preview-video" id="imgPreviewVideo" controls playsinline preload="metadata" onclick="event.stopPropagation()"></video>'
    + '<div class="img-preview-bar" onclick="event.stopPropagation()">'
    +   '<button title="关闭" onclick="closeImagePreview()">' + CC_PREVIEW_ICONS.close + '</button>'
    +   '<button title="下载" onclick="pvDownload()">' + CC_PREVIEW_ICONS.downloadLg + '</button>'
    +   storeControl
    +   '<div class="img-preview-store-wrap">'
    +     '<button title="编辑" onclick="pvToggleDD(this)">' + CC_PREVIEW_ICONS.editLg + '</button>'
    +     '<div class="img-preview-store-dd" onclick="event.stopPropagation()">' + editItems + '</div>'
    +   '</div>'
    + '</div>'
    + '<div class="img-preview-nav" onclick="event.stopPropagation()">'
    +   '<button id="pvPrev" onclick="pvNav(-1)">' + CC_PREVIEW_ICONS.prev + '</button>'
    +   '<button id="pvNext" onclick="pvNav(1)">' + CC_PREVIEW_ICONS.next + '</button>'
    + '</div>'
    + '</div>';

  document.body.insertAdjacentHTML('beforeend', html);
}

window.__previewImage = function(url, list, idx) {
  pvOpen({ type:'image', url:url, list:list, idx:idx });
};

window.__previewMedia = function(media, list, idx) {
  if (!media) return;
  if (typeof media === 'string') return pvOpen({ type:'image', url:media, list:list, idx:idx });
  pvOpen({ type:media.type || 'image', url:media.url, list:list, idx:idx, duration:media.duration });
};

function pvOpen(media) {
  var mask = document.getElementById('imgPreviewMask');
  var img = document.getElementById('imgPreviewImg');
  var video = document.getElementById('imgPreviewVideo');
  if (!mask || !img || !video || !media || !media.url) return;
  _ccPvList = media.list || [media];
  _ccPvIdx = typeof media.idx === 'number' ? media.idx : 0;
  _ccPvType = media.type || 'image';

  if (_ccPvType === 'video') {
    img.style.display = 'none';
    img.removeAttribute('src');
    video.style.display = 'block';
    if (video.getAttribute('src') !== media.url) {
      video.setAttribute('src', media.url);
      video.load();
    }
    video.controls = true;
  } else {
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.style.display = 'none';
    img.style.display = 'block';
    img.src = media.url;
  }

  mask.classList.add('show');
  pvUpdateNav();
}

function closeImagePreview() {
  var mask = document.getElementById('imgPreviewMask');
  var video = document.getElementById('imgPreviewVideo');
  if (mask) {
    mask.classList.remove('show');
    mask.querySelectorAll('.img-preview-store-dd.show').forEach(function(el) { el.classList.remove('show'); });
  }
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

}

function pvNav(dir) {
  var next = _ccPvIdx + dir;
  if (next < 0 || next >= _ccPvList.length) return;
  _ccPvIdx = next;
  var media = _ccPvList[_ccPvIdx];
  if (typeof media === 'string') media = { type:'image', url:media };
  pvOpen({ type:media.type || 'image', url:media.url, list:_ccPvList, idx:_ccPvIdx, duration:media.duration });
}

function pvUpdateNav() {
  var prev = document.getElementById('pvPrev');
  var next = document.getElementById('pvNext');
  if (prev) prev.disabled = _ccPvIdx <= 0;
  if (next) next.disabled = _ccPvIdx >= _ccPvList.length - 1;
}

function pvDownload() {
  var node = _ccPvType === 'video' ? document.getElementById('imgPreviewVideo') : document.getElementById('imgPreviewImg');
  if (!node || !node.src) return;
  var url = node.src;
  var item = _ccPvList[_ccPvIdx];
  if (typeof item === 'string') item = { type:_ccPvType, url:item, thumb:item };
  item = item || {};
  ccPreviewOpenDownloadConfirm([{
    type: item.type || _ccPvType || ccPreviewInferType(url),
    url: url,
    thumb: item.thumb || url,
    name: item.name || ((item.type || _ccPvType) === 'video' ? '视频素材' : '图片素材')
  }], function() {
    var a = document.createElement('a');
    a.href = url;
    a.download = (_ccPvType === 'video' ? 'download.mp4' : 'download.png');
    a.click();
  });
}

function pvOpenArchive(target) {
  var media = _ccPvList[_ccPvIdx];
  if (typeof media === 'string') media = { type:_ccPvType || ccPreviewInferType(media), url:media, thumb:media };
  media = media || {};
  var url = media.url || '';
  ccPreviewOpenArchive([{
    type: media.type || _ccPvType || ccPreviewInferType(url),
    url: url,
    thumb: media.thumb || url,
    name: media.name || ((media.type || _ccPvType) === 'video' ? '视频素材' : '图片素材')
  }], target || '原料库');
}

function pvToggleDD(btn) {
  var bar = btn.closest('.img-preview-bar');
  var dd = btn.parentElement.querySelector('.img-preview-store-dd');
  if (bar) {
    bar.querySelectorAll('.img-preview-store-dd.show').forEach(function(el) {
      if (el !== dd) el.classList.remove('show');
    });
  }
  dd.classList.toggle('show');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeImagePreview();
});

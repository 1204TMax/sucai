(function() {
  var state = {
    items: [],
    onDownload: null,
    target: '原料库'
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function ensureModal() {
    if (document.getElementById('downloadArchiveMask')) return;
    var html = ''
      + '<div class="download-archive-mask" id="downloadArchiveMask" onclick="if(event.target===this)closeDownloadArchiveConfirm()">'
      + '  <div class="download-archive-modal" onclick="event.stopPropagation()">'
      + '    <div class="download-archive-head">'
      + '      <div class="download-archive-title">下载已经开始</div>'
      + '      <button class="download-archive-close" type="button" aria-label="关闭" title="关闭" onclick="closeDownloadArchiveConfirm()">×</button>'
      + '    </div>'
      + '    <div class="download-archive-body">'
      + '      <p class="download-archive-desc" id="downloadArchiveDesc">是否需要将该素材入库？</p>'
      + '      <div class="download-archive-field">'
      + '        <label for="downloadArchiveTarget">入库位置</label>'
      + '        <select class="download-archive-select" id="downloadArchiveTarget" onchange="setDownloadArchiveTarget(this.value)">'
      + '          <option value="原料库">原料库</option>'
      + '          <option value="素材库">素材库</option>'
      + '        </select>'
      + '      </div>'
      + '    </div>'
      + '    <div class="download-archive-foot">'
      + '      <button class="download-archive-btn" type="button" onclick="closeDownloadArchiveConfirm()">取消</button>'
      + '      <button class="download-archive-btn primary" type="button" onclick="confirmDownloadArchive()">确认</button>'
      + '    </div>'
      + '  </div>'
      + '</div>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function normalizeItem(item, index) {
    item = item || {};
    var url = item.url || item.thumb || '';
    var type = item.type || item.assetType || (/(\.mp4|\.mov|\.webm|\.m4v)(\?|#|$)/i.test(url) ? 'video' : 'image');
    return {
      id: item.id || item.itemId || ('download-' + Date.now() + '-' + index),
      type: type,
      assetType: type,
      url: url,
      thumb: item.thumb || url,
      name: item.name || item.fileName || item.filename || (type === 'video' ? '视频素材' : '图片素材'),
      content: item.content || ''
    };
  }

  function toast(message) {
    if (typeof window.showToast === 'function') {
      window.showToast(message);
    }
  }

  function openConfirm(options) {
    options = options || {};
    ensureModal();
    state.items = (options.items || []).map(normalizeItem).filter(function(item) {
      return item.url || item.content;
    });
    state.onDownload = typeof options.onDownload === 'function' ? options.onDownload : null;
    state.target = options.defaultTarget || '原料库';
    runDownload();
    var select = document.getElementById('downloadArchiveTarget');
    if (select) select.value = state.target;
    var desc = document.getElementById('downloadArchiveDesc');
    if (desc) desc.textContent = '是否需要将该素材入库？';
    document.getElementById('downloadArchiveMask').classList.add('show');
  }

  function closeConfirm() {
    var mask = document.getElementById('downloadArchiveMask');
    if (mask) mask.classList.remove('show');
  }

  function setTarget(value) {
    state.target = value || '原料库';
  }

  function runDownload() {
    if (state.onDownload) {
      state.onDownload();
      return;
    }
    state.items.forEach(function(item, index) {
      if (!item.url) return;
      setTimeout(function() {
        var a = document.createElement('a');
        a.href = item.url;
        a.download = item.name || ('download-' + (index + 1));
        a.click();
      }, index * 80);
    });
  }

  function archiveItems() {
    if (!state.items.length) return;
    if (state.target === '原料库' && typeof window.openAssetArchiveModal === 'function') {
      window.openAssetArchiveModal({ target: '原料库', items: state.items });
      return;
    }
    if (state.target === '素材库' && typeof window.openAssetArchiveModal === 'function') {
      window.openAssetArchiveModal({ target: '素材库', items: state.items });
      return;
    }
    toast(state.target === '原料库' ? '已加入原料库入库队列' : '已加入素材库入库队列');
  }

  function confirm() {
    var target = state.target;
    closeConfirm();
    archiveItems();
    window.__lastDownloadArchiveConfirm = {
      target: target,
      archived: true,
      items: state.items.slice()
    };
  }

  window.openDownloadArchiveConfirm = openConfirm;
  window.closeDownloadArchiveConfirm = closeConfirm;
  window.setDownloadArchiveTarget = setTarget;
  window.confirmDownloadArchive = confirm;
})();

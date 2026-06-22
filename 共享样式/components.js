/**
 * 共享组件逻辑
 *
 * 当前仅保留轻量通用组件：日期范围选择器
 * 重组件已独立拆分：
 * - project-picker.css / project-picker.js
 * - image-preview.css / image-preview.js
 */

/**
 * 生成日期选择器下拉菜单 HTML
 * 依赖：state.filters、renderFilterBar()、renderTaskFeed()、toggleFilterDD()、closeFilterDDs()
 */
function buildDatePickerHTML(filters, chevronSvg) {
  var f = filters;
  var dateLabels = {'7':'近 7 天', '30':'近 30 天', '90':'近 90 天', 'custom':'自定义'};

  var dateLabel = f.dateRange === 'custom' && (f.dateStart || f.dateEnd)
    ? (f.dateStart || '起') + ' ~ ' + (f.dateEnd || '止')
    : (dateLabels[f.dateRange] || '日期范围');

  var presetItems = [
    {v: '', l: '全部'}, {v: '7', l: '近 7 天'}, {v: '30', l: '近 30 天'}, {v: '90', l: '近 90 天'}
  ].map(function(o) {
    return '<button class="dropdown-item' + (f.dateRange === o.v ? ' on' : '') + '"'
      + ' onclick="datePickerSelect(\'' + o.v + '\')">' + o.l + '</button>';
  }).join('');

  var customItem = '<div class="date-picker-divider"></div>'
    + '<button class="dropdown-item' + (f.dateRange === 'custom' ? ' on' : '') + '"'
    + ' onclick="datePickerSelect(\'custom\');event.stopPropagation()">自定义</button>';

  var customInputs = '';
  if (f.dateRange === 'custom') {
    customInputs = '<div style="padding:var(--space-2) var(--space-4);display:flex;align-items:center;gap:var(--space-1);">'
      + '<input class="date-input" type="date" value="' + escHtml(f.dateStart || '') + '"'
      + ' onchange="datePickerSetCustom(\'start\',this.value)" onclick="event.stopPropagation()">'
      + '<span class="date-dash">—</span>'
      + '<input class="date-input" type="date" value="' + escHtml(f.dateEnd || '') + '"'
      + ' onchange="datePickerSetCustom(\'end\',this.value)" onclick="event.stopPropagation()">'
      + '</div>';
  }

  return '<div class="sel-wrap">'
    + '<button class="sel' + (f.dateRange ? ' on' : '') + '"'
    + ' onclick="toggleFilterDD(event,\'dateRange\')">' + escHtml(dateLabel) + ' ' + chevronSvg + '</button>'
    + '<div class="dropdown" id="filterDD-dateRange">' + presetItems + customItem + customInputs + '</div>'
    + '</div>';
}

function datePickerSelect(value) {
  state.filters.dateRange = value;
  if (value !== 'custom') {
    state.filters.dateStart = '';
    state.filters.dateEnd = '';
    closeFilterDDs();
  }
  renderFilterBar();
  renderTaskFeed();
}

function datePickerSetCustom(which, value) {
  if (which === 'start') state.filters.dateStart = value;
  if (which === 'end')   state.filters.dateEnd = value;
  renderFilterBar();
  renderTaskFeed();
}

function datePickerFilter(createdTime, filters) {
  var f = filters;
  if (f.dateRange && f.dateRange !== 'custom') {
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - parseInt(f.dateRange));
    if (new Date(createdTime) < cutoff) return false;
  }
  if (f.dateRange === 'custom') {
    if (f.dateStart && new Date(createdTime) < new Date(f.dateStart)) return false;
    if (f.dateEnd) {
      var end = new Date(f.dateEnd);
      end.setDate(end.getDate() + 1);
      if (new Date(createdTime) >= end) return false;
    }
  }
  return true;
}

(function() {
  if (window.CCPromptMediaInput) return;

  var uid = 0;

  function byIdOrElement(value) {
    return typeof value === 'string' ? document.getElementById(value) : value;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  function inferType(ref) {
    ref = ref || {};
    var text = [ref.type, ref.name, ref.url, ref.thumb].join(' ');
    return /video|\.((mp4)|(mov)|(webm)|(m4v))(\?|#|$|\s)/i.test(text) ? 'video' : 'image';
  }

  function normalizeRef(ref, index) {
    ref = ref || {};
    var url = ref.url || ref.src || ref.thumb || '';
    var thumb = ref.thumb || ref.poster || url;
    var type = inferType({ type: ref.type || ref.assetType, name: ref.name || ref.fileName || ref.filename, url: url, thumb: thumb });
    var name = ref.name || ref.fileName || ref.filename || ref.title || (type === 'video' ? '参考视频' : '参考图片') + (index + 1);
    return {
      id: ref.id || ref.refId || ('ref-' + index + '-' + url),
      type: type,
      url: url,
      thumb: thumb,
      name: name
    };
  }

  function collectReferences(strip, itemSelector) {
    var root = byIdOrElement(strip);
    if (!root) return [];
    var nodes = root.querySelectorAll(itemSelector || '[data-ref-url], .ref-item, .input-ref-item');
    return Array.prototype.map.call(nodes, function(node, index) {
      var media = node.querySelector('img,video');
      var url = node.getAttribute('data-ref-url') || (media && (media.currentSrc || media.src)) || '';
      var thumb = node.getAttribute('data-ref-thumb') || url;
      var name = node.getAttribute('data-ref-name') || (media && media.getAttribute('alt')) || '';
      var type = node.getAttribute('data-ref-type') || (media && media.tagName && media.tagName.toLowerCase() === 'video' ? 'video' : '');
      return normalizeRef({
        id: node.getAttribute('data-ref-id') || '',
        type: type,
        url: url,
        thumb: thumb,
        name: name
      }, index);
    }).filter(function(ref) { return !!ref.url; });
  }

  function isInsideEditor(editor, node) {
    return node === editor || (node && editor.contains(node));
  }

  function createMenu(inst) {
    if (inst.menu) return inst.menu;
    var menu = document.createElement('div');
    menu.className = 'cc-prompt-menu';
    menu.setAttribute('role', 'listbox');
    document.body.appendChild(menu);
    menu.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
      var insertBtn = e.target.closest('[data-ref-index]');
      if (insertBtn) {
        var index = parseInt(insertBtn.getAttribute('data-ref-index'), 10);
        insertReference(inst, inst.menuRefs[index]);
        return;
      }
      if (e.target.closest('[data-action="add-reference"]')) {
        hideMenu(inst);
        if (typeof inst.onAddReference === 'function') inst.onAddReference({ editor: inst.editor });
      }
    });
    inst.menu = menu;
    return menu;
  }

  function hideMenu(inst) {
    if (!inst || !inst.menu) return;
    inst.menu.classList.remove('show');
    inst.triggerRange = null;
  }

  function mediaPreviewHtml(ref, className) {
    var safeThumb = escapeAttr(ref.thumb || ref.url || '');
    if (ref.type === 'video') {
      return '<span class="' + className + '"><video src="' + safeThumb + '" muted playsinline preload="metadata"></video><span class="cc-prompt-token-play">▶</span></span>';
    }
    return '<span class="' + className + '"><img src="' + safeThumb + '" alt=""></span>';
  }

  function renderMenu(inst, refs) {
    var menu = createMenu(inst);
    var list = refs.map(function(ref, index) {
      return '<button type="button" class="cc-prompt-ref-option" data-ref-index="' + index + '">'
        + mediaPreviewHtml(ref, 'cc-prompt-ref-thumb')
        + '<span class="cc-prompt-ref-main">'
        + '<span class="cc-prompt-ref-name">' + escapeHtml(ref.name) + '</span>'
        + '<span class="cc-prompt-ref-type">' + (ref.type === 'video' ? '视频' : '图片') + '</span>'
        + '</span>'
        + '</button>';
    }).join('');
    if (!list) list = '<div class="cc-prompt-empty">暂无已上传参考素材</div>';
    menu.innerHTML = '<div class="cc-prompt-menu-title">选择参考素材</div>' + list
      + '<button type="button" class="cc-prompt-add-option" data-action="add-reference">'
      + '<span class="cc-prompt-add-icon">+</span><span>添加参考素材</span></button>';
  }

  function positionMenu(inst, range) {
    var menu = createMenu(inst);
    var rect = range && range.getBoundingClientRect ? range.getBoundingClientRect() : null;
    if (!rect || (!rect.left && !rect.top && !rect.width && !rect.height)) {
      rect = inst.editor.getBoundingClientRect();
    }
    var left = Math.max(8, Math.min(rect.left, window.innerWidth - menu.offsetWidth - 8));
    var top = rect.bottom + 8;
    if (top + menu.offsetHeight > window.innerHeight - 8) {
      top = Math.max(8, rect.top - menu.offsetHeight - 8);
    }
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
  }

  function showMenu(inst, range) {
    var refs = (typeof inst.getReferences === 'function' ? inst.getReferences() : []).map(normalizeRef);
    inst.menuRefs = refs;
    inst.triggerRange = range.cloneRange();
    renderMenu(inst, refs);
    createMenu(inst).classList.add('show');
    requestAnimationFrame(function() { positionMenu(inst, range); });
  }

  function getAtTriggerRange(editor) {
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount || !selection.isCollapsed) return null;
    var range = selection.getRangeAt(0);
    if (!isInsideEditor(editor, range.startContainer)) return null;
    if (range.startContainer.nodeType !== Node.TEXT_NODE) return null;
    if (range.startOffset < 1) return null;
    var text = range.startContainer.nodeValue || '';
    if (text.charAt(range.startOffset - 1) !== '@') return null;
    var triggerRange = range.cloneRange();
    triggerRange.setStart(range.startContainer, range.startOffset - 1);
    return triggerRange;
  }

  function setSelectionAfter(node) {
    var range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function makeToken(ref) {
    ref = normalizeRef(ref, 0);
    var token = document.createElement('span');
    token.className = 'cc-prompt-token';
    token.contentEditable = 'false';
    token.draggable = false;
    token.setAttribute('data-ref-token', '1');
    token.setAttribute('data-ref-id', ref.id);
    token.setAttribute('data-ref-type', ref.type);
    token.setAttribute('data-ref-url', ref.url);
    token.setAttribute('data-ref-thumb', ref.thumb);
    token.setAttribute('data-ref-name', ref.name);
    token.setAttribute('title', '引用：' + ref.name);
    token.innerHTML = mediaPreviewHtml(ref, 'cc-prompt-token-thumb')
      + '<span class="cc-prompt-token-name">@' + escapeHtml(ref.name) + '</span>';
    return token;
  }

  function insertReference(inst, ref) {
    if (!ref) return;
    inst.editor.focus();
    var range = inst.triggerRange;
    if (!range) {
      var selection = window.getSelection();
      range = selection && selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
    }
    if (!range) return;
    range.deleteContents();
    var token = makeToken(ref);
    var space = document.createTextNode(' ');
    range.insertNode(space);
    range.insertNode(token);
    setSelectionAfter(space);
    hideMenu(inst);
    syncSource(inst);
  }

  function serialize(editor) {
    var clone = editor.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('[data-ref-token]'), function(token) {
      token.textContent = '@' + (token.getAttribute('data-ref-name') || '参考素材');
    });
    var text = clone.innerText != null ? clone.innerText : clone.textContent;
    return String(text || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function syncSource(inst, silent) {
    var value = serialize(inst.editor);
    inst.source.value = value;
    if (!silent && typeof inst.onChange === 'function') inst.onChange(value);
    return value;
  }

  function setText(inst, value) {
    inst.editor.innerHTML = '';
    String(value || '').split('\n').forEach(function(line, index) {
      if (index) inst.editor.appendChild(document.createElement('br'));
      if (line) inst.editor.appendChild(document.createTextNode(line));
    });
    syncSource(inst);
  }

  function setPlaceholder(inst, value) {
    inst.editor.setAttribute('data-placeholder', value || '');
    inst.source.setAttribute('placeholder', value || '');
  }

  function selectToken(token) {
    document.querySelectorAll('.cc-prompt-token.is-selected').forEach(function(el) {
      el.classList.remove('is-selected');
    });
    token.classList.add('is-selected');
    var range = document.createRange();
    range.selectNode(token);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function adjacentToken(range, direction) {
    var node = range.startContainer;
    var offset = range.startOffset;
    if (node.nodeType === Node.TEXT_NODE) {
      if (direction === 'backward' && offset === 0) return node.previousSibling;
      if (direction === 'forward' && offset === node.nodeValue.length) return node.nextSibling;
      return null;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      return direction === 'backward' ? node.childNodes[offset - 1] : node.childNodes[offset];
    }
    return null;
  }

  function handleDeleteToken(inst, event) {
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount) return false;
    var range = selection.getRangeAt(0);
    if (!isInsideEditor(inst.editor, range.startContainer)) return false;
    if (!selection.isCollapsed) return false;
    var token = adjacentToken(range, event.key === 'Backspace' ? 'backward' : 'forward');
    if (!token || token.nodeType !== Node.ELEMENT_NODE || !token.matches('[data-ref-token]')) return false;
    event.preventDefault();
    var marker = document.createTextNode('');
    token.parentNode.insertBefore(marker, event.key === 'Backspace' ? token : token.nextSibling);
    token.remove();
    setSelectionAfter(marker);
    marker.remove();
    syncSource(inst);
    return true;
  }

  function init(options) {
    options = options || {};
    var editor = byIdOrElement(options.editor);
    var source = byIdOrElement(options.source);
    if (!editor || !source) return null;
    var inst = {
      id: editor.id || ('cc-prompt-editor-' + (++uid)),
      editor: editor,
      source: source,
      getReferences: options.getReferences,
      onAddReference: options.onAddReference,
      onChange: options.onChange,
      menu: null,
      menuRefs: [],
      triggerRange: null
    };
    editor.id = inst.id;
    editor.classList.add('cc-prompt-editor');
    source.classList.add('cc-prompt-source');
    editor.setAttribute('contenteditable', 'true');
    editor.setAttribute('role', 'textbox');
    editor.setAttribute('aria-multiline', 'true');
    setPlaceholder(inst, options.placeholder || source.getAttribute('placeholder') || editor.getAttribute('data-placeholder') || '');
    setText(inst, source.value || editor.textContent || '');

    source.addEventListener('focus', function() { editor.focus(); });
    editor.addEventListener('input', function() {
      syncSource(inst);
      var trigger = getAtTriggerRange(editor);
      if (trigger) showMenu(inst, trigger);
      else hideMenu(inst);
    });
    editor.addEventListener('keyup', function() {
      var trigger = getAtTriggerRange(editor);
      if (trigger) showMenu(inst, trigger);
    });
    editor.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        hideMenu(inst);
        return;
      }
      if (event.key === 'Backspace' || event.key === 'Delete') handleDeleteToken(inst, event);
    });
    editor.addEventListener('click', function(event) {
      var token = event.target.closest('[data-ref-token]');
      if (token && editor.contains(token)) {
        event.preventDefault();
        selectToken(token);
      }
    });
    document.addEventListener('mousedown', function(event) {
      if (inst.menu && (inst.menu.contains(event.target) || editor.contains(event.target))) return;
      hideMenu(inst);
    });
    window.addEventListener('resize', function() { hideMenu(inst); });
    window.addEventListener('scroll', function() { hideMenu(inst); }, true);

    return {
      getText: function() { return syncSource(inst, true); },
      setText: function(value) { setText(inst, value); },
      focus: function() { editor.focus(); },
      setPlaceholder: function(value) { setPlaceholder(inst, value); },
      sync: function() { return syncSource(inst); },
      hideMenu: function() { hideMenu(inst); },
      insertReference: function(ref) { insertReference(inst, ref); }
    };
  }

  window.CCPromptMediaInput = {
    init: init,
    collectReferences: collectReferences,
    normalizeRef: normalizeRef
  };
})();

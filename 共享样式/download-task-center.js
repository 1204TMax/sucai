/* 全局下载任务中心：静态原型数据与交互，不接后端。 */
(function () {
  'use strict';

  var iconBase = '共享样式/workflow-node-icons/icons/';
  var batches = [
    [
      { id: 'dt-001', type: 'video', name: '夏日防晒霜短视频混剪', source: '自动化营销生产线', progress: '36/200', status: 'preparing', time: '10:35', createdAt: '2026-07-28T10:35:00', expiresAt: '准备完成后保留 7 天', selected: '200 个视频', success: 36, failed: 0 },
      { id: 'dt-002', type: 'image', name: '新品详情页主图', source: '通用生成', progress: '8/8', status: 'ready', time: '10:42', createdAt: '2026-07-28T10:42:00', expiresAt: '2026-08-04 10:42', selected: '8 张图片', success: 8, failed: 0 },
      { id: 'dt-003', type: 'video', name: '七夕礼盒产品展示', source: '电商视频批量制作', progress: '197/200', status: 'partial', time: '10:18', createdAt: '2026-07-28T10:18:00', expiresAt: '2026-08-04 10:18', selected: '200 个视频', success: 197, failed: 3, failures: ['视频 068：源文件不存在', '视频 121：处理超时', '视频 166：格式暂不支持'] },
      { id: 'dt-004', type: 'document', name: '618 素材交付清单', source: '通用生成', progress: '0/24', status: 'failed', time: '09:56', createdAt: '2026-07-28T09:56:00', expiresAt: '—', selected: '24 个文件', success: 0, failed: 24, failures: ['服务准备失败，请重新准备'] },
      { id: 'dt-005', type: 'image', name: '夏季新品海报', source: '海报批量出图', progress: '0/60', status: 'cancelled', time: '09:42', createdAt: '2026-07-28T09:42:00', expiresAt: '—', selected: '60 张图片', success: 0, failed: 0 },
      { id: 'dt-006', type: 'video', name: '夏日直播切片', source: '直播切片工作流', progress: '12/12', status: 'expired', time: '09:12', createdAt: '2026-07-28T09:12:00', expiresAt: '2026-07-27 09:12（已过期）', selected: '12 个视频', success: 12, failed: 0 }
    ],
    [
      { id: 'dt-007', type: 'video', name: '护肤成分科普短片', source: '自动化营销生产线', progress: '52/80', status: 'cancelling', time: '08:48', createdAt: '2026-07-28T08:48:00', expiresAt: '准备完成后保留 7 天', selected: '80 个视频', success: 52, failed: 0 },
      { id: 'dt-008', type: 'image', name: '开学季社媒配图', source: '通用生成', progress: '16/16', status: 'ready', time: '昨天 18:26', createdAt: '2026-07-27T18:26:00', expiresAt: '2026-08-03 18:26', selected: '16 张图片', success: 16, failed: 0 },
      { id: 'dt-009', type: 'document', name: '品牌素材归档', source: '素材整理工作流', progress: '0/32', status: 'cancelled', time: '昨天 16:04', createdAt: '2026-07-27T16:04:00', expiresAt: '—', selected: '32 个文件', success: 0, failed: 0 }
    ]
  ];
  var state = { tasks: batches[0].slice(), batch: 1, pinned: false, activeTask: null, closeTimer: null, lastFocus: null, loading: false };
  var root, portal, trigger, popover, listWrap, list, loadingNode, detailMask, toastNode, summaryNode;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function icon(type) { return iconBase + ({ video: 'video.svg', image: 'image.svg', document: 'document.svg' }[type] || 'document.svg'); }
  function typeLabel(type) { return ({ video: '视频', image: '图片', document: '文件' }[type] || '文件'); }
  function statusText(task) { return ({ preparing: '准备中', ready: '可以下载', partial: task.failed + '个没准备好', failed: '准备失败', cancelled: '已取消', expired: '已过期', cancelling: '取消中' })[task.status]; }
  function actionFor(task) {
    if (task.status === 'preparing') return { key: 'cancel', text: '取消', className: 'is-danger' };
    if (task.status === 'cancelling') return { key: 'none', text: '正在取消', className: 'is-disabled', disabled: true };
    if (task.status === 'ready') return { key: 'download', text: '下载', className: 'is-primary' };
    if (task.status === 'partial') return { key: 'download', text: '下载' + task.success + '个', className: 'is-primary' };
    return { key: 'reprepare', text: '重新准备', className: 'is-primary' };
  }
  function sortedTasks() { return state.tasks.slice().sort(function (a, b) { return b.createdAt.localeCompare(a.createdAt); }); }
  function updateBadge() {
    var badge = trigger.querySelector('.dtc-trigger-badge');
    if (!badge) return;
    var count = batches.flat().filter(function (task) { return task.status === 'preparing' || task.status === 'cancelling'; }).length;
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.setAttribute('aria-label', count + ' 个进行中的下载任务');
    badge.hidden = count === 0;
    if (summaryNode) summaryNode.textContent = count ? count + ' 个正在准备' : '最近下载任务';
  }
  function showToast(message) {
    toastNode.textContent = message;
    toastNode.classList.add('is-show');
    window.clearTimeout(toastNode._timer);
    toastNode._timer = window.setTimeout(function () { toastNode.classList.remove('is-show'); }, 3200);
  }
  function renderRows() {
    list.innerHTML = '';
    sortedTasks().forEach(function (task) {
      var row = el('div', 'dtc-task-row'); row.dataset.taskId = task.id; row.setAttribute('role', 'listitem');
      var main = el('div', 'dtc-task-main');
      var iconWrap = el('span', 'dtc-media-icon-wrap is-' + task.type);
      var image = el('img', 'dtc-media-icon'); image.src = icon(task.type); image.alt = typeLabel(task.type); iconWrap.appendChild(image);
      var taskMeta = statusText(task) + ((task.status === 'preparing' || task.status === 'cancelling') ? ' · ' + task.progress : '');
      var copy = el('div', 'dtc-task-copy'); copy.append(el('div', 'dtc-task-name', task.name), el('div', 'dtc-task-source', task.source + ' · ' + taskMeta));
      main.append(iconWrap, copy);
      var side = el('div', 'dtc-task-side');
      var actions = el('div', 'dtc-row-actions');
      var detailButton = el('button', 'dtc-btn is-quiet', '查看任务'); detailButton.type = 'button'; detailButton.dataset.action = 'detail'; detailButton.setAttribute('aria-label', '查看任务：' + task.name);
      var descriptor = actionFor(task);
      var actionButton = el('button', 'dtc-btn ' + descriptor.className, descriptor.text); actionButton.type = 'button'; actionButton.dataset.action = descriptor.key; actionButton.disabled = !!descriptor.disabled; actionButton.setAttribute('aria-label', descriptor.text + '：' + task.name);
      actions.append(detailButton, actionButton);
      side.append(actions); row.append(main, side); list.appendChild(row);
    });
    updateBadge();
  }
  function showPopover(pin) {
    window.clearTimeout(state.closeTimer);
    if (pin === true) state.pinned = true;
    popover.hidden = false;
    requestAnimationFrame(function () { popover.classList.add('is-open'); });
    trigger.classList.add('is-active'); trigger.setAttribute('aria-expanded', 'true');
  }
  function hidePopover(force) {
    if (state.pinned && !force) return;
    state.pinned = false;
    popover.classList.remove('is-open'); trigger.classList.remove('is-active'); trigger.setAttribute('aria-expanded', 'false');
    window.setTimeout(function () { if (!popover.classList.contains('is-open')) popover.hidden = true; }, 170);
  }
  function scheduleHoverClose() {
    window.clearTimeout(state.closeTimer);
    state.closeTimer = window.setTimeout(function () {
      if (!state.pinned && !popover.matches(':hover') && !trigger.matches(':hover')) hidePopover(false);
    }, 250);
  }
  function findTask(id) { return batches.flat().filter(function (task) { return task.id === id; })[0]; }
  function openDetail(task) {
    state.activeTask = task; state.lastFocus = document.activeElement;
    detailMask.querySelector('[data-detail="name"]').textContent = task.name;
    detailMask.querySelector('[data-detail="source"]').textContent = task.source;
    detailMask.querySelector('[data-detail="selected"]').textContent = task.selected;
    detailMask.querySelector('[data-detail="result"]').textContent = task.success + ' 个已准备好' + (task.failed ? '，' + task.failed + ' 个没准备好' : '');
    detailMask.querySelector('[data-detail="created"]').textContent = task.createdAt.replace('T', ' ');
    detailMask.querySelector('[data-detail="expires"]').textContent = task.expiresAt;
    var resultList = detailMask.querySelector('[data-detail="failures"]'); resultList.innerHTML = '';
    var failureSection = detailMask.querySelector('[data-detail="failure-section"]');
    if (task.failures && task.failures.length) {
      task.failures.forEach(function (failure) {
        var item = el('li', 'dtc-detail-result-item'); item.append(el('span', 'dtc-detail-result-name', failure.split('：')[0]), el('span', 'dtc-detail-result-reason', failure.split('：').slice(1).join('：') || '未准备好')); resultList.appendChild(item);
      });
      failureSection.hidden = false;
    } else failureSection.hidden = true;
    var allButton = detailMask.querySelector('[data-action="reprepare-all"]');
    var total = task.progress.split('/')[1] || '';
    allButton.textContent = '重新准备全部' + total + '个';
    allButton.setAttribute('aria-label', '重新准备全部' + total + '个：' + task.name);
    allButton.hidden = task.status !== 'partial';
    detailMask.hidden = false;
    requestAnimationFrame(function () { detailMask.classList.add('is-open'); detailMask.querySelector('.dtc-detail-close').focus(); });
  }
  function closeDetail() {
    if (detailMask.hidden) return;
    detailMask.classList.remove('is-open');
    window.setTimeout(function () { if (!detailMask.classList.contains('is-open')) detailMask.hidden = true; }, 190);
    var focus = state.lastFocus; state.activeTask = null;
    if (focus && typeof focus.focus === 'function') focus.focus();
  }
  function reprepare(task) {
    var total = Number(task.progress.split('/')[1]) || 1;
    task.status = 'preparing'; task.success = 0; task.failed = 0; task.failures = []; task.progress = '0/' + total;
    renderRows(); showToast('已重新开始准备。');
    window.setTimeout(function () {
      if (task.status !== 'preparing') return;
      task.success = Math.min(total, Math.max(1, Math.round(total * 0.18))); task.progress = task.success + '/' + total; renderRows();
    }, 900);
  }
  function handleAction(task, action) {
    if (action === 'detail') return openDetail(task);
    if (action === 'download') return showToast('已请求浏览器下载，请到浏览器下载栏查看进度。');
    if (action === 'cancel') {
      task.status = 'cancelling'; renderRows();
      window.setTimeout(function () { task.status = 'cancelled'; renderRows(); showToast('下载任务已取消。'); }, 800);
      return;
    }
    if (action === 'reprepare' || action === 'reprepare-all') reprepare(task);
  }
  function loadMore() {
    if (state.loading || state.batch >= batches.length) return;
    state.loading = true; loadingNode.hidden = false;
    window.setTimeout(function () { state.tasks = state.tasks.concat(batches[state.batch++]); state.loading = false; loadingNode.hidden = true; renderRows(); }, 450);
  }
  function build() {
    trigger = document.getElementById('download-task-trigger');
    if (!trigger || document.getElementById('download-task-popover')) return;
    root = trigger.closest('.dtc-root');
    if (!root) return;
    trigger.setAttribute('aria-haspopup', 'dialog'); trigger.setAttribute('aria-expanded', 'false');
    popover = el('section', 'dtc-popover'); popover.id = 'download-task-popover'; popover.hidden = true; popover.setAttribute('role', 'dialog'); popover.setAttribute('aria-label', '下载中心');
    var head = el('header', 'dtc-popover-head'); var heading = el('h2', 'dtc-popover-title', '下载中心'); summaryNode = el('span', 'dtc-popover-subtitle'); heading.appendChild(summaryNode);
    var popoverClose = el('button', 'dtc-icon-btn dtc-popover-close', '×'); popoverClose.type = 'button'; popoverClose.setAttribute('aria-label', '关闭下载中心'); head.append(heading, popoverClose);
    listWrap = el('div', 'dtc-list-wrap');
    list = el('div', 'dtc-list'); list.setAttribute('role', 'list'); list.setAttribute('aria-label', '下载中心任务列表');
    loadingNode = el('div', 'dtc-load-more', '正在加载更多任务…'); loadingNode.hidden = true;
    listWrap.append(list, loadingNode); popover.append(head, listWrap);
    detailMask = el('div', 'dtc-detail-mask'); detailMask.id = 'download-task-detail'; detailMask.hidden = true; detailMask.setAttribute('role', 'dialog'); detailMask.setAttribute('aria-modal', 'true'); detailMask.setAttribute('aria-label', '下载任务详情');
    var modal = el('section', 'dtc-detail-modal');
    var detailHead = el('header', 'dtc-detail-head'); detailHead.appendChild(el('h2', 'dtc-detail-title', '下载任务详情'));
    var detailClose = el('button', 'dtc-btn dtc-detail-close', '关闭'); detailClose.type = 'button'; detailClose.setAttribute('aria-label', '关闭任务详情'); detailHead.appendChild(detailClose);
    var body = el('div', 'dtc-detail-body'); var detailName = el('h3', 'dtc-detail-name'); detailName.dataset.detail = 'name'; body.appendChild(detailName); var source = el('p', 'dtc-detail-source'); source.dataset.detail = 'source'; body.appendChild(source);
    var grid = el('div', 'dtc-detail-grid');
    [['选择结果', 'selected'], ['准备结果', 'result'], ['创建时间', 'created'], ['过期时间', 'expires']].forEach(function (field) { var item = el('div', 'dtc-detail-field'); item.append(el('span', 'dtc-detail-label', field[0]), (function () { var value = el('div', 'dtc-detail-value'); value.dataset.detail = field[1]; return value; }())); grid.appendChild(item); });
    body.appendChild(grid);
    var failureSection = el('section'); failureSection.dataset.detail = 'failure-section'; failureSection.appendChild(el('h3', 'dtc-detail-section-title', '没准备好的内容'));
    var failureList = el('ul', 'dtc-detail-result-list'); failureList.dataset.detail = 'failures'; failureSection.appendChild(failureList); body.appendChild(failureSection);
    var foot = el('footer', 'dtc-detail-foot'); var allButton = el('button', 'dtc-btn is-primary', '重新准备全部200个'); allButton.type = 'button'; allButton.dataset.action = 'reprepare-all'; var done = el('button', 'dtc-btn', '知道了'); done.type = 'button'; done.dataset.action = 'detail-close'; foot.append(allButton, done);
    modal.append(detailHead, body, foot); detailMask.appendChild(modal);
    toastNode = el('div', 'dtc-toast'); toastNode.id = 'download-task-toast'; toastNode.setAttribute('role', 'status'); toastNode.setAttribute('aria-live', 'polite');
    portal = el('div', 'dtc-root dtc-portal');
    portal.append(popover, detailMask, toastNode);
    document.body.appendChild(portal);
    renderRows();
    trigger.addEventListener('mouseenter', function () { showPopover(false); });
    trigger.addEventListener('mouseleave', scheduleHoverClose);
    trigger.addEventListener('click', function (event) { event.stopPropagation(); if (state.pinned) hidePopover(true); else showPopover(true); });
    popover.addEventListener('mouseenter', function () { window.clearTimeout(state.closeTimer); }); popover.addEventListener('mouseleave', scheduleHoverClose);
    popoverClose.addEventListener('click', function () { hidePopover(true); });
    list.addEventListener('click', function (event) { var button = event.target.closest('button[data-action]'); if (!button) return; event.stopPropagation(); var row = button.closest('[data-task-id]'); var task = row && findTask(row.dataset.taskId); if (task) handleAction(task, button.dataset.action); });
    listWrap.addEventListener('scroll', function () { if (listWrap.scrollTop + listWrap.clientHeight >= listWrap.scrollHeight - 24) loadMore(); });
    detailMask.addEventListener('click', function (event) { event.stopPropagation(); if (event.target === detailMask) closeDetail(); });
    detailMask.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var focusable = Array.prototype.filter.call(detailMask.querySelectorAll('button:not([disabled])'), function (button) { return !button.hidden; });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    detailMask.querySelector('.dtc-detail-close').addEventListener('click', closeDetail); detailMask.querySelector('[data-action="detail-close"]').addEventListener('click', closeDetail);
    allButton.addEventListener('click', function () { if (state.activeTask) { handleAction(state.activeTask, 'reprepare-all'); closeDetail(); } });
    document.addEventListener('click', function (event) { if (popover.classList.contains('is-open') && !popover.contains(event.target) && !trigger.contains(event.target)) hidePopover(true); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { if (!detailMask.hidden) closeDetail(); else hidePopover(true); } });
  }
  window.DownloadTaskCenter = { open: function () { showPopover(true); }, close: function () { hidePopover(true); }, getTasks: function () { return sortedTasks(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
}());

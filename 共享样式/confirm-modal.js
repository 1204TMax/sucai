/**
 * 确认弹窗组件 - 逻辑
 *
 * 使用方式：
 *   <script src="../共享样式/confirm-modal.js"></script>
 *
 * API:
 *   openConfirmModal({
 *     title,
 *     description,
 *     cancelText,
 *     confirmText,
 *     onConfirm,
 *     onCancel,
 *     maskClosable
 *   })
 *   closeConfirmModal()
 */

var _ccConfirmState = {
  onConfirm: null,
  onCancel: null,
  maskClosable: true
};

function _ccConfirmEnsureDom() {
  if (document.getElementById('ccConfirmMask')) return;
  var wrap = document.createElement('div');
  wrap.innerHTML = ''
    + '<div class="cc-confirm-mask" id="ccConfirmMask">'
    + '  <div class="cc-confirm-dialog">'
    + '    <div class="cc-confirm-title" id="ccConfirmTitle">提示</div>'
    + '    <div class="cc-confirm-desc" id="ccConfirmDesc"></div>'
    + '    <div class="cc-confirm-footer">'
    + '      <button class="cc-confirm-btn" id="ccConfirmCancelBtn">取消</button>'
    + '      <button class="cc-confirm-btn cc-confirm-btn-primary" id="ccConfirmOkBtn">确认</button>'
    + '    </div>'
    + '  </div>'
    + '</div>';
  document.body.appendChild(wrap.firstChild);

  document.getElementById('ccConfirmMask').addEventListener('click', function(e) {
    if (e.target !== this) return;
    if (_ccConfirmState.maskClosable === false) return;
    _ccConfirmRunCancel();
  });
  document.getElementById('ccConfirmCancelBtn').addEventListener('click', _ccConfirmRunCancel);
  document.getElementById('ccConfirmOkBtn').addEventListener('click', _ccConfirmRunConfirm);
}

function _ccConfirmRunCancel() {
  var fn = _ccConfirmState.onCancel;
  closeConfirmModal();
  if (typeof fn === 'function') fn();
}

function _ccConfirmRunConfirm() {
  var fn = _ccConfirmState.onConfirm;
  closeConfirmModal();
  if (typeof fn === 'function') fn();
}

function openConfirmModal(options) {
  _ccConfirmEnsureDom();
  var opts = options || {};
  _ccConfirmState.onConfirm = opts.onConfirm || null;
  _ccConfirmState.onCancel = opts.onCancel || null;
  _ccConfirmState.maskClosable = opts.maskClosable !== false;

  document.getElementById('ccConfirmTitle').textContent = opts.title || '提示';

  var desc = document.getElementById('ccConfirmDesc');
  desc.textContent = opts.description || '';
  desc.style.display = opts.description ? 'block' : 'none';

  document.getElementById('ccConfirmCancelBtn').textContent = opts.cancelText || '取消';
  
  var okBtn = document.getElementById('ccConfirmOkBtn');
  var originalText = opts.confirmText || '确认';
  okBtn.textContent = originalText;
  okBtn.disabled = false;

  if (_ccConfirmState.timer) {
    clearInterval(_ccConfirmState.timer);
    _ccConfirmState.timer = null;
  }

  if (opts.countdown && opts.countdown > 0) {
    okBtn.disabled = true;
    var count = opts.countdown;
    okBtn.textContent = originalText + ' (' + count + 's)';
    _ccConfirmState.timer = setInterval(function() {
      count--;
      if (count <= 0) {
        clearInterval(_ccConfirmState.timer);
        _ccConfirmState.timer = null;
        okBtn.disabled = false;
        okBtn.textContent = originalText;
      } else {
        okBtn.textContent = originalText + ' (' + count + 's)';
      }
    }, 1000);
  }

  document.getElementById('ccConfirmMask').classList.add('show');
}

function closeConfirmModal() {
  var mask = document.getElementById('ccConfirmMask');
  if (mask) mask.classList.remove('show');
  if (_ccConfirmState.timer) {
    clearInterval(_ccConfirmState.timer);
    _ccConfirmState.timer = null;
  }
  _ccConfirmState.onConfirm = null;
  _ccConfirmState.onCancel = null;
  _ccConfirmState.maskClosable = true;
}

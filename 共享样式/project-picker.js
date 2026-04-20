/**
 * 项目选择弹窗组件 - 逻辑
 *
 * 依赖：
 *   - 页面需定义 PROJECT_TREE
 *   - 页面需定义 escHtml(str)
 *   - 页面需在加载后调用 setProjectPickerAdapter({ getValue, setValue, refresh })
 */

var _projSelectedList = []; // 现在支持多选，存储数组
var _projActiveCat = '';
var _projDefaultLogo = window.PROJECT_PICKER_DEFAULT_LOGO || '../icon/xmiles.png';
var _projPickerAdapter = {
  getValue: function() { return ''; },
  setValue: function() {},
  refresh: function() {}
};

function setProjectPickerAdapter(adapter) {
  _projPickerAdapter = Object.assign({}, _projPickerAdapter, adapter || {});
}

function openProjModal() {
  // 获取当前值，兼容字符串和数组
  var current = _projPickerAdapter.getValue();
  if (Array.isArray(current)) {
    _projSelectedList = current.slice();
  } else if (typeof current === 'string' && current.trim()) {
    _projSelectedList = current.split(',').map(function(s){ return s.trim(); });
  } else {
    _projSelectedList = [];
  }

  _projActiveCat = '';
  if (_projSelectedList.length > 0) {
    var lastSelected = _projSelectedList[_projSelectedList.length - 1];
    PROJECT_TREE.forEach(function(g) {
      if (g.name === lastSelected) _projActiveCat = g.name;
      g.children.forEach(function(c) { if (c === lastSelected) _projActiveCat = g.name; });
    });
  }
  if (!_projActiveCat && PROJECT_TREE.length) _projActiveCat = PROJECT_TREE[0].name;
  
  var searchInput = document.getElementById('ccProjSearchInput');
  if (searchInput) searchInput.value = '';
  
  renderProjModalBody();
  document.getElementById('ccProjModalMask').classList.add('show');
}

function closeProjModal() {
  document.getElementById('ccProjModalMask').classList.remove('show');
}

function confirmProjSelect() {
  // 返回数组给适配器
  _projPickerAdapter.setValue(_projSelectedList);
  closeProjModal();
  _projPickerAdapter.refresh();
}

function projSelectItem(value) {
  var idx = _projSelectedList.indexOf(value);
  if (idx >= 0) {
    _projSelectedList.splice(idx, 1);
  } else {
    _projSelectedList.push(value);
  }
  renderProjModalBody();
}

function projRemoveItem(value) {
  var idx = _projSelectedList.indexOf(value);
  if (idx >= 0) {
    _projSelectedList.splice(idx, 1);
    renderProjModalBody();
  }
}

function projClickCat(catName) {
  _projActiveCat = catName;
  renderProjModalBody();
}

function renderProjModalBody() {
  var search = (document.getElementById('ccProjSearchInput').value || '').trim().toLowerCase();

  var filteredTree = PROJECT_TREE.map(function(g) {
    var catMatch = !search || g.name.toLowerCase().indexOf(search) >= 0;
    var filteredChildren = g.children.filter(function(c) {
      return !search || c.toLowerCase().indexOf(search) >= 0;
    });
    if (catMatch || filteredChildren.length > 0) {
      return { name: g.name, children: catMatch ? g.children : filteredChildren };
    }
    return null;
  }).filter(Boolean);

  var catNames = filteredTree.map(function(g){ return g.name; });
  if (catNames.indexOf(_projActiveCat) < 0) _projActiveCat = catNames[0] || '';

  // 1. 渲染左侧：品类列表
  var catHtml = filteredTree.map(function(g) {
    var isActive = g.name === _projActiveCat;
    var isSelected = _projSelectedList.indexOf(g.name) >= 0;
    return '<div class="cc-proj-cat-item'+(isActive?' active':'')+(isSelected?' checked':'')+'" onclick="projClickCat(\''+escHtml(g.name)+'\')">'
      +'<span class="cc-proj-checkbox" onclick="event.stopPropagation();projSelectItem(\''+escHtml(g.name)+'\')"></span>'
      +'<span style="flex:1">'+escHtml(g.name)+'</span>'
      +'</div>';
  }).join('');

  // 2. 渲染中间：产品列表
  var activeCatData = filteredTree.find(function(g){ return g.name === _projActiveCat; });
  var prodHtml = '';
  if (activeCatData && activeCatData.children.length > 0) {
    prodHtml = activeCatData.children.map(function(c) {
      var isSelected = _projSelectedList.indexOf(c) >= 0;
      return '<div class="cc-proj-prod-item'+(isSelected?' selected':'')+'" onclick="projSelectItem(\''+escHtml(c)+'\')">'
        +'<span class="cc-proj-checkbox"></span>'
        +'<img class="cc-proj-prod-logo" src="'+escHtml(_projDefaultLogo)+'" alt="">'
        +'<span class="cc-proj-prod-name">'+escHtml(c)+'</span>'
        +'</div>';
    }).join('');
  } else if (filteredTree.length > 0) {
    prodHtml = '<div class="cc-proj-modal-empty">该品类下暂无产品</div>';
  } else {
    prodHtml = '<div class="cc-proj-modal-empty">未搜到相关结果</div>';
  }

  // 3. 渲染右侧：已选列表
  var selectedHtml = '<div class="cc-proj-selected-header">已选项目 <span class="cc-proj-selected-count">'+_projSelectedList.length+'</span></div>'
    + '<div class="cc-proj-selected-list">'
    + _projSelectedList.map(function(item) {
        return '<div class="cc-proj-selected-tag">'
          + '<span class="name">' + escHtml(item) + '</span>'
          + '<span class="remove" onclick="event.stopPropagation();projRemoveItem(\''+escHtml(item)+'\')">✕</span>'
          + '</div>';
      }).join('')
    + '</div>';

  var catListEl = document.getElementById('ccProjCatList');
  var prodListEl = document.getElementById('ccProjProdList');
  var selectedListEl = document.getElementById('ccProjSelectedList');

  if (catListEl) catListEl.innerHTML = catHtml;
  if (prodListEl) prodListEl.innerHTML = prodHtml;
  if (selectedListEl) selectedListEl.innerHTML = selectedHtml;
}

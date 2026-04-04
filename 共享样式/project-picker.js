/**
 * 项目选择弹窗组件
 *
 * 使用方式：
 *   1. 引入样式和脚本：
 *      <link rel="stylesheet" href="../共享样式/project-picker.css">
 *      <script src="../共享样式/project-picker.js"></script>
 *
 *   2. 页面中放置弹窗 HTML（见生成详情.html中 id="projModalMask" 部分）
 *
 *   3. 页面中定义 PROJECT_TREE 数据和 state.filters.project
 *
 *   4. 按钮 onclick="openProjModal()" 打开弹窗
 *
 * 依赖：页面需定义 escHtml()、PROJECT_TREE、state.filters.project、renderFilterBar()、renderTaskFeed()
 */

var _projSelected = '';
var _projActiveCat = '';

function openProjModal() {
  _projSelected = state.filters.project || '';
  _projActiveCat = '';
  PROJECT_TREE.forEach(function(g) {
    if (g.name === _projSelected) _projActiveCat = g.name;
    g.children.forEach(function(c) { if (c === _projSelected) _projActiveCat = g.name; });
  });
  if (!_projActiveCat && PROJECT_TREE.length) _projActiveCat = PROJECT_TREE[0].name;
  document.getElementById('projSearchInput').value = '';
  renderProjModalBody();
  document.getElementById('projModalMask').classList.add('show');
}

function closeProjModal() {
  document.getElementById('projModalMask').classList.remove('show');
}

function confirmProjSelect() {
  state.filters.project = _projSelected;
  closeProjModal();
  renderFilterBar();
  renderTaskFeed();
}

function projSelectItem(value) {
  _projSelected = (_projSelected === value) ? '' : value;
  renderProjModalBody();
}

function projClickCat(catName) {
  _projActiveCat = catName;
  renderProjModalBody();
}

function renderProjModalBody() {
  var search = (document.getElementById('projSearchInput').value || '').trim().toLowerCase();

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

  var catHtml = filteredTree.map(function(g) {
    var isActive = g.name === _projActiveCat;
    var isSelected = g.name === _projSelected;
    return '<div class="proj-cat-item'+(isActive?' active':'')+(isSelected?' checked':'')+'" onclick="projClickCat(\''+escHtml(g.name)+'\')">'
      +'<span class="proj-cat-radio'+(isSelected?' selected':'')+'"></span>'
      +'<span style="flex:1" onclick="event.stopPropagation();projSelectItem(\''+escHtml(g.name)+'\');projClickCat(\''+escHtml(g.name)+'\')">'+escHtml(g.name)+'</span>'
      +'</div>';
  }).join('');

  var activeCatData = filteredTree.find(function(g){ return g.name === _projActiveCat; });
  var prodHtml = '';
  if (activeCatData && activeCatData.children.length > 0) {
    prodHtml = activeCatData.children.map(function(c) {
      var isSelected = c === _projSelected;
      return '<div class="proj-prod-item'+(isSelected?' selected':'')+'" onclick="projSelectItem(\''+escHtml(c)+'\')">'
        +'<span class="proj-cat-radio'+(isSelected?' selected':'')+'"></span>'
        +escHtml(c)+'</div>';
    }).join('');
  } else {
    prodHtml = '<div class="proj-modal-empty">该品类下暂无产品</div>';
  }

  document.getElementById('projCatList').innerHTML = catHtml;
  document.getElementById('projProdList').innerHTML = prodHtml;
}

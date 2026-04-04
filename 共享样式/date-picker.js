/**
 * 日期范围选择器组件 - 逻辑
 *
 * 使用方式：
 *   <link rel="stylesheet" href="../共享样式/date-picker.css">
 *   <script src="../共享样式/date-picker.js"></script>
 *
 * 依赖：
 *   - 页面需定义 escHtml()
 *   - 页面需定义 state.filters（含 dateRange / dateStart / dateEnd 字段）
 *   - 页面需定义 renderFilterBar()、renderTaskFeed()（选择后回调刷新）
 *   - 页面需引入 .sel-wrap / .sel / .dropdown / .dropdown-item 样式（design-system）
 *
 * 使用示例：
 *   在 renderFilterBar() 中调用 buildDatePickerHTML(state.filters) 获取 HTML 片段，
 *   拼入筛选栏即可。
 */

/**
 * 生成日期选择器下拉菜单的完整 HTML
 * @param {object} filters - 包含 dateRange / dateStart / dateEnd 的筛选状态
 * @param {string} chevronSvg - chevron 箭头 SVG 字符串
 * @returns {string} HTML 片段（包含 .sel-wrap 容器）
 */
function buildDatePickerHTML(filters, chevronSvg) {
  var f = filters;
  var dateLabels = {'7':'近 7 天', '30':'近 30 天', '90':'近 90 天', 'custom':'自定义'};

  // 触发按钮文字
  var dateLabel = f.dateRange === 'custom' && (f.dateStart || f.dateEnd)
    ? (f.dateStart || '起') + ' ~ ' + (f.dateEnd || '止')
    : (dateLabels[f.dateRange] || '日期范围');

  // 预设选项
  var presetItems = [
    {v: '',   l: '全部'},
    {v: '7',  l: '近 7 天'},
    {v: '30', l: '近 30 天'},
    {v: '90', l: '近 90 天'}
  ].map(function(o) {
    return '<button class="dropdown-item' + (f.dateRange === o.v ? ' on' : '') + '"'
      + ' onclick="datePickerSelect(\'' + o.v + '\')">'
      + o.l + '</button>';
  }).join('');

  // 自定义选项 + 日期输入
  var customItem = '<div class="date-picker-divider"></div>'
    + '<button class="dropdown-item' + (f.dateRange === 'custom' ? ' on' : '') + '"'
    + ' onclick="datePickerSelect(\'custom\');event.stopPropagation()">'
    + '自定义</button>';

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
    + ' onclick="toggleFilterDD(event,\'dateRange\')">'
    + escHtml(dateLabel) + ' ' + chevronSvg
    + '</button>'
    + '<div class="dropdown" id="filterDD-dateRange">'
    + presetItems + customItem + customInputs
    + '</div>'
    + '</div>';
}

/**
 * 选择预设或自定义选项
 */
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

/**
 * 设置自定义日期
 */
function datePickerSetCustom(which, value) {
  if (which === 'start') state.filters.dateStart = value;
  if (which === 'end')   state.filters.dateEnd = value;
  renderFilterBar();
  renderTaskFeed();
}

/**
 * 日期过滤逻辑 —— 在页面的 getFilteredTasks 中调用
 * @param {string} createdTime - 任务创建时间字符串
 * @param {object} filters - state.filters
 * @returns {boolean} 是否通过筛选
 */
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

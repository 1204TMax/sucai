# 设计规范

> **目标读者：AI 或开发者。** 拿到一个 UI 混乱的页面时，按此文档的 CSS 和 HTML 模板重写，即可得到统一风格。
>
> **使用方法：**
> 1. 把第 1 节的 CSS 变量块和第 2 节的组件 CSS 复制到页面 `<style>` 中
> 2. 用第 2 节的 HTML 模板替换页面中对应的组件
> 3. 用第 3 节的布局模式组装页面结构
> 4. 按第 4 节的规则检查结果

---

## 1. 基础变量

直接复制到 `:root` 中。所有组件只使用这些变量，不硬编码任何值。

```css
:root {
  /* ── 主色（Blue，10 级色阶） ── */
  --primary-1:  #E8F4FF;  /* 选中背景 */
  --primary-2:  #C4E2FF;  /* 选中边框 */
  --primary-3:  #96C8FF;
  --primary-4:  #6DAFFF;
  --primary-5:  #5AA4FF;  /* 按钮 hover */
  --primary-6:  #4A9EFF;  /* ★ 主色 — 按钮、链接、焦点 */
  --primary-7:  #3580DB;  /* 选中文字、pressed */
  --primary-8:  #2463B5;
  --primary-9:  #164A8F;
  --primary-10: #0B336A;

  /* ── 灰阶（Slate，偏蓝冷灰，12 级） ── */
  --gray-1:  #FCFCFD;  /* 卡片背景 */
  --gray-2:  #F8F9FA;  /* 页面背景 */
  --gray-3:  #F1F3F5;  /* subtle 背景 */
  --gray-4:  #E9ECEF;  /* 默认边框、hover 背景 */
  --gray-5:  #DEE2E6;  /* active 背景 */
  --gray-6:  #CED4DA;  /* hover 边框 */
  --gray-7:  #ADB5BD;  /* 强调边框 */
  --gray-8:  #868E96;  /* placeholder */
  --gray-9:  #6C757D;  /* 次要文字 */
  --gray-10: #5A6169;
  --gray-11: #495057;  /* 正文文字 */
  --gray-12: #212529;  /* 标题文字 */

  /* ── 语义映射（组件中只用这些） ── */
  --bg-page:      var(--gray-2);
  --bg-surface:   var(--gray-1);
  --bg-subtle:    var(--gray-3);
  --bg-hover:     var(--gray-4);
  --bg-active:    var(--gray-5);

  --border-1:     var(--gray-4);
  --border-2:     var(--gray-6);
  --border-3:     var(--gray-7);

  --text-hi:      var(--gray-12);
  --text-lo:      var(--gray-11);
  --text-muted:   var(--gray-9);
  --text-ghost:   var(--gray-8);

  --accent-bg:      var(--primary-1);
  --accent-border:  var(--primary-2);
  --accent-solid:   var(--primary-6);
  --accent-solid-h: var(--primary-5);
  --accent-text:    var(--primary-7);

  /* ── 状态色 ── */
  --success: #34C759;
  --success-bg: #F6FFED;
  --success-border: #D9F7BE;
  --warning: #FF9500;
  --warning-bg: #FFFBE6;
  --warning-border: #FFE58F;
  --error:   #E5484D;
  --error-bg: #FFF2F0;
  --error-border: #FFCCC7;

  /* ── 固定色（不随主题变） ── */
  --white: #fff;            /* 深色背景上的文字、图标 */
  --overlay: rgba(0,0,0,0.45); /* 遮罩层 */

  /* ── 字体 ── */
  --font: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Noto Sans SC", sans-serif;
  --text-xxs:  10px;  /* 仅限角标、时长标签等极小辅助文字 */
  --text-xs:   11px;
  --text-sm:   12px;
  --text-base: 13px;
  --text-md:   14px;
  --text-lg:   16px;
  --text-xl:   18px;  /* 弹窗标题 */

  /* ── 间距（4px 网格） ── */
  --space-0: 2px;   /* 仅限微调：列表项间距、内部对齐偏移 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 40px;
  --space-9: 48px;

  /* ── 组件高度（所有交互组件必须从中选） ── */
  --h-xs: 22px;   /* chip, badge, pill, range-input */
  --h-sm: 28px;   /* 按钮, 搜索框 */
  --h-md: 32px;   /* select trigger */
  --h-lg: 36px;   /* 大按钮（极少用） */

  /* ── 圆角 ── */
  --r-sm:   4px;   /* chip, range-input */
  --r-md:   6px;   /* 按钮, 搜索框 */
  --r-lg:   8px;   /* select trigger */
  --r-xl:   12px;  /* 卡片, dropdown */
  --r-full: 9999px; /* pill, badge, active-chip */

  /* ── 过渡 ── */
  --ease: 120ms ease;
}
```

---

## 2. 组件

每个组件给出**完整 CSS** + **HTML 模板** + **各状态说明**。

---

### 2.1 按钮（Button）

**CSS：**
```css
.b {
  height: var(--h-sm);
  padding: 0 var(--space-3);
  border-radius: var(--r-md);
  font: 500 var(--text-sm)/1 var(--font);
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  white-space: nowrap;
  transition: all var(--ease);
  flex-shrink: 0;
}
.b:focus-visible { outline: 2px solid var(--accent-solid); outline-offset: 1px; }

/* 主按钮 — 每个区域最多 1 个 */
.b-solid { background: var(--accent-solid); color: white; }
.b-solid:hover { background: var(--accent-solid-h); }

/* 次要按钮 */
.b-soft { background: var(--bg-subtle); color: var(--text-lo); border-color: var(--border-1); }
.b-soft:hover { background: var(--bg-hover); color: var(--text-hi); border-color: var(--border-2); }

/* 弱按钮 */
.b-ghost { background: transparent; color: var(--text-muted); }
.b-ghost:hover { background: var(--bg-subtle); color: var(--text-lo); }

/* 图标按钮 */
.b-icon { width: var(--h-sm); padding: 0; }
.b-icon.on { background: var(--accent-bg); color: var(--accent-text); border-color: var(--accent-border); }
```

**HTML：**
```html
<!-- 主按钮 -->
<button class="b b-solid">导入素材</button>

<!-- 次要按钮 -->
<button class="b b-soft">导出</button>

<!-- 弱按钮 -->
<button class="b b-ghost">重置</button>

<!-- 图标按钮（默认 / 选中） -->
<button class="b b-icon b-soft">☰</button>
<button class="b b-icon b-soft on">⊞</button>
```

---

### 2.2 选择器（Select trigger + Dropdown）

胶囊形态，灰底无边框。文字本身就是类别名，不需要外部 label。带 SVG chevron 箭头。

**CSS：**
```css
.sel-wrap { position: relative; display: inline-flex; flex-shrink: 0; }

.sel {
  height: var(--h-md);
  padding: 0 var(--space-3) 0 var(--space-4);
  border-radius: var(--r-lg);
  font: 400 var(--text-base)/1 var(--font);
  color: var(--text-lo);
  background: var(--bg-subtle);
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  white-space: nowrap;
  transition: all var(--ease);
  flex-shrink: 0;
  min-width: 88px;
}
.sel:hover { background: var(--bg-hover); color: var(--text-hi); }
.sel.on { background: var(--accent-bg); color: var(--accent-text); border-color: var(--accent-border); }

.sel .chevron { width: 12px; height: 12px; margin-left: auto; opacity: 0.4; transition: transform var(--ease); }
.sel.open .chevron { transform: rotate(180deg); }

/* ── Dropdown 下拉面板 ── */
.dropdown {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 0;
  min-width: 220px;
  background: var(--bg-surface);
  border: 1px solid var(--border-1);
  border-radius: var(--r-xl);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: var(--space-2) 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

/* 选项多时带搜索框 */
.dropdown-search {
  margin: var(--space-2) var(--space-3);
  height: var(--h-sm);
  padding: 0 var(--space-3);
  background: var(--bg-subtle);
  border: 1px solid var(--border-1);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.dropdown-search-ico { color: var(--text-ghost); font-size: var(--text-sm); flex-shrink: 0; }
.dropdown-search-ph { font-size: var(--text-sm); color: var(--text-ghost); }

.dropdown-list { max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; }

.dropdown-item {
  height: 36px;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  color: var(--text-lo);
  cursor: pointer;
  transition: background var(--ease);
  border: none;
  background: none;
  font-family: inherit;
  text-align: left;
}
.dropdown-item:hover { background: var(--bg-subtle); color: var(--text-hi); }

.dropdown-checkbox {
  width: 16px; height: 16px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-2);
  background: var(--bg-surface);
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.dropdown-checkbox.checked { background: var(--accent-solid); border-color: var(--accent-solid); }
.dropdown-checkbox.checked::after { content: '✓'; color: white; font-size: 10px; font-weight: 700; }

.dropdown-item-text { flex: 1; }
.dropdown-item-arrow { color: var(--text-ghost); font-size: var(--text-sm); }
```

**HTML（收起态）：**
```html
<button class="sel">品类 <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.5L6 7.5L9 4.5"/></svg></button>
```

**HTML（选中态）：**
```html
<button class="sel on">图片 <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.5L6 7.5L9 4.5"/></svg></button>
```

**HTML（展开态，带搜索 + checkbox）：**
```html
<div class="sel-wrap">
  <button class="sel open">产品 <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.5L6 7.5L9 4.5"/></svg></button>
  <div class="dropdown">
    <div class="dropdown-search">
      <span class="dropdown-search-ico">⌕</span>
      <span class="dropdown-search-ph">搜索</span>
    </div>
    <div class="dropdown-list">
      <button class="dropdown-item"><span class="dropdown-checkbox checked"></span><span class="dropdown-item-text">走路赚金币</span></button>
      <button class="dropdown-item"><span class="dropdown-checkbox"></span><span class="dropdown-item-text">消消乐大冒险</span></button>
      <button class="dropdown-item"><span class="dropdown-checkbox"></span><span class="dropdown-item-text">全民钓鱼</span><span class="dropdown-item-arrow">›</span></button>
    </div>
  </div>
</div>
```

---

### 2.3 切换组（Pill group）

用于互斥切换（如密度大/中/小，状态全部/已上线/审核中）。

**CSS：**
```css
.pills {
  display: inline-flex;
  align-items: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-1);
  border-radius: var(--r-full);
  padding: 2px;
  gap: 1px;
  flex-shrink: 0;
}

.pill {
  height: var(--h-xs);
  padding: 0 var(--space-3);
  border-radius: var(--r-full);
  font: 500 var(--text-sm)/1 var(--font);
  color: var(--text-muted);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all var(--ease);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}
.pill:hover { color: var(--text-lo); }
.pill.on { background: var(--bg-surface); color: var(--text-hi); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

/* 数量角标 */
.pill-n {
  font-size: var(--text-xs);
  color: var(--text-muted);
  background: var(--bg-subtle);
  padding: 0 var(--space-1);
  border-radius: var(--r-full);
  margin-left: 1px;
}
.pill.on .pill-n { background: var(--bg-hover); color: var(--text-lo); }
```

**HTML：**
```html
<div class="pills">
  <button class="pill on">全部 <span class="pill-n">86</span></button>
  <button class="pill">已上线 <span class="pill-n">41</span></button>
  <button class="pill">审核中 <span class="pill-n">12</span></button>
</div>
```

---

### 2.4 标签页（Tab）

用于一级分类切换。**规则：Tab 行独占一行，不混入按钮、搜索框或其他控件。**

**CSS：**
```css
.tabs {
  display: flex;
  align-items: center;
  padding: 0 var(--space-5);
  border-bottom: 1px solid var(--border-1);
  gap: 0;
}

.tab {
  height: 40px;
  padding: 0 var(--space-3);
  font: 400 var(--text-sm)/1 var(--font);
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color var(--ease);
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
.tab:hover { color: var(--text-lo); }
.tab.on { color: var(--text-hi); font-weight: 500; }
.tab.on::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: -1px;
  height: 2px;
  background: var(--accent-solid);
  border-radius: 1px 1px 0 0;
}
```

**HTML：**
```html
<div class="tabs">
  <button class="tab on">正式库</button>
  <button class="tab">待优化库</button>
  <button class="tab">回收站</button>
</div>
```

---

### 2.5 筛选芯片（Chip）

用于行内多选筛选（模型选择、比例选择等）。

**CSS：**
```css
.chip {
  height: var(--h-xs);
  padding: 0 var(--space-2);
  border-radius: var(--r-sm);
  font: 500 var(--text-xs)/1 var(--font);
  color: var(--text-lo);
  background: var(--bg-subtle);
  border: 1px solid var(--border-1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  white-space: nowrap;
  transition: all var(--ease);
}
.chip:hover { border-color: var(--border-2); color: var(--text-hi); }
.chip.on { background: var(--accent-bg); border-color: var(--accent-border); color: var(--accent-text); font-weight: 600; }

.chip-n { font-weight: 400; opacity: 0.55; }

.f-chips { display: flex; flex-wrap: wrap; gap: var(--space-1); }
```

**HTML：**
```html
<div class="f-chips">
  <button class="chip on">全部模型</button>
  <button class="chip">Seedream 5.0</button>
  <button class="chip">Banana 2</button>
</div>

<!-- 带数量 -->
<div class="f-chips">
  <button class="chip on">全部比例 <span class="chip-n">16</span></button>
  <button class="chip">9:16 <span class="chip-n">6</span></button>
  <button class="chip">16:9 <span class="chip-n">6</span></button>
</div>
```

---

### 2.6 已选标签（Active chip）

展示当前生效的筛选条件，点击可移除。放在 active-bar 或 filter-bar 中。

**CSS：**
```css
.active-bar {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-5);
  border-top: 1px solid var(--border-1);
  background: var(--gray-2);
  flex-wrap: wrap;
}

.active-chip {
  height: 20px;
  padding: 0 var(--space-2);
  border-radius: var(--r-full);
  font: 500 var(--text-xs)/1 var(--font);
  background: var(--accent-bg);
  color: var(--accent-text);
  border: 1px solid var(--accent-border);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  cursor: pointer;
  transition: all var(--ease);
}
.active-chip:hover { background: var(--accent-solid); color: white; border-color: var(--accent-solid); }

.clear {
  font: 400 var(--text-xs)/1 var(--font);
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  margin-left: var(--space-1);
}
.clear:hover { color: var(--error); }
```

**HTML：**
```html
<div class="active-bar">
  <span class="active-chip">类型·图片 <span style="opacity:.6;font-size:9px">✕</span></span>
  <span class="active-chip">语言·中文 <span style="opacity:.6;font-size:9px">✕</span></span>
  <button class="clear">清空全部</button>
</div>
```

---

### 2.7 徽标（Badge）

只读信息展示，不可交互。

**CSS：**
```css
.badge {
  height: 18px;
  padding: 0 var(--space-2);
  border-radius: var(--r-full);
  font: 500 var(--text-xs)/1 var(--font);
  display: inline-flex;
  align-items: center;
}
.badge-default { background: var(--bg-subtle); color: var(--text-lo); }
.badge-accent  { background: var(--accent-bg); color: var(--accent-text); }
```

**HTML：**
```html
<span class="badge badge-default">清晰度·2K</span>
<span class="badge badge-accent">图片</span>
```

---

### 2.8 搜索框（Search）

**CSS：**
```css
.search {
  height: var(--h-sm);
  padding: 0 var(--space-3);
  background: var(--bg-surface);
  border: 1px solid var(--border-1);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--ease);
  flex: 1;
  min-width: 160px;
  max-width: 280px;
}
.search:focus-within { border-color: var(--accent-border); box-shadow: 0 0 0 3px var(--accent-bg); }
.search-ico { color: var(--text-muted); font-size: var(--text-sm); flex-shrink: 0; }
.search-ph { font-size: var(--text-sm); color: var(--text-ghost); }
```

**HTML：**
```html
<div class="search">
  <span class="search-ico">⌕</span>
  <span class="search-ph">搜索 ID / 标签</span>
</div>
```

---

### 2.9 范围输入（Range input）

**CSS：**
```css
.range { display: flex; align-items: center; gap: var(--space-2); }
.range-input {
  height: var(--h-xs);
  width: 88px;
  padding: 0 var(--space-2);
  background: var(--bg-surface);
  border: 1px solid var(--border-1);
  border-radius: var(--r-sm);
  font: 400 var(--text-xs)/1 var(--font);
  color: var(--text-lo);
  text-align: center;
}
.range-input:focus { outline: none; border-color: var(--accent-border); box-shadow: 0 0 0 2px var(--accent-bg); }
.range-dash { color: var(--text-ghost); font-size: var(--text-xs); }
```

**HTML：**
```html
<div class="range">
  <input class="range-input" type="text" value="2026-04-01">
  <span class="range-dash">—</span>
  <input class="range-input" type="text" value="2026-04-05">
</div>
```

---

## 3. 布局模式

### 3.1 页面容器

```css
.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-7) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}
```

### 3.2 卡片

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-1);
  border-radius: var(--r-xl);
  overflow: hidden;
}
```

内部用多个水平行（row）组成，行之间用 `border-bottom` 分隔：

```html
<div class="card">
  <div class="tabs"> ... </div>                    <!-- 第一层：tab 切换 -->
  <div class="row row-pad row-sep"> ... </div>      <!-- 第二层：操作+筛选 -->
  <div class="active-bar"> ... </div>               <!-- 第三层：已选条件 -->
</div>
```

### 3.3 行容器

```css
.row     { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }
.row-pad { padding: var(--space-3) var(--space-5); }
.row-sep { border-bottom: 1px solid var(--border-1); }
.row-end { margin-left: auto; display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
.sep     { width: 1px; height: 16px; background: var(--border-1); flex-shrink: 0; }
```

用 `.sep` 分隔同一行内不同组的控件：

```html
<div class="row row-pad row-sep">
  <!-- 组 1：状态切换 -->
  <div class="pills"> ... </div>
  <div class="sep"></div>

  <!-- 组 2：操作按钮 -->
  <button class="b b-solid">导入素材</button>
  <button class="b b-soft">导出</button>
  <div class="sep"></div>

  <!-- 组 3：筛选器 -->
  <button class="sel">品类 ...</button>
  <button class="sel">产品 ...</button>
  <div class="sep"></div>

  <!-- 组 4：搜索 -->
  <div class="search"> ... </div>

  <!-- 靠右：弱操作 -->
  <div class="row-end">
    <button class="b b-ghost">重置</button>
  </div>
</div>
```

### 3.4 元信息（紧凑横向模式）

当元信息是只读展示时，压缩成一行，不要用左右分栏占满宽度。

```html
<div class="row row-pad row-sep" style="gap:var(--space-4);">
  <div style="display:flex;align-items:center;gap:var(--space-2);">
    <span style="font-size:var(--text-xs);color:var(--text-muted);">提示词</span>
    <span style="font-size:var(--text-sm);color:var(--text-lo);max-width:480px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">在阳光明媚的草地上奔跑的金毛...</span>
  </div>
  <div class="sep"></div>
  <span class="badge badge-default">步数·30</span>
  <span class="badge badge-accent">图片</span>
</div>
```

---

## 4. 规则

### 4.1 必须遵守

| 规则 | 说明 |
|---|---|
| 颜色只用语义变量 | `var(--accent-solid)` 而非 `var(--primary-6)` 或 `#4A9EFF` |
| 深色背景上的白色用 `var(--white)` | 禁止裸写 `#fff`、`white` |
| 状态色用完整三件套 | 文字用 `--error`，背景用 `--error-bg`，边框用 `--error-border`；success/warning 同理 |
| 间距只用 space-0~9 | `--space-0`(2px) 仅限微调；禁止 3px、5px、6px、13px 等非规范值 |
| 圆角只用 r-sm~r-full | 圆形元素（播放按钮、单选圆点、头像）统一用 `var(--r-full)`，不用 `50%` |
| 字号只用 text-xxs~text-xl | `--text-xxs`(10px) 仅限角标、时长等极小文字；正文最小 `--text-xs`(11px) |
| 高度只用 h-xs~h-lg | 禁止 30px、34px、44px 等自定义值 |
| 每个区域 solid 按钮 ≤ 1 | 多个主操作并列时降级为 soft |
| Select 自带类别名 | 不需要外部 label，按钮文字就是类别名 |
| 选中态统一用主色系 | accent-bg 背景 + accent-border 边框 + accent-text 文字 |
| hover 态必须有 | 所有可交互元素都要有 hover 变化 |
| focus-visible 必须有 | `outline: 2px solid var(--accent-solid); outline-offset: 1px` |
| 兄弟元素用 flex + gap | 禁止用 margin-left/right/bottom 排列同级元素 |

### 4.2 禁止

- 硬编码颜色值（`#4A9EFF`、`blue`、`#fff`）—— 用语义变量或 `var(--white)`
- `border-radius: 50%` —— 用 `var(--r-full)`
- `font-size: 10px` 等裸写像素 —— 用 `var(--text-xxs)` 等变量
- `float` 布局
- `position: absolute` 做布局定位（tab 下划线 `::after`、浮层定位除外）
- `text-align: center` 做容器居中（用 flex）
- `<br>` 做间距
- 同一层级混用不同筛选控件形态

### 4.3 自检清单

```
- [ ] 所有颜色通过语义变量引用（白色用 var(--white)，状态色用三件套）
- [ ] 所有间距在 space-0~9 范围内（space-0 仅限微调）
- [ ] 所有圆角在 r-sm~r-full 范围内（圆形元素用 r-full，不用 50%）
- [ ] 所有字号在 text-xxs~text-xl 范围内（text-xxs 仅限角标）
- [ ] 所有交互组件高度在 h-xs~h-lg 范围内
- [ ] 每个区域 solid 按钮 ≤ 1
- [ ] 所有可交互元素有 hover 态
- [ ] 选中态统一使用主色系
- [ ] flex 容器设置了 align-items
- [ ] 兄弟元素用 gap 而非 margin
- [ ] 遮罩层用 var(--overlay)，阴影值中的 rgba 除外
```

**允许裸写 rgba 的场景：** `box-shadow` 值、`backdrop-filter` 背景、图片悬浮渐变层（`linear-gradient`）。这些不需要走语义变量。

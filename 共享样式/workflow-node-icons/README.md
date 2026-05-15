# 工作流节点图标库

这套图标用于工作流节点库里的“彩色圆角方块 + 白色符号”样式。建议不要把它当图片库使用，而是作为 SVG 图标注册表使用：节点类型决定色块颜色，图标文件只负责白色线性符号。

## 文件结构

```text
工作流节点图标库/
  README.md
  icons.svg              # SVG sprite，适合网页里统一引入
  icons/
    document.svg
    file-text.svg
    message-text.svg
    flow.svg
    image.svg
    layers.svg
    crop.svg
    database.svg
    video.svg
    film.svg
    play.svg
    chat.svg
    shield-check.svg
    checklist.svg
    user-check.svg
```

## 推荐视觉规则

节点图标建议统一为：

```css
.node-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.node-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2.15;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

不要给彩色块加边框。你给的参考图是纯色底，不是描边按钮。

## 推荐颜色

文本 / 文案类：

- 主色：`#2F80ED`
- 更接近 Ant Design 主蓝：`#1677FF`
- 适合节点：文案生成、标题生成、提示词扩写、内容改写、摘要、翻译

图片 / 素材 / 合成类：

- 主色：`#52C41A`
- 更柔一点：`#39B54A`
- 适合节点：图片生成、素材合成、背景替换、图层处理、裁剪、抠图

视频 / 数据 / 批处理类：

- 主色：`#FAAD14`
- 更稳一点：`#F59E0B`
- 适合节点：图生视频、视频生成、批量处理、素材库、数据读取、数据库输出

审核 / 人工 / 对话类：

- 主色：`#13C2C2`
- 更深一点：`#08979C`
- 适合节点：人工审核、人工选择、确认、对话、检查、风控

异常 / 校验 / 阻断类：

- 主色：`#F5222D`
- 警告色：`#FAAD14`
- 适合节点：校验失败、缺少输入、连接异常、发布阻断

开始 / 结束 / 流程控制类：

- 开始可用：`#52C41A`
- 结束可用：`#1677FF`
- 分支 / 路由可用：`#722ED1`

## 图标分组建议

文本类：

- `document`
- `file-text`
- `message-text`

图片类：

- `flow`
- `image`
- `layers`
- `crop`

视频 / 数据类：

- `database`
- `video`
- `film`
- `play`

审核 / 人工类：

- `chat`
- `shield-check`
- `checklist`
- `user-check`

## 接入建议

节点数据里建议只存两个字段：

```js
{
  category: "image",
  iconKey: "flow"
}
```

如果 `iconKey` 为空，可以根据节点模板 ID 做稳定随机：

```js
const iconPools = {
  text: ["document", "file-text", "message-text"],
  image: ["flow", "image", "layers", "crop"],
  video: ["database", "video", "film", "play"],
  review: ["chat", "shield-check", "checklist", "user-check"]
};
```

注意：随机应该稳定。不要每次刷新都变，建议根据 `node.templateId` 做 hash，或者创建节点时确定一次并保存。

## 使用 sprite 的例子

```html
<span class="node-icon" style="background:#52C41A">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <use href="./icons.svg#flow"></use>
  </svg>
</span>
```

## 使用单个 SVG 的例子

如果项目使用构建工具，可以直接把 `icons/flow.svg` 作为组件或 inline svg 引入。图标内部使用 `currentColor`，外层设置 `color:#fff` 即可。


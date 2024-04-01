/**
 * @description: 创建 style 行内样式表，并插入页面
 * @param {*} css css 样式
 * @param {*} id 标签id
 * @return {*}
 */
export default function createStyle(css, id) {
  // 创建一个 style 元素
  var styleElement = document.createElement("style");
  styleElement.id = id;
  // 将 CSS 规则添加到样式表中
  styleElement.innerHTML = css;
  // 将样式表添加到页面的 head 部分
  document.head.appendChild(styleElement);
}

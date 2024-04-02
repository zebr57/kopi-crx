/**
 * @description: 创建并显示提示消息窗口，显示一会自动销毁
 * @param {*} message 消息文本
 * @param {*} type  提示框类型（success | warning | danger）
 * @return {*}
 */
export default function createMessageBox(message = "success！", type = "success") {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  const typeClass = `kopi-message-box-${type}`;
  messageElement.classList.add("kopi-message-box");
  messageElement.classList.add(typeClass);

  // 将元素添加到页面中
  document.body.appendChild(messageElement);
  // 1秒后隐藏消息
  let hiddenTime = setTimeout(function () {
    messageElement.style.opacity = "0";
    clearTimeout(hiddenTime);
  }, 1000);

  // 1.5秒后移除消息元素
  let removeTime = setTimeout(function () {
    messageElement.remove();
    clearTimeout(removeTime);
  }, 1500);
}

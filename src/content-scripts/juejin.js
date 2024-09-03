import createMessageBox from "../utils/createMessageBox";
// console.log("%cjuejin ---- Kopi", "color: #67c23a;");

// 注册监听页面点击事件
function copyListener() {
  // 监听 csdn 点击登录复制按钮
  document.addEventListener("click", handleClickCopy, true);
}

// 处理点击登录复制按钮
function handleClickCopy(e) {
  const element = e.target;
  if (element && element.className === "code-block-extension-copyCodeBtn") {
    e.stopPropagation();
    const grandParentNode = element.parentNode.parentNode;
    const codeNode = grandParentNode.nextElementSibling;

    // 确保找到的元素是 <code> 标签
    if (codeNode && codeNode.tagName.toLowerCase() === "code") {
      const copyText = codeNode.textContent;
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          createMessageBox("复制成功!");
          console.log("%c文本已成功复制到剪贴板 ---- Kopi", "color: #67c23a;");
        })
        .catch((err) => {
          console.error("复制失败:", err);
        });
    } else {
      console.log("No found <code> element");
    }
  }
}

// 获取配置（开关）
chrome.storage.local.get("checked").then(({ checked }) => {
  if (checked) copyListener();
});

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // console.log(message.action); // 打印消息内容
  if (message.action == "toggle") {
    if (message.value) {
      // console.log("开启 Kopi 文本复制");
      copyListener();
    } else {
      // console.log("关闭 Kopi 文本复制");
      document.removeEventListener("click", handleClickCopy, true);
    }
  }
  sendResponse({ response: "Message received!" }); // 发送响应消息
});

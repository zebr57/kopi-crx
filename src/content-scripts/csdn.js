import createMessageBox from "../utils/createMessageBox";

function copyListener() {
  // 监听 csdn 点击登录复制按钮
  document.addEventListener(
    "click",
    function (e) {
      const element = e.target;
      if (element && element.className === "hljs-button signin active") {
        e.stopPropagation();
        const copyText = element.parentNode.textContent;
        navigator.clipboard
          .writeText(copyText)
          .then(() => {
            createMessageBox("复制成功!");
            console.log("文本已成功复制到剪贴板 ---- Kopi");
          })
          .catch((err) => {
            console.error("复制失败:", err);
          });
      }
    },
    true
  );
}

// 获取配置（开关）
const { checked } = await chrome.storage.local.get("checked");
if (checked) copyListener();

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // console.log(message.action); // 打印消息内容
  if (message.action == "toggle") {
    if (message.value) {
      // console.log("开启 Kopi 文本复制");
      copyListener();
    } else {
      // console.log("关闭 Kopi 文本复制");
      document.removeEventListener("copy");
    }
  }
  sendResponse({ response: "Message received!" }); // 发送响应消息
});
import "../utils/userSelect.css"; // 移除禁止选中
import "../utils/messageBox.css"; // 提示框
import createMessageBox from "../utils/createMessageBox";

const copyListener = function () {
  /** 监听copy事件 */
  document.addEventListener(
    "copy",
    function (e) {
      e.stopPropagation(); // 取消事件传递，到这里就不再执行后面的copy事件，例如：弹窗之类操作
      e.preventDefault(); // 取消默认事件，才能修改复制的值
      const copyText = window.getSelection(0).toString(); // 复制的内容

      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          createMessageBox("复制成功!");
          console.log("文本已成功复制到剪贴板 ---- Kopi");
        })
        .catch((err) => {
          console.error("复制失败:", err);
        });
    },
    true // 使用事件捕获机制，先执行外层的copy方法，再执行内层的copy方法
  );
};

// 获取配置（开关）
const { checked } = await chrome.storage.local.get("checked");
if (checked) copyListener();

// // 监听来自 background 的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // console.log(message.action); // 打印消息内容
  if (message.action == "toggle") {
    if (message.value) {
      createMessageBox("Kopi 已开启");
      copyListener();
    } else {
      createMessageBox("Kopi 已关闭", "warning");
      document.removeEventListener("copy", function () {});
    }
  }
  sendResponse({ response: "Message received!" }); // 发送响应消息
});

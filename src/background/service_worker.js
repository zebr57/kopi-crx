chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "help.html"
    });
  }
  await chrome.storage.local.set({ checked: false });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (namespace == "local" && key == "checked") {
      // 获取当前活动的标签页
      chrome.tabs.query({ currentWindow: true }, function (tabs) {
        tabs.forEach((tab) => {
          // 向所有标签页发送消息
          chrome.tabs.sendMessage(tab.id, { action: "toggle", value: newValue });
        });
      });
    }
  }
});

/**
 * @description: 监听自定义快捷键指令
 */
chrome.commands.onCommand.addListener(async (command, tab) => {
  console.log(`Command "${command}" called`);
  if (command == "toggle") {
    // 开关
    // - 修改 local checked的值
    const { checked } = await chrome.storage.local.get("checked");
    await chrome.storage.local.set({ checked: !checked });
  }
});

/* ===================================== test ===================================== */
setTimeout(() => {}, 5000);

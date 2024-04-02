chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "help.html"
    });
  }
  await chrome.storage.local.set({ checked: true });
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (namespace == "local" && key == "checked") {
      // 获取当前活动的标签页
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs && tabs.length === 0) return;
      // 向当前标签页发送消息
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle", value: newValue }).catch((err) => {
        console.log(err);
      });
    }
  }
});
chrome.tabs.onActivated.addListener(async (tab) => {
  // 同步修改开关状态
  const { checked } = await chrome.storage.local.get("checked");
  chrome.tabs.sendMessage(tab.tabId, { action: "toggle", value: checked }).catch((err) => {
    console.log(err);
  });
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

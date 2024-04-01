chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  console.log("welcome to installed Kopi！");
  if (reason === "install") {
    chrome.tabs.create({
      url: "help.html"
    });
  }
  await chrome.storage.local.set({ checked: false });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    // console.log(
    //   `Storage key "${key}" in namespace "${namespace}" changed.`,
    //   `Old value was "${oldValue}", new value is "${newValue}".`
    // );
    if (namespace == "local" && key == "checked") {
      console.log(newValue);
      // 获取当前活动的标签页
      chrome.tabs.query({ currentWindow: true }, function (tabs) {
        // 向每个标签页发送消息
        tabs.forEach(function (tab) {
          console.log(tabs.title);
          chrome.tabs.sendMessage(
            tab.id,
            { action: "toggle", value: newValue },
            function (response) {
              console.log(response);
            }
          );
        });
      });
    }
  }
});

/**
 * @description: 监听自定义快捷键指令
 */
chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`Command "${command}" called`);
  if (command == "toggle") {
    // 开关
    // 1. 通知脚本调用提示框
    // 2. 修改 local checked的值
  }
});

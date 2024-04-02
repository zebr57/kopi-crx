import "./style.css";
import Switch from "./src/components/Switch";

chrome.storage.local.get("checked").then((res) => {
  const defaultValue = res.checked;
  const switchBtn = new Switch("zebr-switch", defaultValue, saveToLocalStorage);
  document.querySelector("#app").innerHTML = `
  <div>
    <h1>Kopi</h1>
    ${switchBtn.createSwitchBtn()}
  </div>
`;

  switchBtn.toggle();
});

// 存储函数
function saveToLocalStorage(value) {
  chrome.storage.local.set({ checked: value }).then((res) => {
    // console.log("checked value", value);
  });
}

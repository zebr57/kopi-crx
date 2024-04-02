import "./index.css";

export default class SwitchBtn {
  constructor(id, defaultValue, cb) {
    this.id = id;
    this.checked = defaultValue;
    this.cb = cb;
  }
  createSwitchBtn() {
    return `
    <div class="form-item">
      <span class="text">是否开启：</span>
      <label id="${this.id}" class="switch">
        <input type="checkbox" id="toggleSwitch" ${this.checked ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    </div>
    `;
  }
  toggle() {
    const checkbox = document.querySelector(`#${this.id} #toggleSwitch`);
    const setChecked = (checked) => {
      this.checked = checked;
      this.cb(checked);
    };
    checkbox.addEventListener("change", (e) => {
      setChecked(e.target.checked);
    });
    setChecked(this.checked);
  }
  getChecked() {
    return this.checked;
  }
}

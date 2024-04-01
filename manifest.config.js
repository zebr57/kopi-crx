import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === "development" ? "Kopi 文本复制 [INTERNAL]" : "Kopi 文本复制",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: {
    default_popup: "index.html",
    default_title: "Kopi 文本复制"
  },
  background: {
    service_worker: "src/background/service_worker.js",
    type: "module"
  },
  permissions: ["storage", "commands", "tabs"],
  side_panel: {
    default_path: "index.html"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-scripts/index.js"], // crxjs 会自动打包放到对应目录下
      run_at: "document_end"
    },
    {
      matches: ["https://blog.csdn.net/*"],
      js: ["src/content-scripts/csdn.js"],
      run_at: "document_end"
    }
  ],
  commands: {
    // 自定义快捷键指令
    toggle: {
      suggested_key: {
        default: "Alt+Q"
      },
      description: "开关复制功能"
    },
    // 映射 action （icon的事件）
    _execute_action: {
      suggested_key: {
        default: "Alt+V"
      }
    }
  }
}));

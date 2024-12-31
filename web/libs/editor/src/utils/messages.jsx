import { htmlEscape } from "./html";

const URL_CORS_DOCS = "https://labelstud.io/guide/storage.html#Troubleshoot-CORS-and-access-problems";
const URL_TAGS_DOCS = "https://labelstud.io/tags";

export default {
  DONE: "Done!",
  NO_COMP_LEFT: "没有更多的标记",
  NO_NEXT_TASK: "队列中没有剩余任务",
  NO_ACCESS: "你没有这个任务的权限",

  CONFIRM_TO_DELETE_ALL_REGIONS: "请确认您要删除所有已标记的区域",

  // Tree validation messages
  ERR_REQUIRED: ({ modelName, field }) => {
    return `属性 <b>${field}</b> 是必需的 <b>${modelName}</b>`;
  },

  ERR_UNKNOWN_TAG: ({ modelName, field, value }) => {
    return `未注册的标签 <b>${value}</b>。引用于 <b>${modelName}#${field}</b>。`;
  },

  ERR_TAG_NOT_FOUND: ({ modelName, field, value }) => {
    return `标签 <b>${value}</b> 在配置中不存在。引用于 <b>${modelName}#${field}</b>。`;
  },

  ERR_TAG_UNSUPPORTED: ({ modelName, field, value, validType }) => {
    return `无效的属性 <b>${field}</b> for <b>${modelName}</b>: referenced tag is <b>${value}</b>, but <b>${modelName}</b> 只能控制 <b>${validType.join(", ")}</b>`;
  },

  ERR_PARENT_TAG_UNEXPECTED: ({ validType, value }) => {
    return `标签 <b>${value}</b> 必须是以下任意一个子标签之一：<b>${validType.join(", ")}</b>`;
  },

  ERR_BAD_TYPE: ({ modelName, field, validType }) => {
    return `标签 <b>${modelName}</b> 属性 <b>${field}</b> 的类型无效。有效类型是:<b>${validType.join(", ")}</b>`;
  },

  ERR_INTERNAL: ({ value }) => {
    return `内部错误。查看浏览器控制台以获得更多信息。重试或联系开发人员。<br/>${value}`;
  },

  ERR_GENERAL: ({ value }) => {
    return value;
  },

  // Object loading errors
  URL_CORS_DOCS,
  URL_TAGS_DOCS,

  ERR_LOADING_AUDIO({ attr, url, error }) {
    return (
      <div data-testid="error:audio">
        <p>
        加载音频时出错。检查 <code>{attr}</code> 任务区域
        </p>
        <p>技术描述：{error}</p>
        <p>URL：{htmlEscape(url)}</p>
      </div>
    );
  },

  ERR_LOADING_S3({ attr, url }) {
    return `
    <div>
      <p>
        加载 URL 时出错。请求参数无效。
        如果您正在使用 S3，请确保您已指定正确的桶区域名称。
      </p>
      <p>URL：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_CORS({ attr, url }) {
    return `
    <div>
      <p>
        加载 URL 时出错。静态服务器具有宽开 CORS。
        <a href="${this.URL_CORS_DOCS}" target="_blank">阅读更多。</a>
      </p>
      <p>
        也检查以下内容:
        <ul>
          <li>URL 有效</li>
          <li>网络可达</li>
        </ul>
      </p>
      <p>URL: <code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_HTTP({ attr, url, error }) {
    return `
    <div data-testid="error:http">
      <p>
        加载 URL 时出错。从 <code>${attr}</code> 值加载 URL
      </p>
      <p>
        检查以下内容:
        <ul>
          <li>URL 有效</li>
          <li>URL scheme 匹配服务 scheme，即 https 和 https</li>
          <li>
            静态服务器具有宽开 CORS，<a href="${this.URL_CORS_DOCS}" target="_blank">阅读更多。</a>
          </li>
        </ul>
      </p>
      <p>
        技术描述：<code>${error}</code>
        <br />
        URL: <code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code>
      </p>
    </div>`;
  },
};

(() => {
  const setup = document.getElementById("setup");
  const frame = document.getElementById("chat");
  const rawUrl = window.WEKNORA_EMBED_URL;

  const showSetup = (message) => {
    const summary = setup.querySelector(".summary");
    if (message) summary.textContent = message;
    setup.hidden = false;
    frame.hidden = true;
  };

  if (typeof rawUrl !== "string" || !rawUrl.trim()) {
    showSetup();
    return;
  }

  let embedUrl;
  try {
    embedUrl = new URL(rawUrl.trim());
  } catch {
    showSetup("嵌入页面地址无效，请检查 public/config.js 中的配置。");
    return;
  }

  if (embedUrl.protocol !== "https:" || !/^\/embed\/[^/]+\/?$/.test(embedUrl.pathname)) {
    showSetup("请填写 HTTPS 格式的 WeKnora 嵌入页面地址（/embed/渠道ID）。");
    return;
  }

  document.title = "知识库问答";
  frame.src = embedUrl.href;
  frame.hidden = false;
  setup.hidden = true;
})();
/* global browser */
const statusEl = document.getElementById("status");

function logStatus(msg) {
  console.log(msg);
  statusEl.textContent = msg;
}

function sendMessageToActiveTab(message) {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      if (!tabs.length) {
        logStatus("No active tab found.");
        return;
      }
      const tab = tabs[0];
      console.log("Active tab URL:", tab.url);
      if (!tab.url.startsWith("https://chatgpt.com/")) {
        logStatus("Active tab is not a chat.openai.com page.");
        return;
      }
      logStatus(`Sending message to tab ${tab.id}: ${message.type}`);
      return browser.tabs.sendMessage(tab.id, message);
    })
    .then((response) => {
      if (response && response.success) {
        logStatus(`Success: ${response.message}`);
      } else if (response && response.error) {
        logStatus(`Error: ${response.error}`);
      }
    })
    .catch((err) => {
      console.error("Error sending message:", err);
      logStatus("Error sending message. See console.");
    });
}

document.getElementById("save-md").addEventListener("click", () => {
  logStatus("Markdown button clicked.");
  sendMessageToActiveTab({ type: "download_markdown" });
});

document.getElementById("save-html").addEventListener("click", () => {
  logStatus("HTML button clicked.");
  sendMessageToActiveTab({ type: "download_html" });
});

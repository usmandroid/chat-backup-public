console.log("Content script loaded");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);

    try {
        if (message.type === "download_markdown") {
            exportMarkdown();
            sendResponse({ success: true, message: "Markdown export started." });
        } else if (message.type === "download_html") {
            exportHTML();
            sendResponse({ success: true, message: "HTML export started." });
        } else {
            sendResponse({ error: "Unknown message type." });
        }
    } catch (e) {
        console.error("Error in content script:", e);
        sendResponse({ error: e.message });
    }

    // Return true to indicate async sendResponse (not really needed here but good practice)
    return true;
});

function exportMarkdown() {
    console.log("exportMarkdown called");
    const messages = document.querySelectorAll('[data-message-author-role]');
    if (!messages.length) {
        alert("No messages found to export.");
        return;
    }

    function htmlToMarkdown(element) {
        let md = "";
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) md += node.textContent;
            else if (node.nodeName === "PRE") {
                const codeElement = node.querySelector("code");
                let lang = "";
                let code = "";
                if (codeElement) {
                    const classes = Array.from(codeElement.classList);
                    const langClass = classes.find(c => c.startsWith("language-"));
                    if (langClass) lang = langClass.replace("language-", "");
                    code = codeElement.textContent.trimEnd();
                } else {
                    code = node.textContent.trimEnd();
                }
                md += `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
            } else if (node.nodeName === "CODE") {
                md += "`" + node.innerText + "`";
            } else if (node.nodeName === "BR") md += "\n";
            else if (node.nodeType === Node.ELEMENT_NODE) {
                md += htmlToMarkdown(node);
                if (node.nodeName === "P") md += "\n\n";
            }
        });
        return md;
    }

    const lines = Array.from(messages).map(msg => {
        const role = msg.getAttribute("data-message-author-role");
        return `### ${role.toUpperCase()}\n\n${htmlToMarkdown(msg).trim()}\n`;
    });

    const markdown = lines.join("\n---\n\n");
    downloadFile("chat_backup.md", markdown, "text/markdown");
    console.log("Markdown download triggered");
}

function exportHTML() {
    console.log("exportHTML called");

    let chatContainer = document.querySelector("main") || document.querySelector('[role="main"]');
    if (!chatContainer) {
        alert("Chat container not found.");
        return;
    }

    const messages = chatContainer.querySelectorAll('[data-message-author-role]');
    if (!messages.length) {
        alert("No messages found to export.");
        return;
    }

    function messageToHTML(el) {
        const role = el.getAttribute("data-message-author-role");
        const clone = el.cloneNode(true);
        clone.querySelectorAll("button, .copy-button, .edit-button").forEach(btn => btn.remove());
        return `<div class="message ${role}"><strong>${role.toUpperCase()}:</strong><br>${clone.innerHTML}</div>`;
    }

    const allMessages = Array.from(messages).map(messageToHTML).join("\n");

    const htmlDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ChatGPT Backup</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .user { background: #daf1ff; padding: 10px; margin-bottom: 10px; border-radius: 6px; }
    .assistant { background: #e0ffe0; padding: 10px; margin-bottom: 10px; border-radius: 6px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>ChatGPT Conversation Backup</h1>
  ${allMessages}
</body>
</html>`;

    downloadFile("chat_backup.html", htmlDoc, "text/html");
    console.log("HTML download triggered");
}

function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }, 0);
}

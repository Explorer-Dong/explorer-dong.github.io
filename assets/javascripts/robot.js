document.addEventListener("DOMContentLoaded", function () {
    window.difyChatbotConfig = {
        token: "H3jDmXMsTCvIylta"
    };

    const script = document.createElement("script");
    script.src = "https://cdn.dwj601.cn/cdn-js/dify/embed.min.js";
    script.id = "H3jDmXMsTCvIylta";
    script.defer = true;
    document.body.appendChild(script);

    const style = document.createElement("style");
    style.innerHTML = `
        #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        }
        #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        }
    `;
    document.head.appendChild(style);
});
  
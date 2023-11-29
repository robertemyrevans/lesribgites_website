window.onload = function () {
    const CHATGPT_API_KEY = "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";
    const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";

    var sendBtnElem = document.getElementById("sendBtn");
    var chatMessageElem = document.getElementById("chatMessage");
    var chatOutputElem = document.getElementById("chatOutput");
    var loadingContainerElem = document.getElementById("loadingContainer");

    sendBtnElem.addEventListener("click", function () {
        var message = chatMessageElem.value;
        if (message != null && message != "") {
            generateUserChatBubble(message);
            loadingContainerElem.classList.remove("d-none");
            sendChatGPTMessage("In the style of The Sunflower of Serenity, embodying ancient wisdom, the wonder of nature and love: " + message, generateAIChatBubble);
            chatMessageElem.value = "";
        } else {
            alert("Please enter a message.");
        }
    });

    function generateUserChatBubble(message) {
        // Create a new chat bubble wrapper.
        var chatBubbleElem = document.createElement("div");
        chatBubbleElem.classList.add("container");
        chatBubbleElem.classList.add("user-container");

        // Create the message container.
        var chatMessageElem = document.createElement("p");
        chatMessageElem.innerHTML = message;
        chatBubbleElem.appendChild(chatMessageElem);

        chatOutputElem.prepend(chatBubbleElem);
    }

    function generateAIChatBubble(message) {
        // Create a new chat bubble wrapper.
        var chatBubbleElem = document.createElement("div");
        chatBubbleElem.classList.add("container");
        chatBubbleElem.classList.add("darker");

        // Create the message container.
        var chatMessageElem = document.createElement("p");
        chatMessageElem.innerHTML = message;
        chatBubbleElem.appendChild(chatMessageElem);

        chatOutputElem.prepend(chatBubbleElem);
        loadingContainerElem.classList.add("d-none");
    }

    function sendChatGPTMessage(message, onSuccessCallback) {
        var messageBody = {
            "model": "gpt-3.5-turbo",
            "messages": [{
                "role": "user",
                "content": message.trim()
            }]
        };

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            // Parse the response body into JSON object.
            var responseBodyObj = JSON.parse(this.responseText);
            // I'm cheating a little as I know which property I need. I recommend making this more robust.
            // If you want to see the response object itself then log it to the console and learn!
            onSuccessCallback(responseBodyObj.choices[0].message.content);
        }
        xhttp.open("POST", CHATGPT_API_URL, true);
        // Some simple headers are required for this to work properly with their API.
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Authorization", "Bearer " + CHATGPT_API_KEY);
        xhttp.send(JSON.stringify(messageBody));
    }
};

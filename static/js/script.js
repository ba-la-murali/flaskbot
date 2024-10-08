document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Scroll to the latest message
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to append message to the chat
    function addMessage(content, className) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', className);

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.textContent = content;

        messageContainer.appendChild(messageBubble);
        chatBox.appendChild(messageContainer);
        scrollToBottom();
    }

    // Handle the message sending event
    sendBtn.addEventListener('click', function () {
        const message = userInput.value;
        if (message.trim() === "") return;

        // Append user message to chat
        addMessage(message, 'user-message');

        // Send message to Flask server for chatbot response
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Append chatbot response to chat
            addMessage(data.response, 'assistant-message');
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Clear the input field
        userInput.value = "";
    });

    // Allow pressing Enter to send a message
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});

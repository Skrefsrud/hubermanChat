function callHuberman(messagesArray) {
  fetch("http://localhost:80")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed with status: " + response.status);
      }
    })
    .then((data) => {
      // Process the returned data
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getMessagesContent() {
  var messages = document.getElementsByClassName("content");
  var messagesArray = [];

  for (var i = 0; i < messages.length; i++) {
    messagesArray.push(messages[i].textContent.trim());
  }

  return messagesArray;
}

// Example usage
var messagesContent = getMessagesContent();
console.log(messagesContent);

function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var message = messageInput.value.trim();

  if (message !== "") {
    var messageContainer = document.createElement("div");
    messageContainer.className = "message user2"; // Change to 'user2' for the other user

    var senderSpan = document.createElement("span");
    senderSpan.className = "sender";
    senderSpan.innerText = "You"; // Change to 'User 2' for the other user

    var contentDiv = document.createElement("div");
    contentDiv.className = "content";
    contentDiv.innerText = message;

    messageContainer.appendChild(senderSpan);
    messageContainer.appendChild(contentDiv);

    document.querySelector(".messages").appendChild(messageContainer);

    messageInput.value = "";
  }
  messagesArray = getMessagesContent();
  hubermanReply = callHuberman(message);
  writeReply(hubermanReply);
}

function writeReply(hubermanReply) {
  var messageContainer = document.createElement("div");
  messageContainer.className = "message user1"; // Change to 'user2' for the other user

  var senderSpan = document.createElement("span");
  senderSpan.className = "sender";
  senderSpan.innerText = "Huberman"; // Change to 'User 2' for the other user

  var contentDiv = document.createElement("div");
  contentDiv.className = "content";
  contentDiv.innerText = hubermanReply;

  messageContainer.appendChild(senderSpan);
  messageContainer.appendChild(contentDiv);

  document.querySelector(".messages").appendChild(messageContainer);
}

let input = document.getElementById("message-input");

// Add event listener to the input
input.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  if (event.keyCode === 13) {
    // 13 is the key code for Enter
    event.preventDefault(); // Prevent form submission
    sendMessage(); // Trigger the send message function
  }
}

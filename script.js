function submitConcern() {
  var name = document.getElementById("name").value;
  var concern = document.getElementById("concern").value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submitConcern", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        handleReply(response.reply);
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };

  var data = JSON.stringify({ name: name, concern: concern });
  xhr.send(data);
}

function handleReply(reply) {
  var replyContainer = document.getElementById("reply-container");
  var replyElement = document.createElement("p");
  replyElement.innerText = reply;
  replyContainer.appendChild(replyElement);
}

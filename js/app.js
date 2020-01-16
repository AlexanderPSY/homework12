const welcome = document.getElementById('welcome')
const userNameForm = document.getElementById('user-name')
const submitName = document.getElementById('submit-name')
const messageWindow = document.getElementById('messages')
const submitMessage = document.getElementById('submit-button')
const currentUserPost = document.getElementById('message')

let userName = null

const url = 'http://localhost:3000/posts/'
submitName.onclick = () => {
    userName = userNameForm.value
    welcome.style.display = 'none'
    startChat()
}

submitMessage.onclick = () => {
    if (!currentUserPost.value) return 0
    const timestamp = new Date()
    const message = {
        text: currentUserPost.value,
        author: userName,
        timestamp: `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
    }
    postMessage(message)
    displayMessages(message)
}

function startChat() {
    getAllMessages()
    setInterval(getAllMessages, 1000)
}

function displayMessages(dataArray) {
    if (!Array.isArray(dataArray)) messageWindow.innerHTML += `<p> <span style="color: grey">`
        + `${dataArray.timestamp}</span> <b>${dataArray.author}:</b> ${dataArray.text}</p>`
    else messageWindow.innerHTML = dataArray.reduce((posts, post) => posts + `<p> <span style="color: grey">`
        + `${post.timestamp}</span> <b>${post.author}:</b> ${post.text}</p>`, '')
    messageWindow.scrollTop = messageWindow.scrollHeight
}

function getAllMessages() {
    fetch(url).then(response => response.json()).then(displayMessages).catch(error => messageWindow.innerHTML = error)
}

function postMessage(message) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then(() => console.log("New post uploaded")).catch(error => console.error(error))
}

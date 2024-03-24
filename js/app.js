document.addEventListener('DOMContentLoaded', function () {
	
	console.log("Page loaded");
	
    const placeholder = document.getElementById('placeholder');
    const messageList = document.getElementById('messageList');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const connectionStatus = document.getElementById('connectionStatus');
    const connectionStatusLabel = document.getElementById('connectionStatusLabel');
    
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const ipAddress = urlParams.get('ip') || '172.20.10.8'; // Default IP
    const port = urlParams.get('port') || '8080'; // Default port

    const websocket = new WebSocket(`ws://${ipAddress}:${port}`); // WebSocket connection
    
    websocket.onopen = function() {
        console.log('WebSocket connection established.');
        connectionStatus.style.backgroundColor = 'green'; // Change status to green when connected
        connectionStatusLabel.textContent = 'Connected';
        connectionStatusLabel.style.color = 'green';
    };
    
    websocket.onmessage = function(event) {
        const message = event.data;
        const messageItem = document.createElement('div');
        messageItem.textContent = message;
        messageList.appendChild(messageItem);
    };
    
    websocket.onerror = function(event) {
        console.error('WebSocket error observed:', event);
        connectionStatus.style.backgroundColor = 'red'; // Change status to red on error
        connectionStatusLabel.textContent = 'Connection failed';
        connectionStatusLabel.style.color = 'red';
    };
    
    websocket.onclose = function(event) {
        console.log('WebSocket connection closed:', event);
        connectionStatus.style.backgroundColor = '#ccc'; // Change status to gray on close
        connectionStatusLabel.textContent = 'Disconnected';
        connectionStatusLabel.style.color = '#ccc';
    };
    
    showMoreBtn.addEventListener('click', function() {
        messageList.classList.toggle('show-all');
        if (messageList.classList.contains('show-all')) {
            showMoreBtn.textContent = 'Show Less';
        } else {
            showMoreBtn.textContent = 'Show More';
        }
    });
});

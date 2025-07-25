import React from 'react';

function MessageArea({ message, type }) {
    if (!message) return null;

    return (
        <div id="message-area" className={`message show ${type}`}>
            {message}
        </div>
    );
}

export default MessageArea;
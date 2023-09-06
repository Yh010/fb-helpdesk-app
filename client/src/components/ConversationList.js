import React from 'react';

function ConversationList({ onSelectConversation }) {
  // Replace with actual conversation data
  const conversations = [
    { id: 1, title: 'Conversation 1' },
    { id: 2, title: 'Conversation 2' },
    // Add more conversations
  ];

  return (
    <div className="conversation-list">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <button onClick={() => onSelectConversation(conversation)}>
              {conversation.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;

import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ConversationThread from './ConversationThread';
import CustomerProfile from './CustomerProfile';

function AgentScreen() {
  // State variables for managing conversations and selected conversation
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Fetch conversation data (replace this with actual data fetching)
  const fetchConversations = () => {
  // Replace 'your-api-endpoint' with the actual URL to fetch conversation data
  fetch('your-api-endpoint')
    .then((response) => response.json())
    .then((data) => {
      // Update the conversations state with the fetched data
      setConversations(data);
    })
    .catch((error) => {
      console.error('Error fetching conversation data:', error);
    });
};
 const handleFetchConversations = () => {
    fetchConversations();
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    // Update the selectedConversation state with the selected conversation
    setSelectedConversation(conversation);
  };

  return (
    <div className="agent-screen">
      <div className="conversation-list">
        {/* Pass state and functions to ConversationList */}
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="conversation-thread">
        {/* Pass selectedConversation to ConversationThread */}
        <ConversationThread conversation={selectedConversation} />
      </div>
      <div className="customer-profile">
        {/* Pass selectedConversation to CustomerProfile */}
        <CustomerProfile conversation={selectedConversation} />
      </div>
      <button onClick={handleFetchConversations}>Fetch Conversations</button>
    </div>
  );
}

export default AgentScreen;

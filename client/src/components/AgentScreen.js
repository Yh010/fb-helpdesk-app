import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ConversationThread from './ConversationThread';
import CustomerProfile from './CustomerProfile';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AgentScreen() {
  // State variables for managing conversations and selected conversation
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Simulate fetching conversation data (replace with actual data fetching)
  useEffect(() => {
    // Simulated data
    const data = [
      { id: 1, title: 'Conversation 1', customerName: 'Customer 1', customerEmail: 'customer1@example.com' },
      { id: 2, title: 'Conversation 2', customerName: 'Customer 2', customerEmail: 'customer2@example.com' },
      // Add more conversation data here
    ];

    // Set conversations state with simulated data
    setConversations(data);
  }, []);

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Conversation List (Left Column) */}
        <div className="col-md-3">
          <h2>Conversations</h2>
          <ConversationList
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        {/* Conversation Thread (Center Column) */}
        <div className="col-md-6">
          <ConversationThread conversation={selectedConversation} />
        </div>

        {/* Customer Profile (Right Column) */}
        <div className="col-md-3">
          <CustomerProfile conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
}

export default AgentScreen;

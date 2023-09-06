import React from 'react';

function ConversationThread({ selectedConversation }) {
  return (
    <div className="conversation-thread">
      {selectedConversation ? (
        <>
          <h2>Conversation Thread</h2>
          {/* Render messages and conversation details here */}
        </>
      ) : (
        <p>Select a conversation to view the thread.</p>
      )}
    </div>
  );
}


export default ConversationThread;

import React from 'react';

function CustomerProfile({ conversation }) {
  if (!conversation) {
    return <div className="customer-profile">Select a conversation to view the customer's profile.</div>;
  }

  // Replace with actual customer profile data
  const customer = {
    name: 'Customer Name',
    email: 'customer@email.com',
    // Add more customer details
  };

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      {/* Add more customer details */}
    </div>
  );
}

export default CustomerProfile;

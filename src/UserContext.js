import React from 'react';

// Creates a context
const UserContext = React.createContext();

// "Provider" allows other components to consume/use the context object
export const UserProvider = UserContext.Provider;


export default UserContext;
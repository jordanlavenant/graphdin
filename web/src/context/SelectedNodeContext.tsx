import { useState, createContext } from 'react';

export const SelectedNodeContext = createContext(null);

export const SelectedNodeProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SelectedNodeContext.Provider>
  );
};
import { useState, createContext } from 'react';

export const GraphRedrawContext = createContext(null);

export const GraphRedrawProvider = ({ children }) => {
  const [redraw, setRedraw] = useState(false);

  return (
    <GraphRedrawContext.Provider value={{ redraw, setRedraw }}>
      {children}
    </GraphRedrawContext.Provider>
  );
};
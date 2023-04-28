import { createContext, useState } from "react";

export const OpenContext = createContext({
  showForm: '',
  setShowForm: (type) => null,
  showFilter: false,
  setShowFilter: () => Boolean,
  showAddItem: false,
  setShowAddItem: () => Boolean,
});

export const OpenContextProvider = ({ children }) => {
  const [showForm, setShowForm] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const value = {
    showForm,
    setShowForm,
    showAddItem,
    setShowAddItem,
  };
  return <OpenContext.Provider value={value}>{children}</OpenContext.Provider>;
};

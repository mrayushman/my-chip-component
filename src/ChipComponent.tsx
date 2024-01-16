// src/ChipComponent.tsx
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './ChipComponent.css';

interface Chip {
  id: number;
  name: string;
  email: string;
  photo: string;
}

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Chip[] = [
    { id: 1, name: 'Ayushman Singh', email: 'ayush@example.com', photo: 'https://placekitten.com/24/24' },
    { id: 2, name: 'Ravi Kumar', email: 'ravi@example.com', photo: 'https://placekitten.com/24/24' },
    { id: 3, name: 'Sanjay Dubey', email: 'sanjay@example.com', photo: 'https://placekitten.com/24/24' },
    { id: 4, name: 'Bharkar Rai', email: 'bhaskar@example.com', photo: 'https://placekitten.com/24/24' },
    // Add more items as needed
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const filterItems = (value: string) => {
    const filtered = items.filter(
      item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (chip: Chip) => {
    const newChips = [...chips, { id: chip.id, name: chip.name, email: chip.email, photo: chip.photo }];
    setChips(newChips);
    
    // Filter out the selected chip from the suggestions
    setFilteredItems(filteredItems.filter(filteredItem => filteredItem.id !== chip.id));
    
    setInputValue('');
  };

  const handleChipRemove = (id: number) => {
    const updatedChips = chips.filter(chip => chip.id !== id);
    const removedChip = chips.find(chip => chip.id === id);
    if (removedChip) {
      setFilteredItems([...filteredItems, removedChip]);
    }
    setChips(updatedChips);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="chip-component">
      <div className="input-chips-container">
        <div className="chips-container">
          {chips.map(chip => (
            <div key={chip.id} className="chip">
              <div className="chip-info">
                <div className="chip-name">{chip.name}</div>
                {/* Hide email in selected chips */}
              </div>
              <button onClick={() => handleChipRemove(chip.id)} className="chip-remove-btn">
                x
              </button>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type here..."
            className="input-field"
          />
        </div>
      </div>
      <div className="suggestions-container">
        <ul className="item-list">
          {filteredItems.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item)} className="item">
              <div className="chip-info">
                <img src={item.photo} alt="user" className="chip-photo" />
                <div className="chip-details">
                  <div className="chip-name">{item.name}</div>
                  <div className="chip-email">{item.email}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChipComponent;

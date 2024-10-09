import React, { useState, useEffect, useRef } from 'react';
/**
 * SearchComponent for inputting search queries with a delay.
 *
 * @param {function} onSearch - Callback function to handle the search query when Enter is pressed.
 * @param {number} [delay=500] - Optional delay in milliseconds before triggering the search.
 */
const SearchComponent = ({ onSearch, delay = 500 }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    /**
     * Handle key down events for the input field.
     * @param {KeyboardEvent} e - The keyboard event triggered on key down.
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(query);
        }
    };
    /**
     * Handle changes to the input field.
     * @param {Event} e - The change event triggered by the input.
     */
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    useEffect(() => {
        /**
         * Handle keyboard shortcuts.
         * @param {KeyboardEvent} e - The keyboard event triggered on key down.
         */
        const handleShortcut = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                inputRef.current.focus();
            }
        };

        document.addEventListener('keydown', handleShortcut);
        return () => document.removeEventListener('keydown', handleShortcut);
    }, []);

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                className="sv-form-input"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default SearchComponent;

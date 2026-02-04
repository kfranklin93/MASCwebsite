// ================================================================
// FORM AUTO-SAVE UTILITY
// Automatically save form data to localStorage
// ================================================================

/**
 * Save form data to localStorage
 * @param {string} key - Unique key for the form
 * @param {object} data - Form data to save
 */
export const saveFormData = (key, data) => {
    try {
        localStorage.setItem(`masc_form_${key}`, JSON.stringify({
            data,
            savedAt: new Date().toISOString()
        }));
        return true;
    } catch (error) {
        console.error('Error saving form data:', error);
        return false;
    }
};

/**
 * Load form data from localStorage
 * @param {string} key - Unique key for the form
 * @returns {object|null} - Saved form data or null
 */
export const loadFormData = (key) => {
    try {
        const saved = localStorage.getItem(`masc_form_${key}`);
        if (saved) {
            const { data, savedAt } = JSON.parse(saved);
            return { data, savedAt };
        }
        return null;
    } catch (error) {
        console.error('Error loading form data:', error);
        return null;
    }
};

/**
 * Clear form data from localStorage
 * @param {string} key - Unique key for the form
 */
export const clearFormData = (key) => {
    try {
        localStorage.removeItem(`masc_form_${key}`);
        return true;
    } catch (error) {
        console.error('Error clearing form data:', error);
        return false;
    }
};

/**
 * Hook for auto-saving form data
 * @param {string} key - Unique key for the form
 * @param {object} data - Current form data
 * @param {number} delay - Delay in milliseconds (default: 30000 = 30 seconds)
 */
export const useAutoSave = (key, data, delay = 30000) => {
    const [lastSaved, setLastSaved] = React.useState(null);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setSaving(true);
            const success = saveFormData(key, data);
            if (success) {
                setLastSaved(new Date());
            }
            setSaving(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [key, data, delay]);

    return { lastSaved, saving };
};

// Import React for the hook
import React from 'react';

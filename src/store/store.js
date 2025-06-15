import { configureStore } from '@reduxjs/toolkit';
import accessibilityReducer from './accessibilitySlice';

export default configureStore({
    reducer: {
        accessibility: accessibilityReducer,
    },
});

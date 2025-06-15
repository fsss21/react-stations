import { createSlice } from '@reduxjs/toolkit';

const COLOR_SCHEMES = {
    default: ['#ffffff', '#000000'],
    scheme1: ['#ffffff', '#000000'], // Белый фон, черный текст
    scheme2: ['#000000', '#ffffff'], // Черный фон, белый текст
    scheme3: ['#9DD1FF', '#195183'], // Голубой фон, синий текст
    scheme4: ['#F7F3D6', '#4D4B43'], // Бежевый фон, темный текст
    scheme5: ['#3B2716', '#A9E43C'], // Темно-коричневый фон, салатовый текст
};

const initialState = {
    isEnabled: false,
    colorScheme: 'default',
    schemes: COLOR_SCHEMES,
};

export const accessibilitySlice = createSlice({
    name: 'accessibility',
    initialState,
    reducers: {
        toggleAccessibility: state => {
            state.isEnabled = !state.isEnabled;
            // Сбрасываем схему при выключении
            if (!state.isEnabled) state.colorScheme = 'default';
        },
        setColorScheme: (state, action) => {
            const scheme = action.payload;
            state.colorScheme = scheme;
            // Автоматически включаем доступность при выборе нестандартной схемы
            state.isEnabled = scheme !== 'default';
        },
    },
});

export const { toggleAccessibility, setColorScheme } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
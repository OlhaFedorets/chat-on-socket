import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import App from './App';
import { chatReducer } from './chat-reducer';

// Создаём корневой редьюсер
const rootReducer = combineReducers({
    chat: chatReducer,
});

// Тип состояния Redux
export type AppStateType = ReturnType<typeof rootReducer>;

// Создаём store с thunk middleware
// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

// Находим корневой элемент
const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

// Создаём корень React и рендерим приложение
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
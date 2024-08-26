










// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import userdataReducer from './userdataSlice';
// import userTransactionReducer from './userTransactionSlice';
// import userInvestmentReducer from './userInvestmentSlice';
// import userWalletReducer from './userWalletSlice'; // Import the userWalletReducer

// // Configuration object for redux-persist
// const persistConfig = {
//   key: 'root', // Key for localStorage
//   storage,
//   whitelist: ['userdata', 'userTransactions', 'userInvestments', 'userWallets'], // Add userWallets to the whitelist
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   userdata: userdataReducer,
//   userTransactions: userTransactionReducer,
//   userInvestments: userInvestmentReducer,
//   userWallets: userWalletReducer, // Add userWalletReducer to the rootReducer
// });

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store with persisted reducer
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // Create a persistor
// const persistor = persistStore(store);

// export { store, persistor };


// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userdataReducer from './userdataSlice';
import userTransactionReducer from './userTransactionSlice';
import userInvestmentReducer from './userInvestmentSlice';
import userWalletReducer from './userWalletSlice';
import userUtilsReducer from './userUtilsSlice'; // Import the userUtilsReducer

// Configuration object for redux-persist
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
  whitelist: [
    'userdata', 
    'userTransactions', 
    'userInvestments', 
    'userWallets', 
    'userUtils' // Add userUtils to the whitelist
  ],
};

// Combine reducers
const rootReducer = combineReducers({
  userdata: userdataReducer,
  userTransactions: userTransactionReducer,
  userInvestments: userInvestmentReducer,
  userWallets: userWalletReducer,
  userUtils: userUtilsReducer, // Add userUtilsReducer to the rootReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

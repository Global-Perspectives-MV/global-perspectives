import React, { createContext } from 'react';

export const ErrorContext = React.createContext();

export const ErrorProvider = ErrorContext.Provider;
export const ErrorConsumer = ErrorContext.Consumer;

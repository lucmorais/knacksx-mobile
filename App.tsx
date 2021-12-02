import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { FormProvider } from './src/contexts/form';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <FormProvider>
          <Routes/>
        </FormProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

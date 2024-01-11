import { Routes } from 'Routes';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './app/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import * as TYPES from 'app/types'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()
import './style.css'
import { Spinner } from 'views/atoms/Spinner';
declare global {
  interface Window {
    Tawk_API?: any;
  }
}
declare const rewardful: any;
declare const Rewardful: any;
export default () => {
  const [persist] = useState(store());
  const tawkMessengerRef = useRef();
  const onLoad = () => {
    window.Tawk_API?.hideWidget();
  };
  useEffect(() => {
    console.log(Rewardful?.referral)
  }, [])

  useEffect(() => {
    if (Rewardful?.referral) {
      persist.store.dispatch({ type: TYPES.USER_SET_REWARDFUL_ID, payload: Rewardful.referral });
      console.log('Current referral ID: ', Rewardful.referral);
    } else {
      console.log('No referral present.');
    }
  }, [Rewardful])

  return (
    <Provider store={persist.store}>
      <PersistGate loading={<Spinner />} persistor={persist.persistor}>
        <SnackbarProvider maxSnack={3}>
          <TawkMessengerReact
            propertyId="58cecc295b89e2149e1b042f"
            widgetId="default"
            onLoad={onLoad}
            useRef={tawkMessengerRef} />
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes />
            </Router>
          </QueryClientProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
};

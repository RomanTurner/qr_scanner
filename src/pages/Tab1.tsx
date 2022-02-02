import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

import React, { useEffect, useState } from 'react';

import './Tab1.css';

const Tab1: React.FC = () => {
  const [err, setErr] = useState<string>();
  const [scanActive, setScanActive] = useState(false);

  const startScan = async () => {
    setScanActive(true);
    document.body.style.opacity = '0.2';
    document.body.style.background = 'transparent';
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    // if the result has content
    if (result.hasContent) {
      console.log(result.content, 'here'); // log the raw scanned content
      stopScan();
    }
  };

  const stopScan = () => {
    document.body.style.background = '';
    document.body.style.opacity = '1';
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setScanActive(false);
  };

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({
          force: true,
        });
        if (status.granted) {
          return true;
        }
      } catch (error: any) {
        setErr(error.message);
      }
      return false;
    };
    checkPermission();
  });

  if (err) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">
              Sorry, We can&apos;t show this on the web.
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRow>
            <IonText color="danger">{err}</IonText>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className={scanActive ? 'hide-bg' : 'show-bg'}>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">R🚦G</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={stopScan} hidden={!scanActive}>
              Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={startScan} hidden={scanActive}>
          Start Scan
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

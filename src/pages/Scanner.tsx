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
  IonIcon,
} from '@ionic/react';
import { scanOutline, stopCircleOutline } from 'ionicons/icons';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Scanner.css';

const Tab1: React.FC = () => {
  const [err, setErr] = useState<string>();
  const [hideBg, setHideBg] = useState(false);
  const history = useHistory();

  const startScan = async () => {
    BarcodeScanner.hideBackground();
    setHideBg(true);
    document.body.style.background = 'transparent';

    const result = await BarcodeScanner.startScan();
    stopScan();
    if (result.hasContent) {
      const id = result?.content?.split(',')[0];
      history.push(`/profile/${id}`);
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    document.body.style.removeProperty('background');
    setHideBg(false);
    BarcodeScanner.stopScan();
  };

  useEffect(() => {
    const checkPermission = async () => {
      setErr(undefined);
      try {
        const status = await BarcodeScanner.checkPermission({
          force: true,
        });

        if (status.granted) {
          return true;
        }

        return false;
      } catch (error: any) {
        setErr(error.message);
      }
    };

    checkPermission();

    return () => {
      stopScan();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QRScanner</IonTitle>
          {hideBg && (
            <IonButtons slot="end">
              <IonButton onClick={stopScan} color="danger">
                <IonIcon icon={stopCircleOutline} slot="start" />
                Stop Scan
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg ? 'hideBg' : 'ion-padding'}>
        {err && (
          <IonRow>
            {' '}
            <IonText color="danger">{err}</IonText>
          </IonRow>
        )}

        {!!!err && hideBg && <div className="scan-box"></div>}
        {!!!err && !!!hideBg && (
          <IonButton className="center-button" onClick={startScan}>
            <IonIcon icon={scanOutline} slot="start" />
            Start Scan
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

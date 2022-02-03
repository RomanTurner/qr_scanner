import React from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from '@ionic/react';

import { arrowDownCircle } from 'ionicons/icons';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  attendee: object | any;
}
const Modal: React.FC<Props> = ({
  setShowModal,
  showModal,
  attendee,
}) => {
  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start"></IonButtons>
              <IonTitle>{`${attendee['first-name']} ${attendee['last-name']}`}</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonList slot="content">
            <IonItem>
              <IonLabel>Company: {attendee.company}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                Status: {attendee['registration-status']}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                Type: {attendee['registration-type'][0] || ''}
              </IonLabel>
            </IonItem>
          </IonList>
          <IonAccordionGroup>
            <IonAccordion
              value="attendee-address"
              toggleIcon={arrowDownCircle}
            >
              <IonItem slot="header">
                <IonLabel>Contact</IonLabel>
              </IonItem>

              <IonList slot="content">
                <IonItem>
                  <IonLabel>Phone: {attendee['cell-phone']}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Email: {attendee.email}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    Registration ID: {attendee['registration-id']}
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonAccordion>
          </IonAccordionGroup>
          <IonButton onClick={() => setShowModal(false)}>
            Close Modal
          </IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Modal;

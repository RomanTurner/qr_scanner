import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  useIonAlert,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

import './Profile.css';
import { arrowDownCircle } from 'ionicons/icons';
import { useParams } from 'react-router';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  attendee: object | any;
}

const defaultAttendee = {
  'first-name': '',
  'last-name': '',
  'registration-type': '',
  'registration-status': '',
  'registration-id': '',
  'cell-phone': '',
  email: '',
  company: '',
};

type IDParams = {
  id: string;
};

const Profile: React.FC<Props> = () => {
  const [attendee, setAttendee] = useState(defaultAttendee);
  const [present] = useIonAlert();
  const { id } = useParams<IDParams>();
  console.log(id);

  useEffect(() => {
    const getProfie = async () => {
      const headers = new Headers();
      headers.append(
        'Authorization',
        'Bearer 60d0b533af11575b46ebcf5b4ddae360',
      );
      headers.append('Content-Type', 'application/json');

      const res = await fetch(
        `https://www.reggeek.com/api/v3/registrations/${id}`,
        { headers },
      );

      if (res.status === 200) {
        const obj = await res.json();
        if (obj.data.length === 0) {
          present({
            message: 'No attendee found',
          });
        } else {
          const { attributes } = obj.data[0];
          setAttendee(attributes['attendee-info']);
        }
      } else {
        present({
          message: 'Server Error',
        });
      }
    };
    getProfie();
    return () => {
      setAttendee(defaultAttendee);
    };
  }, [id]);

  return (
    <IonPage>
      {attendee && (
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start"></IonButtons>
              <IonTitle>{`${attendee['first-name']} ${attendee['last-name']}`}</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonList>
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
        </IonContent>
      )}
    </IonPage>
  );
};

export default Profile;

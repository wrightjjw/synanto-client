import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner,
  IonGrid, IonRow, IonCol, IonCard, IonCardTitle, IonCardContent, IonItem,
  IonButtons, IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons'
import React, {useState, useEffect} from 'react';
import './Home.css';
import Axios from 'axios'
import config from '../synanto.config'

const Home: React.FC = () => {
  const [events, setEvents] = useState(null as any[] | null);
  const [loading, setLoading] = useState(false);
  const getEvents = () => {
    setLoading(true);
    Axios.get("http://" + config.host + ":" + config.port + "/db/event/home")
    .then((response) => {
      setEvents(response.data);
    }).finally(() => {
      setLoading(false);
    });
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Synanto</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/new">
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {(loading) && (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        )}
        {(events) && (
          <IonGrid>
            {events.map((event) => (
              <IonRow key={event.eid}>
                <IonCol>
                  <IonCard routerLink={`/event/${event.eid}`}>
                    <IonItem>
                      <IonCardTitle class="homeButtonTitle">{event.ename}</IonCardTitle>
                      <IonCardContent class="homeButtonHost">Host: {event.pname}</IonCardContent>
                    </IonItem>
                    <IonItem>
                      <IonCardContent class="homeButtonDesc">{event.edesc}</IonCardContent>
                    </IonItem>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;

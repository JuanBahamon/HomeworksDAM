import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonToast, IonFab, IonFabButton, IonModal, IonInput, IonTextarea
} from '@ionic/react';
import { trash, pencil, add } from 'ionicons/icons';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const showMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts?_limit=5`);
        console.log('GET:', res.data);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        showMessage('Error al cargar los posts');
      }
    };
    fetchPosts();
  }, []);

  const openCreate = () => {
    setSelectedPost(null);
    setTitle('');
    setBody('');
    setShowModal(true);
  };

  const openEdit = (post: Post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setBody(post.body);
    setShowModal(true);
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/posts`, {
        title,
        body,
        userId: 1,
      });
      console.log('POST:', res.data);
      setPosts([{ ...res.data, id: Date.now() }, ...posts]);
      setShowModal(false);
      showMessage('Post creado correctamente');
    } catch (error) {
      console.error(error);
      showMessage('Error al crear el post');
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    try {
      const res = await axios.put(`${BASE_URL}/posts/${selectedPost.id}`, {
        id: selectedPost.id,
        title,
        body,
        userId: 1,
      });
      console.log('PUT:', res.data);
      setPosts(posts.map(p => p.id === selectedPost.id ? { ...res.data, id: selectedPost.id } : p));
      setShowModal(false);
      showMessage('Post actualizado correctamente');
    } catch (error) {
      console.error(error);
      showMessage('Error al actualizar el post');
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      await axios.delete(`${BASE_URL}/posts/${selectedPost.id}`);
      console.log('DELETE: eliminado');
      setPosts(posts.filter(p => p.id !== selectedPost.id));
      showMessage('Post eliminado correctamente');
    } catch (error) {
      console.error(error);
      showMessage('Error al eliminar el post');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {posts.map(post => (
            <IonItem key={post.id}>
              <IonLabel>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => openEdit(post)}>
                <IonIcon icon={pencil} />
              </IonButton>
              <IonButton fill="clear" color="danger" onClick={() => {
                setSelectedPost(post);
                setShowDeleteAlert(true);
              }}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={openCreate}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedPost ? 'Editar Post' : 'Nuevo Post'}</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)}>
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Título</IonLabel>
              <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contenido</IonLabel>
              <IonTextarea value={body} onIonChange={e => setBody(e.detail.value!)} rows={4} />
            </IonItem>
            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={selectedPost ? handleUpdate : handleCreate}
            >
              {selectedPost ? 'Actualizar' : 'Crear'}
            </IonButton>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={showDeleteAlert}
          header="¿Eliminar post?"
          message="Esta acción no se puede deshacer."
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setShowDeleteAlert(false) },
            { text: 'Eliminar', role: 'destructive', handler: handleDelete }
          ]}
          onDidDismiss={() => setShowDeleteAlert(false)}
        />

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Posts;
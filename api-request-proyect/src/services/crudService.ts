import axios from 'axios';

export const api = async () => {
  try {
    const getRes = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
    console.log('GET:', getRes.data);

    const postRes = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'Nuevo',
      body: 'Contenido',
      userId: 1,
    });
    console.log('POST:', postRes.data);

    const putRes = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'Actualizado',
      body: 'Nuevo contenido',
      userId: 1,
    });
    console.log('PUT:', putRes.data);

    await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
    console.log('DELETE: eliminado');

  } catch (error) {
    console.error(error);
  }
};
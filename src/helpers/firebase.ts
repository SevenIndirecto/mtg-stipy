import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { generateUID, getRandomIntInclusive } from '@/helpers/utils';
import { NUM_STIPULATIONS } from '@/constants';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyD6l8q71boPW-qLQISVeUCZwB3LVP-nb6I',
  authDomain: 'mtg-stipy.firebaseapp.com',
  projectId: 'mtg-stipy',
  storageBucket: 'mtg-stipy.appspot.com',
  messagingSenderId: '896329467608',
  appId: '1:896329467608:web:4b77833b029d386343b9ad',
  databaseURL: 'https://mtg-stipy-default-rtdb.europe-west1.firebasedatabase.app',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.database();
const auth = firebase.auth();

// collection references
// const usersCollection = db.collection('users');
// const postsCollection = db.collection('posts');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

interface User {
  uid: string;
  photo?: string;
  name?: string;
  email?: string;
}

interface Room {
  id: string;
  users: { [uid: string]: string };
}

function storeUser(user: User) {
  db.ref(`users/${user.uid}`).set(user);
}

async function getRoom(roomId: string) {
  const room = await db.ref(`rooms/${roomId}`).once('value');
  return room.val();
}

function getRandomStipulation() {
  return getRandomIntInclusive(1, NUM_STIPULATIONS);
}

// function roll(roomId: string) {
//
// }

async function joinRoom(user: User, roomId: string) {
  const existingRoom = await getRoom(roomId);

  if (existingRoom) {
    // If user already in room, do not roll
    // const usersInRoom = Object.keys(existingRoom);
    const stipulationsUsed = new Set(Object.values(existingRoom));

    console.log('Room already exists', existingRoom);

    if (!(user.uid in existingRoom)) {
      if (stipulationsUsed.size >= NUM_STIPULATIONS) {
        console.log('Ran out of stipulations');
        return null;
      }

      let stipulation = null;
      do {
        stipulation = getRandomStipulation();
      } while (stipulationsUsed.has(stipulation));

      console.log('hello', user);
      db.ref(`rooms/${roomId}/${user.uid}`).set(stipulation);
      return stipulation;
    } else  {
      return existingRoom[user.uid];
    }
  }
  return null;
}

async function createRoom(user: User) {
  const roomId = generateUID(5);
  const stipulation = getRandomStipulation();
  db.ref(`rooms/${roomId}/${user.uid}`).set(stipulation);
  return { roomId, stipulation };
}

// export utils/refs
export {
  db,
  auth,
  storeUser,
  joinRoom,
  createRoom,
  User,
  // usersCollection,
  // postsCollection,
  // commentsCollection,
  // likesCollection
};

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { generateUID, getRandomIntInclusive } from '@/helpers/utils';
import { NUM_STIPULATIONS } from '@/constants';
import { Participant } from '@/store';

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

interface User {
  uid: string;
  photo?: string;
  name?: string;
  email?: string;
}

type Room = { [uid: string]: Participant };

function storeUser(user: User) {
  db.ref(`users/${user.uid}`).set(user);
}

function getRoomRef(roomId: string) {
  return db.ref(`rooms/${roomId}`);
}

async function getRoom(roomId: string) {
  const room = await db.ref(`rooms/${roomId}`).once('value');
  return room.val() as Room;
}

function getRandomStipulation() {
  return getRandomIntInclusive(1, NUM_STIPULATIONS);
}

function addPlayerToRoom(user: User, stipulation: number, roomId: string) {
  db.ref(`rooms/${roomId}/${user.uid}`).set({
    stipulation,
    playerPhoto: user.photo,
    playerName: user.name,
    playerId: user.uid,
  });
}

async function joinRoom(user: User, roomId: string) {
  const existingRoom = await getRoom(roomId);

  if (existingRoom) {
    // If user already in room, do not roll
    // const usersInRoom = Object.keys(existingRoom);
    const stipulationsUsed = new Set(Object.values(existingRoom).map(
      ({ stipulation }) => stipulation,
    ));

    if (!(user.uid in existingRoom)) {
      if (stipulationsUsed.size >= NUM_STIPULATIONS) {
        console.log('Ran out of stipulations');
        return null;
      }

      let stipulation = null;
      do {
        stipulation = getRandomStipulation();
      } while (stipulationsUsed.has(stipulation));

      addPlayerToRoom(user, stipulation, roomId);
      return stipulation;
    } else {
      return existingRoom[user.uid].stipulation;
    }
  }
  return null;
}

async function createRoom(user: User) {
  const roomId = generateUID(5);
  const stipulation = getRandomStipulation();
  addPlayerToRoom(user, stipulation, roomId);
  return { roomId, stipulation };
}

export {
  db,
  auth,
  storeUser,
  joinRoom,
  createRoom,
  getRoomRef,
  User,
};

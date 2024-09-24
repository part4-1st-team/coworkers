import { getFirestore } from 'firebase/firestore';
import app from './firebaseDB';

const fireStore = getFirestore(app);

export default fireStore;

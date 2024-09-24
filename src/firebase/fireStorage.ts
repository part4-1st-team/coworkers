import { getStorage } from 'firebase/storage';
import app from './firebaseDB';

const fireStorage = getStorage(app);
export default fireStorage;

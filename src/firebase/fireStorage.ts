import app from './firebaseDB';
import { getStorage } from 'firebase/storage';

const fireStorage = getStorage(app);
export default fireStorage;

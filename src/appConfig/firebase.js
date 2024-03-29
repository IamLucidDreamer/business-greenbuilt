import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmBhSlaocF59t2ol8Nv6ynIPpAt_iTGf4",
  authDomain: "greenbuilt-test.firebaseapp.com",
  projectId: "greenbuilt-test",
  storageBucket: "greenbuilt-test.appspot.com",
  messagingSenderId: "461874661137",
  appId: "1:461874661137:web:f7b396c1c2518e617c2eb0",
  measurementId: "G-NJVRSF8YHT"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app

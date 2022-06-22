import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

const config = {
    apiKey: "AIzaSyCsG4NcOZc8LcaBGYb3I2lUlGfv7fB7MzU",
    authDomain: "chat-app-c8964.firebaseapp.com",
    projectId: "chat-app-c8964",
    storageBucket: "chat-app-c8964.appspot.com",
    messagingSenderId: "663403965115",
    appId: "1:663403965115:web:300d8de8d830a44312d79e",
    measurementId: "G-YBKB2G5XTY",
    databaseURL: "https://chat-app-c8964-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(config);

export const auth = getAuth(app)

export const database = getDatabase(app)

export const storage = getStorage(app)
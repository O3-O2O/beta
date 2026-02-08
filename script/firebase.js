const firebaseConfig = {
  apiKey: "AIzaSyDJmT4xJGZv1wQ4rXvVUeeC2WnaeEdpEcw",
  authDomain: "project-a3273.firebaseapp.com",
  projectId: "project-a3273",
  storageBucket: "project-a3273.firebasestorage.app",
  messagingSenderId: "492898448866",
  appId: "1:492898448866:web:b41d68515f33e209c135bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

console.log(firebase.app().name);  // "[DEFAULT]"
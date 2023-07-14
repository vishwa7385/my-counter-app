import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
   apiKey: "AIzaSyA0keP0hg2_7R8oWdC70h-gBZA311AtPLw",
   authDomain: "coinpedia-pro.firebaseapp.com",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;

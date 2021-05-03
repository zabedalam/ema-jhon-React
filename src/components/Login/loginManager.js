import firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  console.log("Clicked signin");
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(result => {
      console.log(result);
      const { displayName, email } = result.user;

      const singedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true
      };
      //   setUser(singedInUser);
      return singedInUser;
      console.log(displayName, email);
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  console.log("fb clicked");
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then(result => {
      // /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // The signed-in user info.
      const user = result.user;
      user.success = true;
      return user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;
      console.log("FB USER", user);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorMessage);
      // ...
    });
};

export const handleGhSignIn = () => {
  var ghProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(ghProvider)
    .then(result => {
      // /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      user.success = true;
      // setUser(user);
      return user;
      console.log("github user", user);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("github error", errorCode, errorMessage, email, credential);
      // ...
    });
};

export const handleSignOut = () => {
  console.log("User Signed Out");
  return firebase
    .auth()
    .signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: ""
      };
      // setUser(signedOutUser);
      return signedOutUser;
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      // Signed in
      //   const newUserInfo = { ...user };
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      //   setUser(newUserInfo);
      // const user = userCredential.user;
      // console.log(user)
      // ...
      //   updateUserName(user.name);
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      //   const newUserInfo = { ...user };
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      //   setUser(newUserInfo);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ..
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      // Signed in
      //   const newUserInfo = { ...user };
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      //   setUser(newUserInfo);
      //   setLoggedInUser(newUserInfo);
      return newUserInfo;
      //   history.replace(from);
      console.log("sign in user info", res.user);
      // var user = userCredential.user;
      // ...
    })
    .catch(error => {
      //   const newUserInfo = { ...user };
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      //   setUser(newUserInfo);
      return newUserInfo;
    });
};

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
    .then(res => {
      // Update successful.
      console.log("User Name updated successfully");
    })
    .catch(err => {
      // An error happened.
      console.log("User Name Error", err.message);
    });
};

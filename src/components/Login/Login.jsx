import React, { useState, useContext } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGhSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword
} from "./loginManager";
// firebase.initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
      handleResponse(res,true);
    });
  };

  const signOut = () => {
    handleSignOut().then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const fbSignIn = () => {
    handleFbSignIn().then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
      handleResponse(res,true)
    });
  };

  const ghSignIn = () => {
    handleGhSignIn().then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
      handleResponse(res,true)
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      // console.log("submitting")
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        res => {
          // setUser(res);
          // setLoggedInUser(res);
          // history.replace(from);
          handleResponse(res,true)
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res,true)
      });
    }
  };

  const handleBlur = e => {
    // console.log(e.target.name, e.target.value);
    // debugger
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      // console.log(isPasswordValid && passwordHasNumber);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={ghSignIn}>Sign in using GitHub</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome : {user.name}</p>
          <p>Email:{user.email}</p>
        </div>
      )}
      <h1>Own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email:{user.email}</p>
      <p>Password:{user.password}</p> */}
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "SignUp" : "SignIn"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;

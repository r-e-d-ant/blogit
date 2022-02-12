<template>
  <div class="form-wrap">
      <form class="register">
          <p class="login-register">
              Already have an account?
              <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
          </p>
          <h2>Create Your BlogIt Account</h2>
          <div class="inputs">
              <div class="input">
                  <input type="text" placeholder="First Name" v-model="firstName" />
                  <i class='bx bx-user icon'></i>
              </div>
              <div class="input">
                  <input type="text" placeholder="Last Name" v-model="lastName" />
                  <i class='bx bx-user icon'></i>
              </div>
              <div class="input">
                  <input type="text" placeholder="Username" v-model="username" />
                  <i class='bx bx-user icon'></i>
              </div>
              <div class="input">
                  <input type="text" placeholder="Email" v-model="email" />
                  <i class='bx bx-envelope icon'></i>
              </div>
              <div class="input">
                  <input type="password" placeholder="Password" v-model="password" />
                  <i class='bx bxs-lock-alt icon' ></i>
              </div>
              <div v-show="error" class="error">{{ this.errorMsg }}</div>
          </div>
          <button @click.prevent="register">Sign Up</button>
          <div class="angle"></div>
      </form>
      <div class="background"></div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"

import db from "../firebase/firebaseInit";

export default {
    name: "Register",
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        async register() {
            if (
                this.email !== "" &&
                this.password !== "" &&
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.username !== ""
            ) {
                this.error = false;
                this.errorMsg = "";
                const auth = await getAuth()
                createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed In
                    const user = userCredential.user;

                    setDoc(doc(db, "users", user.uid), {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        email: this.email,
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.Message;
                    console.log(errorCode)
                    console.log(errorMessage)
                })
                this.$router.push({ name: "Home" })
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill out all the fields!";
            return;
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>

<template>
  <div class="form-wrap">
      <form class="login">
          <p class="login-register">
              Don't have an account?
              <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
          </p>
          <h2>Login to BlogIt</h2>
          <div class="inputs">
              <div class="input">
                  <input type="text" placeholder="Email" v-model="email" ref="email" onfocus="this.select()" />
                  <i class='bx bx-envelope icon'></i>
              </div>
              <div class="input">
                  <input type="password" placeholder="Password" v-model="password" />
                  <i class='bx bxs-lock-alt icon' ></i>
              </div>
              <div v-show="error" class="error">{{ this.errorMsg }}</div>
          </div>
          <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
              Forgot your password?
          </router-link>
          <button @click.prevent="signIn">Sign In</button>
          <div class="angle"></div>
      </form>
      <div class="background"></div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            error: null,
            errorMsg: ""
        }
    },
    mounted() {
      // get recent login email in local storage if available
      if (localStorage.getItem("blogItRecentSignInEmail")) {
        this.$refs.email.addEventListener("focus", () => {
          this.$refs.email.value = localStorage.getItem("blogItRecentSignInEmail")
        })
      }
    },
    methods: {
      signIn() {
        // save recent login email in local storage
        localStorage.setItem("blogItRecentSignInEmail", this.email)
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Signed in
          this.$router.push({ name: "Home" })
          this.error = false;
          this.errorMsg = "";
        })
        .catch((error) => {
          this.error = true;
          this.errorMsg = error.message;
        })
      }
    }
}
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: #000;
    }
  }
  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }
    .inputs {
      width: 100%;
      max-width: 350px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }
        .icon {
          position: absolute;
          left: 6px;
        }
      }
    }
    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }
    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>

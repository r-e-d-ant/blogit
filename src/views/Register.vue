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
          </div>
          <button>Sign Up</button>
          <div class="angle"></div>
      </form>
      <div class="background"></div>
  </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            firstName: null,
            lastName: null,
            userName: null,
            email: null,
            password: null,
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

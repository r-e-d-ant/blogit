
<template>
   <header>
       <nav class="container">
           <div class="branding">
               <router-link class="header fruktur-f" :to="{ name: 'Home' }">BlogIt</router-link>
           </div>
           <div class="nav-links">
               <ul v-show="!mobile">
                   <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                   <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                   <router-link v-if="admin" class="link" to="#">Create Post</router-link>
                   <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
               </ul>
               <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                 <span>{{ this.$store.state.profileInitials }}</span>
                 <div v-show="profileMenu" class="profile-menu">
                   <div class="info">
                     <p class="initials">{{ this.$store.state.profileInitials }}</p>
                     <div class="right">
                       <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                       <p>{{ this.$store.state.profileUsername }}</p>
                       <p>{{ this.$store.state.profileEmail }}</p>
                     </div>
                   </div>
                   <div class="options">
                     <div>
                       <router-link class="option" :to="{ name: 'Profile' }">
                         <i class='bx bx-user'></i>
                         <p>Profile</p>
                       </router-link>
                       <router-link v-if="admin" class="option" :to="{ name: 'Admin' }">
                         <i class='bx bx-crown'></i>
                         <p>Admin</p>
                       </router-link>
                       <div @click="signOut" class="option">
                         <i class='bx bx-log-out'></i>
                         <p>Sign Out</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           </div>
       </nav>
       <i @click="toggleMobileNav" class="bx bx-menu menu-icon" v-show="mobile"></i>
       <transition class="mobile-nav">
           <ul v-show="mobileNav">
               <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
               <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
               <router-link v-if="admin" class="link" to="#">reate Post</router-link>
               <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
            </ul>
       </transition>
   </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
export default {
    name: 'navigation',
    components: {},
    data() {
        return {
          profileMenu: null,
          mobile: null,
          mobileNav: null,
          windowWidth: null
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen)
        this.checkScreen();
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;

            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleProfileMenu(e) {
          if (e.target === this.$refs.profile) {
            this.profileMenu = !this.profileMenu;
          }
        },
        signOut() {
          const auth = getAuth();
          signOut(auth)
          .then(() => {
            // Sign-out succesfully
            window.location.reload()
          })
          .catch((error) => {
            // An error happened
            const errorMsg = error.message;
            console.log(errorMsg)
          })
        }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      admin() {
        return this.$store.state.profileAdmin;
      }
    }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #303030;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      ul {
        margin-right: 32px;
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        span {
          pointer-events: none;
        }
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;
            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              transition: 350ms background;
              &:hover {
                background-color: #444444;
              }
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
    .mobile-user-menu {
      margin-right: 40px;
    }
  }
  .menu-icon {
      cursor: pointer;
      font-size: 2rem;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
  }
  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 350ms ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>

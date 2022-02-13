import { createStore } from 'vuex'

import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import db from "../firebase/firebaseInit"

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Sept 30, 2021" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "April 5, 2021" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Jan 7, 2022" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Feb 02, 2022" },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\$)?/g).join("") + state.profileLastName.match(/(\b\$)?/g).join("");
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const auth = getAuth();
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data())
        commit("setProfileInfo", docSnap);
        commit("setProfileInitials");
      } else {
        console.log("No such document")
      }
    }
  },
  modules: {
  }
})

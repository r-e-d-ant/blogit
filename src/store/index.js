import { createStore } from 'vuex'

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Sept 30, 2021" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "April 5, 2021" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Jan 7, 2022" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Feb 02, 2022" },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

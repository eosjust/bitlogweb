import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(vuex);

export default new vuex.Store({
  plugins: [createPersistedState({
    paths: [
      'lang',
      'langImgUrl',
      'showhowplay',
    ]
  })],
  state: {
    eosUserName: null,
    ismobile:false,
    showhowplay:true,
    inviterName:'',
    lang:'zhCHS',
    langImgUrl: 'https://www.countryflags.io/CN/flat/48.png',
  },
  mutations: {
    setEosUserName(state, userName) {
      state.eosUserName = userName;
    },
    changeIsMobile(state,ismobile){
      state.ismobile=ismobile;
    },
    changeLang(state, lang) {
      state.lang = lang;
      if (lang == 'en') {
        state.langImgUrl = 'https://www.countryflags.io/US/flat/48.png';
      } else if (lang == 'zhCHS') {
        state.langImgUrl = 'https://www.countryflags.io/CN/flat/48.png';
      }
    },
    changeShowPlay(state,showplay){
      state.showhowplay=showplay;
    },
    changeInviterName(state,inviter){
      state.inviterName=inviter;
    },
  }
})

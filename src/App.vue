<template>
  <el-row>
    <el-row style="">

      <el-row>
        <mu-appbar style="width: 100%;" color="black">
          <mu-menu slot="left" :open.sync="leftDrawOpen" v-show="$store.state.ismobile">
            <mu-button flat>
              <mu-icon value="menu"></mu-icon>
            </mu-button>
          </mu-menu>
          <mu-menu slot="left" v-show="!($store.state.ismobile)">
            <mu-button flat ripple to="/chat">
              chat
            </mu-button>
          </mu-menu>
          <mu-menu slot="left" v-show="!($store.state.ismobile)">
            <mu-button flat ripple to="/help">
              帮助
            </mu-button>
          </mu-menu>
          <mu-menu slot="right" :open.sync="isMenuLangOpen" v-show="true">
            <mu-button flat ripple color="primary">
              <img :src="this.$store.state.langImgUrl">
            </mu-button>
            <mu-list slot="content">
              <mu-list-item button @click="changeLang('zhCHS')">
                <mu-list-item-action>
                  <img src="https://www.countryflags.io/CN/flat/48.png">
                </mu-list-item-action>
                <mu-list-item-action>
                  <mu-list-item-title>中文</mu-list-item-title>
                </mu-list-item-action>
              </mu-list-item>
              <mu-list-item button @click="changeLang('en')">
                <mu-list-item-action>
                  <img src="https://www.countryflags.io/US/flat/48.png">
                </mu-list-item-action>
                <mu-list-item-action>
                  <mu-list-item-title>English</mu-list-item-title>
                </mu-list-item-action>
              </mu-list-item>
            </mu-list>
          </mu-menu>

          <mu-menu slot="right" :open.sync="isMenuUserOpen" v-show="isMenuUserShow">
            <mu-button style="text-transform:none;" flat ripple color="primary">
              {{ loginUser }}
            </mu-button>
            <mu-list slot="content">
              <mu-list-item button v-show="isBtnLogoutShow" @click="btnLogout">
                <mu-list-item-title>{{$t('mainmenu.logout')}}</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
          <mu-menu slot="right" :open.sync="isMenuLoginOpen" v-show="isMenuLoginShow">
            <mu-button style="text-transform:none;" @click="btnLogin" flat ripple color="primary">
              {{$t('mainmenu.login')}}
            </mu-button>
          </mu-menu>
        </mu-appbar>

      </el-row>
      <el-row>
        <router-view/>
      </el-row>
      <el-row>
        <mu-drawer :open.sync="leftDrawOpen">
          <mu-list>
            <mu-list-item button to="/chat">
              <mu-list-item-title >Chat</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button to="/help">
              <mu-list-item-title >帮助</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-drawer>
      </el-row>
      <el-row style="background-color: #313131; padding-top: 10px;padding-bottom: 10px;">
        <el-row type="flex" justify="center">
          <el-col :span="3">
            <div style="text-align: center;">
              <el-popover
                placement="bottom"
                width="250px"
                trigger="click">
                <img style="width: 250px;height: 250px;" src="@/assets/mywchat.png"/>
                <icon slot="reference"  name="wechat" scale="3"></icon>
              </el-popover>
              <!--<img :src="imgEosTree5"/>-->
            </div>
          </el-col>
          <el-col :span="3">
          <div @click="openGit" style="text-align: center;">
          <icon  name="github" scale="3"></icon>
          </div>
          </el-col>
          <el-col :span="3">
            <div @click="openTele" style="text-align: center;">
              <icon  name="telegram" scale="3"></icon>
            </div>
          </el-col>
          <el-col :span="3">
            <div @click="openMail" style="text-align: center;">
              <icon name="mail" scale="3"></icon>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <div style="background:linear-gradient(to left,#424242,#b6b6b6,#424242);height:1px;margin: 5px;"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <div style="color: #9e9e9e">Copyright 2019. eosjust</div>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
  import eossdkutil from 'eos-sdk-util';
  import timeout from 'timeout';
  import copy from 'clipboard-copy';
  import io from 'socket.io-client';

  export default {
    name: 'App',
    data() {
      return {
        clientWidth: 1080,
        clientHeight: 1920,
        ismobile: false,
        isclientmobile: false,
        isMenuLangOpen: false,
        leftDrawOpen: false,
        isMenuNavOpen: false,
        isMenuLoginShow: true,
        isBtnLogoutShow: false,
        isMenuUserShow: false,
        isMenuUserOpen: false,
        isMenuLoginOpen: false,
        menuIndex: 0,
        loginUser: "",
        scatterTestNetwork: {
          blockchain: 'eos',
          host: 'api-kylin.eosasia.one',
          hostTable: 'api-kylin.eosasia.one',
          port: 80,
          protocol: 'http',
          chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
        },
        scatterMainNetwork: {
          blockchain: 'eos',
          host: 'proxy.eosnode.tools',
          hostTable: 'api.eosnewyork.io',
          port: 443,
          protocol: 'https',
          chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        },
        scatterMainBackup: [
          "proxy.eosnode.tools",
          "api.bitmars.one",
          'api.eosbeijing.one',
          // 'node1.zbeos.com',
          'api.eoslaomao.com',
          'node.betdice.one',
          'api1.eosasia.one',
          'node.betdice.one',
          'nodes.eos42.io',
        ]
      }
    },
    created() {
      this.checkClient();
      this.changeLang(this.$store.state.lang);
    },
    destroyed() {

    },
    mounted() {
      const that = this;
      this.initEosEnv();
      timeout.timeout(2500, function () {
        that.btnLogin();
      });
      that.clientWidth = document.documentElement.clientWidth;
      that.clientHeight = document.documentElement.clientHeight;
      window.onresize = () => {
        return (() => {
          that.clientWidth = document.documentElement.clientWidth;
          that.clientHeight = document.documentElement.clientHeight;
        })()
      };

      if (that.$route.query.ref) {
        var inviterName=that.$route.query.ref;
        if(inviterName.length>0){
          that.$store.commit('changeInviterName', inviterName);
          console.log("inviter:"+inviterName);
        }
      } else {

      }
    },
    methods: {
      initEosEnv() {
        var that = this;
        if (eossdkutil) {
          window.eossdkutil = eossdkutil;
          eossdkutil.setScatterNetworkCustom(that.scatterMainNetwork);
          // eossdkutil.setScatterNetworkMain();
          eossdkutil.init().then(function () {
            var env = eossdkutil.getEnv();
            if (env == "tp") {
            } else if (env == "scatter") {
              that.initScatterName();
            } else {
            }
          });
        }
      },
      checkClient() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          this.isclientmobile = true;
        } else {
          this.isclientmobile = false;
        }
        this.$store.commit('changeIsMobile', this.ismobile || this.isclientmobile);
      },
      btnLogin() {
        var that = this;
        eossdkutil.login().then(function (identity) {
          that.initScatterName();
        });
      },
      btnLogout() {
        var that = this;
        eossdkutil.logout();
        this.loginUser = "";
        this.isMenuUserOpen = false;
        this.isBtnLogoutShow = false;
        this.isMenuLoginShow = true;
        this.isMenuUserShow = false;
        this.$store.commit('setEosUserName', that.loginUser);
      },
      changeLang(lang) {
        this.$i18n.locale = lang;
        this.$store.commit('changeLang', lang);
        this.isMenuLangOpen = false;
      },
      onClientSizeChange(width, height) {
        if (width > height) {
          this.ismobile = false;
        } else {
          this.ismobile = true;
        }
        this.$store.commit('changeIsMobile', this.ismobile || this.isclientmobile);
      },
      initScatterName() {
        var identity = eossdkutil.getScatterIdentity();
        var that = this;
        if (identity) {
          var account = identity.accounts.find(account => account.blockchain === 'eos');
          that.loginUser = account.name;
          that.isBtnLogoutShow = true;
          that.isMenuLoginShow = false;
          that.isMenuUserShow = true;
          that.$store.commit('setEosUserName', that.loginUser);
        } else {
        }
      },
      openGit(){
        window.open("https://github.com/eosjust/bitlog");
      },
      openTele(){
        window.open("https://t.me/bitlog");
      },
      openMail(){
        window.open("mailto:eosjust@outlook.com");
      },
    },
    watch: {
      clientWidth: function (val) {
        this.onClientSizeChange(val, this.clientHeight);
      },
      clientHeight: function (val) {
        this.onClientSizeChange(this.clientWidth, val);
      },
      $route(to, from) {

      }
    }
  }
</script>

<style>

  p {
    font-size: 0.8em;
    line-height: 1.0em;
  }
</style>

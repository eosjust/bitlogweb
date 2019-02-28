<template>
  <el-row style="margin-top: 10px;">
    <el-row type="flex" v-show="isMine(data)" justify="end" style="margin-left: 150px;">
      <div>
        <el-row>
          <div align="right" style="padding: 5px;">
            {{data.user}}
          </div>
        </el-row>
        <el-row>
          <div class="chat-item-mine" @click="onItemClick(data)">
            {{data.msg}}
          </div>
        </el-row>
      </div>
      <div>
        <img :src="getImgByStr(data.user)"/>
      </div>
    </el-row>
    <el-row type="flex" v-show="!isMine(data)" justify="start" style="margin-right: 150px;">
      <div>
        <img :src="getImgByStr(data.user)"/>
      </div>
      <div>
        <el-row>
          <div align="left" style="padding: 5px;">
            {{data.user}}
          </div>
        </el-row>
        <el-row>
          <div class="chat-item-other">
            {{data.msg}}
          </div>
        </el-row>
      </div>
    </el-row>
  </el-row>
</template>

<script>
  import timeout from 'timeout';
  var hash = require('object-hash');
  import Identicon from "identicon.js";

  export default {
    name: "ChatItem",
    props: {
      data: {}
    },
    data() {
      return {
        chatContract:"bitlogsample",
      }
    },
    methods: {
      itemDetailClass(data) {
        // that.$store.state.eosUserName
        return "";
      },
      isMine(data) {
        var that=this;
        var name = that.$store.state.eosUserName;
        if(name&&name.length>0){
          if(name==data.user){
            return true;
          }
        }
        return false;
      },
      getImgByStr(str){
        var hstr=hash(str);
        var data = new Identicon(hstr, 50).toString();
        var base64="data:image/png;base64,"+data;
        return base64;
      },

      onItemClick(data){
        console.log(data);
      },
    },
  }
</script>

<style scoped>
  .chat-item-mine {
    border-radius: 4px;
    border-width: 1px;
    border-color: #313131;
    background-color: #d3dce6;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    box-shadow: 2px 0.5px 10px #b6b6b6;
  }
  .chat-item-other {
    border-radius: 4px;
    border-width: 1px;
    border-color: #313131;
    background-color: whitesmoke;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    box-shadow: 2px 0.5px 10px #b6b6b6;
  }
</style>

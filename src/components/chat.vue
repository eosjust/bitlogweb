<template>
  <el-row>
    <el-row type="flex" justify="center" style="margin-top: 50px;margin-bottom: 50px;">
      <el-col :xs="24" :sm="22" :md="18" :lg="16" :xl="14">
        <el-row class="chatdesk">
          <el-row>
            <div class="chattitle">
              <span>默认聊天</span>
            </div>
          </el-row>
          <el-row class="chatcontent">
            <transition-group
              name="bounce"
              enter-active-class="fadeIn"
              leave-active-class="slideDownOut"
              tag="el-row">
              <el-row v-for="item in chatItems" :key="item.id" style="animation-duration: 0.5s">
                <ChatItem :data="item">
                </ChatItem>
              </el-row>
            </transition-group>
          </el-row>
          <div style="width: 100%;height: 1px;background-color: #DCDFE6;"></div>
          <el-row type="flex" class="chatinput">
            <el-input
              placeholder="请输入内容"
              style="margin-right: 30px;"
              v-model="inputMsg">
            </el-input>
            <el-button type="primary" @click="actionPostMsg">发送</el-button>
          </el-row>
        </el-row>

      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import timeout from 'timeout';
  import ChatItem from '@/components/ChatItem';
  import axios from 'axios';

  export default {
    name: "chat",
    components: {
      ChatItem,
    },
    data() {
      return {
        chatContract:"bitlogsample",
        inputMsg: "",
        chatItems:[],
      }
    },
    created() {
      var that=this;
      timeout.timeout(2500, function () {
        that.requestChatItems();
        return true;
      });
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      requestChatItems() {
        var that = this;
        var eossdkutil = window.eossdkutil;
        eossdkutil.getEosTableRows(
          {
            json: true,
            code: that.chatContract,
            scope: that.chatContract,
            table: 'chatmsg',
            limit: 1000
          }
        ).then(function (result) {
          var rows = result.data.rows;
          if (rows && rows.length > 0) {
            that.buildChatItems(rows);
          }
        }).catch(function (error) {

        });
      },
      buildChatItems(rows){
        var that=this;
        // that.chatItems.splice(0, that.chatItems.length);
        // for(var i=0;i<rows.length;i++){
        //
        // }
        // for (let item of rows) {
        //   that.chatItems.push(item);
        // }
        that.chatItems=rows;
      },
      actionPostMsg() {
        var that = this;
        var eossdkutil = window.eossdkutil;
        eossdkutil.pushEosAction({
          actions: [
            {
              account: that.chatContract,
              name: "postmsg",
              authorization: [
                {
                  actor: that.$store.state.eosUserName,
                  permission: "active"
                }
              ],
              data: {
                user: that.$store.state.eosUserName,
                type: 0,
                msg: that.inputMsg,
              }
            }
          ]
        }).then(function (result) {
          that.inputMsg = "";
        }).catch(function (error) {
          that.$message({
            message: error,
            type: 'warning'
          });
        });
      },

    },
  }
</script>

<style scoped>
  .chatdesk {
    border-radius: 4px;
    border-width: 1px;
    border-color: #313131;
    box-shadow: 2px 0.5px 10px #b6b6b6;
  }

  .chattitle {
    background-color: #DCDFE6;
    border-radius: 4px 4px 0px 0px;
    padding: 15px;
  }

  .chatinput {
    padding: 15px;
  }

  .chatcontent {
    height: 450px;
    overflow: auto;
    padding: 20px;
  }

  .grid-content {
    background: #d3dce6;
    border-radius: 4px;
    min-height: 560px;
  }
</style>

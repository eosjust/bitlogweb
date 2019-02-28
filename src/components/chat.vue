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
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-row>
            <div style="width: 100%;height: 1px;background-color: #DCDFE6;"></div>
            <el-row type="flex" class="chatinput">
              <el-input
                placeholder="请输入内容"
                style="margin-right: 30px;"
                v-model="inputMsg"
                clearable>
              </el-input>
              <el-button type="primary" @click="actionPostMsg">发送</el-button>
            </el-row>
          </el-row>

        </el-col>
      </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "chat",
      data() {
        return {
          inputMsg:"",
        }
      },
      created() {
      },
      destroyed() {
      },
      mounted() {
      },
      methods: {
        actionPostMsg() {
          var that = this;
          var eossdkutil = window.eossdkutil;
          eossdkutil.pushEosAction({
            actions: [
              {
                account: "bitlogsample",
                name: "postmsg",
                authorization: [
                  {
                    actor: that.$store.state.eosUserName,
                    permission: "active"
                  }
                ],
                data: {
                  user: that.$store.state.eosUserName,
                  type:0,
                  msg:that.inputMsg,
                }
              }
            ]
          }).then(function (result) {
            that.$message({
              message: '发送成功',
              type: 'success'
            });
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
  }

  .grid-content {
    background: #d3dce6;
    border-radius: 4px;
    min-height: 560px;
  }
</style>

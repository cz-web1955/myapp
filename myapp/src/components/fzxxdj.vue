<template>
  <div id="content-box" style="width:100%;" class="box">
    <div class="fwsyrqr">
      <div style="margin-left:20px" @click="syb"><</div>
      <div style="margin-left:15px">房屋基本信息登记</div>
    </div>
    <div style class="gz">
      <div>按照相关法律法规要求,请住户如实填写，个人相关信息不会对外透露</div>
    </div>
    <div class="second">
      <div class="second_box1">
        <img src="../../static/img/fzxxdj.png" alt />
        <p>房主信息登记</p>
      </div>
      <div class="second_box2">
    
          <van-field
            v-model="fzName"
            required
            label-width="100px"
            clearable
            right-icon
            label-align="center"
            label="姓名/名称"
            placeholder="请输入"
            error-message
            @blur="checkfzName"
            style="border:1px solid #9bcdff"
          />
              <van-cell-group>
          <van-field
            v-model="fzID"
            required
            label-width="100px"
            clearable
            right-icon
            label-align="center"
            label="身份证号码"
            placeholder="请输入"
            error-message
            @blur="checkfzID"
            style="border:1px solid #9bcdff"
          />
          <van-field
            v-model="fzPhone"
            required
            label-width="90px"
            clearable
            right-icon
            label-align="center"
            label="联系电话"
            placeholder="请输入"
            error-message
            @blur="checkfzPhone($event)"
            style="border:1px solid #9bcdff"
          />
        </van-cell-group>

        <!-- <van-picker :columns="columns" @change="onChange" v-show="showbox" /> -->
      </div>
      <!-- <div class="second_box2" @click="fou">否,&nbsp;&nbsp;该房屋非本人所有</div>
      <div class="second_box3">提示：了解该房屋信息人员也可以选"是"</div>-->
    </div>
    <div class="xyb">
      <p class="syb" @click="syb">上一步</p>
      <p class="xyba" @click="xyb">下一步</p>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      showbox: false,
      username: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      smfwdzxx: "",
      fzID: "",
      fzName: "",
      fzPhone: "",
      iderr: "",
      nameerr: "",
      phoneerr: ""
    };
  },
  methods: {
    checkfzID() {
      if (this.fzID == "") {
        this.iderr = "身份证号码不能为空";
        Toast("身份证号码不能为空");
        return false;
      }
      if (/[$%\s#*@]/.test(this.fzID)) {
        this.iderr = "不能包含非法字符";
        Toast("不能包含非法字符");
        return false;
      }
      if (!/^[0-9A-z]{1,18}$/.test(this.fzID)) {
        Toast("只能是纯数字或字母");
        return false;
      }
      if (!/^.{18,18}$/.test(this.fzID)) {
        Toast("身份证号码为18位");
        return false;
      }

      //   if (!/^[0-9A-z]{18,18}$/.test(this.fzID)) {

      //   Toast('只能纯数字或字母')
      // }
      this.iderr = "";
      window.sessionStorage.setItem("fzid", this.fzID);
      return true;
    },
    checkfzName() {
      if (this.fzName == "") {
        this.nameerr = "房主姓名/名称不能为空";
        Toast("姓名不能为空");
        return false;
      }
      if (/[$%\s#*@。',;]/.test(this.fzName)) {
        this.nameerr = "不能包含非法字符";
        Toast("不能包含非法字符");
        return false;
      }
      this.nameerr = "";
      window.sessionStorage.setItem("fzname", this.fzName);
      return true;
    },
    checkfzPhone(e) {
     
      if (this.fzPhone == "") {
        this.phoneerr = "房主电话不能为空";
        Toast("电话不能为空");
        return false;
      }
      if (/[$%\s#*@。',;]/.test(this.fzPhone)) {
        this.phoneerr = "不能包含非法字符";
        Toast("不能包含非法字符");
        return false;
      }
      if (!/^.{6,12}$/.test(this.fzPhone)) {
        Toast("长度为6-12位");
        this.phoneerr = "长度为6-12位";
        return false;
      }
      if (!/^[0-9]{6,12}$/.test(this.fzPhone)) {
        Toast("请填写是纯数字");
        return false;
      }

      if (
        this.fzPhone.length != "7" &&
       this.fzPhone.length != "8" &&
       this.fzPhone.length != "11" &&
        this.fzPhone.length != "12"
      ) {
        Toast("长度为7,8,11,12位");
        return false;
      }
      this.phoneerr = "";
      window.sessionStorage.setItem("fzPhone", this.fzPhone);
      return true;
    },
    xyb() {
      var flag = this.checkfzID() && this.checkfzName() && this.checkfzPhone();
      if (flag) {
        this.$router.push("/fwsyqk");
      }
    },
    syb() {
     this.$router.push({
          path:"/fwsyrqr",
          query:{
            uuid:window.sessionStorage.getItem('uuid')
          }
        });
    }
  },
  created() {
    var id = window.sessionStorage.getItem("fzid");
    var name = window.sessionStorage.getItem("fzname");
    let phone = window.sessionStorage.getItem("fzPhone");
    if (id) {
      this.fzID = id;
    }
    if (name) {
      this.fzName = name;
    }
    if (phone) {
      this.fzPhone = phone;
    }
  },
  mounted() {
    var pageHeight = document.documentElement.clientHeight;
    // document.getElementById("content-box").style.height = pageHeight + "px";
    // console.log(pageHeight);
    // document.body.addEventListener(
    //   "touchmove",
    //   function(e) {
    //     e.preventDefault();
    //   },
    //   { passive: false }
    // );
  }
};
</script>
<style lang="" >
.van-icon {
  font-size: 55px !important;
}
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 140px !important;
  color: #323233;
  font-size: 35px !important;
  line-height: 140px !important;
  background-color: #fff;
  margin-top: 35px !important;
  border-radius: 15px !important;
}
.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  display: block;
  min-width: 1em;
  font-size: 50px !important;
  margin-right: 20px !important;
  line-height: inherit;
}
.van-field__error-message {
  color: #ee0a24;
  font-size: 50px !important;
  text-align: left;
  border: 1px solid red;
  z-index: 1000000 !important;
}
.van-toast {
 
  height: 100px !important;
  width: 550px !important;
  font-size: 30px !important;
  word-wrap: break-word;
  background-color: rgba(50, 50, 51, 0.88);
  border-radius: 0.037037rem;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
.van-cell--required::before {
    position: absolute;
    left: 30px!important;
    color: #ee0a24;
    font-size: 50px!important;
    content: '*';
}
</style>
<style lang="" scoped >
.box {
  background-image: url(../../static/img/ba.png);
  background-repeat: no-repeat;
  background-position: center center;
  height: 1920px;
}
* {
  margin: 0;
  padding: 0;
}
.fwsyrqr {
  width: 100%;
  height: 130px;
}
.fwsyrqr div {
  height: 60px;
  margin: 35px 0;
  color: #ffffff;
  font-size: 50px;
  float: left;
}
.gz {
  width: 1000px;
  height: 200px;
  font-size: 43px;
  margin: 30px 40px;

  background: rgba(255, 255, 255, 0.24);

  border-radius: 15px;
  color: #ffffff;
  overflow: hidden;
}
.gz div {
  width: 900px;
  height: 150px;
  text-align: center;
  margin: 25px 50px;
  color: #ffffff;
  line-height: 75px;
  text-align: left;
  word-wrap: break-word;
}

.second {
  width: 1000px;
  height: 800px;
  border-radius: 15px;
  background: #ffffff;
  margin: 30px 40px;
  overflow: hidden;
}

.second_box1 {
  width: 900px;
  height: 160px;
  margin: 30px 50px;
 
}

.second_box1 img {
  width: 80px;
  height: 80px;
  margin-left: 400px;
}
.second_box1 p {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: #4182e0;
}
.second_box2 {
  width: 900px;
  height: 140px;
  margin: 30px 50px;
}
.second_box3 {
  width: 900px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #a3a3a3;
  font-size: 41px;
}

.dzxx {
  width: 1040px;
  height: 1100px;

  margin: 20px;
  box-sizing: border-box;
  border: 1px solid #22509e;
  background: #ffffff;
  margin-bottom: 390px;
}
.fwdzxx {
  width: 100%;
  height: 100px;
  background: #22509e;
  font-size: 40px;
  color: #ffffff;
  text-indent: 1em;
  text-align: left;
  line-height: 100px;
}
.showMsg {
  width: 80%;
  height: 60%;
  margin: 8% 10%;
  font-size: 45px;
  color: #4e8ce6;
  text-align: left;
  border: 0;
  outline: 0;
}
.ID {
  width: 900px;
  height: 300px;
  margin-left: 90px;
}
.ID p {
  width: 100%;
  height: 150px;
  color: #333333;
  font-size: 40px;
  line-height: 150px;
}
.ID input {
  width: 100%;
  height: 150px;
  color: #333333;
  font-size: 40px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #d2d2d2;
  text-indent: 1em;
}
.xyb {
  width: 1000px;
  height: 140px;
  margin-top: 480px;
  margin-left: 60px;
  color: #ffffff;
}
.xyb p {
  width: 450px;
  height: 140px;
  line-height: 140px;
  font-size: 40px;
  float: left;
  cursor: pointer;
  background: #086de2;
  text-align: center;
  border-radius: 15px;
}
.xyba {
  margin-left: 50px;
}
.syb {
}
</style>
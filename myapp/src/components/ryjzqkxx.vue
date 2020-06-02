<template>
  <div id="content-box" style="width:100%;" class="boxx">
    <div class="fwsyrqr">
      <div style="margin-left:20px" @click="syb"><</div>
      <div style="margin-left:15px">入住人员基本信息登记</div>
    </div>
    <div style class="gz">
      <div>按照相关法律法规要求,请住户如实填写，个人相关信息不会对外透露</div>
    </div>
    <div class="second">
      <div class="second_box1">
        <img src="../../static/img/ryjzqkxx.png" alt />
        <p>人员居住情况</p>
      </div>
      <div class="second_box2">
        <van-cell-group>
          <van-field
            v-model="syxs"
            required
            label-width="90px"
            clearable
            :disabled="true"
            right-icon="arrow-down"
            label-align="center"
            label="居住类别"
            placeholder="请选择"
            error-message
            @click-right-icon="syxsShow($event)"
            style="border:1px solid #9bcdff"
          />
        </van-cell-group>
        <div class="ID">
          <p>
            <span style="color:red">*</span>
            <span>本房屋地址与登记人户籍地址是否一致？</span>
          </p>
          <div style="overflew:hidden" class="checkbox">
            <div class="checkbox1">
              <van-checkbox v-model="checked" icon-size="20px" @click="pdxz(1)">是</van-checkbox>
            </div>
            <div class="checkbox1" style="margin-left:120px">
              <van-checkbox v-model="checked1" icon-size="20px" @click="pdxz(2)">否</van-checkbox>
            </div>
          </div>
        </div>
        <!-- <van-picker
          :columns="jzlb"
          @change="syxsChange"
          v-show="showbox"
          class="fixed"
          :default-index="1"
        />-->
      </div>
      <div class="fixed" v-show="showbox">
        <div class="selectLc">
          <!-- <div class="closebox" @click="closebox">X</div> -->
          <ul class="selectUl">
            <li
              v-for="(item,index) in jzlb"
              :key="index"
              @click="jzlbSelect(item.code,item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <van-loading type="spinner" color="#1989fa" /> -->
    <van-dialog v-model="show" show-cancel-button @confirm="Tzym" @cancel="qxym">
      <img
        src="../../static/img/bccg.png"
        class="showImg"
        style="width:50px;height:50px;margin-top:20px;margin-left:100px"
      />
      <p class="showP">信息登记成功</p>
      <p class="showP showP1">是否继续登记其他同住人信息</p>
    </van-dialog>
    <div class="xyb">
      <p class="syb" @click="syb">上一步</p>
      <p class="xyba" @click="success">完成</p>
    </div>
    <!-- <div class="qita" @click="Writemsg">代该房屋其他人员填写基本信息 >>  </div> -->
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Checkbox, CheckboxGroup, Toast } from "vant";
export default {
  data() {
    return {
      leibie: "",
      leibieerr: "",
      selectbox: false,
      yizhi: "",
      showbox: false,
      msg: "",
      syxs: "",
      syxsTotal: "",
      jzlb: [
        { name: "租住", code: "01" },
        { name: "自住", code: "02" },
        { name: "亲友投靠", code: "03" },
        { name: "其他", code: "04" }
      ],
      checked: "",
      checked1: "",
      show: false
    };
  },
  methods: {
    pdxz(key) {
      if (key == "1") {
        this.yizhi = "0";
        this.checked1 = false;
      } else if (key == "2") {
        this.yizhi = "1";
        this.checked = false;
      }
    },
    closebox() {
      this.showbox = false;
    },
    checkleibie() {
      if (this.syxs == "") {
        Toast("居住类别不能为空");
        return false;
      }
      this.leibieerr = "";
      return true;
    },
    syxsShow() {
      this.showbox = !this.showbox;
    },
    jzlbSelect(code, name) {
      this.syxs = name;
      this.showbox = false;
      window.sessionStorage.setItem("leibie", code);
    },
    closePicker() {
      this.showbox = false;
    },
    Tzym() {
      this.$router.push("/ryrzjbxx");
    },
    qxym() {
     
      WeixinJSBridge.call("closeWindow");
      var userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") != -1 ||
        userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
      } else if (
        userAgent.indexOf("Android") > -1 ||
        userAgent.indexOf("Linux") > -1
      ) {
        window.opener = null;
        window.open("about:blank", "_self", "").close();
      } else {
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
      }
    },
    success() {
      var flag = this.checkleibie() && this.yizhi != "";

      if (flag) {
        this.$showLoading();
        this.$axios({
          method: "post",
          url: "/house/addPeople",
          data: {
            zzbh: window.sessionStorage.getItem("zzbh"),
            isfz: window.sessionStorage.getItem("isfz"),

            gmsfhm: window.sessionStorage.getItem("ryrzid"),
            gzdw: window.sessionStorage.getItem("ryrzgzdw"),
            id: "",
            ishjdz: this.yizhi,
            jzlb: window.sessionStorage.getItem("leibie"),
            lxdh: window.sessionStorage.getItem("ryrzphone"),
            xm: window.sessionStorage.getItem("ryrzname")
          }
        }).then(res => {
          if (res.data.code == "1") {
            // this.msg = "登记成功";
            // this.showbox = true;
            this.$hideLoading();
            sessionStorage.removeItem("ryrzid");
            sessionStorage.removeItem("ryrzname");
            sessionStorage.removeItem("ryrzphone");
            sessionStorage.removeItem("ryrzgzdw");
            this.show = true;

            // this.$hideLoading();
          } else  {
            this.$hideLoading();
            this.msg = "操作失败";
            // this.$hideLoading();
            Toast("登记失败，请从新输入");
          }
          if(res.data.code == "-1"){
             this.$hideLoading();
             Toast(res.data.msg)
          }
        }).catch(err=>{
              this.$hideLoading();
                  Toast("登记失败，请从新输入");
        });
      }
    },
    syb() {
      this.$router.push("/ryrzjbxx");
    },
    Writemsg() {
      this.$router.push("/ryrzjbxx");
    }
  },
  created() {
    // this.$showLoading()
    var syxs = window.sessionStorage.getItem("syxs");
    if (syxs == "01") {
      this.syxs = "自住";
      window.sessionStorage.setItem("leibie", syxs);
    } else if (syxs == "02") {
      this.syxs = "租住";
      window.sessionStorage.setItem("leibie", syxs);
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
<style lang="">
.van-picker__toolbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  height: 100px !important;
  line-height: 100px !important;
}
.van-picker__cancel,
.van-picker__confirm {
  padding: 10px !important;
  color: #1989fa;
  font-size: 50px !important;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.van-button {
  font-size: 45px !important;
}
.van-dialog__footer--buttons {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-top: 30px !important;
  height: 100px !important;
  line-height: 100px !important;
  font-size: 50px !important;
}
.van-dialog__message {
  max-height: 60vh;
  padding: 0.222222rem;
  overflow-y: auto;
  font-size: 40px !important;
  height: 100px !important;
  line-height: 100px !important;
  white-space: pre-wrap;
  text-align: center;
  word-wrap: break-word;
  -webkit-overflow-scrolling: touch;
}
.van-dialog__header {
  padding-top: 0.222222rem;
  font-weight: 500;
  height: 80px !important;
  font-size: 40px !important;
  color: #1989fa !important;
  line-height: 80px !important;
  text-align: center;
}
.van-dialog {
  width: 700px !important;
  height: 500px !important;
}
.van-cell {
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
  margin-right: 35px !important;
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
  width: 300px !important;
  font-size: 30px !important;
}
.van-uploader__upload {
  width: 166px !important;
  height: 166px !important;
  margin-left: 12px !important;
}
.van-cell--required::before {
  position: absolute;
  left: 30px !important;
  color: #ee0a24;
  font-size: 50px !important;
  content: "*";
}
.van-uploader__preview-image {
  display: block;
  width: 166px !important;
  height: 166px !important;
  margin-left: 6px !important;
}
.van-picker__columns {
  z-index: 1000000000 !important;
}
.van-uploader__preview-delete {
  font-size: 40px !important;
}
.van-picker-column {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  font-size: 50px !important;
  text-align: center;
}
.van-checkbox__label {
  margin-left: 0.074074rem;
  color: #323233;
  line-height: 100px !important;
}
</style>

<style lang="" scoped >
/* *{
  padding: 0;
  margin: 0;
} */
.showP {
  font-size: 40px;
  height: 100px;
  line-height: 100px;
  width: 100%;
  color: black;
  font-weight: bold;
  text-align: center;
}
.showP1 {
  height: 80px;
  line-height: 80px;
  color: #333333;
}
.showMsg {
  width: 80px;
  height: 80px;
}
#content-box {
  height: 1920px;
}
.checkbox {
  overflow: hidden;
  font-size: 35px;
}
.checkbox1 {
  float: left;
}
.photo {
  width: 166px;
  height: 166px;
  background-image: url(../../static/img/photo.png);
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 100;
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
  height: 700px;
  border-radius: 15px;
  background: #ffffff;
  margin: 30px 40px;
  overflow: hidden;
}

.second_box1 {
  width: 900px;
  height: 190px;
  margin: 15px 50px;
}

.second_box1 img {
  width: 80px;
  height: 80px;
  margin-left: 400px;
}
.second_box1 p {
  width: 100%;
  height: 60px;
  line-height: 60px;
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
  height: 1150px;

  margin: 20px;
  box-sizing: border-box;
  border: 1px solid #22509e;
  background: #ffffff;
  margin-bottom: 340px;
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
  margin: 30px 50px;
  position: relative;
  border-radius: 15px;
  background: #ffffff;
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
  margin-top: 600px;
  margin-left: 40px;
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
  margin-left: 80px;
}

.syxsSelect {
  width: 100%;
  height: 320px;
  position: absolute;
  top: 305px;
  left: 0;
  font-size: 36px;
  list-style: none;
  background: #ffffff;
  border: 1px solid #2b58af;
  z-index: 100;
  overflow: scroll;
}
.syxsSelect li {
  border-bottom: 1px solid #dedede;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
.img {
  position: absolute;
  top: 180px;
  width: 100px;
  height: 80px;
  right: 0;
}
.qita {
  width: 1000px;
  height: 140px;
  line-height: 140px;
  background: #ffffff;
  border-radius: 15px;
  text-align: center;
  font-size: 48px;
  color: #1a7ed7;
  margin: 0 40px;
  margin-top: 240px;
}
.fixed {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000000000000000000;
}
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000000000000000;
}
.selectLc {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 600px;
  background: #ffffff;
}
.selectUl {
  width: 1000px;
  height: 540px;
  margin: 30px 40px;
  overflow: auto;
}
.selectUl::-webkit-scrollbar {
  display: none;
}
.selectUl li {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 45px;
  text-align: center;
  border-bottom: 1px solid #dcdc;
  margin-top: 15px;
}
.closebox {
  position: absolute;
  right: 40px;
  top: 15px;
  font-size: 60px;
}
</style>


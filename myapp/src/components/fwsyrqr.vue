<template>
  <div id="content-box" style="width:100%;" v-show="Page" class="box">
    <div class="fwsyrqr">
      <!-- <div style="margin-left:20px" @click="closePage">X</div> -->
    </div>

    <img src="../../static/img/bta.png" alt class="fw" />
    <!-- <div class="msgqr">
      <img src="../../static/img/msg.png" alt />
      <p>应疫情防控要求，各单位负责人请认真核实人员信息登记，做到区不漏户，户不漏人。</p>
    </div>-->
    <!-- <div class="mgxx">
      <img :src="imgUrl" alt />
      <div class="mgxx_box">
        <p>社区民警：{{xm}}</p>
        <p>警号：{{jh}}</p>
        <p>电话：{{lxdh}}</p>
        <p>备注:{{bz}}</p>
      </div>
    </div> -->
    <div class="dzxq">
      <div class="dzxq_box">
        <img src="../../static/img/xq.png" alt />
        <p>{{xqmcqr}}</p>
      </div>
      <div class="dzxq_box" style="margin-top:0px">
        <img src="../../static/img/xqdz.png" alt />
        <p>{{xqdza}}</p>
      </div>
      <div class="dzxq_box2">
        <van-cell-group>
          <van-field
            v-model="jhl"
            label-width="90px"
            clearable
            placeholder="楼排号"
            :disabled="disable"
            label-align="center"
            :right-icon="rightion"
            @click-right-icon="lcshow()"
            style="border:1px solid #9bcdff;margin-left:0!important;"
          />
          <van-field
            v-model="jdy"
            label-width="90px"
            clearable
            placeholder="单元号"
            :disabled="disable"
            label-align="center"
            :right-icon="rightion"
            @click-right-icon="dyshow"
            style="border:1px solid #9bcdff"
          />
          <van-field
            v-model="jhfj"
            label-width="90px"
            clearable
            placeholder="户室号"
            :disabled="disable"
            :right-icon="rightion"
            label-align="center"
            @click-right-icon="hsshow"
            style="border:1px solid #9bcdff"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="fixed" v-show="showlc">
      <div class="selectLc">
        <div class="closebox" @click="closebox">X</div>
        <ul class="selectUl">
          <li
            v-for="(item,index) in lchArr"
            :key="index"
            @click="lcDwdm(item.code,item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="fixed" v-show="showdy">
      <div class="selectLc">
        <div class="closebox" @click="closebox">X</div>
        <ul class="selectUl">
          <li
            v-for="(item,index) in dyhArr"
            :key="index"
            @click="dyDwdm(item.code,item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="fixed" v-show="showhs">
      <div class="selectLc">
        <div class="closebox" @click="closebox">X</div>
        <ul class="selectUl">
          <li
            v-for="(item,index) in hsArr"
            :key="index"
            @click="hsDwdm(item.code,item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="second">
      <div class="second_box1">
        <img src="../../static/img/ts.png" alt />
        <p>该地址房屋是否为本人所有？</p>
      </div>
      <div class="second_box2" @click="Yes">是,&nbsp;&nbsp;该房屋属于本人所有</div>
      <div class="second_box2" @click="fou">否,&nbsp;&nbsp;该房屋非本人所有</div>
      <!-- <div class="second_box3">提示：了解该房屋信息人员也可以选"是"</div> -->
    </div>
  </div>
</template>
<script>
import { Button, Toast } from "vant";
import { Field } from "vant";
import { Picker } from "vant";
import { Icon } from "vant";
export default {
  data() {
    return {
      // smfwdzxx: "河南省信阳市罗山县楠杆镇",
      // errr: "手机号错误",
      Page: true,
      showbox: true,
      username: "",
      jhl: "",
      jdy: "",
      jhfj: "",
      uuid: "",
      xqmcqr: "",
      xqdza: "",
      disable: true,
      rightion: "",
      showlc: false,
      showdy: false,
      showhs: false,
      lchArr: [],
      dyhArr: [],
      hsArr: [],
      lccode: "",
      dycode: "",
      shcode: "",
      mphbh: "",

      xm: "",
      jh: "",
      lxdh: "",
      bz: "",
      imgUrl: "",

    };
  },
  created() {
    this.uuid = this.$route.query.uuid;
    window.sessionStorage.setItem("uuid", this.uuid);

    this.Xqmz();
    // setTimeout(()=>{
    //   this.mjxx();
    // },600)
    // this.lph();
  },
  methods: {
    //选择楼层
    lcDwdm(code, name) {
      this.jhl = name;
      this.showlc = false;
     
      this.lccode=code
      this.dyh(code);

    },
    // 选择单元
    dyDwdm(code, name) {
      this.jdy = name+'单元';
      this.showdy = false;
      this.dycode = code;
      this.sh(code);
    },
    // 选择户室
    hsDwdm(code, name) {
      this.jhfj = name;
      this.showhs = false;
      this.shcode=code
      this.zzbh(code);
    },
    // 控制楼层，等显示隐藏
    lcshow() {
      this.showlc = true;
    },
    dyshow() {
      this.showdy = true;
    },
    hsshow() {
      this.showhs = true;
    },
    // 关闭选择框
    closebox() {
      this.showlc = false;
      this.showdy = false;
      this.showhs = false;
    },
    // 获取小区名字和街路巷名字；
    Xqmz() {
      this.$axios({
        method: "get",
        url: "/standardAddress/getJwsInfo",
        params: {
          uuid: window.sessionStorage.getItem("uuid")
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.xqmcqr = res.data.result.xqmc;
          this.xqdza = res.data.result.jlx;
          var data = res.data.result;
          if (
            res.data.result.lph == null &&
            res.data.result.dyh == null &&
            res.data.result.sh == null
          ) {
            this.rightion = "arrow-down";
            this.lph(data.officeCode, data.mphbh, data.jlxdm);
          } else {
            this.jhl = res.data.result.lph;
            this.jdy = res.data.result.dyh;
            this.jhfj = res.data.result.sh;
          }
          if (data.zzbh != null) {
            window.sessionStorage.setItem("zzbh", res.data.result.zzbh);
          }
          window.sessionStorage.setItem(
            "officeCode",
            res.data.result.officeCode
          );
          this.mphbh = data.mphbh;
          window.sessionStorage.setItem("zz_mph", res.data.result.mphbh);
          window.sessionStorage.setItem("zz_jlxdm", res.data.result.jlxdm);
          // this.mjxx(res.data.result.officeCode);
        }
      });
    },
    // 获取选择那栋楼
    lph(officeCode, mphbh, jlxdm) {
      this.$axios({
        method: "post",
        url: "/standardAddress/getStandardAddressLinkage",
        data: {
          uuid: this.uuid,
          officeCode: officeCode,
          type: "lph",
          zz_mph: mphbh,
          zz_jlxdm: jlxdm
        }
      }).then(res => {
      
        if (res.data.code == "1") {
          this.lchArr = res.data.result;
          if(res.data.result==''){
       
           this.lccode=''
            var code=''
            this.dyh(code)
          }
        }
      });
    },
    // 选取单元号
    dyh(code) {
      this.$axios({
        method: "post",
        url: "/standardAddress/getStandardAddressLinkage",
        data: {
          uuid: this.uuid,
          officeCode: window.sessionStorage.getItem("officeCode"),
          type: "dyh",
          zz_mph: window.sessionStorage.getItem("zz_mph"),
          zz_jlxdm: window.sessionStorage.getItem("zz_jlxdm"),
          zz_zlh: code
        }
      }).then(res => {
   
        if (res.data.code == "1") {
          this.dyhArr = res.data.result;
          if(res.data.result==''){
            this.dycode=''
            var code=''
              this.sh(code);
          }
        }
      });
    },
    // 选择那个户室
    sh(code) {
      this.$axios({
        method: "post",
        url: "/standardAddress/getStandardAddressLinkage",
        data: {
          uuid: this.uuid,
          officeCode: window.sessionStorage.getItem("officeCode"),
          type: "sh",
          zz_mph: window.sessionStorage.getItem("zz_mph"),
          zz_jlxdm: window.sessionStorage.getItem("zz_jlxdm"),
          zz_zlh: this.lccode,
          zz_dyhdm: code
        }
      }).then(res => {
        // console.log(res);
        if (res.data.code == "1") {
          this.hsArr = res.data.result;
          if(res.data.result==''){
            this.shcode=''
            this.zzbh()
          }
        }
      });
    },
    // 获取完成的zzbh参数
    zzbh(code) {
      this.$axios({
        method: "post",
        url: "/standardAddress/getZzbh",
        data: {
          officeCode: window.sessionStorage.getItem("officeCode"),
          jlxdm: window.sessionStorage.getItem("zz_jlxdm"),
          mphbh: this.mphbh,
          dyh: this.dycode,
          lph: this.lccode,
          sh: this.shcode
        }
      }).then(res => {
        if (res.data.code == "1") {
          window.sessionStorage.setItem("zzbh", res.data.result);
        }else if(res.data.code=='-1'){
          window.sessionStorage.setItem("zzbh", '');
        }
      });
    },
    // 获取民警信息
    mjxx(code) {
      this.$axios({
        method: "get",
        url: "/user/getUser",
        params: {
          officeCode: code
        }
      }).then(res => {
        if (res.data.code == "1") {
          this.xm = res.data.result.xm;
          this.jh = res.data.result.jh;
          this.lxdh = res.data.result.lxdh;
          this.bz = res.data.result.bz;
          this.imgUrl = "data:image/png;base64" + "," + res.data.result.xp;
        }
      });
    },
    lphflag() {
      if (this.jhl == "") {
        Toast("请选择楼牌号");
        return false;
      }
      return true;
    },
    dyhflag() {
      if (this.jdy == "") {
        Toast("请选择单元号");
        return false;
      }
      return true;
    },
    hsflag() {
      if (this.jhfj == "") {
        Toast("请选择户室号");
        return false;
      }
      return true;
    },
    Yes() {
      //var flag = this.lphflag() && this.dyhflag() && this.hsflag();

      window.sessionStorage.setItem("isfz", "0");
      this.$router.push("/fzxxdj");
    },
    fou() {
     // var flag = this.lphflag() && this.dyhflag() && this.hsflag();

      window.sessionStorage.setItem("isfz", "1");
      this.$router.push({
        path: "/ryrzjbxx",
        query: {
          x: 1
        }
      });
    },
    closePage() {
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
    change(e) {},
    onChange(picker, value, index) {
      this.username = value;
      this.showbox = false;
    },
    czing(e) {
      this.showbox = true;
    }
  },
  mounted() {
    // var pageHeight = document.documentElement.clientHeight;
    // document.getElementById("content-box").style.height = pageHeight + "px";
  }
};
</script>
<style lang="" >
.dzxq_box2 .van-cell {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 280px !important;
  height: 120px !important;
  color: #628db8 !important;
  font-size: 50px !important;
  line-height: 120px !important;
  background-color: #f4f9ff !important;
  margin-left: 20px !important;
  float: left !important;
}
.dzxq_box2 .van-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #628db8 !important;
  text-align: center !important;
  background-color: transparent;
  border: 0;
  resize: none;
}
.dzxq_box2 .van-field__clear,
.van-field__right-icon {
  margin-right: -15px !important;
  padding: 0 0 !important;
  height: 120px !important;
  line-height: 120px !important;
  color: #628db8 !important;
}
.van-toast {
  height: 100px !important;
  width: 300px !important;
  font-size: 40px !important;
  word-wrap: break-word;
  background-color: rgba(50, 50, 51, 0.88);
  border-radius: 0.037037rem;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
</style>
<style lang="" scoped>
/* *{
  padding: 0;
  margin: 0;
} */
.dzxq_box2 {
  width: 900px;
  height: 120px;
  margin-left: 50px;
  margin-top: 10px;
  color: #628db8;
}
.dzxq_box {
  width: 900px;
  height: 90px;
  overflow: hidden;
  margin-left: 50px;
  margin-top: 40px;
}
.dzxq_box img {
  width: 48px;
  height: 48px;
  margin-top: -2px;
  float: left;
}
.dzxq_box p {
  width: 800px;
  height: 90px;
  line-height: 40px;
  font-size: 35px;
  float: left;
  text-align: left;
  /* text-indent: 1em; */
  word-wrap: break-word;
  word-break: normal;
  margin-left: 15px
}
.dzxq {
  width: 1000px;
  height: 410px;
  background: #ffffff;
  border-radius: 15px;
  margin: 50px 40px;
  overflow: hidden;
}
.mgxx {
  width: 1000px;
  height: 350px;
  margin-left: 40px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 15px;
}
.mgxx img {
  width: 215px;
  height: 280px;
  float: left;
  margin: 35px 45px;
}
.mgxx_box {
  float: left;
  width: 650px;
  height: 280px;
  margin-top: 35px;
  color: #4a4a4a;
  font-size: 40px;
}
.mgxx_box p {
  width: 100%;
  height: 70px;
  line-height: 70px;
  overflow: hidden;
}

.msgqr {
  width: 1000px;
  height: 160px;
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  margin: 30px 40px;
  border-radius: 15px;
}
.msgqr img {
  width: 75px;
  height: 75px;
  float: left;
  margin: 40px 30px;
}
.msgqr p {
  float: left;
  width: 800px;
  height: 100px;
  font-size: 35px;
  word-wrap: break-word;
  margin: 30px 25px;
}
.box {
  background-image: url(../../static/img/ba.png);
  background-repeat: no-repeat;
  background-position: center center;
  height: 1920px;
  overflow: hidden;
}
.fw {
  width: 530px;
  height: 130px;
  margin: 100px 275px;
}
* {
  margin: 0;
  padding: 0;
}

.dzxx {
  width: 1000px;
  height: 300px;
  margin: 0 40px;
  border: 1px solid #22509e;
  background: #ffffff;
  border-radius: 15px;
}
.fwdzxx {
  width: 900px;
  height: 60px;
  color: #1d4c75;
  margin: 20px 50px;
}
.fwdzxx img {
  width: 55px;
  height: 55px;
  float: left;
}
.ssss {
  height: 60px;
  line-height: 65px;
  float: left;
  font-size: 40px;
  font-weight: bold;
  text-indent: 1em;
}
.showMsg {
  width: 900px;
  height: 190px;
  margin: 0 50px;
  font-size: 45px;
  color: #4a4a4a;
  text-align: left;
  border: 0;
  outline: 0;
}
.second {
  width: 1000px;
  height: 580px;
  border-radius: 15px;
  background: #ffffff;
  margin: 100px 40px;
  overflow: hidden;
}

.second_box1 {
  width: 730px;
  height: 60px;
  margin: 40px 135px;
  margin-bottom: 0;
  overflow: hidden;
}

.second_box1 img {
  width: 60px;
  height: 60px;

  float: left;
}
.second_box1 p {
  float: left;
  width: 660px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: #1d4c75;
}
.second_box2 {
  width: 900px;
  height: 140px;
  margin: 20px 50px;
  color: #ffffff;
  font-size: 41px;
  background: #278bff;
  border-radius: 15px;
  line-height: 140px;
  text-align: center;
  /* margin-bottom:10px; */
  margin-top: 40px;
}
.second_box3 {
  width: 900px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #a3a3a3;
  font-size: 41px;
}

.sfbr {
  width: 600px;
  height: 160px;
  margin: 200px 240px;
  font-size: 50px;
  text-align: center;
  color: #666666;
}
.shi {
  width: 670px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  background: #2b58af;
  font-size: 50px;
  margin: 10px 205px;
  border-radius: 15px;
}
.know {
  width: 560px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-left: 255px;
  font-size: 35px;
}
.fou {
  width: 670px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  background: #f17819;
  font-size: 50px;
  margin-left: 205px;
  margin-top: 85px;
  border-radius: 15px;
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
<style lang="">
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  color: #323233;
  font-size: 30px;
  line-height: 100px;
  background-color: #fff;
}
.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  display: block;
  min-width: 1em;
  font-size: 50px;
  margin-right: 20px;
  line-height: inherit;
}
</style>
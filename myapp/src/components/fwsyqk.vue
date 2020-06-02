<template>
  <div id="content-box" style="width:100%;">
    <div class="fwsyrqr">
      <div style="margin-left:20px" @click="syb"><</div>
      <div style="margin-left:15px">房屋基本信息登记</div>
    </div>
    <div style class="gz">
      <div>按照相关法律法规要求,请住户如实填写，个人相关信息不会对外透露</div>
    </div>
    <div class="second">
      <div class="second_box1">
        <img src="../../static/img/fwsyqk.png" alt />
        <p>房屋使用情况</p>
      </div>
      <div class="second_box2">
        <van-cell-group>
          <van-field
            v-model="syxs"
            required
            label-width="90px"
            clearable
            right-icon="arrow-down"
            label-align="center"
            label="使用形式"
            placeholder="请选择"
            error-message
            :disabled="true"
            @blur="checkfzID"
            @click-right-icon="syxsShow($event)"
            style="border:1px solid #9bcdff"
          />
          <van-field
            v-model="fwyt"
            required
            label-width="90px"
            clearable
            right-icon="arrow-down"
            label-align="center"
            label="房屋用途"
            :disabled="true"
            placeholder="请选择"
            error-message
            @blur="checkfzName"
            @click-right-icon="fwytShow($event)"
            style="border:1px solid #9bcdff"
          />
        </van-cell-group>
      </div>

      <div class="fixed" v-show="showbox">
        <div class="selectLc">
          <!-- <div class="closebox" @click="closebox">X</div> -->
          <ul class="selectUl">
            <li
              v-for="(item,index) in columns"
              :key="index"
              @click="syxsselect(item.code,item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>

      <div class="fixed" v-show="fwytbox">
        <div class="selectLc">
          <!-- <div class="closebox" @click="closebox">X</div> -->
          <ul class="selectUl">
            <li
              v-for="(item,index) in fwytSelect"
              :key="index"
              @click="fwytselect(item.code,item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <van-dialog v-model="show" show-cancel-button @confirm="Tzym" @cancel="qxym">
      <img
        src="../../static/img/ts.png"
        class="showImg"
        style="width:50px;height:50px;margin-top:20px;margin-left:100px"
      />
      <p class="showP">点击确定将不采集人员信息，若要采集人员信息，请点击取消-下一步！</p>
    </van-dialog>
    <!-- <van-dialog v-model="showSuccess" show-cancel-button @confirm="Tzym" @cancel="qxym">
      <img
        src="../../static/img/bccg.png"
        class="showImg"
        style="width:50px;height:50px;margin-top:20px;margin-left:100px"
      />
      <p class="showP">信息登记成功</p>
      <p class="showP showP1">是否继续登记其他同住人信息</p>
    </van-dialog>-->
    <div class="ID">
      <p>
        <!-- <span style="color:red;font-size:20px">*</span> -->
        <span style="margin-left:10px">房屋相关图片资料上传(最多四张图片)</span>
      </p>

      <van-uploader
        v-model="fileList"
      
        :oversize="xzdx"
        :after-read="afterRead"
        result-type="dataUrl"
        multiple="true"
        max-count="4"
      />
    </div>

    <div class="xyb">
      <p class="syb" @click="syb">上一步</p>
      <p class="syb" @click="success">下一步</p>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Picker } from "vant";

import Exif from 'exif-js'
export default {
  data() {
    return {
      smfwdzxx: "",
      syxs: "",
      fwyt: "",
      syxsTotal: "",
      fwytTotal: "",
      syxserr: "",
      fwyterr: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      selectbox: false,
      fwytbox: false,
      showbox: false,
      columns: [
        { name: "自用", code: "1" },
        { name: "出租", code: "2" },
        { name: "借用", code: "3" },
        { name: "混用", code: "5" }
      ],
      fwytSelect: [
        { name: "住宅", code: "10" },
        { name: "工业，交通，仓储", code: "20" },
        { name: "商业，金融，信息", code: "30" },
        { name: "教育，医疗，卫生，科研", code: "40" },
        { name: "文化，娱乐，体育", code: "50" },
        { name: "办公", code: "60" },
        { name: "军事", code: "70" },
        { name: "其他", code: "80" }
      ],
      fwtps: [],
      files: {
        name: "",
        type: ""
      },
      headerImage: "",
      picValue: "",
      upImgUrl: "",
      show: false,
      showSuccess: false,
      xybShow: false,
      wcShow: true
    };
  },
  methods: {
    afterRead(file) {
   

      if (file.file.size > 512000) {

        let canvas = document.createElement("canvas"); // 创建Canvas对象(画布)
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = file.content; // 指定图片的DataURL(图片的base64编码数据)
        img.onload = () => {
          canvas.width = 400;
          canvas.height = 300;
          context.drawImage(img, 0, 0, 400, 300);
          file.content = canvas.toDataURL(file.file.type, 0.92); // 0.92为默认压缩质量
          // console.log(file.content);
          this.fwtps.push(file.content);
        };
      } else {
        this.fwtps.push(file.content);
      }
  
     
      window.sessionStorage.setItem("fwtps", this.fwtps);
    // var   name = file.file.name; // 获取文件名
    //  var type = file.file.type; // 获取类型
    //   var picValue = file.file; // 文件流
    //   console.log(picValue)
    //    let Orientation;
    //   //去获取拍照时的信息，解决拍出来的照片旋转问题
    //  this.Exif.getData(picValue, function() {
    //     Orientation = Exif.getTag(this, "Orientation");
    //   });
    //   console.log(Orientation)
    //   this.imgPreview(picValue);
    },
    // 处理图片
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
     
       if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(file, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(file, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(file, "right", canvas); //转两次
            this.rotateImg(file, "right", canvas);
            break;
        }
      }
    // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
 
      if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            // if (this.result.length <= (100 * 1024)) {
            //   self.headerImage = this.result;
            //   // self.postImg();
            // }else {
            //   img.onload = function () {
            //     let data = self.compress(img,Orientation);
            //     self.headerImage = data;
            //     // self.postImg();
            //   }
            // }
          } 

      }
    },
      // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    // 图片大小提示
    xzdx() {
      Toast("图片太大，请重新上传");
      console.log("1111");
    },
    // 选择框处理
    syxsShow() {
      this.showbox = !this.showbox;
    },
    fwytShow() {
      this.fwytbox = !this.fwytbox;
    },
    // 选择使用形式
    syxsselect(code, name) {
      this.syxs = name;
      this.showbox = false;
      window.sessionStorage.setItem("syxs", code);
      window.sessionStorage.setItem("Syxs", name);
    },
    fwytselect(code, name) {
      this.fwyt = name;
      this.fwytbox = false;
      window.sessionStorage.setItem("fwyt", code);
      window.sessionStorage.setItem("Fwyt", name);
    },

    closePicker() {
      this.showbox = false;
    },
    closeFPicker() {
      this.fwytbox = false;
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    checkfzID() {
      if (this.syxs == "") {
        Toast("形式不能为空");
        return false;
      }
      this.syxserr = "";

      return true;
    },
    checkfzName() {
      if (this.fwyt == "") {
        Toast("用途不能为空");
        return false;
      }
      this.fwyterr = "";
      return true;
    },

    imgselect() {
      this.selectbox = !this.selectbox;
    },
    fwytShow() {
      this.fwytbox = !this.fwytbox;
    },
    qxym() {
      this.show = false;
      this.wcShow = false;
      this.xybShow = true;
      // this.$router.push({
      //   path: "/ryrzjbxx",
      //   query: {
      //     x: 2
      //   }
      // });
    },
    Tzym() {
      // this.$showLoading();
      this.$axios({
        method: "post",
        url: "/house/addHouse",
        data: {
          fwtps: this.fwtps,
          fwyt: window.sessionStorage.getItem("fwyt"),
          fzgmsfhm: window.sessionStorage.getItem("fzid"),
          fzlxdh: window.sessionStorage.getItem("fzPhone"),
          fzxm: window.sessionStorage.getItem("fzname"),
          syxs: window.sessionStorage.getItem("syxs"),
          id: "",
          zzbh: window.sessionStorage.getItem("zzbh"),
          isfz: window.sessionStorage.getItem("isfz")
        }
      }).then(res => {
        if (res.data.code == "1") {
          // this.$hideLoading();
          Toast("保存成功！");
          //  WeixinJSBridge.call('closeWindow');
          //       var userAgent = navigator.userAgent;
          //       if (
          //         userAgent.indexOf("Firefox") != -1 ||
          //         userAgent.indexOf("Chrome") != -1
          //       ) {
          //         window.location.href = "about:blank";
          //       } else if (
          //         userAgent.indexOf("Android") > -1 ||
          //         userAgent.indexOf("Linux") > -1
          //       ) {
          //         window.opener = null;
          //         window.open("about:blank", "_self", "").close();
          //       } else {
          //         window.opener = null;
          //         window.open("about:blank", "_self");
          //         window.close();
          //       }
        } else if(res.data.code == "-1") {
          // this.$hideLoading();
          // // this.msg = "操作失败";
          Toast(res.data.msg);
        }
      }).catch(err=>{
        Toast('房主信息保存失败')
      });
    },
    success() {
      var flag = this.checkfzID() && this.checkfzName();

      if (flag) {
        this.Tzym();
        this.$router.push({
          path: "/ryrzjbxx",
          query: {
            x: 2
          }
        });
      }
    },
    xyb() {
      this.$router.push({
        path: "/ryrzjbxx",
        query: {
          x: 2
        }
      });
    },
    syb() {
      this.$router.push("/fzxxdj");
    }
  },
  created() {
    var syxs = window.sessionStorage.getItem("Syxs");
    var fwyt = window.sessionStorage.getItem("Fwyt");
    if (syxs) {
      this.syxs = syxs;
    }
    if (fwyt) {
      this.fwyt = fwyt;
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
.van-icon {
  font-size: 55px !important;
}
.van-cell {
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
  line-height: 100px !important;
  white-space: pre-wrap;
  text-align: center;
  height: 100px !important;
  width: 500px !important;
  font-size: 35px !important;
}
.van-uploader__upload {
  width: 166px !important;
  height: 166px !important;
  margin: 0 0.074074rem 0.074074rem 0;
  background-color: #fff;
  /* border: 0.009259rem dashed #ebedf0; */
  border-radius: 0.037037rem;

  margin-left: 15px !important;
  margin-top: 15px !important;
}
.van-uploader__wrapper {
  border: 1px solid #4182e0 !important;
  margin-left: 15px !important;
}
.van-uploader__preview-image {
  display: block;
  width: 168px !important;
  height: 168px !important;
  margin-left: 6px !important;
  margin-top: 10px !important;
}
.van-picker__columns {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  cursor: grab;
  z-index: 1000000000;
}
.van-picker-column {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  font-size: 50px !important;
  text-align: center;
}
.van-uploader__preview-delete {
  position: absolute;
  top: -0.074074rem;
  right: -0.074074rem;
  color: #969799;
  font-size: 40px !important;
  background-color: #fff;
  border-radius: 100%;
}
/* .van-cell--required::before {
  position: absolute;
  left: 30px !important;
  color: #ee0a24;
  font-size: 0px !important;
  content: "*";
} */
.van-uploader__upload-icon {
  color: #969799;
  font-size: 50px !important;
}
.van-dialog {
  width: 700px !important;
  height: 500px !important;
  border: 0 !important;
}
.van-button {
  font-size: 50px !important;
  /* border: 1px solid red; */
  height: 95px !important;
  line-height: 95px !important;
  border: 0 !important;
}
.van-dialog__footer--buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0.277778rem !important;
  height: 0.925926rem !important;
  font-size: 0.462963rem;
  border: 0 !important;
}
</style>

<style lang="" scoped >
* {
  padding: 0;
  margin: 0;
}
.showP {
  font-size: 40px;
  height: 100px;
  line-height: 50px;
  width: 100%;
  color: black;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
  margin: 50px 0;
}
.showP1 {
  height: 80px;
  line-height: 80px;
  color: #333333;
}
#content-box {
  height: 1920px;
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
  height: 630px;
  border-radius: 15px;
  background: #ffffff;
  margin: 30px 40px;
  overflow: hidden;
}

.second_box1 {
  width: 900px;
  height: 180px;
  margin: 40px 50px;

  overflow: hidden;
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
  width: 1000px;
  height: 370px;
  margin: 30px 40px;
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
  margin-top: 250px;
  margin-left: 40px;
  color: #ffffff;
  overflow: hidden;
}
.xyb p {
  width: 400px;
  height: 140px;
  line-height: 140px;
  font-size: 40px;
  float: left;
  cursor: pointer;
  background: #086de2;
  text-align: center;
  border-radius: 15px;
  float: left;
}
/* .xyba {
  margin-left: 55px;
} */
.syb {
  margin-left: 55px;
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
<style lang="">
.el-upload--picture-card {
  background-color: #ffffff;
  border-radius: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 186px;
  height: 186px;
  line-height: 186px;
  vertical-align: top;
  border: 1px solid #2b58af;
}
.el-upload--picture-card i {
  font-size: 50px;
  color: #8c939d;
}
.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #fff;
  border: 0.009259rem solid #c0ccda;
  border-radius: 0.055556rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 186px;
  height: 186px;
  margin: 0 0.074074rem 0.074074rem 0;
  display: inline-block;
}
</style>
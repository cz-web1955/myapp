<template>
  <div class="box">
    <div class="first">
      <p class="pppp">{{jwsmc}}</p>
      <p class="fffff">实有人口信息采集</p>
    </div>
    <div class="view">
      <div
        :class="{banner:true,tran:flag}"
        :style="{width:9.259259*datas.length+'rem',marginLeft:-num*9.259259+'rem'}"
      >
        <div class="mgxx" v-for="(item,key) in datas " :key="key">
          <div class="el">
            <img src="../../static/img/mjxx.png" alt="" class="imgs">
            <p class="elp">民警信息</p>
          </div>
          <div style="overflew:hidden">
            <img :src="'data:image/png;base64' +','+item.xp " alt />
            <div class="mgxx_box">
              <p>社区民警：{{item.xm}}</p>
              <p>警号：{{item.jh}}</p>
              <p>电话：{{item.lxdh}}</p>
              <p>备注:{{item.bz}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="view_box">
        <span class="span1" @click="reduce"><</span>
        <span>{{num+1}}/{{datas.length}}</span>
        <span class="span1" @click="add">></span>
      </div>
    </div>
    <div class="box1">
      <div class="second">
        <p>
          <img src="../../static/img/xlb.png" alt />
          <span style="text-indent:1em">{{xqmc}}小区</span>
          <span>居民朋友们：</span>
        </p>
      </div>
      <div class="third">
        在此疫情期间，为了广大居民的安全，我们需要大家如实登记大家的详情信息，做到区不漏户、户不漏人。我们将粘贴登记二维码，
        请使用手机扫码并如实填写，如经核实未如实填写或者不填写，我们将入户开展工作。感谢大家配合！
      </div>
      <div class="four">
        <p>填写说明：</p>
        <ul>
          <li>一、进入填写页面，选择房屋是否本人所有；</li>
          <li>二、如选择是,则进入房主信息登记，如实登记房主基本信息，点击进入下一步，进入步骤三如选择否则直接进入步骤四;</li>
          <li>三、填写房屋使用情况、用途，点击下一步进入步骤四；</li>
          <li>四、进入房主信息登记或入住人员信息登记页面，如实填写身份证、姓名、联系电话、工作单位信息，填写完毕后点击下一步，进入步骤五；</li>
          <li>五、进入房屋使用页面，按照实际情况选择居住类别、地址并完成填写。如有同居人员填写同居人信息，完成房屋登记。</li>
        </ul>
      </div>
    </div>

    <div class="five" @click="confirm">确&nbsp;&nbsp;定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jwsq: "",
      xqmc: "",
      uuid: "",
      jwsmc: "",
      xqmc: "",
      datas: [

      ],
      xm: "",
      jh: "",
      lxdh: "",
      bz: "",
      imgUrl: "",
      flag: true,
      num: "0",
      nums: "1",
      
    };
  },
  created() {
    var url = window.location.href;
     var url =  "http://192.168.1.7:8080/#/fwsyrqr?uuid=5763813AB02501A8E05490E2BAC1E4B0";
     
    // console.log(url.indexOf("&"));
    if (url.indexOf("&") == "-1") {
      this.uuid = url.split("?")[1].split("=")[1];
    } else {
      this.uuid = url
        .split("?")[1]
        .split("&")[0]
        .split("=")[1];
    }

    
    this.Jwsmc();
    // this.mjxx();
  },
  methods: {
    reduce() {
      this.num--;
      if (this.num < 0) {
        this.flag = false;
        this.num = this.datas.length - 1;
        setTimeout(
          function() {
            this.flag = true;
            this.num = this.datas.length - 1;
          }.bind(this),
          16.7
        );
      }
    },
    add() {
      this.num++;
      if (this.num == this.datas.length) {
        // 取消过渡
        this.flag = false;
        // 切换到真实的第一张
        this.num = 0;

        setTimeout(
          function() {
            // 打开过渡
            this.flag = true;
            // 设定到第二张
            this.num = 0;
          }.bind(this),
          16.7
        );
      }
    },
    //   跳转下一页
    confirm() {
      this.$router.push({
        path: "/fwsyrqr",
        query: {
          uuid: this.uuid
        }
      });
    },
    // 获取警务室名称，小区名称
    Jwsmc() {
      this.$axios({
        method: "get",
        url: "/standardAddress/getJwsInfo",
        params: {
          uuid: this.uuid
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.jwsmc = res.data.result.jwsmc;
          this.xqmc = res.data.result.xqmc;
          this.mjxx(res.data.result.officeCode);
        }
      }).catch(err=>{

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
          // this.mjxxlength = res.data.result.length;
          // this.xm = res.data.result.xm;
          // this.jh = res.data.result.jh;
          // this.lxdh = res.data.result.lxdh;
          // this.bz = res.data.result.bz;
          // this.imgUrl = "data:image/png;base64" + "," + res.data.result.xp;
          this.datas=res.data.result
        }
      });
    }
  }
};
</script>
<style lang="" scoped>
.banner {
  overflow: hidden;
}
.tran {
  transition: all 0.5s;
}
* {
  margin: 0;
  padding: 0;
}
.box {
  background-image: url(../../static/img/ba.png);
  background-repeat: no-repeat;
  background-position: center center;
  height: 2370px;
  width: 100%;
  overflow: hidden;
}
.box1 {
  width: 1000px;
  height: 1250px;
  background: #ffffff;
  margin: 50px 40px;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 100px;
  overflow: hidden;
}
.first {
  width: 920px;
  height: 150px;
  margin: 60px 40px;
  overflow: hidden;
}
.fffff {
  width: 100%;
  height: 100px;
  line-height: 100px;

  text-align: center;
  font-size: 50px;
  color: #0557a6;
  font-weight: bold;
}
.pppp {
  width: 100%;
  height: 50px;

  line-height: 50px;
  text-align: center;
  color: #0557a6;
  font-weight: bold;
  font-size: 38px !important;
}
.view {
  width: 1000px;
  height: 500px;
  margin-left: 40px;
  border-radius: 25px;
  overflow: hidden;
  background: #ffffff;
  position: relative;
}
.view_box {
  position: absolute;
  bottom: 10px;
  right: 0;
  width: 380px;
  height: 75x;
  font-size: 40px;
  overflow: hidden;
}
.view_box span {
  float: left;
}
.span1 {
  width: 70px;
  font-weight: bold;
  height: 70px;
  text-align: center;
  line-height: 70px;
  background: #e6e7f0;
  border-radius: 35px;
  margin: 0 25px;
}
.el{
  width: 900px;
  height: 60px;
  font-size: 35px;
  overflow: hidden;
  margin-top: 20px;
  margin-left: 40px;

}
.el .imgs {
  float: left;
  width: 50px;
  height: 50px;
 margin: 0;
  padding: 0;
}
 .el  .elp{
  width: 200px;
  height: 60px;
  line-height: 60px;
  text-align: left;
    text-indent: 0.5em;
float: left;
font-weight: bold;
color: #4a4a4a;
}
.mgxx {
  width: 1000px;
  height: 500px;
  float: left;
  overflow: hidden;
  background: #ffffff;
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
.second {
  width: 920px;
  font-size: 36px;
  height: 50px;
  margin-left: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 40px;
  /* overflow: hidden; */
}
.second img {
  width: 55px;
  height: 55px;
  float: left;
}
.second span {
  float: left;
}
.third {
  width: 920px;
  font-size: 35px;
  font-weight: bold;
  text-indent: 2em;
  word-wrap: break-word;
  margin-left: 40px;
  line-height: 60px;
  overflow: hidden;
}
.four {
  width: 920px;
  margin-left: 40px;
  font-size: 35px;
  font-weight: bold;
  overflow: hidden;
}
.four p {
  text-indent: 2em;
  font-size: 40px;
}
.four li {
  width: 100%;
  margin-top: 30px;
  word-wrap: break-word;
  text-indent: 2em;
}
.five {
  width: 500px;
  height: 150px;
  line-height: 150px;
  background: #076de2;
  text-align: center;
  font-size: 60px;
  color: #ffffff;
  margin-left: 290px;
  border-radius: 80px;
}
</style>
<template>
  <div>
    <div class="goodlife">
      <ul class="headul">
        <li
          v-for="(item,index) in lilist"
          :key="index"
          :class="item.checked?'blue':''"
          @click="changeliAct(index)"
        >{{item.liname}}</li>
      </ul>
    </div>
    <div class="goodlife">
      <img src="../assets/imgs/goodlife.jpg" class="banner" />
    </div>
    <ListSort />
  </div>
</template>

<script>
import ListSort from "../components/ListSort";
export default {
  data() {
    return {
      lilist: [
        {
          liname: "全部生活精品",
          actNum: 100,
          checked: true
        },
        {
          liname: "车模",
          actNum: 0,
          checked: false
        },
        {
          liname: "箱包",
          actNum: 1,
          checked: false
        },
        {
          liname: "万宝龙特别款",
          actNum: 2,
          checked: false
        },
        {
          liname: "儿童系列",
          actNum: 3,
          checked: false
        },
        {
          liname: "创意礼品",
          actNum: 4,
          checked: false
        },
        {
          liname: "服饰配件",
          actNum: 5,
          checked: false
        },
        {
          liname: "眼镜手表",
          actNum: 6,
          checked: false
        },
        {
          liname: "自行车",
          actNum: 7,
          checked: false
        }
      ]
    };
  },
  watch: {
    lilist: {
      //深度监听
      handler: function() {
        let Allchecked = false;
        let newlilist = this.lilist.filter((item, i) => {
          if (i > 0) {
            return item.checked;
          }
        });
        if (
          newlilist.length == this.lilist.length - 1 ||
          newlilist.length == 0
        ) {
          Allchecked = true;
        }
        this.lilist[0].checked = Allchecked;
      },
      deep: true
    }
  },
  components: {
    ListSort
  },
  methods: {
    changeliAct(index) {
      if (index == 0) {
        if (!this.lilist[0].checked) {
          this.lilist.forEach(item => {
            item.checked = false;
          });
        }
      } else {
        this.lilist[index].checked = !this.lilist[index].checked;
      }
      this.$store.commit("goodlifeMut", this.lilist);
    }
  },
  created() {
    this.$store.state.wherego = 1;
    this.$store.commit("searchDataTypeMut", 100);
  }
};
</script>

<style scoped>
.blue {
  color: blue;
  background: pink;
}
.headul {
  border: 1px solid rgb(233, 233, 233);
  overflow: hidden;
  margin: 20px 0px;
}
.headul li {
  float: left;
  width: 11%;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.goodlife {
  margin: 0 100px;
  min-width: 1200px;
}
.banner {
  width: 100%;
}
</style>
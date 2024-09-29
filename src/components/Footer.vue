<template>
  <div class="footer">
    <div>
      <div>
        <div class="left">法律声明</div>
        <div class="right">京ICP备08004883号</div>
      </div>
      <hr />
      <div>
        <div class="right">© BMW 中国 2018</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background: rgb(142, 142, 142);
  color: white;
}
.footer > div {
  margin: 0 100px;
  min-width: 1200px;
}
.footer > div > div {
  height: 40px;
  line-height: 40px;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
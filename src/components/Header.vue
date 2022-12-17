<template>
  <header id="header">
    <div id="fakelogo">
      GREATER<br>
      NEW ORLEANS<br>
      FOUNDATION
    </div>
    <div id="faketitle">
      <span id="line1">1  0  0</span><br>
      <span id="line2">Y E A R S</span><br>
      <span id="line3">1923 - 2023</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  setup () {
    return {}
  }
}
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  background-color: #00a1e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
#fakelogo {
  text-align: right;
}
#faketitle {
  text-align: justify;
  padding-left: 5px;
  width: 100px;
}
#line1 {
  font-size: 20px;
  line-height: 0px;
}
#line2 {
  font-size: 16px;
  line-height: 0px;
}
#line3 {
  font-size: 14px;
  line-height: 0px;
}
</style>
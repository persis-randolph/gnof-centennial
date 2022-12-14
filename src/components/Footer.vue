<template>
  <div id="footer">
    <span>CONTACT</span>
    <address>
      919 St. Charles Avenue<br>
      Center for Philanthropy<br>
      New Orleans, Louisiana 70130<br>
      www.gnof.org
    </address>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  setup() {
    return {}
  }
}
</script>

<style scoped>
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 150px;
  width: 100%;
  background-color: navy;
}
* {
  color: white;
  text-align: left;
  padding: 10px 20px;
}
span {
  padding-bottom: 0;
}
address {
  font-style: normal;
  font-weight: bold;
}
</style>
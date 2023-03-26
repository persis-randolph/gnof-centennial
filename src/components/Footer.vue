<template>
  <div>
    <div id="footer-head">
      <!-- <div id="contact-online-container"> -->
        <div id="logo-container">
          <img src="../assets/GNOF_CentennialLogo_RGB_Full_Color.png" id="color-logo">
        </div>
        <div id="contact-container">
          <div id="contact">
            <h3>CONTACT</h3>
            <address>
              919 St. Charles Avenue<br>
              Center for Philanthropy<br>
              New Orleans, Louisiana 70130
            </address>
          </div>
          <div id="online">
            <h3 id="online-header">ONLINE</h3>
            <a href="http://www.gnof.org" target="_blank">www.gnof.org</a>
            <div id="icons">
              <a href="https://www.facebook.com/greaterneworleansfoundation/" target="_blank">
                <img src="../assets/Icon_awesome-facebook-f.png" class="icon">
              </a>
              <a href="https://twitter.com/GNOFoundation" target="_blank">
                <img src="../assets/Icon_awesome-twitter.png" class="icon">
              </a>
              <a href="https://www.instagram.com/gnofoundation" target="_blank">
                <img src="../assets/Icon_awesome-instagram.png" class="icon">
              </a>
            </div>
          </div>
        </div>
    </div>
    <div id="copyright">
      <div id="copyright-text">Copyright &copy; 2023 Greater New Orleans Foundation. All rights reserved.</div>
    </div>
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
a, a:link, a:visited, a:hover, a:active {
  color: white;
  text-decoration: none;
}
#footer-head {
  display: flex;
  width: 100%;
}
address, a {
  font-style: normal;
  font-size: 14px;
}
#online {
  display: flex;
  flex-direction: column;
}
#icons {
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
#online {
  margin: 20px 0 20px 20px;
}
#contact {
  margin: 20px 0 20px 20px;
}
#contact-container {
  display: flex;
  background-color: #04307e;
  width: 50%;
  height: 100%;
  text-align: left;
  color: white;
  flex-direction: row;
  /* padding: 20px; */
}
#logo-container {
  background-color: white;
  width: 50%;
  text-align: right;
}
#color-logo {
  width: 200px;
  display: inline-block;
  margin: 20px 20px 0 0;
}
#copyright {
  width: 100%;
  height: 40px;
  background-color: #00A9E0;
  display: table;
  color: white;
  font-size: 14px;
}
#copyright-text {
  vertical-align: middle;
  display: table-cell;
}

@media only screen and (max-width: 650px)  {
  #footer-head {
    display: block;
  }
  #logo-container {
    text-align: center;
    width: 100%;
  }
  #contact-container {
    width: 100%;
    flex-direction: column;
  }
  #online-header {
    display: none;
  }
  #online {
    margin: 0 0 20px 20px;
  }
  #contact {
    margin: 20px 0 0 20px;
  }
  #color-logo {
    margin: 20px;
  }
}
</style>
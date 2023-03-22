<template>
  <!-- width="560" height="315" -->
  <div id="container">
    <iframe
      src="https://www.youtube.com/embed/3JHBlzGwIZE?autoplay=1&mute=1&color=white&modestbranding=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowfullscreen
      id="animation"
    ></iframe>
  </div>
</template>

<style scoped>
#animation {
  width: 1280px;
  height: 720px;
}

@media only screen and (max-width: 1200px)  {
  #animation {
    width: 880px;
    height: 495px;
  }
}

@media only screen and (max-width: 875px)  {
  #animation {
    width: 640px;
    height: 360px;
  }
}

@media only screen and (max-width: 635px)  {
  #animation {
    width: 480px;
    height: 270px;
  }
}

@media only screen and (max-width: 475px)  {
  #animation {
    width: 400px;
    height: 225px;
  }
}

#container {
  background-color: rgb(214, 205, 205);
  height: fit-content;
  width: 100%;
}
</style>
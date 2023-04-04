<!-- current youtube player options:
  only suggests videos from gnof channel (cannot disable completely)
  autoplay on
  automatically mutes
  white load bar (default is red)
  modest youtube branding is on -->
  
<template>
  <div class="wrapper">
    <div class="h_iframe">
      <!-- transparent image -->
      <img class="ratio" src="http://placehold.it/16x9"/>
      <!-- <video
        allow="fullscreen"
        frameBorder="0"
        controls
        autoplay
        controlsList="nodownload"
      >
        <source src="https://gnof-centennial.s3.us-east-2.amazonaws.com/GNOF+LOGOS_v04.mp4" />
      </video> -->
      <iframe
        src="https://www.youtube.com/embed/3JHBlzGwIZE?rel=0&autoplay=1&mute=1&color=white&modestbranding=1"
        title="GNOF Logo Through the Years - Video Player"
        frameborder="0"
        id="animation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #CCC;
}
.h_iframe {
  position: relative;
}
.h_iframe .ratio {
  display: block;
  width: 100%;
  height: auto;
}
.h_iframe iframe {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
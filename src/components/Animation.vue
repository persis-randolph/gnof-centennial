<!-- current youtube player options:
  only suggests videos from gnof channel (cannot disable completely)
  autoplay on
  automatically mutes
  white load bar (default is red)
  modest youtube branding is on -->
  
<template>
  <div class="wrapper">
    <div class="h_iframe">
      <div class="inner-wrapper">
        <iframe
          src="https://player.vimeo.com/video/815437038?h=358b0141c0&autoplay=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          title="Greater New Orleans Foundation - Our Logo Through the Years"
        ></iframe>
      </div>
      <!-- <script src="https://player.vimeo.com/api/player.js"></script> -->
      <!-- transparent image -->
      <!-- <img class="ratio" src="http://placehold.it/16x7"/> -->
      <!-- <video
        allow="fullscreen"
        frameBorder="0"
        controls
        autoplay
        controlsList="nodownload"
      >
        <source src="https://gnof-centennial.s3.us-east-2.amazonaws.com/GNOF+LOGOS_v04.mp4" />
      </video> -->
      <!-- <iframe
        src="https://www.youtube.com/embed/3JHBlzGwIZE?rel=0&autoplay=1&mute=1&color=white&modestbranding=1"
        title="GNOF Logo Through the Years - Video Player"
        frameborder="0"
        id="animation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen
      ></iframe> -->
    </div>
  </div>
</template>

<style scoped>
iframe {
  position: absolute;
  top: 0;
  left: 0;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  width: 100%;
  height: 100%;
  max-height: 600px;
}
.inner-wrapper {
  padding: 56.25% 0 0 0;
  position: relative;
}
.wrapper {
  width: 90%;
  height: 90%;
  max-height: 600px;
  margin: 0 auto;
  background-color: black;
}
/* .h_iframe {
  position: relative;
} */
/* set invert to 0 for black, 1 for white if using background image and not just built-in video black */
/* .h_iframe .ratio {
  display: block;
  width: 100%;
  height: auto;
} */
/* .h_iframe iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
} */
</style>
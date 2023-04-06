<template>
    <div>
        <div
            class="modal-background"
            @click="closeLightbox"
        ></div>
        <div class="lightbox">
            <!-- <button @click="closeLightbox">Close</button> -->
            <div class="image-wrapper">
                <!-- <div id="wrap">
                    <iframe id="scaled-frame" :src="imageUrl"></iframe>
                </div> -->
                <!-- <vue-pdf-embed :source="imageUrl" /> -->
                <iframe
                    v-if="getFileType(imageUrl) === 'pdf'"
                    :src="imageUrl"
                    type="application/pdf"
                    width="100%"
                    height="500px"
                />
                <img :src="imageUrl" :id="imageUrl" v-if="getFileType(imageUrl) === 'image'">
                <!-- <img :src="imageUrl" /> -->
                <!-- <div class="wrapper">
                    <div class="h_iframe">
                    transparent image
                    <img class="ratio" src="http://via.placeholder.com/640x360"/>
                    <iframe
                        :src="imageUrl"
                        title="CHANGE ME"
                        frameborder="0"
                        id="CHANGE ME"
                    ></iframe>
                    </div>
                </div> -->
                <!-- <iframe :src="imageUrl"></iframe> -->
                <div class="caption" v-html="captionText"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Lightbox',
    props: {
        imageUrl: {
            type: String
        },
        captionText: {
            type: String
        }
    },
    emits: ['close-lightbox'],
    setup (props, { emit }) {
        const closeLightbox = () => {
            emit('close-lightbox')
        }

        const getFileType = (imageUrl) => {
            const last3Chars = imageUrl.slice(-3)
            console.log(last3Chars)
            switch (last3Chars) {
                case 'png':
                case 'jpg':
                    return 'image'
                case 'pdf':
                    return 'pdf'
            }
        }

        return {
            getFileType,
            closeLightbox
        }
    }
}
</script>

<style scoped>
/* .wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  color: white;
} */
/* .h_iframe {
  position: relative;
} */
/* set invert to 0 for black, 1 for white if using background image and not just built-in video black */
/* filter: brightness(0) invert(1);
.h_iframe .ratio {
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
/* img { */
    /* border: 0.5px solid #dedada; */
    /* margin-bottom: 5px; */
    /* display: block; */
    /* max-width: 100%; */
    /* height: auto; */
    /* width: auto\9; */
/* } */
.lightbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #04307e;
    color: #ffffff;
    z-index: 10;
    border-radius: 8px;
    padding: 5px;
    max-height: 80%;
    max-width: 80%;
}
.modal-background {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 8;
    background-color: rgba(0, 0, 0, 0.6);
}
embed {
    /* height: 1000px;
    width: 1000px; */
}
.caption {
    z-index: 11;
    font-size: 14px;
    color: white;
    padding: 5px 0;
    /* text-align: left; */
}
.image-wrapper {
    /* position: relative; */
    /* text-align: left; */
    /* width: 600px; */
    /* height: 390px; */
    max-width: 80vw;
    max-height: 80vh;
    padding: 0;
    overflow: hidden;
}
iframe {
    /* transform: scale(0.5); */
}

img {
    max-width: 80vw;
    max-height: 80vh;
}

/* #wrap {
  width: 1000px;
  height: 1000px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#scaled-frame {
  width: 1000px;
  height: 1500px;
  border: 0px;
} */

#scaled-frame {
  /* transform: scale(0.5); */
}
</style>
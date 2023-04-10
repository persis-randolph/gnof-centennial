<template>
    <div>
        <div
            class="modal-background"
            @click="closeLightbox"
        ></div>
        <div class="lightbox">
            <div class="image-wrapper">
                <div class="icon-container">
                    <img src="../assets/Icons_X_Light.svg" class="icon" @click="closeLightbox">
                </div>
                <!-- IF ISSUU EMBED -->
                <div v-if="imageArray[imageIndex].issuuEmbed" class="embed-wrapper">
                    <iframe
                        class="embed-iframe"
                        allow="clipboard-write"
                        sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                        allowfullscreen="true"
                        :src="imageArray[imageIndex].issuuEmbed"
                    ></iframe>
                </div>
                <!-- IF VIMEO EMBED -->
                <div v-if="imageArray[imageIndex].vimeoEmbed" class="embed-wrapper">
                    <iframe
                        :src="imageArray[imageIndex].vimeoEmbed"
                        width="640"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <!-- IF YOUTUBE EMBED -->
                <div v-if="imageArray[imageIndex].youTubeEmbed">
                    <iframe
                        width="560" height="315"
                        :src="imageArray[imageIndex].youTubeEmbed + '?rel=0&modestbranding=1'"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowfullscreen>
                    </iframe>
                </div>
                <div v-if="getFileType(imageArray[imageIndex].clickThrough) === 'pdf'">
                    <iframe
                        :src="imageArray[imageIndex].clickThrough + '#view=fitH'"
                        frameborder="1"
                        type="application/pdf"
                        width="700px"
                        height="1000px"
                    />
                </div>
                <img :src="imageArray[imageIndex].clickThrough" :id="imageArray[imageIndex].clickThrough" v-if="getFileType(imageArray[imageIndex].clickThrough) === 'image'">
            </div>
            <div class="caption" v-html="imageArray[imageIndex].description"></div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
    name: 'Lightbox',
    props: {
        imageIndex: {
            type: Number
        },
        imageArray: {
            type: Array
        }
    },
    emits: ['close-lightbox'],
    setup (props, { emit }) {
        onMounted(() => {
            console.log('PROPS', props)
        })
        
        const closeLightbox = () => {
            emit('close-lightbox')
        }

        const getFileType = (imageUrl) => {
            const last3Chars = imageUrl.slice(-3)
            switch (last3Chars) {
                case 'png':
                case 'jpg':
                    return 'image'
                case 'pdf':
                    return 'pdf'
                default:
                    return null
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
.embed-wrapper {
    position: relative;
    padding-top: max(60%, 326px);
    height: 0;
    width: 100%;
}
.embed-iframe {
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
    max-height: 80vh;
    max-width: 80vw;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
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
.caption {
    z-index: 11;
    font-size: 14px;
    color: white;
    padding: 5px;
    width: 100%;
    background-color: #04307e;
    transform: translateX(-5px);
    border-radius: 0 0 8px 8px;
}
.image-wrapper {
    max-width: 80vw;
    max-height: 80vh;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
.icon-container {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
}
.icon {
    width: 20px;
    margin-bottom: 2px;
    cursor: pointer;
}
</style>
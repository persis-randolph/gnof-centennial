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
                <div v-if="imageArray[indexToShow].issuuEmbed" class="embed-wrapper">
                    <iframe
                        class="embed-iframe"
                        allow="clipboard-write"
                        sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                        allowfullscreen="true"
                        :src="imageArray[indexToShow].issuuEmbed"
                    ></iframe>
                </div>
                <!-- IF VIMEO EMBED -->
                <div v-if="imageArray[indexToShow].vimeoEmbed" class="embed-wrapper">
                    <iframe
                        :src="imageArray[indexToShow].vimeoEmbed"
                        width="640"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <!-- IF YOUTUBE EMBED -->
                <div v-if="imageArray[indexToShow].youTubeEmbed">
                    <iframe
                        width="560" height="315"
                        :src="imageArray[indexToShow].youTubeEmbed + '?rel=0&modestbranding=1'"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowfullscreen>
                    </iframe>
                </div>
                <div v-if="getFileType(imageArray[indexToShow].clickThrough) === 'pdf'">
                    <iframe
                        :src="imageArray[indexToShow].clickThrough + '#view=fitH'"
                        frameborder="1"
                        type="application/pdf"
                        width="700px"
                        height="1000px"
                    />
                </div>
                <img :src="imageArray[indexToShow].clickThrough" :id="imageArray[indexToShow].clickThrough" v-if="getFileType(imageArray[indexToShow].clickThrough) === 'image'">
            </div>
            <div
                class="caption"
                :class="!showLeftArrow && !showRightArrow ? 'bottom' : ''"
                v-html="imageArray[indexToShow].description">
            </div>
            <div
                v-if="showLeftArrow || showRightArrow" 
                class="image-selectors"
                :class="showLeftArrow || showRightArrow ? 'bottom' : ''" 
            >
                <div
                    v-if="showLeftArrow"
                    class="image-selector"
                    @click="toggleImage(-1)"
                >
                    &lt;
                </div>
                <div
                    v-if="showRightArrow"
                    class="image-selector"
                    @click="toggleImage(1)"
                >
                    &gt;
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'

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

        const indexToShow = ref(props.imageIndex)

        const showLeftArrow = computed(() => {
            const imageCount = props.imageArray.length
            return imageCount > 1 && indexToShow.value !== 0
        })
        const showRightArrow = computed(() => {
            const imageCount = props.imageArray.length
            return imageCount > 1 && indexToShow.value !== (imageCount - 1)
        })
        
        const toggleImage = (change) => {
            indexToShow.value = indexToShow.value + change
        }

        return {
            getFileType,
            closeLightbox,
            toggleImage,
            indexToShow,
            showLeftArrow,
            showRightArrow
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
.lightbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
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
    margin: 0 20px;
    width: 100%;
    background-color: #04307e;
    transform: translateX(-25px);
}
.image-wrapper {
    max-width: 80vw;
    max-height: 80vh;
    padding: 0 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
img {
    max-width: 80vw;
    max-height: 80vh;
}
.icon-container {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
}
.icon {
    width: 20px;
    margin-bottom: 2px;
    margin-right: -20px;
    cursor: pointer;
}
.image-selectors {
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: #04307e;
    padding: 5px;
    transform: translateX(-5px);
}
.image-selector {
    padding: 0 10px;
    cursor: pointer;
    font-size: 24px;
}
.bottom {
    border-radius: 0 0 8px 8px;
}
</style>
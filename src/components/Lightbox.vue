<template>
    <div>
        <div
            class="modal-background"
            @click="closeLightbox"
        ></div>
        <div :class="lightboxClasses">
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
                <div v-if="imageArray[indexToShow].vimeoEmbed">
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
                <!-- IF PDF -->
                <div v-if="getFileType(imageArray[indexToShow].clickThrough) === 'pdf' && !imageArray[indexToShow].issuuEmbed">
                    <iframe
                        :src="imageArray[indexToShow].clickThrough + '#view=fitH'"
                        frameborder="1"
                        type="application/pdf"
                        class="pdf-iframe"
                    />
                </div>
                <img :src="imageArray[indexToShow].clickThrough" :id="imageArray[indexToShow].clickThrough" v-if="getFileType(imageArray[indexToShow].clickThrough) === 'image'">
            </div>
            <div
                :class="captionClasses"
                v-html="imageArray[indexToShow].description">
            </div>
            <div
                v-if="showLeftArrow || showRightArrow"
                :class="imageSelectorClasses"
            >
                <div
                    v-if="showLeftArrow"
                    class="image-selector"
                    @click="toggleImage(-1)"
                >
                    <img src="../assets/Icons_ArrowLeft_Light.svg">
                </div>
                <span class="image-number">{{ (imageIndexMap[indexToShow]) + '/' + viewableImageCount }}</span>
                <div
                    v-if="showRightArrow"
                    class="image-selector"
                    @click="toggleImage(1)"
                >
                    <img src="../assets/Icons_ArrowRight_Light.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'

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
            const viewIndex = imageIndexMap.value[indexToShow.value]
            return viewableImageCount.value > 1 && viewIndex !== 1
        })
        const showRightArrow = computed(() => {
            const viewIndex = imageIndexMap.value[indexToShow.value]
            return viewableImageCount.value > 1 && viewIndex !== (viewableImageCount.value)
        })
        
        const toggleImage = (change) => {
            indexToShow.value = indexToShow.value + change
        }

        const viewableImageCount = computed(() => {
            return props.imageArray.reduce((acc, image) => {
                if (image.clickThrough && (image.type && image.type === 'external-link')) acc += 1
                return acc
            }, 0)
        })

        const preloadImages = () => {
            for (let image of props.imageArray) {
                if (image.clickThrough) {
                    if (image.clickThrough.slice(-3) === 'png' && !image.issueEmbed) {
                        let imageToLoad = new Image()
                        imageToLoad.src = image.clickThrough
                    }
                }
            }
        }

        const lightboxClasses = computed(() => {
            let classStr = 'lightbox'
            if (props.imageArray[indexToShow.value].issuuEmbed) classStr += ' issuu-lightbox'
            if (getFileType(props.imageArray[indexToShow.value].clickThrough) === 'pdf' && !props.imageArray[indexToShow.value].issuuEmbed) {
                classStr += ' pdf-lightbox'
            }
            return classStr
        })

        const captionClasses = computed(() => {
            let classStr = 'caption'
            if (!showLeftArrow.value && !showRightArrow.value) classStr += ' bottom'
            if (getFileType(props.imageArray[indexToShow.value].clickThrough) === 'pdf' && !props.imageArray[indexToShow.value].issuuEmbed) {
                classStr += ' pdf-caption'
            }
            return classStr
        })

        const imageSelectorClasses = computed(() => {
            let classStr = 'image-selectors'
            if (showLeftArrow.value || showRightArrow.value) classStr += ' bottom'
            if (getFileType(props.imageArray[indexToShow.value].clickThrough) === 'pdf' && !props.imageArray[indexToShow.value].issuuEmbed) {
                classStr += ' pdf-image-selectors'
            }
            return classStr
        })

        const imageIndexMap = ref({})
        onMounted(() => {
            preloadImages()
            let viewIndex = 1
            for (let i = 0; i < props.imageArray.length; i++) {
                if (props.imageArray[i].clickThrough) {
                    imageIndexMap.value[i] = viewIndex
                    viewIndex++
                }

            }
        })

        return {
            getFileType,
            closeLightbox,
            toggleImage,
            captionClasses,
            imageIndexMap,
            imageSelectorClasses,
            indexToShow,
            lightboxClasses,
            showLeftArrow,
            showRightArrow,
            viewableImageCount
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
.pdf-iframe {
    min-width: 80vw;
    min-height: 80vh;
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
.issuu-lightbox {
    min-width: 80%
}
.pdf-lightbox {
    min-width: 90%;
    min-height: 90%;
    align-items: center;
    display: flex;
    flex-direction: column;
    top: 55%;
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
.pdf-caption {
    transform: translateX(0);
    transform: translateY(35px);
}
.image-number {
    font-size: 14px;
    margin: auto 0;
}
.image-wrapper {
    max-width: 80vw;
    max-height: 80vh;
    padding: 0 20px;
    /* overflow: hidden; */
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
.pdf-image-selectors {
    transform: translateX(0);
    transform: translateY(35px);
}
.image-selector {
    cursor: pointer;
    width: 14px;
    height: 14px;
    margin: 0 5px;
}
.bottom {
    border-radius: 0 0 8px 8px;
}
</style>
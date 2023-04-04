<template>
    <!-- EACH IMAGE -->
    <div class="single-image-container" @mouseover="hover = true" @mouseleave="hover = false">
        <!-- <a :href="image.clickThrough" target="_blank"> -->
        <img
            :src="image.url"
            :class="image.rightMargin ? 'image-half-left' : 'image'"
            :alt="image.description"
            @click="openLightbox(image.clickThrough, image.description)"
        >
        <!-- </a> -->
        <!-- CAPTION BACKGROUND -->
        <div class="caption-background" v-if="hover">
            <!-- CAPTION -->
            <div class="caption" v-html="image.description"></div>
        </div>
        <!-- OPTIONAL ICON -->
        <!-- <a :href="image.clickThrough" target="_blank" v-if="image.icon"> -->
        <div @click="openLightbox(image.clickThrough, image.description)">
            <img v-if="image.icon === 'dark'" src="../assets/Icons_Search_Dark.svg" class="icon">
            <img v-if="image.icon === 'light'" src="../assets/Icons_Search_Light.svg" class="icon">
            <img v-if="image.icon === 'video-dark'" src="../assets/Icons_Play_Dark.svg" class="icon">
            <img v-if="image.icon === 'video-light'" src="../assets/Icons_Play_Light.svg" class="icon">
        </div>
        <!-- </a> -->
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Image',
    props: {
        // has possible keys of description, url, clickThrough, size, and icon, rightMargin
        image: {
            type: Object
        },
        key: {
            type: String
        }
    },
    emits: ['open-lightbox'],
    setup (_, { emit }) {
        const hover = ref(false)

        const openLightbox = (linkToImage, captionText) => {
            if (linkToImage) {
                emit('open-lightbox', { linkToImage, captionText })
            }
        }

        return {
            hover,
            openLightbox
        }
    }
}
</script>

<style scoped>
.image {
    border: 0.5px solid #dedada;
    margin-bottom: 5px;
    display: block;
    max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
}

.image-half-left {
    border: 0.5px solid #dedada;
    margin-bottom: 5px;
    margin-right: 5px;
    display: block;
    max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
}

@media only screen and (max-width: 700px)  {
  .image-half-left {
    border: 0.5px solid #dedada;
    margin-bottom: 5px;
    margin-right: 0;
    display: block;
  }
}

.single-image-container {
    position: relative;
}

.caption {
    z-index: 4;
    font-size: 12px;
    color: white;
    padding: 10px;
}

.caption-background {
    z-index: 3;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: left;
}

.icon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    z-index: 5;
}
</style>
<template>
    <!-- EACH IMAGE -->
    <div class="single-image-container" @mouseover="hover = true" @mouseleave="hover = false">
        <a :href="image.clickThrough" target="_blank">
            <img :src="image.url" :class="image.rightMargin ? 'image-half-left' : 'image'" :alt="image.description">
        </a>
        <!-- CAPTION BACKGROUND -->
        <div class="caption-background" v-if="hover">
            <!-- CAPTION -->
            <div :class="image.icon ? 'caption-with-icon' : 'caption'">{{ image.description }}</div>
        </div>
        <!-- OPTIONAL ICON -->
        <a :href="image.clickThrough" target="_blank" v-if="image.icon">
            <img v-if="image.icon === 'dark'" src="../assets/pdf_dark.svg" class="icon">
            <img v-if="image.icon === 'light'" src="../assets/pdf_light.svg" class="icon">
        </a>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Image',
    props: {
        // has possible keys of description, url, clickThrough, size, and icon
        image: {
            type: Object
        },
        key: {
            type: String
        }
    },
    setup () {
        const hover = ref(false)

        return {
            hover
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
    /* margin-right: 5px; */
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

.caption-with-icon {
    z-index: 4;
    font-size: 12px;
    color: white;
    padding: 10px 10px 10px 55px;
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
    bottom: 5px;
    left: 0;
    width: 50px;
    z-index: 5;
}
</style>
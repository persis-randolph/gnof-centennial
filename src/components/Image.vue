<template>
    <!-- EACH IMAGE -->
    <div class="single-image-container" @mouseover="hover = true" @mouseleave="hover = false">
        <img
            v-if="!image.type || image.type !== 'external-link'"
            :src="image.url"
            :class="imageClasses"
            :alt="image.description"
            @click="openLightbox"
        >
        <a
            v-if="image.type && image.type === 'external-link'"
            :href="image.clickThrough"
            target="_blank"
        >
            <img
                :src="image.url"
                :class="imageClasses"
                :alt="image.description"
            >
        </a>
        <!-- CAPTION BACKGROUND -->
        <div class="caption-background" v-if="hover || isSmallScreenWidth">
            <!-- CAPTION -->
            <div class="caption" v-html="image.description"></div>
        </div>
        <!-- OPTIONAL ICON -->
        <div @click="openLightbox">
            <img v-if="image.icon === 'dark'" src="../assets/Icons_Search_Dark.svg" class="icon">
            <img v-if="image.icon === 'light'" src="../assets/Icons_Search_Light.svg" class="icon">
            <img v-if="image.icon === 'video-dark'" src="../assets/Icons_Play_Dark.svg" class="icon">
            <img v-if="image.icon === 'video-light'" src="../assets/Icons_Play_Light.svg" class="icon">
        </div>
    </div>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

export default {
    name: 'Image',
    props: {
        // has possible keys of description, url, clickThrough, size, and icon, rightMargin
        image: {
            type: Object
        },
        key: {
            type: String
        },
        imageIndex: {
            type: Number
        },
        imageArray: {
            type: Array
        }
    },
    emits: ['open-lightbox'],
    setup (props, { emit }) {
        const hover = ref(false)

        const openLightbox = () => {
            if (props.image.clickThrough) {
                emit('open-lightbox', { imageIndex: props.imageIndex, imageArray: props.imageArray })
            }
        }

        const imageClasses = computed(() => {
            let classStr = ''
            classStr += props.image.rightMargin ? 'image-half-left ' : 'image '
            classStr += props.image.clickThrough ? 'add-cursor' : ''
            return classStr
        })

        const windowWidth = ref(window.innerWidth)
        const isSmallScreenWidth = computed(() => {
            return windowWidth.value <= 700
        })
        // on resize, recalculating position maps since the positions will vary due to width
        const onResize = () => {
            windowWidth.value = window.innerWidth
        }

        onMounted(() => {
            nextTick(() => {
                window.addEventListener('resize', onResize)
            })
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', onResize)
        })

        return {
            hover,
            imageClasses,
            isSmallScreenWidth,
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

.add-cursor {
    cursor: pointer;
}

.image-half-left {
    border: 0.5px solid #dedada;
    margin-bottom: 5px;
    margin-right: 3px;
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
    /* border: 0.5px solid #dedada; */
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
    width: 35px;
    z-index: 5;
}
</style>
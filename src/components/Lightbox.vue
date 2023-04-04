<template>
    <div>
        <div
            class="modal-background"
            @click="closeLightbox"
        ></div>
        <div class="lightbox">
            <button @click="closeLightbox">Close</button>
            <img :src="imageUrl" />
            <div class="caption">{{ captionText }}</div>
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
    setup (_, { emit }) {
        const closeLightbox = () => {
            emit('close-lightbox')
        }

        return {
            closeLightbox
        }
    }
}
</script>

<style scoped>
img {
    border: 0.5px solid #dedada;
    margin-bottom: 5px;
    display: block;
    max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
    margin: 10px auto;
}
.lightbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #04307e;
    color: #ffffff;
    z-index: 10;
    padding: 10px;
    border-radius: 8px;
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
</style>
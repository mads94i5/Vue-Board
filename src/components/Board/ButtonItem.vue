<template>
    <div>
        <button @click="clickAction" :style="{ width: buttonWidth }" >{{ text }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonItem',
    props: {
        text: String,
        addItem: Function,
        buttonWidth: String,
    },
    setup(props, { emit }) {
        const clickAction = () => {
            emit('click-action');
        };
        return {
            clickAction,
        };
    },
});
</script>

<style scoped>
button {
    color: hsla(var(--primaryButtonTextColor), 1);
    background-color: hsla(var(--primaryButtonBackgroundColor), 1);
    border-color: hsla(var(--primaryButtonBackgroundColor), 0);
    border-radius: 1rem;
    padding: 0.5rem;
}

button:hover {
    opacity: 0.8;
}
</style>
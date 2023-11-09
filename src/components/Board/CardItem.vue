<template>
    <div class="card" @click="startEdit" v-if="!editMode">
        <p>{{ localTitle }}</p>
        <p>{{ localDescription }}</p>
    </div>
    <div class="card" v-else>
        <input v-model="localTitle" @keyup.enter="saveChanges">
        <textarea v-model="localDescription" @blur="saveChanges" @keyup.enter="saveChanges"></textarea>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        description: String,
    },
    components: {
        
    },
    data() {
        return {
            localTitle: this.title,
            localDescription: this.description,
            editMode: false,
        };
    },
    methods: {
        saveChanges() {
            this.$emit('update:title', this.localTitle);
            this.$emit('update:description', this.localDescription);
            this.endEdit();
        },
        startEdit() {
            this.editMode = true;
        },
        endEdit() {
            this.editMode = false;
        },
    },
});
</script>

<style scoped>
.card {
    background-color: hsla(var(--safeLightAccent-hsl), 1);
    color: hsla(var(--black-hsl), 1);
    width: 160px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 1em;
    cursor: pointer;
}

.card input,
.card textarea {
    max-width: 130px;
    width: auto;
    margin-left: 12.5px;
}

.card textarea {
    resize: none;
}
</style>
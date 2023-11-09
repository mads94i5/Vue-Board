<template>
    <td width="200px">
        <div class="column">
            <div @click="startEdit" v-if="!editMode">
                <strong>{{ localTitle }}</strong>
            </div>
            <div v-else>
                <input v-model="localTitle" @blur="saveChanges" @keyup.enter="saveChanges">
            </div>
            <div class="vertical-scrollable-content">
                <div v-for="card in cards" :key="card.id">
                    <CardItem :title="card.title" :description="card.description" />
                </div>
            </div>
            <div>
                <AddButton titleName="CARD" buttonWidth="150px" @add-item="addCard" style="position: relative; top: 1rem;" />
            </div>
        </div>
    </td>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CardItem from './CardItem.vue';
import AddButton from './AddButton.vue';

interface Card {
    id: number;
    title: string;
    description: string;
}

export default defineComponent({
    name: 'StatusBlock',
    props: {
        title: String,
    },
    components: {
        CardItem,
        AddButton,
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
    setup() {
        const cards = ref<Array<Card>>([]);

        const addCard = () => {
            const newCard: Card = {
                id: Date.now(),
                title: 'Title',
                description: 'Description',
            };
            cards.value.push(newCard);
        };

        return {
            cards,
            addCard,
        };
    },
});
</script>

<style scoped>
.column {
    display: block;
    position: absolute;
    background-color: hsla(var(--darkAccent-hsl), 1);
    width: 200px;
    height: 38rem;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 1em;
    margin: 1rem;
}

input {
    max-width: 80%;
    width: 80%;
}

.vertical-scrollable-content {
    overflow-y: scroll;
    white-space: normal;
    max-width: 100%;
    height: 31rem;
    background-color: hsla(var(--white-hsl), 1);
}
</style>
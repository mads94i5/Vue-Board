<template>
    <div class="card" draggable="true" @dragstart="handleDragStart" @click="startEdit" v-if="!editMode">
        <p>{{ cardTitle }}</p>
        <p>{{ cardDescription }}</p>
    </div>
    <div class="card" v-else>
        <input v-model="cardTitle" @keyup.enter="saveChanges">
        <textarea v-model="cardDescription" @blur="saveChanges" @keyup.enter="saveChanges"></textarea>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, toRaw, computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    props: {
        id: Number,
        title: String,
        description: String,
    },
    setup(props) {
        const store = useStore();

        const cardTitle = ref('');
        const cardDescription = ref('');
        const editMode = ref(false);

        const card = computed(() => {
            for (let columnIndex = 0; columnIndex < store.state.columns.length; columnIndex++) {
                const column = store.state.columns[columnIndex];

                if (column && column.cards) {
                    const cardIndex = column.cards.findIndex((card) => card.id === props.id);

                    if (cardIndex !== -1) {
                        return column.cards[cardIndex];
                    }
                }
            }
            return null;
        });

        watchEffect(() => {
            cardTitle.value = card.value ? card.value.title : 'Title';
            cardDescription.value = card.value ? card.value.description : 'Description';
        });

        const findCardInStore = (store, cardId) => {
            for (let i = 0; i < store.state.columns.length; i++) {
                const columnIndex = i;
                const cardIndex = store.state.columns[columnIndex].cards.findIndex((card) => card.id === cardId);
                if (cardIndex !== -1) {
                    return { columnIndex, cardIndex };
                }
            }
            return null;
        };

        const saveChanges = () => {
            if (card.value) {
                const { columnIndex, cardIndex } = findCardInStore(store, props.id);

                if (columnIndex !== -1 && cardIndex !== -1) {
                    if (cardTitle.value === '') {
                        cardTitle.value = 'Title';
                    }
                    if (cardDescription.value === '') {
                        cardDescription.value = 'Description';
                    }
                    store.commit('editCard', {
                        columnIndex,
                        cardIndex,
                        card: {
                            id: props.id,
                            title: cardTitle.value,
                            description: cardDescription.value,
                        },
                    });
                    endEdit();
                }
            }
        };

        const startEdit = () => {
            editMode.value = true;
        };

        const endEdit = () => {
            editMode.value = false;
        };

        const handleDragStart = (event) => {
            const columns = toRaw(store.state.columns);
            const columnId = columns.findIndex((column) => column.cards.some(card => card.id === props.id));
            const cardSourceIndex = columns[columnId].cards.findIndex(card => card.id === props.id)

            event.dataTransfer.setData('text/plain', JSON.stringify({
                card: props,
                sourceCardIndex: cardSourceIndex,
                sourceColumnId: columnId
            }));
        };

        return {
            cardTitle,
            cardDescription,
            startEdit,
            endEdit,
            saveChanges,
            handleDragStart,
            editMode,
        };
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
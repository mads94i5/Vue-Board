<template>
    <td width="200px" @drop.prevent="handleDrop" @dragover.prevent="allowDrop">
        <div class="column">
            <div @click="startEdit" v-if="!editMode">
                <strong>{{ title }}</strong>
            </div>
            <div v-else>
                <input v-model="columnTitle" @blur="saveChanges" @keyup.enter="saveChanges">
            </div>
            <div class="vertical-scrollable-content">
                <div v-for="card in columnCards" :key="card.id">
                    <CardItem :id="card.id" :title="card.title" :description="card.description" />
                </div>
            </div>
            <div>
                <ButtonItem text="ADD CARD" buttonWidth="150px" @click-action="addCard"
                    style="position: relative; top: 1rem;" />
            </div>
        </div>
    </td>
</template>
  
<script lang="ts">
import { defineComponent, toRaw, ref, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import CardItem from './CardItem.vue';
import ButtonItem from './ButtonItem.vue';

export default defineComponent({
    name: 'ColumnItem',
    props: {
        id: Number,
        title: String,
    },
    components: {
        CardItem,
        ButtonItem,
    },
    setup(props) {
        const store = useStore();
        const editMode = ref(false);
        const columnTitle = ref('');

        watchEffect(() => {
            columnTitle.value = props.title;
        });

        const column = () => store.state.columns[props.id];
        const columnCards = computed(() => {
            const column = store.state.columns[props.id];
            return column ? column.cards : [];
        });

        const saveChanges = () => {
            if (column()) {
                if (columnTitle.value === '') {
                    columnTitle.value = 'New Column';
                }
                store.commit('editColumnTitle', {
                    columnIndex: props.id,
                    title: columnTitle.value,
                });
                endEdit();
            }
        };

        const startEdit = () => {
            editMode.value = true;
        };

        const endEdit = () => {
            editMode.value = false;
        };

        const allowDrop = (event) => {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
        };

        const handleDrop = (event) => {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            const sourceCard = data.card;
            const sourceCardIndex = data.sourceCardIndex;
            const sourceColumnIndex = data.sourceColumnId;
            const destinationColumnIndex = props.id;
            const sourceCards = [...toRaw(store.state.columns[sourceColumnIndex].cards)];
            const destinationCards = [...toRaw(store.state.columns[destinationColumnIndex].cards)];

            if (sourceColumnIndex === destinationColumnIndex) {
                return;
            }

            sourceCards.splice(sourceCardIndex, 1);
            destinationCards.push(sourceCard);

            if (sourceCards && destinationCards) {
                store.commit('updateColumnCards', {
                    columnIndex: sourceColumnIndex,
                    cards: sourceCards,
                });

                store.commit('updateColumnCards', {
                    columnIndex: destinationColumnIndex,
                    cards: destinationCards,
                });
            }
        };

        const addCard = () => {
            const card = {
                id: Date.now(),
                title: 'Title',
                description: 'Description',
            };

            const columnIndex = props.id;

            store.commit('addCard', { columnIndex, card });
        };

        return {
            editMode,
            columnTitle,
            columnCards,
            saveChanges,
            startEdit,
            endEdit,
            allowDrop,
            handleDrop,
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
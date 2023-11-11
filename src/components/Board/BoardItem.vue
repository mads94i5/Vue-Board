<template>
    <div class="board-item">
        <div class="horizontal-scrollable-content">
            <table>
                <tr>
                    <ColumnItem v-for="(column, index) in columns" 
                    class="column-element"
                    :key="index" 
                    :id="index"
                    :title="column.title" 
                    @update:column="updateColumnCards"
                    style="position: relative; top: -2.5rem; left: -1rem" />
                    <ButtonItem class="column-element" text="ADD COLUMN" buttonWidth="200px" @click-action="addColumn" />
                </tr>
            </table>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonItem from './ButtonItem.vue';
import ColumnItem from './ColumnItem.vue';

export default defineComponent({
    name: 'BoardItem',
    components: {
        ButtonItem,
        ColumnItem,
    },
    computed: {
        columns() {
            return this.$store.state.columns;
        },
    },
    methods: {
        updateColumnCards(index, cards) {
            this.$store.commit('updateColumnCards', { columnIndex: index, cards });
        },
        addColumn() {
            this.$store.commit('addColumn');
        },
    },
});
</script>
  
<style scoped>
.board-item {
    margin: 1rem;
    padding: 1rem;
}

.horizontal-scrollable-content {
    overflow-x: scroll;
    white-space: nowrap;
    max-width: 100%;
    height: 70vh;
    background-color: hsla(var(--lightAccent-hsl), 1);
}

.column-element {
    margin: 1rem;
    display: inline-block;
    white-space: normal;
}
</style>
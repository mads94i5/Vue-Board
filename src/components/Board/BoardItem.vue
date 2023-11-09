<template>
    <div class="board-item">
        <div class="horizontal-scrollable-content">
            <div style="position: relative;">
                <table>
                    <tr>
                        <StatusBlock v-for="(column, index) in columns" :key="index" class="column-element" :title="column.title" style="position: relative; top: -2.5rem; left: -1rem" />
                        <AddButton class="column-element" titleName="COLUMN" buttonWidth="200px" @add-item="addStatusBlock" />
                    </tr>
                </table>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddButton from './AddButton.vue'
import StatusBlock from './StatusBlock.vue'

export default defineComponent({
    name: 'BoardItem',
    components: {
        AddButton,
        StatusBlock,
    },
    data() {
        return {
            columns: [
                { title: 'Completed' },
                { title: 'In progress' },
                { title: 'To-do' },
            ],
        };
    },
    methods: {
        addStatusBlock() {
            this.columns.push({ title: 'New Column' });
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
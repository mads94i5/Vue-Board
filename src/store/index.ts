import { createStore } from 'vuex'

interface Card {
  id: number;
  title: string;
  description: string;
}

export default createStore({
  state: {
    columns: [
      { title: 'Completed', cards: [] as Card[] },
      { title: 'In progress', cards: [] as Card[] },
      { title: 'To-do', cards: [] as Card[] },
    ],
  },
  mutations: {
    updateColumnCards(state, { columnIndex, cards }) {
      state.columns[columnIndex].cards = cards;
    },
    editColumnTitle(state, { columnIndex, title }) {
      state.columns[columnIndex].title = title;
    },
    addColumn(state) {
      state.columns.push({ title: 'New Column', cards: [] as Card[] });
    },
    addCard(state, { columnIndex, card }) {
      state.columns[columnIndex].cards.push(card);
    },
    editCard(state, { columnIndex, cardIndex, card }) {
      state.columns[columnIndex].cards[cardIndex] = card;
    }
  },
  actions: {
  },
  getters: {
  },
});
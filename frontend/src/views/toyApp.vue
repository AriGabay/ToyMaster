<template>
  <div>
    <h1>Toy App</h1>
    <toy-filter />
    <toy-list :toys="toys" @removeToy="removeToy" />
    <div class="pageing">
      <el-pagination background layout="prev,next" @next-click="countUp" @prev-click="countDown" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { toyService } from '../services/toyService.js';
import toyList from '../cmps/toyList.vue';
import { store } from '../store/index.js';

import toyFilter from './toyFilter.vue';
export default {
  name: 'toyApp',
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    removeToy(toy) {
      this.$store.dispatch({ type: 'removeToy', toy });
    },
    countUp() {
      this.page++;
      this.$store.dispatch('makeToys', { page: this.page });
    },
    countDown() {
      this.page--;
      this.$store.dispatch('makeToys', { page: this.page });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
  components: {
    toyList,
    toyFilter,
  },
  created() {
    this.$store.dispatch('makeToys', { page: this.page });
  },
};
</script>

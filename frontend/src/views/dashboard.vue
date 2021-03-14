<template>
  <div v-if="toys" class="bar">
    <h1>Dashboard</h1>
    <dashboard-bar :chartData="toys" />
  </div>
</template>

<script>
import { toyService } from '../services/toyService.js';
import dashboardBar from '../cmps/dashboard-bar.vue';
export default {
  name: '',
  data() {
    return {
      toys: null,
    };
  },
  methods: {},
  computed: {},
  components: {
    dashboardBar,
  },
  created() {
    toyService.query().then(toys => {
      return (this.toys = toys);
    });
  },
};
</script>

<style scoped></style>

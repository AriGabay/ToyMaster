<template>
  <div>
    <el-button @click="addToy" class="add-btn">Add Toy</el-button>
    <div class="el-card">
      <div v-if="toys" class="toy-list">
        <div v-for="toy in toys" :key="toy._id">
          <toy-preview :toy="toy"><el-button slot="removeToy" @click="removeToy(toy)">X</el-button></toy-preview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToyApp from '../views/toyApp.vue';
import toyPreview from './toyPreview.vue';
export default {
  components: { toyPreview, ToyApp },
  name: 'toyList',
  props: {
    toys: {
      type: Array,
    },
  },
  methods: {
    addToy() {
      this.$router.push('/toyAdd');
    },
    removeToy(toy) {
      this.$emit('removeToy', toy);
    },
  },
  created() {},
};
</script>

<template>
  <div class="filter-list">
    <el-input type="text" v-model="filter.name" @change="search" placeholder="name" />
    <div class="flex-center">
      <el-checkbox type="checkbox" id="inStock" value="inStock" v-model="filter.inStock" @change="search"
        >In Stock</el-checkbox
      >
    </div>
    <el-input-number type="number" v-model="filter.price" @change="search" placeholder="Price" :min="Number(0)" />
    <el-select v-model="filter.sortBy" placeholder="Sort By" @change="search">
      <el-option :label="'Price'" :value="'sortByPrice'" />
      <el-option :label="'A-Z'" :value="'sortByABC'" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      filter: {
        name: null,
        inStock: null,
        price: null,
        sortBy: null,
      },
    };
  },
  methods: {
    search() {
      this.$store.dispatch({ type: 'makeToys', filter: this.filter });
    },
  },
  computed: {},
  components: {},
  created() {},
};
</script>

<style scoped></style>

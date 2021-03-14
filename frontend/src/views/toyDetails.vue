<template>
  <div>
    <div class="text-details" v-if="toy">
      <span>Name: {{ toy.name }}</span>
      <span>Price: {{ toy.price }} </span>
      <span>Type: {{ toy.type }}</span>
      <span>inStock: {{ toy.inStock }}</span>
      <span>createAt: {{ toy.createAt }}</span>
      <span>Id: {{ toy._id }}</span>
    </div>
    <el-button @click="$router.push('/toyApp')">Back</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods: {},
  computed: {
    toy() {
      return this.$store.getters.toyDetails;
    },
  },
  components: {},
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch({ type: 'toyDetails', id });
  },
};
</script>

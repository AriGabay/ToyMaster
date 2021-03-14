<template>
  <el-card class="card" :body-style="{ padding: '0' }">
    <div class="details">
      <span class="text-toy-preview"
        ><h4>Name: {{ toy.name }}</h4>
        <br />
      </span>
      <span class="text-toy-preview"> Id: {{ toy._id }}<br /> </span>
      <span class="text-toy-preview"> Price: {{ toy.price }}$<br /> </span>
      <span class="text-toy-preview"> type: {{ toy.type }}<br /> </span>
      <span class="text-toy-preview"> inStock: {{ toy.inStock }} </span>
    </div>
    <div class="actions-button" style="padding: 14px;">
      <span>Moves</span>
      <div class="bottom clearfix">
        <el-button @click="$router.push('/toyEdit/' + toy._id)">Edit</el-button>
        <el-button @click="$router.push('/toyDetails/' + toy._id)">Details</el-button>
        <slot name="removeToy"></slot>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'toyPreview',
  props: {
    toy: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    removeToy() {},
  },
  computed: {},
  components: {},
  created() {},
};
</script>

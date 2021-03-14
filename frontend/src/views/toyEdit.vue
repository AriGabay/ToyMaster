<template>
  <div v-if="toy">
    <!-- ######### EDIT ########### -->
    <form @submit="saveToy">
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-input class="input-name-edit" type="text" id="name-input" v-model="toy.name" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="min:1" v-slot="{ errors }">
        <el-input-number :min="Number(0)" id="price-input" v-model="toy.price" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-checkbox id="inStock-input" v-model="toy.inStock">In Stock</el-checkbox>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-select v-model="toy.type">
          <el-option :label="'Educational'" :value="'educational'" />
          <el-option :label="'Funny'" :value="'funny'" />
          <el-option :label="'Adult'" :value="'adult'" />
        </el-select>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="submit">Submit</button>
      <!-- round -->
    </form>
  </div>
</template>

<script>
import { required, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', required);
extend('min', { ...min, message: 'We need to sell toys at a profit' });

export default {
  name: 'toyEdit',
  data() {
    return {};
  },
  methods: {
    saveToy() {
      this.$store.dispatch('saveToy', this.toy);
      this.$router.push('/toyApp');
    },
  },
  computed: {
    toy() {
      return this.$store.getters.toy;
    },
  },
  components: {},
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch({ type: 'toyEdit', id });
    }
  },
  destroyed() {},
};
</script>

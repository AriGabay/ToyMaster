<template>
  <div>
    <!-- ######### ADD ########### -->
    <form @submit="saveNewToy" class="inputs-edit">
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-input type="text" placeholder="name" id="name-input" v-model="newToy.name" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="min:1" v-slot="{ errors }">
        <el-input-number :min="Number(0)" id="price-input" v-model="newToy.price" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-checkbox id="inStock-input" v-model="newToy.inStock">In Stock</el-checkbox>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <el-select v-model="newToy.type" placeholder="type">
          <el-option :label="'Educational'" :value="'educational'" />
          <el-option :label="'Funny'" :value="'funny'" />
          <el-option :label="'Adult'" :value="'adult'" />
        </el-select>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="success" round>Submit</button>
    </form>
  </div>
</template>

<script>
import { required, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', required);
extend('min', { ...min, message: 'We need to sell toys at a profit' });

export default {
  name: 'toyAdd',
  data() {
    return {
      newToy: {
        name: null,
        price: null,
        type: null,
        inStock: null,
        createAt: Date.now(),
        _id: null,
      },
    };
  },
  methods: {
    saveNewToy() {
      const newToy = this.newToy;
      this.$store.dispatch({ type: 'toyAdd', newToy });
      this.$router.push('/toyApp');
    },
  },
  computed: {},
  components: {},
  created() {},
  destroyed() {},
};
</script>

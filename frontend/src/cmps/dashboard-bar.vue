<script>
import { Pie, mixins } from 'vue-chartjs';
import * as _ from 'lodash';
const { reactiveProp } = mixins;
export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
    },
  },
  data() {
    return {
      toys: null,
      type: ['adult', 'educational', 'funny'],
      toysPerType: null,
    };
  },

  created() {
    this.toys = this.chartData;
    this.getData();
  },
  methods: {
    getData() {
      const toyTypes = this.toys.map(toy => toy.type.toLowerCase());
      const perType = _.countBy(toyTypes);
      this.toysPerType = this.type.map(type => perType[type]);
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: ['Adult', 'Educational', 'Funny'],
        datasets: [
          {
            label: 'Type',
            backgroundColor: ['#f87979', '#5a5aea', '#12F536'],
            data: this.toysPerType,
          },
        ],
      },
      {
        responsive: true,
      }
    );
  },
};
</script>

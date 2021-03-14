<template>
  <div class="google-maps">
    <h1>About</h1>
    <GmapMap
      :center="{ lat: 32.075131493334155, lng: 34.77485366930708 }"
      :zoom="12.5"
      map-type-id="terrain"
      style="width: 500px; height: 500px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :label="m.label"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      markers: [
        {
          position: { lat: 32.075131493334155, lng: 34.77485366930708 },
        },
        {
          position: { lat: 32.06919838949625, lng: 34.7867115444929 },
        },
        {
          position: { lat: 32.1079105130528, lng: 34.795951144966295 },
        },
      ],
      // 32.075131493334155, 34.77485366930708
      // 32.06919838949625, 34.7867115444929
    };
  },
  methods: {},
  computed: {},
  components: {},
  created() {},
};
</script>

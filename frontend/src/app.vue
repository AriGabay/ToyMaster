<template>
  <div class="app">
    <div class="app-container">
      <div class="nav-container">
        <nav class="nav">
          <router-link class="router-link" to="/">Home</router-link> <router-link to="/toyApp">Toy App</router-link>
          <router-link class="router-link" to="/dashboard">Dashboard</router-link>
          <router-link class="router-link" to="/about">About</router-link>
        </nav>
      </div>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { fullname: 'Babus' },
    };
  },
};
</script>

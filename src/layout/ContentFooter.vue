<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">
        © {{year}} -
        <a href="/#" class="text-muted">Nontarak Gueranukunpong</a>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>

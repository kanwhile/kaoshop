<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#/">Vue</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse" />
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#/">Home</b-nav-item>
            <b-nav-item href="#/about">About</b-nav-item>
            <b-nav-item href="#/sell">Sell</b-nav-item>
            <b-nav-item href="#/product">Product</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>
<style>
body {
  background-color: #f5f9fc;
}
.content {
  padding: 2.5rem 2.5rem 1.5rem;
  flex: 1;
}
</style>
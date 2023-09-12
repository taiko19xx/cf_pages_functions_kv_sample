<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">ToDo App</div>
      </div>
    </q-header>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout'
}
</script>

<style lang="scss">
  .header-image{
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
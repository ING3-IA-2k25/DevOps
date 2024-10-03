<script setup>

const data  = await queryContent('/tmp').findOne()

</script>

<template>
  <div>
    {{data}}
  </div>
</template>

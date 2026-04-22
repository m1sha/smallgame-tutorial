<template>
  <footer>
    <div class="empty-slot"></div>
    <div class="telemetry-chart">
      <slot name="telemetry-chart"></slot>
    </div>
    
     <div class="viewer-settings">
      <slot name="viewer-settings"></slot>
    </div>
    <div class="empty-slot">
      <slot name="viewport"></slot>
    </div>
  </footer>
</template>

<style lang="css">
footer {
  background-color: #333;
  display: grid;
  grid-template-columns: 12vw 1fr 18vw 12vw;

  .empty-slot {
    background-color: var(--panel-color);
    border: 1px solid var(--panel-border);
  }
}
</style>
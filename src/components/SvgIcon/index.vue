<template>
  <div v-if="isExternalProcessed" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { isExternal } from "@/utils/validate"

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ""
  }
})

const isExternalProcessed = computed(() => isExternal(props.iconClass))
const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  return "svg-icon " + (props.className ? props.className : "")
})
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
  }
})
</script>

<style scoped>
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentcolor;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}
</style>

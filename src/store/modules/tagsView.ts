import { ref } from "vue"
import type { RouteRecordRaw } from "vue-router" // Updated type
import { defineStore } from "pinia"

const useTagsViewStore = defineStore("tagsView", () => {
  // State
  const visitedViews = ref<RouteRecordRaw[]>([])
  const cachedViews = ref<string[]>([])

  // Methods
  const addView = (view: RouteRecordRaw) => {
    addVisitedView(view)
    addCachedView(view)
  }

  const addVisitedView = (view: RouteRecordRaw) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view?.meta?.title || "no-name"
      })
    )
  }

  const addCachedView = (view: RouteRecordRaw) => {
    if (cachedViews.value.includes(view.name as string)) return
    if (!view.meta?.noCache) {
      cachedViews.value.push(view.name as string)
    }
  }

  const delView = (view: RouteRecordRaw) => {
    delVisitedView(view)
    delCachedView(view)
  }

  const delVisitedView = (view: RouteRecordRaw) => {
    visitedViews.value = visitedViews.value.filter((v) => v.path !== view.path)
  }

  const delCachedView = (view: RouteRecordRaw) => {
    const index = cachedViews.value.indexOf(view.name as string)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  const delOthersViews = (view: RouteRecordRaw) => {
    delOthersVisitedViews(view)
    delOthersCachedViews(view)
  }

  const delOthersVisitedViews = (view: RouteRecordRaw) => {
    visitedViews.value = visitedViews.value.filter((v) => v.meta?.affix || v.path === view.path)
  }

  const delOthersCachedViews = (view: RouteRecordRaw) => {
    const index = cachedViews.value.indexOf(view.name as string)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      cachedViews.value = []
    }
  }

  const delAllViews = () => {
    delAllVisitedViews()
    delAllCachedViews()
  }

  const delAllVisitedViews = () => {
    // Keep affix tags
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
  }

  const updateVisitedView = (view: RouteRecordRaw) => {
    for (let item of visitedViews.value) {
      if (item.path === view.path) {
        item = Object.assign(item, view)
        break
      }
    }
  }

  // Return state and methods
  return {
    visitedViews,
    cachedViews,
    addView,
    addVisitedView,
    addCachedView,
    delView,
    delVisitedView,
    delCachedView,
    delOthersViews,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView
  }
})

export default useTagsViewStore

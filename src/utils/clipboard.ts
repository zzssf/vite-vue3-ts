import Clipboard from "clipboard"
import { ElMessage } from "element-plus"

function clipboardSuccess() {
  ElMessage({
    message: "Copy successfully",
    type: "success",
    duration: 1500
  })
}

function clipboardError() {
  ElMessage({
    message: "Copy failed",
    type: "error"
  })
}

export default function handleClipboard(text: string, event: MouseEvent): void {
  // 确保 event.target 是一个元素
  const target = event.target as HTMLElement | null
  if (!target) {
    console.error("Event target is not an HTMLElement")
    return
  }

  const clipboard = new Clipboard(target, {
    text: () => text
  })

  clipboard.on("success", () => {
    clipboardSuccess()
    clipboard.destroy()
  })

  clipboard.on("error", () => {
    clipboardError()
    clipboard.destroy()
  })
}

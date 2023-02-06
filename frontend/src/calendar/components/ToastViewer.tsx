import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

export default function ToastViewer(props: any) {
  const html = props.calendar?.description;

  return <Viewer initialValue={html} />;
}

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

import { OtherPropsType } from "./type";

export default function ToastViewer(props: OtherPropsType) {
  const html = props.calendar?.description;

  return <Viewer initialValue={html} />;
}

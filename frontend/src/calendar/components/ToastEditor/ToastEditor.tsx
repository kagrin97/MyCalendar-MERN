import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { HookMap } from "@toast-ui/editor/types/editor";

import LoadingSpinner from "../../../common/components/UIElements/LoadingSpinner";
import { useAuth } from "../../../common/hooks/auth-hook";

export default function ToastEditor(props: any) {
  const { token } = useAuth();
  const { isLoading, sendRequest } = useHttpClient();

  const onUploadImage: HookMap["addImageBlobHook"] = async (blob, callback) => {
    try {
      const formData: any = new FormData();
      formData.append("image", blob);
      const { imgURL } = await sendRequest(
        "http://localhost:5000/api/calendar/uploadImg",
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );
      callback(`http://localhost:5000/${imgURL}`, "calendar img입니다.");
    } catch (err) {}
  };

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      <h3>내용 입력</h3>
      <Editor
        ref={props.editorRef}
        initialValue={props.calendar?.description || ""}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="40rem" // 에디터 창 높이
        initialEditType="wysiwyg"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        plugins={[colorSyntax]}
        language="ko-KR"
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      ></Editor>
    </div>
  );
}

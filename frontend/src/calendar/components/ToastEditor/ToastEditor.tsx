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

import { OtherPropsType } from "./type";

export default function ToastEditor(props: OtherPropsType) {
  const { token } = useAuth();
  const { isLoading, sendRequest } = useHttpClient();

  const onUploadImage: HookMap["addImageBlobHook"] = async (blob, callback) => {
    try {
      const formData: FormData = new FormData();
      formData.append("image", blob);
      const { imgURL } = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/calendar/uploadImg`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );
      console.log(imgURL);
      callback(imgURL, "calendar img입니다.");
    } catch (err) {
      console.log(err);
    }
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

import { uploadIconImage } from "~/modules/firebase";
import {
  FC,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import PrimaryButton from "~/components/primarybutton";
import Indicator from "~/components/indicator";

const canvasID = "selected_icon_canvas";
const canvasRenderSize = 180;
const canvasContentSize = canvasRenderSize * 4;

const modalStyle: ReactModal.Styles = {
  content: {
    display: "grid",
    justifyContent: "stretch",
    alignItems: "center",
    margin: "0 auto",
    boxSizing: "border-box",
    maxWidth: "400px",
    padding: "40px 20px 32px",
    height: "400px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
};

interface ModalProps {
  isOpen: boolean;
  closeRequest?: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  return (
    <ReactModal
      style={modalStyle}
      isOpen={props.isOpen}
      onRequestClose={() => {
        if (props.closeRequest) {
          props.closeRequest();
        }
      }}
      ariaHideApp={false}
    >
      {props.children}
    </ReactModal>
  );
};

const IconContainer = styled.div`
  width: 180px;
  justify-self: center;
  position: relative;
  ::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  > canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: ${canvasRenderSize}px;
    height: ${canvasRenderSize}px;
  }
`;

const FileTitle = styled.p`
  text-align: center;
`;

const UploadingIndicator = styled(Indicator)`
  justify-self: center;
`;

const ActionButton = styled(PrimaryButton)`
  font-weight: 500;
  justify-self: center;
`;

const InputWrapper = styled.label`
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  font-weight: 300;
  font-size: 13px;
  justify-self: center;
  cursor: pointer;
  > input {
    display: none;
  }
`;

interface Props {
  uid: string;
  uploaded?: Dispatch<SetStateAction<string>>;
}

const Editor: FC<Props> = (props) => {
  const pickerid = "file_picker";
  const [selectIconURL, setSelectIconURL] = useState<string>();
  const [iconFile, setIconFile] = useState<File>(null);
  const [isUploading, setIsUploading] = useState(false);
  const resetInput = useCallback(() => {
    setIconFile(null);
    try {
      const input = document.getElementById(pickerid) as HTMLInputElement;
      input.value = "";
    } catch {}
  }, []);
  const uploadData = useCallback(() => {
    let unmounted = false;
    if (selectIconURL && props.uid) {
      (async () => {
        setIsUploading(true);
        try {
          const image = await fetch(selectIconURL).then((result) =>
            result.blob()
          );
          const url = await uploadIconImage(props.uid, image);
          if (!unmounted) {
            props.uploaded(url);
            setIsUploading(false);
            resetInput();
          }
        } catch (e) {
          console.error(e);
          //Todo: Error handling
          if (!unmounted) {
            setIsUploading(false);
          }
        }
      })();
    }
    return () => {
      unmounted = true;
    };
  }, [selectIconURL, props]);
  useEffect(() => {
    setSelectIconURL(undefined);
    if (!iconFile) {
      return;
    }
    let unmounted = false;
    let reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        let canvasAspect = context.canvas.width / context.canvas.height,
          imgAspect = image.width / image.height,
          height: number,
          width: number,
          x: number,
          y: number;
        if (imgAspect >= canvasAspect) {
          width = context.canvas.width * imgAspect;
          height = context.canvas.width;
          x = (image.width - image.height) / 2;
          y = 0;
        } else {
          height = context.canvas.width / imgAspect;
          width = context.canvas.width;
          x = 0;
          y = (image.height - image.width) / 2;
        }
        context.drawImage(
          image,
          x,
          y,
          image.width,
          image.height,
          0,
          0,
          width,
          height
        );
        if (!unmounted) {
          setSelectIconURL(canvas.toDataURL());
        }
      };
      if (typeof reader.result === "string") {
        image.src = reader.result;
      }
    };
    reader.readAsDataURL(iconFile);
    return () => {
      unmounted = true;
    };
  }, [iconFile]);
  return (
    <>
      <InputWrapper htmlFor={pickerid}>
        アイコンを変更
        <input
          id={pickerid}
          type={"file"}
          accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg"
          onChange={(e) => {
            const file = e.target.files.item(0) ?? null;
            setIconFile(file);
          }}
        />
      </InputWrapper>
      <Modal
        isOpen={iconFile !== null}
        closeRequest={() => {
          resetInput();
        }}
      >
        {iconFile && (
          <>
            <IconContainer>
              <canvas
                id={canvasID}
                width={canvasContentSize}
                height={canvasContentSize}
              ></canvas>
            </IconContainer>
            <FileTitle>{iconFile.name}</FileTitle>
            <UploadingIndicator visible={isUploading} width={40} height={40} />
            <ActionButton
              onClick={() => {
                uploadData();
              }}
            >
              選択した画像を保存する
            </ActionButton>
          </>
        )}
      </Modal>
    </>
  );
};

export default Editor;

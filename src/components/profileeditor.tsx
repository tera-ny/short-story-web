import { uploadIconImage } from "~/modules/firebase";
import { FC, useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import PrimaryButton from "~/components/primarybutton";
import Indicator from "~/components/indicator";

const modalStyle: ReactModal.Styles = {
  content: {
    display: "grid",
    justifyContent: "stretch",
    alignItems: "center",
    margin: "0 auto",
    boxSizing: "border-box",
    maxWidth: "600px",
    padding: "40px 20px 32px",
    height: "auto",
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
  width: 50%;
  max-width: 200px;
  justify-self: center;
  position: relative;
  ::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
  }
`;

const FileTitle = styled.p`
  text-align: center;
`;

interface IndicatorProps {
  hidden: boolean;
}

const UploadingIndicator = styled(Indicator)<IndicatorProps>`
  justify-self: center;
  visibility: ${(p) => (p.hidden ? "hidden" : "visible")};
`;

interface Props {
  uid: string;
}

const ActionButton = styled(PrimaryButton)`
  font-weight: 500;
  width: 150px;
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

const Editor: FC<Props> = (props) => {
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
    if (iconFile && props.uid) {
      (async () => {
        setIsUploading(true);
        try {
          await uploadIconImage(props.uid, iconFile);
          if (!unmounted) {
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
  }, [iconFile]);
  const pickerid = "file_picker";
  const [selectIconURL, setSelectIconURL] = useState<string>();
  useEffect(() => {
    setSelectIconURL(undefined);
    if (!iconFile) {
      return;
    }
    let unmounted = false;
    let reader = new FileReader();
    reader.onload = () => {
      if (!unmounted && typeof reader.result === "string") {
        setSelectIconURL(reader.result);
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
            {selectIconURL && (
              <IconContainer>
                <img src={selectIconURL} />
              </IconContainer>
            )}
            <FileTitle>{iconFile.name}</FileTitle>
            <UploadingIndicator hidden={!isUploading} width={40} height={40} />
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

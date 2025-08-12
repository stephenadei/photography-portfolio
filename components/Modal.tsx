import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Modal({
  images,
  onClose,
}: {
  images: ImageProps[];
  onClose?: () => void;
}) {
  let overlayRef = useRef();
  const router = useRouter();

  const { photoId } = router.query;
  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push("/", undefined, { shallow: true });
    onClose();
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(
      {
        query: { photoId: newVal },
      },
      `/p/${newVal}`,
      { shallow: true },
    );
  }

  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  useKeypress("Escape", () => {
    handleClose();
  });

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/90 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-40 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      {/* Photo info */}
      <div className="fixed top-4 left-4 z-40 text-white">
        <div className="flex items-center gap-2 mb-2">
          <CameraIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Analog Photography</span>
        </div>
        <p className="text-xs text-white/70">Photo {index + 1} of {images.length}</p>
      </div>

      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  );
}

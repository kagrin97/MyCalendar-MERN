import React, { useEffect, useState } from "react";
import Button from "../UIElements/Button";

import { RiInstallLine } from "react-icons/ri";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    console.log(deferredPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 설치 프롬프트에 동의했습니다.");
        } else {
          console.log("사용자가 설치 프롬프트를 무시했습니다.");
        }

        setDeferredPrompt(null);
      });
    }
  };

  return (
    <React.Fragment>
      {deferredPrompt && (
        <Button size="large" onClick={handleInstallClick}>
          <RiInstallLine />
        </Button>
      )}
    </React.Fragment>
  );
};

export default PWAInstallPrompt;

"use client";
import { useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
  const { unityProvider, sendMessage, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data",
    frameworkUrl: "Build/public.framework.js",
    codeUrl: "Build/public.wasm",
    streamingAssetsUrl: "StreamingAssets",
  });
  const handleClickLoadButton = useCallback(() => {
    let jsonString = "{\"background\":\"https://i.ibb.co/Y7jr2Kx/Wheel-APIBG.png\",\"ball\":\"https://i.postimg.cc/6qrz9L4z/Basket-Inu.png\",\"playButton\":[\"https://i.ibb.co/R6cktKJ/Play-Button.png\",\"https://i.ibb.co/R6cktKJ/Play-Button.png\"],\"rewardFieldImage\":[\"https://i.ibb.co/VSsmrWP/Wall.png\",\"https://i.ibb.co/pPKb6G0/Wall2.png\"],\"id\":\"1\"}";
    sendMessage("AssetManager", "LoadAllTexture", jsonString);
  }, [isLoaded]);
  useEffect(()=>{
    window.addEventListener("message", (event)=>{
      console.log(event);
      handleClickLoadButton();
    })
    return ()=>{
      window.removeEventListener("message", handleClickLoadButton);
    }
  }, [handleClickLoadButton])


  return (
    <main className="flex min-h-screen justify-center items-center gap-10">
      <div className="flex mx-auto items-center justify-center w-[100vw] h-[100vh] drop-shadow-glow">
        {!isLoaded && <p className="absolute z-[-1]">Loading Application... {Math.round(loadingProgression * 100)}%</p>}
        <Unity
          unityProvider={unityProvider}
          style={{ aspectRatio: 0.4613733906, maxWidth: 430, width: "inherit"}}
        />
      </div>
    </main>
  );
}

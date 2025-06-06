/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import Threads from "./Threads";

// Define background settings interface
interface BackgroundSettings {
  threadsAmplitude: number;
  threadsDistance: number;
  threadsColor: [number, number, number]; // RGB values normalized to 0-1
  threadsLineCount: number;
  threadsLineWidth: number;
  threadsLineBlur: number;
  threadsNoiseScale: number;
  threadsNoiseTimeScale: number;
  threadsMouseInfluence: number;
}

export default function BackgroundPattern() {
  const [showSettings, setShowSettings] = useState(false);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<BackgroundSettings>({
    // Threads specific options
    threadsAmplitude: 1.5,
    threadsDistance: 0.3,
    threadsColor: [0, 0.322, 1], // #0052ff
    threadsLineCount: 40,
    threadsLineWidth: 7.0,
    threadsLineBlur: 12.0,
    threadsNoiseScale: 2.5,
    threadsNoiseTimeScale: 0.1,
    threadsMouseInfluence: 0.2,
  });

  // Handle responsive settings
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setSettings(prev => ({
        ...prev,
        // Adjust values for mobile
        threadsLineCount: isMobile ? 30 : 40,
        threadsLineWidth: isMobile ? 4.0 : 7.0,
        threadsLineBlur: isMobile ? 8.0 : 12.0,
        threadsNoiseScale: isMobile ? 2.0 : 2.5,
      }));
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicks outside the settings panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  const handleSettingChange = <K extends keyof BackgroundSettings>(
    key: K,
    value: BackgroundSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <>
      <Threads
        className="z-0"
        amplitude={settings.threadsAmplitude}
        distance={settings.threadsDistance}
        color={settings.threadsColor}
        enableMouseInteraction={true}
        lineCount={settings.threadsLineCount}
        lineWidth={settings.threadsLineWidth}
        lineBlur={settings.threadsLineBlur}
        noiseScale={settings.threadsNoiseScale}
        noiseTimeScale={settings.threadsNoiseTimeScale}
        mouseInfluence={settings.threadsMouseInfluence}
      />

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div
            ref={settingsPanelRef}
            className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-800 p-4 rounded-t-xl flex justify-between items-center border-b border-slate-700">
              <h2 className="text-xl font-bold text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                </svg>
                Thread Settings
              </h2>
              <button
                onClick={toggleSettings}
                className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
                aria-label="Close Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Threads Settings */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">
                  Threads Properties
                </h3>

                <div className="bg-white rounded-lg overflow-hidden space-y-4">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Color
                      </label>
                    </div>
                    <input
                      type="color"
                      value={`rgb(${Math.round(settings.threadsColor[0] * 255)}, ${Math.round(
                        settings.threadsColor[1] * 255
                      )}, ${Math.round(settings.threadsColor[2] * 255)})`}
                      onChange={(e) => {
                        // Convert hex to RGB normalized to 0-1
                        const hex = e.target.value;
                        const r = parseInt(hex.slice(1, 3), 16) / 255;
                        const g = parseInt(hex.slice(3, 5), 16) / 255;
                        const b = parseInt(hex.slice(5, 7), 16) / 255;
                        handleSettingChange("threadsColor", [r, g, b]);
                      }}
                      className="w-full h-8 rounded border-0"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Amplitude
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsAmplitude.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={settings.threadsAmplitude}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsAmplitude",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Distance
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsDistance.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={settings.threadsDistance}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsDistance",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Line Count
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsLineCount}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.threadsLineCount}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsLineCount",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Line Width
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsLineWidth.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={settings.threadsLineWidth}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsLineWidth",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Line Blur
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsLineBlur.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={settings.threadsLineBlur}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsLineBlur",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Noise Scale
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsNoiseScale.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={settings.threadsNoiseScale}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsNoiseScale",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Animation Speed
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsNoiseTimeScale.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.5"
                      step="0.01"
                      value={settings.threadsNoiseTimeScale}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsNoiseTimeScale",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        Mouse Influence
                      </label>
                      <span className="text-sm text-blue-500 font-medium">
                        {settings.threadsMouseInfluence.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.threadsMouseInfluence}
                      onChange={(e) =>
                        handleSettingChange(
                          "threadsMouseInfluence",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() =>
                  setSettings({
                    threadsAmplitude: 1.0,
                    threadsDistance: 0.5,
                    threadsColor: [0, 0.322, 1], // #0052ff
                    threadsLineCount: 40,
                    threadsLineWidth: 7.0,
                    threadsLineBlur: 12.0,
                    threadsNoiseScale: 2.5,
                    threadsNoiseTimeScale: 0.1,
                    threadsMouseInfluence: 0.2,
                  })
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

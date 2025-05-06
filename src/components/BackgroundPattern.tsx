/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedParticles from "./OptimizedDotPattern";
import Threads from "./Threads";

// Define types based on what AnimatedParticles expects
type PatternType = 'random' | 'flowField' | 'phyllotaxis' | 'grid' | 'wave' | 'lineWaves';

// Define background types to allow switching between different backgrounds
type BackgroundType = 'particles' | 'threads';

interface BackgroundSettings {
  backgroundType: BackgroundType;
  particleCount: number;
  particleColor: string;
  particleOpacityRange: [number, number];
  particleSizeRange: [number, number];
  waveAmplitude: number;
  waveSpeed: number;
  mouseInteractionRadius: number;
  mouseForce: number;
  returnSpeed: number;
  avoidCenter: boolean;
  centerAvoidanceRadius: number;
  pattern: PatternType;
  patternDensity: number;
  lineColor?: string;
  lineWidth?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  horizontalWaves?: boolean;
  // Threads specific options
  threadsAmplitude: number;
  threadsDistance: number;
  threadsColor: [number, number, number];
}

export default function BackgroundPattern() {
  const [showSettings, setShowSettings] = useState(false);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<BackgroundSettings>({
    backgroundType: 'particles',
    particleCount: 750,
    particleColor: "120, 174, 255",
    particleOpacityRange: [0.2, 0.7],
    particleSizeRange: [1, 4.5],
    waveAmplitude: 2,
    waveSpeed: 0.15,
    mouseInteractionRadius: 180,
    mouseForce: 0.5,
    returnSpeed: 0.015,
    avoidCenter: true,
    centerAvoidanceRadius: 0.15,
    pattern: "wave",
    patternDensity: 0.7,
    lineColor: "#0074ff",
    lineWidth: 1.5,
    xGap: 40,
    yGap: 55,
    friction: 0.92,
    tension: 0.012,
    horizontalWaves: true,
    // Threads specific options
    threadsAmplitude: 1.5,
    threadsDistance: 0.30,
    threadsColor: [0.47, 0.68, 1.0] 
  });

  // Handle clicks outside the settings panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  const handleSettingChange = <K extends keyof BackgroundSettings>(key: K, value: BackgroundSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRangeChange = (key: 'particleOpacityRange' | 'particleSizeRange', index: 0 | 1, value: string) => {
    setSettings(prev => {
      const newRange = [...prev[key]] as [number, number];
      newRange[index] = parseFloat(value);
      return {
        ...prev,
        [key]: newRange
      };
    });
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  // Additional properties for specialized patterns
  const additionalProps = settings.pattern === 'lineWaves' ? {
    lineColor: settings.lineColor,
    lineWidth: settings.lineWidth,
    xGap: settings.xGap,
    yGap: settings.yGap,
    friction: settings.friction,
    tension: settings.tension,
    horizontalWaves: settings.horizontalWaves,
    particleCount: 0, // No particles in lineWaves mode
  } : {};

  // Handle specific pattern requirements
  const particleCount = settings.pattern === 'lineWaves' ? 0 : settings.particleCount;

  return (
    <>
      {/* Background visualization based on selected type */}
      {/* {settings.backgroundType === 'particles' && (
      <AnimatedParticles 
        className="z-0"
          particleCount={particleCount}
          particleColor={settings.particleColor}
          particleOpacityRange={settings.particleOpacityRange}
          particleSizeRange={settings.particleSizeRange}
          waveAmplitude={settings.waveAmplitude}
          waveSpeed={settings.waveSpeed}
          mouseInteractionRadius={settings.mouseInteractionRadius}
          mouseForce={settings.mouseForce}
          returnSpeed={settings.returnSpeed}
          avoidCenter={settings.avoidCenter}
          centerAvoidanceRadius={settings.centerAvoidanceRadius}
          pattern={settings.pattern}
          patternDensity={settings.patternDensity}
          {...additionalProps}
        />
      )} */}

      
        <Threads
          className="z-0"
          amplitude={settings.threadsAmplitude}
          distance={settings.threadsDistance}
          color={settings.threadsColor}
          enableMouseInteraction={true}
        />
      {/* Settings button */}
      {/* <button 
        onClick={toggleSettings}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full z-50 w-12 h-12 flex items-center justify-center"
        aria-label="Background Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button> */}

      {/* Settings panel */}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                Background Settings
              </h2>
              <button 
                onClick={toggleSettings}
                className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
                aria-label="Close Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Background Type Selection */}
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Background Type</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`p-3 rounded-lg ${settings.backgroundType === 'particles' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                    onClick={() => handleSettingChange('backgroundType', 'particles')}
                  >
                    Particles
                  </button>
                  <button 
                    className={`p-3 rounded-lg ${settings.backgroundType === 'threads' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                    onClick={() => handleSettingChange('backgroundType', 'threads')}
                  >
                    Threads
                  </button>
                </div>
              </div>

              {/* Background-specific settings */}
              {settings.backgroundType === 'particles' && (
                <>
                  {/* Pattern Selection Section */}
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Pattern Type</h3>
                    
                    <select 
                      value={settings.pattern}
                      onChange={(e) => handleSettingChange('pattern', e.target.value as PatternType)}
                      className="w-full p-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    >
                      <option value="wave">Wave</option>
                      <option value="grid">Grid</option>
                      <option value="random">Random</option>
                      <option value="flowField">Flow Field</option>
                      <option value="phyllotaxis">Phyllotaxis</option>
                      <option value="lineWaves">Line Waves</option>
                    </select>
                  </div>

                  {/* Particle Properties Section */}
                  {settings.pattern !== 'lineWaves' && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Particle Properties</h3>
                      
                      <div className="bg-white rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              Particle Count
                            </label>
                            <span className="text-sm text-blue-500 font-medium">{settings.particleCount}</span>
                          </div>
                          <input 
                            type="range" 
                            min="100" 
                            max="2000" 
                            value={settings.particleCount} 
                            onChange={(e) => handleSettingChange('particleCount', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              Particle Color
                            </label>
                          </div>
                          <div className="flex items-center gap-3">
                            <input 
                              type="color"
                              value={`rgb(${settings.particleColor.split(',').map(c => parseInt(c.trim())).join(',')})`}
                              onChange={(e) => {
                                // Convert hex to RGB
                                const hex = e.target.value;
                                const r = parseInt(hex.slice(1, 3), 16);
                                const g = parseInt(hex.slice(3, 5), 16);
                                const b = parseInt(hex.slice(5, 7), 16);
                                handleSettingChange('particleColor', `${r}, ${g}, ${b}`);
                              }}
                              className="w-8 h-8 rounded border-0 p-0"
                            />
                            <span className="text-sm text-gray-500">RGB: {settings.particleColor}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              Particle Size Range
                            </label>
                            <span className="text-sm text-blue-500 font-medium">
                              [{settings.particleSizeRange[0].toFixed(1)}, {settings.particleSizeRange[1].toFixed(1)}]
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs text-gray-500">Min</span>
                              <input 
                                type="range" 
                                min="0.5" 
                                max="5" 
                                step="0.1"
                                value={settings.particleSizeRange[0]} 
                                onChange={(e) => handleRangeChange('particleSizeRange', 0, e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Max</span>
                              <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                step="0.1"
                                value={settings.particleSizeRange[1]} 
                                onChange={(e) => handleRangeChange('particleSizeRange', 1, e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Line-specific controls */}
                  {settings.pattern === 'lineWaves' && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Line Wave Properties</h3>
                      
                      <div className="bg-white rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              Line Color
                            </label>
                          </div>
                          <input 
                            type="color" 
                            value={settings.lineColor || '#0074ff'} 
                            onChange={(e) => handleSettingChange('lineColor', e.target.value)}
                            className="w-full h-8 rounded border-0"
                          />
                        </div>
                        
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium text-gray-700">
                              Line Width
                            </label>
                            <span className="text-sm text-blue-500 font-medium">{settings.lineWidth?.toFixed(1)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="5" 
                            step="0.1"
                            value={settings.lineWidth} 
                            onChange={(e) => handleSettingChange('lineWidth', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                        
                        <div className="p-4 border-b border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700">
                                  Horizontal Gap
                                </label>
                                <span className="text-sm text-blue-500 font-medium">{settings.xGap}</span>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={settings.xGap} 
                                onChange={(e) => handleSettingChange('xGap', parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700">
                                  Vertical Gap
                                </label>
                                <span className="text-sm text-blue-500 font-medium">{settings.yGap}</span>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={settings.yGap} 
                                onChange={(e) => handleSettingChange('yGap', parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border-b border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700">
                                  Friction
                                </label>
                                <span className="text-sm text-blue-500 font-medium">{settings.friction?.toFixed(2)}</span>
                              </div>
                              <input 
                                type="range" 
                                min="0.8" 
                                max="0.99" 
                                step="0.01"
                                value={settings.friction} 
                                onChange={(e) => handleSettingChange('friction', parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700">
                                  Tension
                                </label>
                                <span className="text-sm text-blue-500 font-medium">{settings.tension?.toFixed(3)}</span>
                              </div>
                              <input 
                                type="range" 
                                min="0.001" 
                                max="0.05" 
                                step="0.001"
                                value={settings.tension} 
                                onChange={(e) => handleSettingChange('tension', parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center">
                            <input 
                              id="horizontalWaves" 
                              type="checkbox" 
                              checked={settings.horizontalWaves} 
                              onChange={(e) => handleSettingChange('horizontalWaves', e.target.checked)}
                              className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="horizontalWaves" className="ml-2 block text-sm text-gray-700">
                              Horizontal Waves
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Animation Properties Section */}
                  <div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Animation Properties</h3>
                    
                    <div className="bg-white rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-gray-700">
                            Pattern Density
                          </label>
                          <span className="text-sm text-blue-500 font-medium">{settings.patternDensity.toFixed(2)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1" 
                          step="0.05"
                          value={settings.patternDensity} 
                          onChange={(e) => handleSettingChange('patternDensity', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-gray-700">
                            Wave Amplitude
                          </label>
                          <span className="text-sm text-blue-500 font-medium">{settings.waveAmplitude.toFixed(1)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.5" 
                          max="10" 
                          step="0.5"
                          value={settings.waveAmplitude} 
                          onChange={(e) => handleSettingChange('waveAmplitude', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-gray-700">
                            Wave Speed
                          </label>
                          <span className="text-sm text-blue-500 font-medium">{settings.waveSpeed.toFixed(2)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.01" 
                          max="0.5" 
                          step="0.01"
                          value={settings.waveSpeed} 
                          onChange={(e) => handleSettingChange('waveSpeed', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interaction Properties Section */}
                  <div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Interaction Properties</h3>
                    
                    <div className="bg-white rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-gray-700">
                            Mouse Interaction Radius
                          </label>
                          <span className="text-sm text-blue-500 font-medium">{settings.mouseInteractionRadius}</span>
                        </div>
                        <input 
                          type="range" 
                          min="50" 
                          max="300" 
                          value={settings.mouseInteractionRadius} 
                          onChange={(e) => handleSettingChange('mouseInteractionRadius', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-gray-700">
                            Mouse Force
                          </label>
                          <span className="text-sm text-blue-500 font-medium">{settings.mouseForce.toFixed(2)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="2" 
                          step="0.1"
                          value={settings.mouseForce} 
                          onChange={(e) => handleSettingChange('mouseForce', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center">
                          <input 
                            id="avoidCenter" 
                            type="checkbox" 
                            checked={settings.avoidCenter} 
                            onChange={(e) => handleSettingChange('avoidCenter', e.target.checked)}
                            className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="avoidCenter" className="ml-2 block text-sm text-gray-700">
                            Avoid Center
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Threads Settings */}
              {settings.backgroundType === 'threads' && (
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-3">Threads Properties</h3>
                  
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">
                          Color
                        </label>
                      </div>
                      <input 
                        type="color"
                        value={`rgb(${Math.round(settings.threadsColor[0] * 255)}, ${Math.round(settings.threadsColor[1] * 255)}, ${Math.round(settings.threadsColor[2] * 255)})`}
                        onChange={(e) => {
                          // Convert hex to RGB normalized to 0-1
                          const hex = e.target.value;
                          const r = parseInt(hex.slice(1, 3), 16) / 255;
                          const g = parseInt(hex.slice(3, 5), 16) / 255;
                          const b = parseInt(hex.slice(5, 7), 16) / 255;
                          handleSettingChange('threadsColor', [r, g, b]);
                        }}
                        className="w-full h-8 rounded border-0"
                      />
                    </div>

                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">
                          Amplitude
                        </label>
                        <span className="text-sm text-blue-500 font-medium">{settings.threadsAmplitude.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="5" 
                        step="0.1"
                        value={settings.threadsAmplitude} 
                        onChange={(e) => handleSettingChange('threadsAmplitude', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">
                          Distance
                        </label>
                        <span className="text-sm text-blue-500 font-medium">{settings.threadsDistance.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="3" 
                        step="0.1"
                        value={settings.threadsDistance} 
                        onChange={(e) => handleSettingChange('threadsDistance', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button 
                onClick={() => setSettings({
                  backgroundType: 'particles',
                  particleCount: 750,
                  particleColor: "120, 174, 255",
                  particleOpacityRange: [0.2, 0.7],
                  particleSizeRange: [1, 4.5],
                  waveAmplitude: 2,
                  waveSpeed: 0.15,
                  mouseInteractionRadius: 180,
                  mouseForce: 0.5,
                  returnSpeed: 0.015,
                  avoidCenter: true,
                  centerAvoidanceRadius: 0.15,
                  pattern: "wave",
                  patternDensity: 0.7,
                  lineColor: "#0074ff",
                  lineWidth: 1.5,
                  xGap: 40,
                  yGap: 55,
                  friction: 0.92,
                  tension: 0.012,
                  horizontalWaves: true,
                  threadsAmplitude: 1.0,
                  threadsDistance: 0.5,
                  threadsColor: [0.47, 0.68, 1.0]
                })}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

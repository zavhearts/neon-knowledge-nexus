
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Note {
  time: number;
  text: string;
}

interface Caption {
  time: number;
  text: string;
}

interface Resource {
  type: string;
  name: string;
  url: string;
}

interface CustomVideoPlayerProps {
  videoUrl: string;
  title: string;
  resources?: Resource[];
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  videoUrl,
  title,
  resources = []
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [brightnessLevel, setBrightnessLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isDraggingBrightness, setIsDraggingBrightness] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  // Sample captions and notes
  const captions: Caption[] = [
    { time: 2, text: "Introduction to the topic" },
    { time: 15, text: "Key concepts being explained" },
    { time: 30, text: "Important formulas and calculations" },
    { time: 45, text: "Example problems and solutions" },
    { time: 60, text: "Summary and takeaways" }
  ];

  const notes: Note[] = [
    { time: 5, text: "Definition of key terms" },
    { time: 20, text: "Remember these formulas for exams" },
    { time: 35, text: "This calculation technique saves time" },
    { time: 50, text: "Common mistakes to avoid" },
    { time: 70, text: "Practice with these example problems" }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      updateCaptions();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const updateCaptions = () => {
    const video = videoRef.current;
    if (!video) return;

    for (let i = 0; i < captions.length; i++) {
      if (video.currentTime >= captions[i].time && 
          (i === captions.length - 1 || video.currentTime < captions[i + 1].time)) {
        if (currentCaption !== captions[i].text) {
          setCurrentCaption(captions[i].text);
        }
        break;
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressContainer = progressContainerRef.current;
    const video = videoRef.current;
    if (!progressContainer || !video) return;

    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeSlider = e.currentTarget;
    const rect = volumeSlider.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom;
    
    // Calculate angle from center point
    const x = e.clientX - centerX;
    const y = centerY - e.clientY;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    
    // Restrict to the top half of the circle (0 to 180 degrees)
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;
    
    // Convert angle to volume (0-100)
    const newVolume = Math.round((angle / 180) * 100);
    setVolumeLevel(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleBrightnessChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const brightnessSlider = e.currentTarget;
    const rect = brightnessSlider.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom;
    
    // Calculate angle from center point
    const x = e.clientX - centerX;
    const y = centerY - e.clientY;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    
    // Restrict to the top half of the circle (0 to 180 degrees)
    if (angle < 0) angle = 0;
    if (angle > 180) angle = 180;
    
    // Convert angle to brightness (0-100)
    const newBrightness = Math.round((angle / 180) * 100);
    setBrightnessLevel(newBrightness);
    
    if (videoRef.current) {
      videoRef.current.style.filter = `brightness(${newBrightness / 100})`;
    }
  };

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen mode:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const jumpToNote = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const getVolumeIcon = () => {
    if (volumeLevel === 0) return <VolumeX size={18} />;
    if (volumeLevel < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <Card className="cyber-card bg-cyber-dark border border-neon-blue/40">
        <div className="p-4 flex justify-between items-center">
          <div className="title text-lg font-medium text-neon-blue">{title}</div>
          <div className="flex items-center space-x-3">
            <select 
              value={playbackSpeed} 
              onChange={handleSpeedChange}
              className="bg-cyber-darker border border-neon-blue/30 rounded px-3 py-1 text-sm"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            <Button 
              size="sm" 
              variant="outline"
              className="border-neon-blue/30"
              onClick={() => setShowNotes(!showNotes)}
            >
              {showNotes ? "Hide Notes" : "Show Notes"}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          <div 
            ref={videoContainerRef} 
            className="relative lg:w-2/3 h-full"
            style={{ minHeight: "360px" }}
          >
            {/* Video Element */}
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover bg-black"
              onClick={togglePlayPause}
              src={videoUrl}
            >
              Your browser does not support HTML5 video.
            </video>
            
            {/* Caption Container */}
            {currentCaption && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-4/5 text-center bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 animate-fade-in">
                <p className="text-white">{currentCaption}</p>
              </div>
            )}
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 opacity-0 hover:opacity-100 transition-opacity">
              {/* Progress Bar */}
              <div 
                ref={progressContainerRef}
                className="w-full h-1.5 bg-white/20 rounded cursor-pointer mb-4"
                onClick={handleProgressClick}
              >
                <div 
                  ref={progressBarRef}
                  className="h-full bg-neon-blue rounded shadow-glow"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </Button>
              </div>
            </div>
            
            {/* Volume and Brightness Controls */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-2 opacity-0 hover:opacity-100 transition-opacity">
              {/* Volume Control */}
              <div 
                className="relative h-8 flex items-center gap-2"
                onMouseDown={() => setIsDraggingVolume(true)}
                onMouseUp={() => setIsDraggingVolume(false)}
              >
                <Button variant="ghost" size="sm" className="text-white bg-black/40">
                  {getVolumeIcon()}
                </Button>
                <div 
                  className="w-20 h-1.5 bg-white/20 rounded cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    setVolumeLevel(Math.round(pos * 100));
                    if (videoRef.current) videoRef.current.volume = pos;
                  }}
                >
                  <div 
                    className="h-full bg-neon-blue rounded shadow-glow"
                    style={{ width: `${volumeLevel}%` }}
                  ></div>
                </div>
                <span className="text-xs text-white/80">{volumeLevel}%</span>
              </div>
              
              {/* Brightness Control */}
              <div 
                className="relative h-8 flex items-center gap-2"
                onMouseDown={() => setIsDraggingBrightness(true)}
                onMouseUp={() => setIsDraggingBrightness(false)}
              >
                <Button variant="ghost" size="sm" className="text-white bg-black/40">
                  <Sun size={18} />
                </Button>
                <div 
                  className="w-20 h-1.5 bg-white/20 rounded cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    setBrightnessLevel(Math.round(pos * 100));
                    if (videoRef.current) videoRef.current.style.filter = `brightness(${pos})`;
                  }}
                >
                  <div 
                    className="h-full bg-neon-pink rounded shadow-glow"
                    style={{ width: `${brightnessLevel}%` }}
                  ></div>
                </div>
                <span className="text-xs text-white/80">{brightnessLevel}%</span>
              </div>
            </div>
          </div>
          
          {/* Notes Panel */}
          {showNotes && (
            <div className="lg:w-1/3 p-4 bg-cyber-darker border-l border-neon-blue/30 overflow-y-auto" style={{ maxHeight: "500px" }}>
              <h3 className="text-lg font-medium text-neon-blue mb-4">Class Notes</h3>
              
              {/* Notes */}
              <div className="space-y-3 mb-6">
                {notes.map((note, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md border-l-4 border-neon-blue bg-cyber-dark/50 cursor-pointer hover:bg-cyber-dark transform transition-all hover:-translate-y-1 ${
                      currentTime >= note.time && currentTime < (notes[index + 1]?.time || Infinity) 
                        ? "border-neon-purple shadow-glow-sm" 
                        : "border-neon-blue/40"
                    }`}
                    onClick={() => jumpToNote(note.time)}
                  >
                    <div className="text-xs text-neon-blue mb-1">{formatTime(note.time)}</div>
                    <p className="text-sm">{note.text}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4 bg-neon-blue/30" />
              
              {/* Resources Section */}
              <div>
                <h4 className="text-md font-medium text-neon-pink mb-3">Resources</h4>
                <div className="space-y-2">
                  {resources.length > 0 ? (
                    resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={resource.type === "PDF" ? "destructive" : "default"}>
                            {resource.type}
                          </Badge>
                          <span className="text-sm truncate">{resource.name}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-neon-blue/30"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          Download
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">No resources available for this class.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CustomVideoPlayer;


import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  SlidersHorizontal, 
  ArrowRight, 
  Clock, 
  EyeOff, 
  RotateCw, 
  Image, 
  Trash2
} from "lucide-react";

interface SliderSettings {
  autoplay: boolean;
  interval: number;
  transition: number;
  visibility: boolean;
}

const SliderController = () => {
  const [settings, setSettings] = useState<SliderSettings>({
    autoplay: true,
    interval: 5,
    transition: 500,
    visibility: true
  });

  const [selectedSlide, setSelectedSlide] = useState(1);
  
  const slides = [
    { id: 1, title: "Featured Course: Income Tax", active: true },
    { id: 2, title: "New Batch Starting Soon", active: true },
    { id: 3, title: "Live Webinar This Weekend", active: true },
    { id: 4, title: "Student Success Stories", active: false }
  ];

  const handleSliderChange = (key: keyof SliderSettings, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    toast({
      title: "Settings Saved",
      description: "Slider settings have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setSettings({
      autoplay: true,
      interval: 5,
      transition: 500,
      visibility: true
    });
    toast({
      title: "Settings Reset",
      description: "Slider settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Homepage Slider Control</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Configure the appearance and behavior of your homepage slider</p>
        </div>
        <SlidersHorizontal className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure how the slider behaves on the homepage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoplay" className="text-base font-medium">Autoplay</Label>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Auto-advance through slides</p>
                </div>
                <Switch 
                  id="autoplay" 
                  checked={settings.autoplay}
                  onCheckedChange={(checked) => handleSliderChange('autoplay', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interval" className="text-base font-medium">Interval (seconds)</Label>
                  <span className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                    {settings.interval}s
                  </span>
                </div>
                <Slider 
                  id="interval"
                  value={[settings.interval]} 
                  min={1} 
                  max={10} 
                  step={1}
                  onValueChange={(value) => handleSliderChange('interval', value[0])}
                  disabled={!settings.autoplay}
                  className={!settings.autoplay ? "opacity-50" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="transition" className="text-base font-medium">Transition Speed (ms)</Label>
                  <span className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                    {settings.transition}ms
                  </span>
                </div>
                <Slider 
                  id="transition"
                  value={[settings.transition]} 
                  min={100} 
                  max={1000} 
                  step={50}
                  onValueChange={(value) => handleSliderChange('transition', value[0])}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="visibility" className="text-base font-medium">Slider Visibility</Label>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Show slider on homepage</p>
                </div>
                <Switch 
                  id="visibility" 
                  checked={settings.visibility}
                  onCheckedChange={(checked) => handleSliderChange('visibility', checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 border-t pt-6">
            <Button 
              variant="outline" 
              className="flex gap-2 items-center"
              onClick={handleResetSettings}
            >
              <RotateCw className="h-4 w-4" />
              Reset to Defaults
            </Button>
            <Button 
              className="flex gap-2 items-center"
              onClick={handleSaveSettings}
            >
              Save Settings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Slides</CardTitle>
            <CardDescription>Enable or disable individual slides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {slides.map((slide) => (
              <div 
                key={slide.id} 
                className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                  selectedSlide === slide.id 
                    ? "border-primary bg-primary/5" 
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
                onClick={() => setSelectedSlide(slide.id)}
              >
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span className={slide.active ? "" : "line-through opacity-50"}>
                    {slide.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    {slide.active ? <EyeOff className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-2">
              Add New Slide
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selected Slide Properties</CardTitle>
          <CardDescription>Configure slide #{selectedSlide}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={slides.find(s => s.id === selectedSlide)?.title || ""} />
              </div>
              <div>
                <Label htmlFor="url">URL Link</Label>
                <Input id="url" placeholder="https://..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <div className="border rounded-md h-40 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <p className="text-neutral-500 dark:text-neutral-400">Slide Preview</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="ml-auto">Apply Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SliderController;

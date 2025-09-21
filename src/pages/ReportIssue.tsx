import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, Camera, MapPin, Mic, MicOff } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';

// Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ReportIssue = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    reporterName: profile?.full_name || profile?.username || '',
    issueTitle: '',
    location: '',
    description: '',
  });
  
  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize speech recognition
  React.useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setFormData(prev => ({
            ...prev,
            description: prev.description + (prev.description ? ' ' : '') + finalTranscript
          }));
        }
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "Please try again or type manually",
          variant: "destructive"
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  // Auto-detect location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location detection",
        variant: "destructive"
      });
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use reverse geocoding to get address
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          const address = data.locality 
            ? `${data.locality}, ${data.principalSubdivision}`
            : `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          setFormData(prev => ({ ...prev, location: address }));
          toast({
            title: "Location detected",
            description: "Location has been automatically filled"
          });
        } catch (error) {
          const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData(prev => ({ ...prev, location: coords }));
          toast({
            title: "Location detected",
            description: "Coordinates have been filled"
          });
        }
        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        toast({
          title: "Location access denied",
          description: "Please enable location access or enter manually",
          variant: "destructive"
        });
      }
    );
  };

  // Speech recognition handlers
  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle file upload
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Files selected",
        description: `${files.length} file(s) selected for upload`
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.issueTitle.trim() || !formData.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in the title and description",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically submit to your backend
    toast({
      title: "Report submitted",
      description: "Your issue has been reported successfully"
    });
    
    // Reset form and navigate back
    setFormData({
      reporterName: profile?.full_name || profile?.username || '',
      issueTitle: '',
      location: '',
      description: '',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Report New Issue</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="reporter-name">Reporter Name</Label>
              <Input 
                id="reporter-name" 
                placeholder="Enter your name"
                value={formData.reporterName}
                onChange={(e) => handleInputChange('reporterName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="issue-title">Issue Title</Label>
              <Input 
                id="issue-title" 
                placeholder="Brief description of the issue"
                value={formData.issueTitle}
                onChange={(e) => handleInputChange('issueTitle', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input 
                  id="location" 
                  placeholder="Street address or area description"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="px-3"
                >
                  {isDetectingLocation ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <div className="space-y-2">
                <Textarea 
                  id="description" 
                  placeholder="Provide detailed information about the issue..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleSpeechRecognition}
                    className="flex items-center space-x-2"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 text-red-500" />
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" />
                        <span>Voice to Text</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Upload Images</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={handleFileUpload}>
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photos or Videos</h3>
                <p className="text-muted-foreground mb-4">
                  Take photos or videos to help document the issue
                </p>
                <Button variant="outline" type="button">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1" onClick={handleSubmit}>
                Submit Report
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
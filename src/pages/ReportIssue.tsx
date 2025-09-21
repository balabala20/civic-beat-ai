import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, Camera } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const ReportIssue = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

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
                defaultValue={profile?.full_name || profile?.username || ''}
              />
            </div>

            <div>
              <Label htmlFor="issue-title">Issue Title</Label>
              <Input 
                id="issue-title" 
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Street address or area description"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed information about the issue..."
                rows={4}
              />
            </div>

            <div>
              <Label>Upload Images</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photos or Videos</h3>
                <p className="text-muted-foreground mb-4">
                  Take photos or videos to help document the issue
                </p>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1">
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
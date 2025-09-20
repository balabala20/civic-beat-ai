import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Home, 
  Plus, 
  User, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share2,
  Trophy,
  Camera,
  LogOut,
  Upload
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const CitizenDashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  const mockIssues = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues near the intersection',
      category: 'roads',
      status: 'submitted',
      location: 'Main St & 5th Ave',
      upvotes: 24,
      comments: 8,
      reporter: 'John Doe',
      reporterAvatar: '',
      mediaUrl: '',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Broken Street Light',
      description: 'Street light has been out for 3 days, making the area unsafe at night',
      category: 'street_lights',
      status: 'in_progress',
      location: 'Park Avenue',
      upvotes: 15,
      comments: 3,
      reporter: 'Jane Smith',
      reporterAvatar: '',
      mediaUrl: '',
      createdAt: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'roads': return '🛣️';
      case 'water': return '💧';
      case 'electricity': return '⚡';
      case 'street_lights': return '💡';
      case 'parks': return '🌳';
      default: return '📝';
    }
  };

  const IssueCard = ({ issue }: { issue: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={issue.reporterAvatar} />
              <AvatarFallback>{issue.reporter.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{issue.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{issue.reporter}</span>
                <span>•</span>
                <span>{issue.createdAt}</span>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(issue.status)} text-white`}>
            {issue.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-3">{issue.description}</p>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getCategoryIcon(issue.category)}</span>
            <span className="text-sm capitalize">{issue.category.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{issue.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{issue.upvotes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{issue.comments}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">CivicConnect</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="text-lg">
                  {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{profile?.full_name || profile?.username}</h2>
                <p className="text-muted-foreground">Citizen • Active Member</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{profile?.issues_reported || 0}</div>
                <div className="text-sm text-muted-foreground">Issues Reported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{profile?.followers_count || 0}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{profile?.following_count || 0}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Top 100 Contributors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'SuperCitizen', reports: 127, badge: '🥇' },
                { rank: 2, name: 'CityWatcher', reports: 89, badge: '🥈' },
                { rank: 3, name: 'CivicHero', reports: 76, badge: '🥉' },
                { rank: 4, name: profile?.username || 'You', reports: profile?.issues_reported || 0, badge: '⭐' },
                { rank: 5, name: 'ParkGuardian', reports: 45, badge: '🌟' }
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{user.badge}</span>
                    <div>
                      <span className="font-medium">#{user.rank} {user.name}</span>
                      {user.name === (profile?.username || 'You') && (
                        <Badge variant="secondary" className="ml-2">You</Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline">{user.reports} reports</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Community Issues Feed</h2>
          {mockIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent">
              <TabsTrigger value="feed" className="flex-col space-x-0 space-y-1 h-full">
                <Home className="h-5 w-5" />
                <span className="text-xs">Feed</span>
              </TabsTrigger>
              <TabsTrigger value="report" className="flex-col space-x-0 space-y-1 h-full">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Report</span>
              </TabsTrigger>
              <TabsTrigger value="nearby" className="flex-col space-x-0 space-y-1 h-full">
                <MapPin className="h-5 w-5" />
                <span className="text-xs">Nearby</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex-col space-x-0 space-y-1 h-full">
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Content Overlays */}
            <TabsContent value="report" className="fixed inset-0 bg-background z-50 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Report New Issue</h1>
                  <Button variant="ghost" onClick={() => setActiveTab('feed')}>
                    ✕
                  </Button>
                </div>
                
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
                      <Button variant="outline" onClick={() => setActiveTab('feed')}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="nearby" className="fixed inset-0 bg-background z-50 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Issues Near You</h1>
                  <Button variant="ghost" onClick={() => setActiveTab('feed')}>
                    ✕
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-12 text-center">
                    <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Enable Location Access</h3>
                    <p className="text-muted-foreground mb-6">
                      Allow location access to see issues reported near your area
                    </p>
                    <Button>Enable Location</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="fixed inset-0 bg-background z-50 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Profile Settings</h1>
                  <Button variant="ghost" onClick={() => setActiveTab('feed')}>
                    ✕
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Profile Management</h3>
                    <p className="text-muted-foreground mb-6">
                      Update your profile information and preferences
                    </p>
                    <Button>Edit Profile</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom padding to prevent content from being hidden behind fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default CitizenDashboard;
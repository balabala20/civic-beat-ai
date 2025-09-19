import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Plus, 
  Bell, 
  User, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share2,
  Trophy,
  Camera,
  LogOut,
  Moon,
  Sun
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
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{profile?.full_name || profile?.username}</h3>
                    <p className="text-sm text-muted-foreground">Citizen</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Issues Reported</span>
                    <Badge variant="secondary">{profile?.issues_reported || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Followers</span>
                    <Badge variant="secondary">{profile?.followers_count || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Following</span>
                    <Badge variant="secondary">{profile?.following_count || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">1. SuperCitizen</span>
                    <Badge>127 reports</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2. CityWatcher</span>
                    <Badge>89 reports</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">3. {profile?.username || 'You'}</span>
                    <Badge>{profile?.issues_reported || 0} reports</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="feed" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Feed</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Report</span>
                </TabsTrigger>
                <TabsTrigger value="nearby" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nearby</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Community Issues Feed</h2>
                  <p className="text-muted-foreground">Stay updated on civic issues in your area</p>
                </div>
                {mockIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-6 w-6" />
                      <span>Report New Issue</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Photo/Video</h3>
                      <p className="text-muted-foreground mb-4">Take a photo or video of the issue</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Media
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nearby">
                <Card>
                  <CardHeader>
                    <CardTitle>Issues Near You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Enable Location</h3>
                      <p className="text-muted-foreground">Allow location access to see nearby issues</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Profile Management</h3>
                      <p className="text-muted-foreground">Update your profile information</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
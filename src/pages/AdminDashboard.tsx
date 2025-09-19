import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  UserPlus,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalIssues: 1247,
    resolvedIssues: 892,
    activeUsers: 3456,
    staffMembers: 45,
    avgResolutionTime: '3.2 days',
    responseRate: '94%',
  };

  const departmentStats = [
    { name: 'Roads & Transportation', issues: 324, resolved: 298, efficiency: 92 },
    { name: 'Water & Sanitation', issues: 187, resolved: 165, efficiency: 88 },
    { name: 'Electricity & Power', issues: 156, resolved: 142, efficiency: 91 },
    { name: 'Parks & Recreation', issues: 98, resolved: 89, efficiency: 91 },
    { name: 'Public Safety', issues: 67, resolved: 58, efficiency: 87 },
  ];

  const recentIssues = [
    {
      id: '1',
      title: 'Water Main Break Downtown',
      priority: 'urgent',
      status: 'in_progress',
      department: 'Water & Sanitation',
      timeOpen: '2 hours',
    },
    {
      id: '2',
      title: 'Traffic Light Malfunction',
      priority: 'high',
      status: 'assigned',
      department: 'Roads & Transportation',
      timeOpen: '4 hours',
    },
    {
      id: '3',
      title: 'Park Vandalism Report',
      priority: 'medium',
      status: 'submitted',
      department: 'Parks & Recreation',
      timeOpen: '6 hours',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">System Administration & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">
                Admin: {profile?.full_name || profile?.username}
              </span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Departments</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalIssues}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.resolvedIssues}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((systemStats.resolvedIssues / systemStats.totalIssues) * 100)}% resolution rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Registered citizens</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Staff</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.staffMembers}</div>
                  <p className="text-xs text-muted-foreground">Municipal staff</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.avgResolutionTime}</div>
                  <p className="text-xs text-muted-foreground">Time to resolve</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.responseRate}</div>
                  <p className="text-xs text-muted-foreground">Within 24h</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Recent High-Priority Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col space-y-1">
                          <h4 className="font-medium">{issue.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getPriorityColor(issue.priority)} text-white text-xs`}>
                              {issue.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(issue.status)} text-white text-xs`}>
                              {issue.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{issue.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Open for {issue.timeOpen}</p>
                        <Button size="sm" variant="ghost">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.resolved}/{dept.issues} issues resolved
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{dept.efficiency}%</div>
                        <p className="text-sm text-muted-foreground">Efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Add Staff Member</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">3,456</div>
                    <p className="text-sm text-muted-foreground">Total Citizens</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">45</div>
                    <p className="text-sm text-muted-foreground">Staff Members</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">12</div>
                    <p className="text-sm text-muted-foreground">Administrators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Notification Settings</h4>
                    <p className="text-sm text-muted-foreground">Configure system-wide notification preferences</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Department Configuration</h4>
                    <p className="text-sm text-muted-foreground">Manage departments and escalation rules</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">User Permissions</h4>
                    <p className="text-sm text-muted-foreground">Configure role-based access controls</p>
                  </div>
                  
                  <Button className="mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Open Settings Panel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
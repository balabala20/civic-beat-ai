import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Filter,
  LogOut,
  BarChart3
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const StaffDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const mockAssignedIssues = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues near the intersection',
      category: 'roads',
      status: 'assigned',
      priority: 'high',
      location: 'Main St & 5th Ave',
      reporter: 'John Doe',
      assignedAt: '2024-01-20',
      dueDate: '2024-01-25',
    },
    {
      id: '2',
      title: 'Water Leak in Park',
      description: 'Major water leak detected in Central Park area',
      category: 'water',
      status: 'in_progress',
      priority: 'urgent',
      location: 'Central Park',
      reporter: 'Jane Smith',
      assignedAt: '2024-01-18',
      dueDate: '2024-01-22',
    },
    {
      id: '3',
      title: 'Broken Street Light',
      description: 'Street light has been out for 3 days',
      category: 'street_lights',
      status: 'resolved',
      priority: 'medium',
      location: 'Park Avenue',
      reporter: 'Mike Johnson',
      assignedAt: '2024-01-15',
      dueDate: '2024-01-20',
    },
  ];

  const [issues, setIssues] = useState(mockAssignedIssues);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
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

  const handleStatusChange = (issueId: string, newStatus: string) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus.replace('_', ' ')}`
    });
  };

  const handleViewDetails = (issueId: string) => {
    // Navigate to detailed issue view
    window.location.href = `/issue/${issueId}`;
  };

  const filteredIssues = issues.filter(issue => {
    if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
    if (filterCategory !== 'all' && issue.category !== filterCategory) return false;
    return true;
  });

  const stats = {
    assigned: issues.filter(i => i.status === 'assigned').length,
    inProgress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    overdue: issues.filter(i => new Date(i.dueDate) < new Date() && i.status !== 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Staff Dashboard</h1>
                <p className="text-sm text-muted-foreground">Municipal Issue Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">
                Welcome, {profile?.full_name || profile?.username}
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assigned}</div>
              <p className="text-xs text-muted-foreground">New assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Currently working on</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <p className="text-xs text-muted-foreground">Completed this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Status:</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Category:</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="roads">Roads</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="street_lights">Street Lights</SelectItem>
                    <SelectItem value="parks">Parks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Assigned Issues ({filteredIssues.length})</h2>
          
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(issue.category)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Reported by {issue.reporter} • Assigned {issue.assignedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`${getStatusColor(issue.status)} text-white`}>
                      {issue.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={`${getPriorityColor(issue.priority)} text-white`}>
                      {issue.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{issue.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{issue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Due: {issue.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {issue.status === 'assigned' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange(issue.id, 'in_progress')}
                    >
                      Start Working
                    </Button>
                  )}
                  {issue.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusChange(issue.id, 'resolved')}
                    >
                      Mark as Resolved
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleViewDetails(issue.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => {
                      const newStatus = issue.status === 'assigned' ? 'in_progress' : 
                                      issue.status === 'in_progress' ? 'resolved' : 'assigned';
                      handleStatusChange(issue.id, newStatus);
                    }}
                  >
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredIssues.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                <p className="text-muted-foreground">
                  No issues match your current filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
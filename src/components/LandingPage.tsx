import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Users, 
  MessageSquare, 
  MapPin, 
  Award, 
  Smartphone, 
  Clock,
  Shield,
  Languages,
  Moon,
  Brain,
  CheckCircle,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import heroImage from '@/assets/civic-hero.jpg';

const LandingPage = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Report Issues",
      description: "Upload photos, videos, and descriptions with automatic GPS tagging"
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Track Status",
      description: "Monitor your reports from submission to resolution in real-time"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Gamification",
      description: "Earn badges and climb leaderboards for quality civic contributions"
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Detection",
      description: "Smart categorization and duplicate detection for efficient processing"
    },
    {
      icon: <Moon className="h-8 w-8 text-secondary" />,
      title: "Dark Mode",
      description: "Comfortable viewing experience in any lighting condition"
    },
    {
      icon: <Languages className="h-8 w-8 text-accent" />,
      title: "Multilingual",
      description: "Available in English, Hindi, and Telugu for inclusive access"
    }
  ];

  const roleCards = [
    {
      title: "Citizen",
      description: "Report issues, track progress, and engage with your community",
      icon: <Users className="h-12 w-12 text-primary" />,
      buttonText: "Login as Citizen",
      gradient: "bg-gradient-civic",
      features: ["Report Issues", "Community Feed", "Leaderboards", "Gamification"]
    },
    {
      title: "Municipal Staff", 
      description: "Manage assigned issues and update resolution status",
      icon: <UserCheck className="h-12 w-12 text-secondary" />,
      buttonText: "Staff Portal",
      gradient: "bg-gradient-to-br from-secondary to-secondary-hover",
      features: ["Issue Management", "Status Updates", "Performance Analytics", "Interactive Maps"]
    },
    {
      title: "Admin",
      description: "Oversee system operations and manage departments",
      icon: <Shield className="h-12 w-12 text-accent" />,
      buttonText: "Admin Dashboard",
      gradient: "bg-gradient-to-br from-accent to-accent-hover", 
      features: ["System Analytics", "Department Management", "Escalation Control", "Global Dashboard"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CivicConnect</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Contact</Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Civic Engagement Platform
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Report Issues,
                  <span className="block bg-gradient-hero bg-clip-text text-transparent">
                    Build Community
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Crowdsourced civic issue reporting and resolution system that connects citizens, 
                  municipal staff, and administrators for transparent community improvement.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-civic">
                  <Users className="mr-2 h-5 w-5" />
                  Get Started as Citizen
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-20 rounded-full"></div>
              <img 
                src={heroImage} 
                alt="Citizens reporting civic issues" 
                className="relative z-10 rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to report, track, and resolve civic issues efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-civic bg-card-gradient">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Login Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Different portals for citizens, municipal staff, and administrators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {roleCards.map((role, index) => (
              <Card key={index} className="border-0 shadow-elegant overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`h-2 ${role.gradient}`}></div>
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-muted/50 rounded-2xl flex items-center justify-center">
                      {role.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">{role.title}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={() => window.location.href = `/auth?role=${role.title.toLowerCase().replace('municipal ', '').replace(' ', '_')}`}
                  >
                    {role.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Issues Reported</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">85%</div>
              <div className="text-muted-foreground">Resolution Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">48hrs</div>
              <div className="text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5K+</div>
              <div className="text-muted-foreground">Active Citizens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">CivicConnect</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with ❤️ for better communities
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
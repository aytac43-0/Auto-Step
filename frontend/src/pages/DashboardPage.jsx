import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Zap, 
  Bot, 
  MessageSquare, 
  FolderKanban, 
  Settings, 
  LogOut,
  Home,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  const stats = [
    {
      title: 'Active Automations',
      value: '12',
      change: '+2 this week',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Messages Processed',
      value: '3,847',
      change: '+18% this month',
      icon: MessageSquare,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Active Projects',
      value: '5',
      change: '2 in progress',
      icon: FolderKanban,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Response Time',
      value: '1.2s',
      change: '-0.3s improved',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];
  
  const recentActivities = [
    {
      title: 'Customer Support Bot',
      status: 'active',
      description: 'Processed 234 queries today',
      time: '2 minutes ago'
    },
    {
      title: 'Email Automation',
      status: 'active',
      description: 'Sent 89 automated emails',
      time: '1 hour ago'
    },
    {
      title: 'Data Integration',
      status: 'pending',
      description: 'Syncing with CRM system',
      time: '3 hours ago'
    },
    {
      title: 'Invoice Processing',
      status: 'completed',
      description: 'Processed 45 invoices',
      time: '5 hours ago'
    }
  ];
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Bot, label: 'Chatbots', active: false },
    { icon: Zap, label: 'Automations', active: false },
    { icon: FolderKanban, label: 'Projects', active: false },
    { icon: Activity, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-gradient-primary">Auto Step</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  item.active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                onClick={() => toast.info(`${item.label} - Coming Soon`)}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">John Doe</div>
                <div className="text-xs text-muted-foreground truncate">john@example.com</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            
            <Badge className="bg-success/10 text-success border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
              All Systems Operational
            </Badge>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest automation activity and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'active' ? 'bg-success/10' :
                        activity.status === 'pending' ? 'bg-warning/10' :
                        'bg-primary/10'
                      }`}>
                        {activity.status === 'active' ? <CheckCircle2 className="h-5 w-5 text-success" /> :
                         activity.status === 'pending' ? <AlertCircle className="h-5 w-5 text-warning" /> :
                         <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your automations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start"
                  onClick={() => toast.info('Create Automation - Coming Soon')}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  New Automation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => toast.info('Create Chatbot - Coming Soon')}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  New Chatbot
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => toast.info('New Project - Coming Soon')}
                >
                  <FolderKanban className="h-4 w-4 mr-2" />
                  New Project
                </Button>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">API Status</span>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bots Active</span>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        8/12
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coming Soon Section */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">More Features Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on advanced analytics, workflow builders, and integration marketplace. 
                  This is a UI prototype showcasing the design and layout.
                </p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  UI Demo - No Backend Integration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;

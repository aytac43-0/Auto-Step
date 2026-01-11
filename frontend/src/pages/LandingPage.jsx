import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Bot, 
  Brain, 
  Link as LinkIcon, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Shield,
  Users,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Streamline repetitive tasks and workflows with intelligent automation that saves time and reduces errors.'
    },
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: '24/7 intelligent chatbots that handle customer queries, provide support, and improve engagement.'
    },
    {
      icon: Brain,
      title: 'AI Assistants',
      description: 'Custom AI assistants trained on your data to help your team work faster and smarter.'
    },
    {
      icon: LinkIcon,
      title: 'System Integration',
      description: 'Connect your tools and platforms seamlessly for unified data flow and automation.'
    }
  ];
  
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your business processes and identify automation opportunities.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our experts design custom automation solutions tailored to your needs.'
    },
    {
      number: '03',
      title: 'Deploy',
      description: 'We implement and optimize your automation for maximum efficiency.'
    }
  ];
  
  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      stat: '70%',
      description: 'Reduce time spent on repetitive tasks'
    },
    {
      icon: TrendingUp,
      title: 'Scale Faster',
      stat: '3x',
      description: 'Increase operational capacity'
    },
    {
      icon: Shield,
      title: 'Reduce Errors',
      stat: '95%',
      description: 'Minimize human error'
    },
    {
      icon: Users,
      title: 'Better Experience',
      stat: '24/7',
      description: 'Always-on customer support'
    }
  ];
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc',
      content: 'Auto Step transformed our customer support. Our chatbot handles 60% of queries automatically.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director, ScaleUp Co',
      content: 'The automation solutions have saved us countless hours. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Founder, GrowthLab',
      content: 'Professional team, excellent results. Our processes are now seamless and efficient.',
      rating: 5
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Automation
              </Badge>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Automate Your
                <span className="text-gradient-accent block mt-2">Business Process</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Transform your operations with intelligent automation, AI chatbots, and custom assistants. 
                Scale faster, reduce costs, and focus on what matters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 group"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Contact Us
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gradient-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-accent">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="glass-card rounded-2xl p-2 animate-float">
                <img 
                  src="https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Automation Technology" 
                  className="rounded-xl w-full h-auto object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 glass-card p-4 rounded-xl glow-border animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful <span className="text-gradient-accent">Automation Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From chatbots to complex workflows, we build automation that transforms your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card hover:bg-secondary border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="ghost" className="text-primary p-0 hover:bg-transparent group/btn">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Process
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              How We <span className="text-gradient-accent">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, proven process to automate your business operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border"></div>
                )}
                <Card className="relative bg-card border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Why Auto Step
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Built for <span className="text-gradient-accent">Success</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our automation solutions deliver measurable results that transform businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border text-center hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-gradient-accent">{benefit.stat}</div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              What Our <span className="text-gradient-accent">Clients Say</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-accent">Automate</span> Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of businesses that trust Auto Step for their automation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
              onClick={() => navigate('/login')}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;

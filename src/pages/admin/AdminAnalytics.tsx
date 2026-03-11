import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");

  const platformMetrics = {
    totalUsers: 1262,
    activeUsers: 456,
    newUsers: 12,
    userGrowth: 8.5,
    totalSessions: 324,
    completedSessions: 298,
    avgSessionDuration: 47,
    sessionGrowth: 12.3,
    platformUsage: 78,
    peakHours: "2:00 PM - 4:00 PM",
  };

  const departmentData = [
    { name: "Computer Science", students: 342, utilization: 85, avgMood: 7.2, trend: "up" },
    { name: "Engineering", students: 289, utilization: 72, avgMood: 6.8, trend: "down" },
    { name: "Business", students: 256, utilization: 68, avgMood: 7.5, trend: "up" },
    { name: "Arts & Humanities", students: 198, utilization: 91, avgMood: 8.1, trend: "up" },
    { name: "Science", students: 177, utilization: 65, avgMood: 7.0, trend: "steady" },
  ];

  const counsellorPerformance = [
    { name: "Dr. Priya Sharma", clients: 24, sessions: 156, rating: 4.8, completion: 95, utilization: 88 },
    { name: "Dr. Raj Patel", clients: 22, sessions: 142, rating: 4.9, completion: 98, utilization: 92 },
    { name: "Dr. Anjali Desai", clients: 19, sessions: 128, rating: 4.7, completion: 93, utilization: 85 },
    { name: "Dr. Vikram Singh", clients: 21, sessions: 135, rating: 4.8, completion: 96, utilization: 89 },
  ];

  const featureUsage = [
    { feature: "AI Support Chat", usage: 892, growth: 15.2, users: 456 },
    { feature: "Mood Garden", usage: 1247, growth: 22.8, users: 682 },
    { feature: "Book Session", usage: 324, growth: 8.5, users: 298 },
    { feature: "Study Buddy", usage: 567, growth: -3.2, users: 234 },
    { feature: "Resources", usage: 789, growth: 12.1, users: 445 },
    { feature: "Wellness Tools", usage: 445, growth: 18.9, users: 312 },
  ];

  const timeSeriesData = [
    { week: "Week 1", users: 420, sessions: 280, mood: 7.2 },
    { week: "Week 2", users: 438, sessions: 295, mood: 7.4 },
    { week: "Week 3", users: 445, sessions: 310, mood: 7.1 },
    { week: "Week 4", users: 456, sessions: 324, mood: 7.5 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-green to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Platform Analytics</h1>
              <p className="text-white/90">Comprehensive insights and metrics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-white text-garden-blue hover:bg-white/90">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground">Platform performance metrics</p>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{platformMetrics.totalUsers}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success font-medium">+{platformMetrics.userGrowth}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{platformMetrics.activeUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((platformMetrics.activeUsers / platformMetrics.totalUsers) * 100)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{platformMetrics.totalSessions}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success font-medium">+{platformMetrics.sessionGrowth}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Platform Usage</p>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{platformMetrics.platformUsage}%</p>
                <p className="text-xs text-muted-foreground mt-1">Peak: {platformMetrics.peakHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList>
          <TabsTrigger value="departments">Department Analytics</TabsTrigger>
          <TabsTrigger value="counsellors">Counsellor Performance</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Department Analytics */}
        <TabsContent value="departments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Platform utilization and wellness metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentData.map((dept, idx) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{dept.name}</h3>
                        {getTrendIcon(dept.trend)}
                      </div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="text-lg font-bold">{dept.students}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Avg Mood</p>
                          <p className="text-lg font-bold text-success">{dept.avgMood}/10</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Platform Utilization</span>
                        <span className="font-medium">{dept.utilization}%</span>
                      </div>
                      <Progress value={dept.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Counsellor Performance */}
        <TabsContent value="counsellors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Counsellor Performance Metrics</CardTitle>
              <CardDescription>Individual counsellor statistics and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counsellorPerformance.map((counsellor, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{counsellor.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{counsellor.clients} clients</Badge>
                            <Badge variant="outline">{counsellor.sessions} sessions</Badge>
                            <div className="flex items-center gap-1 bg-warning/20 px-2 py-1 rounded-md">
                              <span className="text-warning text-sm">⭐</span>
                              <span className="text-warning text-sm font-medium">{counsellor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Session Completion</span>
                            <span className="font-medium">{counsellor.completion}%</span>
                          </div>
                          <Progress value={counsellor.completion} className="h-2" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Utilization Rate</span>
                            <span className="font-medium">{counsellor.utilization}%</span>
                          </div>
                          <Progress value={counsellor.utilization} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Usage */}
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Statistics</CardTitle>
              <CardDescription>Track which features are most popular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureUsage.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{feature.feature}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.users} active users • {feature.usage} total interactions
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {feature.growth >= 0 ? (
                          <>
                            <ArrowUp className="w-4 h-4 text-success" />
                            <span className="text-success font-medium">+{feature.growth}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDown className="w-4 h-4 text-destructive" />
                            <span className="text-destructive font-medium">{feature.growth}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={(feature.usage / 1247) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends */}
        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Weekly active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSeriesData.map((week, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{week.week}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Users</p>
                          <p className="font-bold text-info">{week.users}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Sessions</p>
                          <p className="font-bold text-success">{week.sessions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Trends</CardTitle>
                <CardDescription>Average mood scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSeriesData.map((week, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{week.week}</span>
                        <span className="text-lg font-bold text-success">{week.mood}/10</span>
                      </div>
                      <Progress value={week.mood * 10} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <h4 className="font-semibold text-success">Positive Trend</h4>
                  </div>
                  <p className="text-sm text-foreground">
                    Campus mood has improved by 4.2% over the past month. Keep up the great work!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Top Performing Feature</h3>
            <p className="text-3xl font-bold mb-1">Mood Garden</p>
            <p className="text-sm opacity-90">1,247 interactions this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Highest Engagement</h3>
            <p className="text-3xl font-bold mb-1">Arts & Humanities</p>
            <p className="text-sm opacity-90">91% platform utilization</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Session Success Rate</h3>
            <p className="text-3xl font-bold mb-1">92%</p>
            <p className="text-sm opacity-90">298 of 324 completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
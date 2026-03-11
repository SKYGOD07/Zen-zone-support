import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target, 
  Calendar,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

const CounsellorProgress = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const clientProgress = [
    {
      id: 1,
      name: "Student #1247",
      startDate: "2024-08-15",
      sessionsCompleted: 8,
      currentGoals: 3,
      completedGoals: 5,
      overallProgress: 75,
      trend: "improving",
      riskLevel: "low",
      goals: [
        { id: 1, text: "Manage exam anxiety", progress: 85, status: "on-track" },
        { id: 2, text: "Improve sleep quality", progress: 90, status: "completed" },
        { id: 3, text: "Develop time management skills", progress: 70, status: "on-track" },
      ],
      metrics: {
        attendanceRate: 100,
        homeworkCompletion: 85,
        selfReportedImprovement: 8,
        symptomReduction: 65,
      },
      recentMilestones: [
        { date: "2024-11-01", milestone: "Successfully managed first exam using coping strategies" },
        { date: "2024-10-25", milestone: "Improved sleep schedule - 7+ hours for 2 weeks" },
        { date: "2024-10-15", milestone: "Completed anxiety management workbook" },
      ],
    },
    {
      id: 2,
      name: "Student #2156",
      startDate: "2024-09-20",
      sessionsCompleted: 5,
      currentGoals: 4,
      completedGoals: 2,
      overallProgress: 55,
      trend: "steady",
      riskLevel: "medium",
      goals: [
        { id: 1, text: "Reduce academic stress", progress: 60, status: "needs-attention" },
        { id: 2, text: "Establish healthy sleep routine", progress: 45, status: "needs-attention" },
        { id: 3, text: "Practice mindfulness daily", progress: 70, status: "on-track" },
        { id: 4, text: "Improve self-esteem", progress: 50, status: "on-track" },
      ],
      metrics: {
        attendanceRate: 80,
        homeworkCompletion: 60,
        selfReportedImprovement: 6,
        symptomReduction: 35,
      },
      recentMilestones: [
        { date: "2024-10-28", milestone: "Practiced mindfulness for 7 consecutive days" },
        { date: "2024-10-10", milestone: "Attended first session" },
      ],
    },
    {
      id: 3,
      name: "Student #1893",
      startDate: "2024-07-01",
      sessionsCompleted: 12,
      currentGoals: 2,
      completedGoals: 8,
      overallProgress: 90,
      trend: "improving",
      riskLevel: "low",
      goals: [
        { id: 1, text: "Maintain social connections", progress: 95, status: "on-track" },
        { id: 2, text: "Prepare for therapy termination", progress: 85, status: "on-track" },
      ],
      metrics: {
        attendanceRate: 95,
        homeworkCompletion: 90,
        selfReportedImprovement: 9,
        symptomReduction: 85,
      },
      recentMilestones: [
        { date: "2024-10-30", milestone: "Attended social event independently" },
        { date: "2024-10-20", milestone: "Joined campus club without prompting" },
        { date: "2024-10-05", milestone: "Led group study session" },
      ],
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-warning" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    const styles = {
      improving: "bg-success/20 text-success border-success",
      declining: "bg-destructive/20 text-destructive border-destructive",
      steady: "bg-warning/20 text-warning border-warning",
    };
    return styles[trend as keyof typeof styles];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "on-track":
        return "bg-info";
      case "needs-attention":
        return "bg-warning";
      case "at-risk":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-purple to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Client Progress Tracking</h1>
            <p className="text-white/90">Monitor outcomes and treatment effectiveness</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Showing Improvement</p>
                <p className="text-3xl font-bold">18</p>
                <p className="text-xs opacity-90">75% of clients</p>
              </div>
              <ArrowUp className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Progress</p>
                <p className="text-3xl font-bold">73%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Goals Achieved</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <Target className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-garden-purple to-garden-purple/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Sessions</p>
                <p className="text-3xl font-bold">8.3</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Progress List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Progress Overview</CardTitle>
          <CardDescription>Track treatment outcomes and goal completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientProgress.map((client) => (
              <Card 
                key={client.id} 
                className="cursor-pointer hover:border-garden-purple transition-colors"
                onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <Badge className={getTrendBadge(client.trend)}>
                          {getTrendIcon(client.trend)}
                          <span className="ml-1 capitalize">{client.trend}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Started: {client.startDate} • {client.sessionsCompleted} sessions completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-success">{client.overallProgress}%</p>
                      <p className="text-xs text-muted-foreground">Overall Progress</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Treatment Progress</span>
                      <span className="font-medium">{client.overallProgress}%</span>
                    </div>
                    <Progress value={client.overallProgress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{client.currentGoals}</p>
                      <p className="text-xs text-muted-foreground">Active Goals</p>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <p className="text-2xl font-bold text-success">{client.completedGoals}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center p-3 bg-info/10 rounded-lg">
                      <p className="text-2xl font-bold text-info">{client.metrics.attendanceRate}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                    <div className="text-center p-3 bg-warning/10 rounded-lg">
                      <p className="text-2xl font-bold text-warning">{client.metrics.homeworkCompletion}%</p>
                      <p className="text-xs text-muted-foreground">Homework</p>
                    </div>
                  </div>

                  {selectedClient === client.id && (
                    <div className="mt-6 pt-6 border-t space-y-6">
                      <Tabs defaultValue="goals" className="w-full">
                        <TabsList>
                          <TabsTrigger value="goals">Treatment Goals</TabsTrigger>
                          <TabsTrigger value="metrics">Outcome Metrics</TabsTrigger>
                          <TabsTrigger value="milestones">Milestones</TabsTrigger>
                        </TabsList>

                        <TabsContent value="goals" className="mt-6 space-y-4">
                          {client.goals.map((goal) => (
                            <div key={goal.id} className="p-4 rounded-lg border">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1">{goal.text}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize">
                                      {goal.status.replace("-", " ")}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                                  </div>
                                </div>
                                {goal.status === "completed" && (
                                  <CheckCircle className="w-5 h-5 text-success" />
                                )}
                                {goal.status === "needs-attention" && (
                                  <AlertCircle className="w-5 h-5 text-warning" />
                                )}
                              </div>
                              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getStatusColor(goal.status)} transition-all`}
                                  style={{ width: `${goal.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="metrics" className="mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Attendance Rate</span>
                                  <span className="text-lg font-bold text-success">{client.metrics.attendanceRate}%</span>
                                </div>
                                <Progress value={client.metrics.attendanceRate} className="h-2" />
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Homework Completion</span>
                                  <span className="text-lg font-bold text-info">{client.metrics.homeworkCompletion}%</span>
                                </div>
                                <Progress value={client.metrics.homeworkCompletion} className="h-2" />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Self-Reported Improvement</span>
                                  <span className="text-lg font-bold text-warning">{client.metrics.selfReportedImprovement}/10</span>
                                </div>
                                <Progress value={client.metrics.selfReportedImprovement * 10} className="h-2" />
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Symptom Reduction</span>
                                  <span className="text-lg font-bold text-garden-purple">{client.metrics.symptomReduction}%</span>
                                </div>
                                <Progress value={client.metrics.symptomReduction} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="milestones" className="mt-6 space-y-3">
                          {client.recentMilestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                              <Award className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{milestone.milestone}</p>
                                <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorProgress;
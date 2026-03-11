import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  Clock,
  Filter,
  Plus
} from "lucide-react";

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reportCategories = [
    {
      name: "Usage Reports",
      icon: Activity,
      reports: [
        { id: "platform-usage", name: "Platform Usage Overview", description: "Comprehensive platform metrics and engagement", lastGenerated: "Nov 3, 2025", frequency: "Weekly" },
        { id: "feature-analytics", name: "Feature Analytics", description: "Individual feature usage statistics", lastGenerated: "Nov 2, 2025", frequency: "Monthly" },
        { id: "user-activity", name: "User Activity Trends", description: "Active user patterns and trends", lastGenerated: "Nov 4, 2025", frequency: "Daily" },
      ],
    },
    {
      name: "Wellness Reports",
      icon: TrendingUp,
      reports: [
        { id: "mood-analysis", name: "Campus Mood Analysis", description: "Anonymous mood tracking and trends", lastGenerated: "Nov 4, 2025", frequency: "Weekly" },
        { id: "crisis-alerts", name: "Crisis Intervention Report", description: "High-risk cases and interventions", lastGenerated: "Nov 1, 2025", frequency: "Real-time" },
        { id: "wellness-outcomes", name: "Wellness Outcomes", description: "Treatment effectiveness and outcomes", lastGenerated: "Nov 1, 2025", frequency: "Monthly" },
      ],
    },
    {
      name: "Counsellor Reports",
      icon: Users,
      reports: [
        { id: "counsellor-performance", name: "Counsellor Performance", description: "Individual counsellor metrics", lastGenerated: "Nov 1, 2025", frequency: "Monthly" },
        { id: "session-statistics", name: "Session Statistics", description: "Completion rates and attendance", lastGenerated: "Nov 3, 2025", frequency: "Weekly" },
        { id: "workload-analysis", name: "Workload Analysis", description: "Counsellor capacity and utilization", lastGenerated: "Nov 2, 2025", frequency: "Bi-weekly" },
      ],
    },
    {
      name: "Compliance Reports",
      icon: FileText,
      reports: [
        { id: "data-privacy", name: "Data Privacy Audit", description: "HIPAA compliance and data security", lastGenerated: "Oct 15, 2025", frequency: "Quarterly" },
        { id: "service-quality", name: "Service Quality Assurance", description: "Quality metrics and standards", lastGenerated: "Nov 1, 2025", frequency: "Monthly" },
        { id: "regulatory-compliance", name: "Regulatory Compliance", description: "Legal and regulatory requirements", lastGenerated: "Oct 1, 2025", frequency: "Quarterly" },
      ],
    },
  ];

  const scheduledReports = [
    { name: "Weekly Platform Usage", nextRun: "Nov 11, 2025", frequency: "Weekly", recipients: 3 },
    { name: "Monthly Wellness Outcomes", nextRun: "Dec 1, 2025", frequency: "Monthly", recipients: 5 },
    { name: "Daily User Activity", nextRun: "Nov 5, 2025", frequency: "Daily", recipients: 2 },
  ];

  const recentReports = [
    { 
      name: "Platform Usage Overview - Week 44", 
      generated: "Nov 4, 2025, 12:00 AM", 
      size: "2.4 MB", 
      format: "PDF",
      downloadCount: 12,
    },
    { 
      name: "Campus Mood Analysis - Week 44", 
      generated: "Nov 4, 2025, 12:00 AM", 
      size: "1.8 MB", 
      format: "PDF",
      downloadCount: 8,
    },
    { 
      name: "Session Statistics - Week 44", 
      generated: "Nov 3, 2025, 11:00 PM", 
      size: "1.2 MB", 
      format: "Excel",
      downloadCount: 15,
    },
    { 
      name: "Counsellor Performance - October 2025", 
      generated: "Nov 1, 2025, 12:00 AM", 
      size: "3.1 MB", 
      format: "PDF",
      downloadCount: 6,
    },
  ];

  const reportTemplates = [
    { 
      name: "Custom Usage Report", 
      description: "Build your own usage analytics report",
      parameters: ["Date Range", "User Segments", "Metrics"]
    },
    { 
      name: "Department Comparison", 
      description: "Compare metrics across departments",
      parameters: ["Departments", "Metrics", "Time Period"]
    },
    { 
      name: "Counsellor Summary", 
      description: "Generate counsellor performance summary",
      parameters: ["Counsellors", "Date Range", "KPIs"]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-green to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Reports & Analytics</h1>
              <p className="text-white/90">Generate and manage system reports</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-white text-garden-blue hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Reports</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">This Month</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Scheduled</p>
                <p className="text-3xl font-bold">{scheduledReports.length}</p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-garden-purple to-garden-purple/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Downloads</p>
                <p className="text-3xl font-bold">892</p>
              </div>
              <Download className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList>
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        {/* Available Reports */}
        <TabsContent value="available" className="mt-6 space-y-6">
          {reportCategories.map((category, catIdx) => (
            <Card key={catIdx}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-garden-blue" />
                  <CardTitle>{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.reports.map((report) => (
                    <Card key={report.id} className="hover:border-garden-blue transition-colors">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{report.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Last Generated</span>
                            <span className="font-medium">{report.lastGenerated}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Frequency</span>
                            <Badge variant="secondary">{report.frequency}</Badge>
                          </div>
                        </div>
                        <Button className="w-full" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Recent Reports */}
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
              <CardDescription>Download or view recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, idx) => (
                  <Card key={idx} className="hover:border-garden-blue transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <FileText className="w-8 h-8 text-garden-blue" />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{report.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.generated}
                              </span>
                              <span>{report.size}</span>
                              <Badge variant="outline">{report.format}</Badge>
                              <span>{report.downloadCount} downloads</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports */}
        <TabsContent value="scheduled" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Automated Report Schedule</CardTitle>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Schedule
                    </Button>
                  </div>
                  <CardDescription>Manage automated report generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scheduledReports.map((report, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{report.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Next: {report.nextRun}
                              </span>
                              <Badge variant="secondary">{report.frequency}</Badge>
                              <span>{report.recipients} recipients</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Pause</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Schedule Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Report Generation</p>
                    <p className="text-xs text-muted-foreground">
                      Scheduled reports are generated automatically at midnight
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Email Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Reports are emailed to designated recipients
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Storage</p>
                    <p className="text-xs text-muted-foreground">
                      Reports are stored for 90 days
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="opacity-90">• Set up automated reports for regular monitoring</p>
                  <p className="opacity-90">• Use custom date ranges for specific analysis</p>
                  <p className="opacity-90">• Export to Excel for detailed data work</p>
                  <p className="opacity-90">• Share reports with relevant stakeholders</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Custom Reports */}
        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Templates</CardTitle>
              <CardDescription>Build custom reports with specific parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportTemplates.map((template, idx) => (
                  <Card key={idx} className="hover:border-garden-blue transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-garden-blue" />
                        <h3 className="font-semibold">{template.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Parameters:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.parameters.map((param, pIdx) => (
                            <Badge key={pIdx} variant="secondary" className="text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Build From Scratch</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a completely custom report by selecting specific data sources and visualizations
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Building
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
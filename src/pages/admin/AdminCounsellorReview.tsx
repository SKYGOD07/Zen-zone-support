import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  FileText,
  Download,
  Mail,
  Phone,
  Award,
  AlertCircle
} from "lucide-react";

const AdminCounsellorReview = () => {
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);

  const pendingApplications = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      email: "sarah.mitchell@university.edu",
      phone: "+91 98765 43210",
      specialization: "Anxiety & Depression",
      license: "PSY-98765",
      experience: 8,
      education: "Ph.D. Clinical Psychology, Stanford University",
      certifications: ["CBT Certified", "Trauma-Informed Care", "EMDR Level II"],
      appliedDate: "2024-11-01",
      status: "pending",
      references: 3,
      documentsSubmitted: ["CV", "License", "Certificates", "References"],
      motivation: "I am passionate about supporting students through their mental health challenges. My experience in university counseling centers has equipped me with the skills to address the unique stressors faced by college students.",
      availability: "Full-time",
      previousExperience: "5 years at UCLA Counseling Center, 3 years private practice",
    },
    {
      id: 2,
      name: "Dr. Arjun Verma",
      email: "arjun.verma@university.edu",
      phone: "+91 98765 43211",
      specialization: "Academic Stress & Burnout",
      license: "PSY-87654",
      experience: 6,
      education: "Ph.D. Counseling Psychology, University of Michigan",
      certifications: ["Mindfulness-Based Stress Reduction", "ACT Practitioner"],
      appliedDate: "2024-10-28",
      status: "pending",
      references: 3,
      documentsSubmitted: ["CV", "License", "Certificates"],
      motivation: "Having experienced academic pressure firsthand, I deeply understand the challenges students face. I want to help create a supportive environment where students can thrive both academically and personally.",
      availability: "Part-time (20 hrs/week)",
      previousExperience: "4 years at IIT Delhi Wellness Center, 2 years corporate wellness",
    },
    {
      id: 3,
      name: "Dr. Maya Kapoor",
      email: "maya.kapoor@university.edu",
      phone: "+91 98765 43212",
      specialization: "Relationship Counseling",
      license: "PSY-76543",
      experience: 10,
      education: "Ph.D. Marriage & Family Therapy, Boston University",
      certifications: ["Gottman Method Level III", "EFT Certified", "Couples Therapy"],
      appliedDate: "2024-10-25",
      status: "under-review",
      references: 4,
      documentsSubmitted: ["CV", "License", "Certificates", "References", "Publications"],
      motivation: "Building healthy relationships is crucial for student wellbeing. I bring extensive experience in helping individuals navigate interpersonal challenges during this critical developmental period.",
      availability: "Full-time",
      previousExperience: "6 years private practice, 4 years university counseling",
    },
  ];

  const activeCounsellors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Anxiety & Depression",
      clients: 24,
      rating: 4.8,
      sessions: 156,
      joinedDate: "2023-01-15",
      status: "active",
      performance: "excellent",
    },
    {
      id: 2,
      name: "Dr. Raj Patel",
      specialization: "Stress Management",
      clients: 22,
      rating: 4.9,
      sessions: 142,
      joinedDate: "2023-02-20",
      status: "active",
      performance: "excellent",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-warning/20 text-warning border-warning",
      "under-review": "bg-info/20 text-info border-info",
      approved: "bg-success/20 text-success border-success",
      rejected: "bg-destructive/20 text-destructive border-destructive",
    };
    return styles[status as keyof typeof styles];
  };

  const getPerformanceBadge = (performance: string) => {
    const styles = {
      excellent: "bg-success/20 text-success border-success",
      good: "bg-info/20 text-info border-info",
      average: "bg-warning/20 text-warning border-warning",
      "needs-improvement": "bg-destructive/20 text-destructive border-destructive",
    };
    return styles[performance as keyof typeof styles];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-green to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <UserCheck className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Counsellor Review</h1>
            <p className="text-white/90">Review and approve counsellor applications</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Review</p>
                <p className="text-3xl font-bold">{pendingApplications.filter(a => a.status === 'pending').length}</p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Under Review</p>
                <p className="text-3xl font-bold">{pendingApplications.filter(a => a.status === 'under-review').length}</p>
              </div>
              <AlertCircle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active</p>
                <p className="text-3xl font-bold">{activeCounsellors.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-garden-purple to-garden-purple/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Rating</p>
                <p className="text-3xl font-bold">4.8</p>
              </div>
              <Star className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="active">Active Counsellors</TabsTrigger>
          <TabsTrigger value="performance">Performance Review</TabsTrigger>
        </TabsList>

        {/* Pending Applications */}
        <TabsContent value="pending" className="mt-6 space-y-6">
          {pendingApplications.map((application) => (
            <Card key={application.id} className="border-l-4 border-l-warning">
              <CardContent className="p-6">
                {selectedApplication === application.id ? (
                  // Detailed View
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{application.name}</h2>
                        <Badge className={getStatusBadge(application.status)}>
                          <Clock className="w-3 h-3 mr-1" />
                          {application.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                        Close
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{application.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{application.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Professional Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Professional Details</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">License Number</p>
                            <p className="font-medium">{application.license}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Specialization</p>
                            <p className="font-medium">{application.specialization}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Experience</p>
                            <p className="font-medium">{application.experience} years</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Availability</p>
                            <p className="font-medium">{application.availability}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2 mb-3">Education</h3>
                      <p className="text-sm">{application.education}</p>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2 mb-3">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {application.certifications.map((cert, idx) => (
                          <Badge key={idx} variant="secondary">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Previous Experience */}
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2 mb-3">Previous Experience</h3>
                      <p className="text-sm">{application.previousExperience}</p>
                    </div>

                    {/* Motivation */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Statement of Purpose</h3>
                      <p className="text-sm leading-relaxed">{application.motivation}</p>
                    </div>

                    {/* Documents */}
                    <div>
                      <h3 className="font-semibold text-lg border-b pb-2 mb-3">Submitted Documents</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {application.documentsSubmitted.map((doc, idx) => (
                          <Button key={idx} variant="outline" className="justify-start">
                            <FileText className="w-4 h-4 mr-2" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* References */}
                    <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="w-4 h-4 text-info" />
                        <h3 className="font-semibold">References</h3>
                      </div>
                      <p className="text-sm">{application.references} professional references submitted and verified</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button className="flex-1 bg-success hover:bg-success/90">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Application
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Request More Information
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Application
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Summary View
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{application.name}</h3>
                          <Badge className={getStatusBadge(application.status)}>
                            {application.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{application.specialization}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Applied: {application.appliedDate}
                          </span>
                          <span className="text-muted-foreground">
                            Experience: {application.experience} years
                          </span>
                          <span className="text-muted-foreground">
                            License: {application.license}
                          </span>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedApplication(application.id)}>
                        Review Application
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {application.certifications.slice(0, 3).map((cert, idx) => (
                        <Badge key={idx} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                      {application.certifications.length > 3 && (
                        <Badge variant="outline">+{application.certifications.length - 3} more</Badge>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Active Counsellors */}
        <TabsContent value="active" className="mt-6 space-y-4">
          {activeCounsellors.map((counsellor) => (
            <Card key={counsellor.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{counsellor.name}</h3>
                      <Badge variant="secondary">Active</Badge>
                      <Badge className={getPerformanceBadge(counsellor.performance)}>
                        {counsellor.performance}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{counsellor.specialization}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">{counsellor.clients}</p>
                        <p className="text-xs text-muted-foreground">Clients</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">{counsellor.sessions}</p>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                      </div>
                      <div className="text-center p-3 bg-warning/10 rounded-lg">
                        <p className="text-2xl font-bold text-warning">{counsellor.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center p-3 bg-info/10 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Joined</p>
                        <p className="text-sm font-medium">{counsellor.joinedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">Performance Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Performance Review */}
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Counsellor Performance Metrics</CardTitle>
              <CardDescription>Ongoing performance evaluation and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeCounsellors.map((counsellor) => (
                  <div key={counsellor.id} className="p-6 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{counsellor.name}</h3>
                        <p className="text-sm text-muted-foreground">{counsellor.specialization}</p>
                      </div>
                      <Badge className={getPerformanceBadge(counsellor.performance)}>
                        {counsellor.performance}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Client Satisfaction</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-warning rounded-full"
                              style={{ width: `${(counsellor.rating / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-warning">{counsellor.rating}/5</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Session Completion</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-success rounded-full" style={{ width: "95%" }} />
                          </div>
                          <span className="text-sm font-bold text-success">95%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Response Time</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-info rounded-full" style={{ width: "88%" }} />
                          </div>
                          <span className="text-sm font-bold text-info">88%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button size="sm" variant="outline">Schedule Review Meeting</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCounsellorReview;
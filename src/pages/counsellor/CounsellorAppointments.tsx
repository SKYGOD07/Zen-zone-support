import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MapPin, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const CounsellorAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      client: "Student #1247",
      time: "10:00 AM",
      duration: "50 min",
      type: "Follow-up Session",
      mode: "online",
      status: "confirmed",
      concerns: ["Exam Anxiety"],
      notes: "Third session focusing on coping strategies",
    },
    {
      id: 2,
      client: "Student #2156",
      time: "11:30 AM",
      duration: "45 min",
      type: "Initial Consultation",
      mode: "in-person",
      status: "in-progress",
      concerns: ["Academic Stress", "Time Management"],
      notes: "First meeting - assessment session",
    },
    {
      id: 3,
      client: "Student #1893",
      time: "2:00 PM",
      duration: "50 min",
      type: "Anxiety Support",
      mode: "online",
      status: "confirmed",
      concerns: ["Social Anxiety"],
      notes: "Working on exposure therapy techniques",
    },
    {
      id: 4,
      client: "Student #2401",
      time: "3:30 PM",
      duration: "50 min",
      type: "Academic Stress",
      mode: "in-person",
      status: "pending",
      concerns: ["Depression", "Motivation"],
      notes: "Referred by primary care physician",
    },
    {
      id: 5,
      client: "Student #1654",
      time: "5:00 PM",
      duration: "45 min",
      type: "General Counseling",
      mode: "online",
      status: "confirmed",
      concerns: ["Relationship Issues"],
      notes: "Six-month check-in",
    },
  ];

  const upcomingAppointments = [
    { date: "Tomorrow", count: 6 },
    { date: "Nov 6", count: 5 },
    { date: "Nov 7", count: 4 },
    { date: "Nov 8", count: 7 },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-success/20 text-success border-success",
      "in-progress": "bg-info/20 text-info border-info",
      pending: "bg-warning/20 text-warning border-warning",
      completed: "bg-muted text-muted-foreground border-muted",
      cancelled: "bg-destructive/20 text-destructive border-destructive",
    };
    return styles[status as keyof typeof styles] || styles.confirmed;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-purple to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <Calendar className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-white/90">Manage your counseling sessions</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Today's Sessions</p>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Confirmed</p>
              <p className="text-3xl font-bold">
                {appointments.filter((a) => a.status === "confirmed").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold">
                {appointments.filter((a) => a.status === "pending").length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-garden-purple to-garden-purple/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">This Week</p>
              <p className="text-3xl font-bold">22</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Tuesday, November 4, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6 space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:border-garden-purple transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{appointment.client}</h3>
                              <Badge className={getStatusBadge(appointment.status)}>
                                {getStatusIcon(appointment.status)}
                                <span className="ml-1 capitalize">{appointment.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{appointment.type}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="text-sm font-semibold">{appointment.time}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p className="text-sm font-semibold">{appointment.duration}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {appointment.mode === "online" ? (
                              <Video className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                            )}
                            <div>
                              <p className="text-xs text-muted-foreground">Mode</p>
                              <p className="text-sm font-semibold capitalize">{appointment.mode}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Client ID</p>
                              <p className="text-sm font-semibold">{appointment.client.split("#")[1]}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">Concerns:</p>
                          <div className="flex flex-wrap gap-2">
                            {appointment.concerns.map((concern, idx) => (
                              <Badge key={idx} variant="secondary">
                                {concern}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-muted/50 rounded-lg mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Session Notes:</p>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>

                        <div className="flex gap-2">
                          {appointment.status === "confirmed" && (
                            <>
                              {appointment.mode === "online" && (
                                <Button className="flex-1">
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Video Call
                                </Button>
                              )}
                              {appointment.mode === "in-person" && (
                                <Button className="flex-1">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as In Progress
                                </Button>
                              )}
                            </>
                          )}
                          {appointment.status === "pending" && (
                            <>
                              <Button className="flex-1">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirm
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          {appointment.status === "in-progress" && (
                            <Button className="flex-1" variant="outline">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete Session
                            </Button>
                          )}
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="confirmed" className="mt-6 space-y-4">
                  {appointments
                    .filter((a) => a.status === "confirmed")
                    .map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold mb-1">{appointment.client}</h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.time} • {appointment.duration}
                              </p>
                            </div>
                            <Button size="sm">View</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="pending" className="mt-6 space-y-4">
                  {appointments
                    .filter((a) => a.status === "pending")
                    .map((appointment) => (
                      <Card key={appointment.id} className="border-warning">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold mb-1">{appointment.client}</h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.time} • {appointment.type}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Days */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAppointments.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">{day.count} sessions</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Set Availability
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Block Time Slot
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="w-4 h-4 mr-2" />
                View All Clients
              </Button>
            </CardContent>
          </Card>

          {/* Session Stats */}
          <Card className="bg-gradient-to-br from-garden-purple to-garden-blue text-white border-0">
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Total Sessions</span>
                  <span className="text-lg font-semibold">22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Completed</span>
                  <span className="text-lg font-semibold">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Remaining</span>
                  <span className="text-lg font-semibold">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Avg Rating</span>
                  <span className="text-lg font-semibold">4.8 ⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAppointments;
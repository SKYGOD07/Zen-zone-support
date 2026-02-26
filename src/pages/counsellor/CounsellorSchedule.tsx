import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Edit2, Trash2, Save, CheckCircle } from "lucide-react";

const CounsellorSchedule = () => {
  const [editingSlot, setEditingSlot] = useState<string | null>(null);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const [availability, setAvailability] = useState({
    Monday: {
      enabled: true,
      slots: [
        { time: "10:00 AM", available: true, booked: true, client: "Student #1247" },
        { time: "11:30 AM", available: true, booked: true, client: "Student #2156" },
        { time: "02:00 PM", available: true, booked: false },
        { time: "03:30 PM", available: true, booked: false },
      ],
    },
    Tuesday: {
      enabled: true,
      slots: [
        { time: "09:00 AM", available: true, booked: false },
        { time: "10:30 AM", available: true, booked: true, client: "Student #1893" },
        { time: "02:00 PM", available: true, booked: false },
        { time: "04:00 PM", available: true, booked: false },
      ],
    },
    Wednesday: {
      enabled: true,
      slots: [
        { time: "10:00 AM", available: true, booked: false },
        { time: "11:30 AM", available: true, booked: false },
        { time: "02:00 PM", available: false, booked: false },
        { time: "03:30 PM", available: true, booked: true, client: "Student #2401" },
      ],
    },
    Thursday: {
      enabled: true,
      slots: [
        { time: "09:00 AM", available: true, booked: true, client: "Student #1654" },
        { time: "11:00 AM", available: true, booked: false },
        { time: "02:00 PM", available: true, booked: false },
        { time: "04:00 PM", available: true, booked: false },
      ],
    },
    Friday: {
      enabled: true,
      slots: [
        { time: "10:00 AM", available: true, booked: false },
        { time: "01:00 PM", available: true, booked: false },
        { time: "03:00 PM", available: true, booked: false },
      ],
    },
  });

  const upcomingLeaves = [
    { date: "Nov 15-17, 2025", reason: "Conference Attendance", status: "approved" },
    { date: "Dec 20-31, 2025", reason: "Winter Break", status: "pending" },
  ];

  const scheduleStats = {
    weeklySlots: 20,
    bookedSlots: 7,
    availableSlots: 13,
    utilizationRate: 35,
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-purple to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">My Schedule</h1>
              <p className="text-white/90">Manage your availability and time slots</p>
            </div>
          </div>
          <Button className="bg-white text-garden-purple hover:bg-white/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Time Block
          </Button>
        </div>
      </div>

      {/* Schedule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Weekly Slots</p>
              <p className="text-3xl font-bold">{scheduleStats.weeklySlots}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Booked</p>
              <p className="text-3xl font-bold">{scheduleStats.bookedSlots}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Available</p>
              <p className="text-3xl font-bold">{scheduleStats.availableSlots}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-garden-purple to-garden-purple/80 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Utilization</p>
              <p className="text-3xl font-bold">{scheduleStats.utilizationRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="leaves">Time Off</TabsTrigger>
        </TabsList>

        {/* Weekly Schedule Tab */}
        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Availability</CardTitle>
              <CardDescription>Manage your time slots for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weekDays.map((day) => (
                  <div key={day}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{day}</h3>
                        <Badge variant={availability[day as keyof typeof availability].enabled ? "default" : "secondary"}>
                          {availability[day as keyof typeof availability].enabled ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Slot
                        </Button>
                        <Switch
                          checked={availability[day as keyof typeof availability].enabled}
                          onCheckedChange={(checked) => {
                            setAvailability({
                              ...availability,
                              [day]: { ...availability[day as keyof typeof availability], enabled: checked },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {availability[day as keyof typeof availability].slots.map((slot, idx) => (
                        <Card
                          key={idx}
                          className={`cursor-pointer transition-colors ${
                            slot.booked
                              ? "border-success bg-success/5"
                              : slot.available
                              ? "border-info bg-info/5 hover:border-garden-purple"
                              : "border-muted bg-muted/50 opacity-60"
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold text-sm">{slot.time}</span>
                              </div>
                              {slot.booked ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => setEditingSlot(`${day}-${idx}`)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>

                            {slot.booked ? (
                              <div className="space-y-1">
                                <Badge className="text-xs">Booked</Badge>
                                <p className="text-xs text-muted-foreground mt-1">{slot.client}</p>
                              </div>
                            ) : (
                              <Badge variant={slot.available ? "secondary" : "outline"} className="text-xs">
                                {slot.available ? "Available" : "Blocked"}
                              </Badge>
                            )}

                            {editingSlot === `${day}-${idx}` && !slot.booked && (
                              <div className="mt-3 pt-3 border-t space-y-2">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={slot.available}
                                    onCheckedChange={() => {}}
                                  />
                                  <Label className="text-xs">Available for booking</Label>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" className="flex-1" onClick={() => setEditingSlot(null)}>
                                    <Save className="w-3 h-3 mr-1" />
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setEditingSlot(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>Configure your default availability preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-4">Default Working Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <select className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground h-10">
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <select className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground h-10">
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-4">Session Duration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <Label>Default session length</Label>
                      <select className="px-3 py-1 rounded-md bg-background border border-input text-foreground">
                        <option>45 minutes</option>
                        <option>50 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <Label>Buffer time between sessions</Label>
                      <select className="px-3 py-1 rounded-md bg-background border border-input text-foreground">
                        <option>10 minutes</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-4">Booking Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label>Allow same-day bookings</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Let clients book appointments on the same day
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label>Auto-confirm bookings</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Automatically confirm new appointment requests
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <Label>Maximum advance booking</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          How far in advance clients can book
                        </p>
                      </div>
                      <select className="px-3 py-1 rounded-md bg-background border border-input text-foreground">
                        <option>2 weeks</option>
                        <option>4 weeks</option>
                        <option>8 weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Off Tab */}
        <TabsContent value="leaves" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Scheduled Time Off</CardTitle>
                      <CardDescription>Manage your leave requests and time off</CardDescription>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Request Time Off
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingLeaves.map((leave, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <h3 className="font-semibold">{leave.date}</h3>
                              <Badge
                                variant={leave.status === "approved" ? "default" : "secondary"}
                                className={
                                  leave.status === "approved"
                                    ? "bg-success text-white"
                                    : "bg-warning text-white"
                                }
                              >
                                {leave.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{leave.reason}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
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
                  <CardTitle className="text-lg">Leave Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Annual Leave</span>
                    <span className="text-lg font-bold">15 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Sick Leave</span>
                    <span className="text-lg font-bold">8 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Used This Year</span>
                    <span className="text-lg font-bold">7 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-info to-info/80 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="opacity-90">• Request time off at least 2 weeks in advance</p>
                  <p className="opacity-90">• Cancel appointments before blocking time</p>
                  <p className="opacity-90">• Set auto-reply for out-of-office periods</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CounsellorSchedule;
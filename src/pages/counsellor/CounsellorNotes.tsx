import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Search, Plus, Calendar, User, Edit2, Save, Lock } from "lucide-react";

const CounsellorNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState<number | null>(null);

  const sessionNotes = [
    {
      id: 1,
      client: "Student #1247",
      date: "2024-11-03",
      time: "2:00 PM",
      sessionNumber: 5,
      duration: "50 min",
      type: "Follow-up",
      concerns: ["Exam Anxiety", "Time Management"],
      observations: "Client showed significant improvement in anxiety management. Practicing breathing exercises regularly. Reports better sleep quality.",
      interventions: "Continued CBT techniques for exam anxiety. Introduced time-blocking method for study schedule.",
      homework: "Practice 4-7-8 breathing technique twice daily. Create weekly study schedule using time-blocking.",
      progressRating: 8,
      nextSteps: "Review time management progress. Discuss upcoming exam preparation strategies.",
      privateNotes: "Consider adjusting session frequency to bi-weekly if progress continues.",
    },
    {
      id: 2,
      client: "Student #2156",
      date: "2024-11-02",
      time: "11:30 AM",
      sessionNumber: 3,
      duration: "45 min",
      type: "Regular Session",
      concerns: ["Academic Stress", "Sleep Issues"],
      observations: "Client reports continued difficulty with sleep onset. Academic performance improving but stress levels remain elevated.",
      interventions: "Sleep hygiene education. Progressive muscle relaxation training. Discussed relationship between stress and sleep.",
      homework: "Implement sleep hygiene routine (no screens 1hr before bed). Practice PMR before sleep.",
      progressRating: 6,
      nextSteps: "Follow up on sleep improvements. Address underlying perfectionism contributing to academic stress.",
      privateNotes: "May need to discuss medication referral if sleep doesn't improve in 2 weeks.",
    },
    {
      id: 3,
      client: "Student #1893",
      date: "2024-11-01",
      time: "4:00 PM",
      sessionNumber: 8,
      duration: "50 min",
      type: "Progress Review",
      concerns: ["Social Anxiety"],
      observations: "Remarkable progress. Client attended social event independently. Still experiences anticipatory anxiety but manages it effectively.",
      interventions: "Reviewed exposure hierarchy progress. Reinforced coping strategies. Discussed maintaining gains.",
      homework: "Continue gradual exposure. Join one new campus activity.",
      progressRating: 9,
      nextSteps: "Consider transitioning to monthly check-ins. Discuss termination planning.",
      privateNotes: "Excellent candidate for peer support group leadership.",
    },
  ];

  const filteredNotes = sessionNotes.filter(note =>
    note.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.concerns.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-purple to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Session Notes</h1>
              <p className="text-white/90">Document and review confidential session notes</p>
            </div>
          </div>
          <Button className="bg-white text-garden-purple hover:bg-white/90">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Total Notes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-foreground">100%</p>
            <p className="text-sm text-muted-foreground">Compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Session Documentation</CardTitle>
              <CardDescription>Confidential client session notes (HIPAA compliant)</CardDescription>
            </div>
            <Badge variant="outline" className="text-warning border-warning">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by client or concern..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="by-client">By Client</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-6 space-y-6">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="border-l-4 border-l-garden-purple">
                  <CardContent className="p-6">
                    {editingNote === note.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Editing Session Note</h3>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => setEditingNote(null)}>
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Observations</label>
                            <textarea
                              className="w-full min-h-[80px] p-3 rounded-md bg-background border border-input text-foreground resize-none"
                              defaultValue={note.observations}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Interventions</label>
                            <textarea
                              className="w-full min-h-[80px] p-3 rounded-md bg-background border border-input text-foreground resize-none"
                              defaultValue={note.interventions}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Homework Assigned</label>
                            <textarea
                              className="w-full min-h-[60px] p-3 rounded-md bg-background border border-input text-foreground resize-none"
                              defaultValue={note.homework}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <User className="w-5 h-5 text-muted-foreground" />
                              <h3 className="text-lg font-semibold">{note.client}</h3>
                              <Badge variant="secondary">Session #{note.sessionNumber}</Badge>
                              <Badge variant="outline">{note.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {note.date}
                              </span>
                              <span>{note.time}</span>
                              <span>{note.duration}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNote(note.id)}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Presenting Concerns</h4>
                            <div className="flex flex-wrap gap-2">
                              {note.concerns.map((concern, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {concern}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Observations</h4>
                              <p className="text-sm text-foreground">{note.observations}</p>
                            </div>

                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Interventions</h4>
                              <p className="text-sm text-foreground">{note.interventions}</p>
                            </div>
                          </div>

                          <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Homework Assigned</h4>
                            <p className="text-sm text-foreground">{note.homework}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Progress Rating</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-success to-garden-green rounded-full"
                                    style={{ width: `${note.progressRating * 10}%` }}
                                  />
                                </div>
                                <span className="text-sm font-bold text-success">{note.progressRating}/10</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Next Steps</h4>
                            <p className="text-sm text-foreground">{note.nextSteps}</p>
                          </div>

                          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Lock className="w-4 h-4 text-destructive" />
                              <h4 className="text-sm font-semibold text-foreground">Private Notes (Counsellor Only)</h4>
                            </div>
                            <p className="text-sm text-foreground">{note.privateNotes}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="by-client" className="mt-6">
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">Group notes by client view coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:border-garden-purple transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Initial Assessment Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive first session documentation
                    </p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>

                <Card className="hover:border-garden-purple transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Progress Note Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Standard follow-up session notes
                    </p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>

                <Card className="hover:border-garden-purple transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Crisis Intervention Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Emergency session documentation
                    </p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>

                <Card className="hover:border-garden-purple transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Termination Summary Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Final session and discharge notes
                    </p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorNotes;
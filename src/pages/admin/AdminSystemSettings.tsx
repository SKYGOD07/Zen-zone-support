import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Shield, 
  Bell,
  Database,
  Mail,
  Globe,
  Lock,
  Server,
  Save,
  AlertCircle,
  CheckCircle,
  Key,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const AdminSystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "Mann Mitra",
    platformEmail: "support@mannmitra.edu",
    supportPhone: "+91 1234567890",
    maxStudents: 5000,
    sessionDuration: 50,
    
    // Security Settings
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    ipWhitelist: false,
    encryptionEnabled: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    dailyDigest: true,
    weeklyReport: true,
    
    // Privacy Settings
    anonymousMode: true,
    dataRetention: 365,
    consentRequired: true,
    gdprCompliant: true,
    
    // Integration Settings
    aiEnabled: true,
    analyticsEnabled: true,
    backupEnabled: true,
    autoUpdates: true,
  });

  const systemHealth = {
    database: { status: "healthy", uptime: "99.9%" },
    api: { status: "healthy", responseTime: "98ms" },
    storage: { status: "healthy", usage: "45%" },
    backup: { status: "healthy", lastBackup: "2 hours ago" },
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      healthy: "bg-success/20 text-success border-success",
      warning: "bg-warning/20 text-warning border-warning",
      error: "bg-destructive/20 text-destructive border-destructive",
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-garden-green to-garden-blue rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">System Settings</h1>
              <p className="text-white/90">Configure platform-wide settings</p>
            </div>
          </div>
          <Button className="bg-white text-garden-blue hover:bg-white/90" onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-5 h-5 text-muted-foreground" />
              <Badge className={getStatusBadge(systemHealth.database.status)}>
                {systemHealth.database.status}
              </Badge>
            </div>
            <p className="text-sm font-medium mb-1">Database</p>
            <p className="text-xs text-muted-foreground">Uptime: {systemHealth.database.uptime}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Server className="w-5 h-5 text-muted-foreground" />
              <Badge className={getStatusBadge(systemHealth.api.status)}>
                {systemHealth.api.status}
              </Badge>
            </div>
            <p className="text-sm font-medium mb-1">API</p>
            <p className="text-xs text-muted-foreground">Response: {systemHealth.api.responseTime}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-5 h-5 text-muted-foreground" />
              <Badge className={getStatusBadge(systemHealth.storage.status)}>
                {systemHealth.storage.status}
              </Badge>
            </div>
            <p className="text-sm font-medium mb-1">Storage</p>
            <p className="text-xs text-muted-foreground">Used: {systemHealth.storage.usage}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <Badge className={getStatusBadge(systemHealth.backup.status)}>
                {systemHealth.backup.status}
              </Badge>
            </div>
            <p className="text-sm font-medium mb-1">Backup</p>
            <p className="text-xs text-muted-foreground">Last: {systemHealth.backup.lastBackup}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platformEmail">Support Email</Label>
                  <Input
                    id="platformEmail"
                    type="email"
                    value={settings.platformEmail}
                    onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Maximum Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={settings.maxStudents}
                    onChange={(e) => setSettings({ ...settings, maxStudents: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionDuration">Default Session Duration (minutes)</Label>
                  <Input
                    id="sessionDuration"
                    type="number"
                    value={settings.sessionDuration}
                    onChange={(e) => setSettings({ ...settings, sessionDuration: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-4">Language & Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <select className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground h-10">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground h-10">
                      <option value="IST">IST (UTC+5:30)</option>
                      <option value="PST">PST (UTC-8:00)</option>
                      <option value="EST">EST (UTC-5:00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-garden-blue" />
                <CardTitle>Security Configuration</CardTitle>
              </div>
              <CardDescription>Protect your platform and user data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Require 2FA for all administrative accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">Data Encryption</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Encrypt all sensitive data at rest
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/20 text-success border-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                    <Switch
                      checked={settings.encryptionEnabled}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Restrict admin access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    checked={settings.ipWhitelist}
                    onCheckedChange={(checked) => setSettings({ ...settings, ipWhitelist: checked })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-4">Authentication Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password Expiry (days)</Label>
                    <Input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <h4 className="font-semibold text-warning">Security Notice</h4>
                </div>
                <p className="text-sm text-foreground">
                  Changing security settings may affect user access. Ensure all administrators are notified of policy changes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-garden-blue" />
                <CardTitle>Notification Configuration</CardTitle>
              </div>
              <CardDescription>Manage system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Notification Channels</h3>
                
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Premium</Badge>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-4">Automated Reports</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Daily Digest</Label>
                    <Switch
                      checked={settings.dailyDigest}
                      onCheckedChange={(checked) => setSettings({ ...settings, dailyDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Weekly Summary Report</Label>
                    <Switch
                      checked={settings.weeklyReport}
                      onCheckedChange={(checked) => setSettings({ ...settings, weeklyReport: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-garden-blue" />
                <CardTitle>Privacy & Compliance</CardTitle>
              </div>
              <CardDescription>Configure privacy settings and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">Anonymous Mode</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allow users to access services anonymously
                    </p>
                  </div>
                  <Switch
                    checked={settings.anonymousMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, anonymousMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">Consent Required</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Require explicit user consent for data collection
                    </p>
                  </div>
                  <Switch
                    checked={settings.consentRequired}
                    onCheckedChange={(checked) => setSettings({ ...settings, consentRequired: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <Label className="font-medium">GDPR Compliance</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enable GDPR compliance features
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/20 text-success border-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <Switch checked={settings.gdprCompliant} disabled />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Retention Period (days)</Label>
                    <Input
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">
                      User data will be automatically deleted after this period
                    </p>
                  </div>

                  <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-info" />
                      HIPAA Compliance
                    </h4>
                    <p className="text-sm text-foreground mb-2">
                      Platform is configured for HIPAA compliance with:
                    </p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• End-to-end encryption</li>
                      <li>• Audit logging enabled</li>
                      <li>• Access controls enforced</li>
                      <li>• Regular security assessments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-garden-blue" />
                <CardTitle>Integrations & Features</CardTitle>
              </div>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex-1">
                  <Label className="font-medium">AI Support Features</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable AI-powered mental health support chat
                  </p>
                </div>
                <Switch
                  checked={settings.aiEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, aiEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex-1">
                  <Label className="font-medium">Analytics & Tracking</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Collect anonymous usage analytics
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, analyticsEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex-1">
                  <Label className="font-medium">Automated Backups</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Daily automated database backups
                  </p>
                </div>
                <Switch
                  checked={settings.backupEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, backupEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex-1">
                  <Label className="font-medium">Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Install platform updates automatically
                  </p>
                </div>
                <Switch
                  checked={settings.autoUpdates}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoUpdates: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Optimize Database
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Run Backup Now
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Regenerate API Keys
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Server className="w-4 h-4 mr-2" />
                  Restart Services
                </Button>
                <Button className="w-full justify-start" variant="destructive">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Maintenance Mode
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSystemSettings;
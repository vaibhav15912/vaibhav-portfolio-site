"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import { GripVertical, Save, Trash2, Upload, Monitor, Moon, Sun, Layout, Edit } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import SectionEditor from './SectionEditor';

interface SiteConfig {
  id?: string;
  site_name: string;
  logo_url: string;
  theme: string;
  primary_color: string;
}

interface HomeSection {
  id: string;
  section_name: string;
  display_name: string;
  order: number;
  is_active: boolean;
  content?: any;
}

export default function DesignLayout() {
  const [config, setConfig] = useState<SiteConfig>({
    site_name: 'My Portfolio',
    logo_url: '',
    theme: 'light',
    primary_color: '#3b82f6',
  });
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<HomeSection | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: configData, error: configError } = await supabase
        .from('site_config')
        .select('*')
        .single();

      if (configData) setConfig(configData);

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('home_sections')
        .select('*')
        .order('order', { ascending: true });

      if (sectionsData) setSections(sectionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load design settings');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      setConfig({ ...config, logo_url: publicUrl });
      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const saveConfig = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert(config);

      if (error) throw error;
      toast.success('Site configuration saved');
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const saveSectionOrder = async (newSections: HomeSection[]) => {
    setSections(newSections);
    try {
      const updates = newSections.map((s, index) => ({
        id: s.id,
        order: index + 1,
      }));

      const { error } = await supabase.from('home_sections').upsert(updates);
      if (error) throw error;
    } catch (error) {
      console.error('Error saving section order:', error);
      toast.error('Failed to update section order');
    }
  };

  const toggleSection = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('home_sections')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setSections(sections.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s));
      toast.success('Section status updated');
    } catch (error) {
      console.error('Error toggling section:', error);
      toast.error('Failed to update section status');
    }
  };

  if (loading) return <div>Loading design settings...</div>;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Design & Layout</h2>
          <p className="text-muted-foreground">Customize your portfolio's visual identity and homepage structure.</p>
        </div>
        <Button onClick={saveConfig} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Site Identity
            </CardTitle>
            <CardDescription>Manage your brand name and logo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input 
                id="site_name" 
                value={config.site_name} 
                onChange={(e) => setConfig({ ...config, site_name: e.target.value })}
                placeholder="e.g. John Doe | Portfolio"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo</Label>
              <div 
                {...getRootProps()} 
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
                  isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
                )}
              >
                <input {...getInputProps()} />
                {config.logo_url ? (
                  <div className="relative group">
                    <img src={config.logo_url} alt="Logo Preview" className="h-16 object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                      <Upload className="text-white h-5 w-5" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Upload className="text-gray-400 h-5 w-5" />
                    </div>
                    <p className="text-xs text-gray-500">Drag & drop or click to upload logo</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>System Theme</Label>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {config.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <div>
                    <p className="text-sm font-medium">{config.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                    <p className="text-xs text-muted-foreground">Overall appearance of your site</p>
                  </div>
                </div>
                <Switch 
                  checked={config.theme === 'dark'}
                  onCheckedChange={(checked) => setConfig({ ...config, theme: checked ? 'dark' : 'light' })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Homepage Layout
            </CardTitle>
            <CardDescription>Drag and drop to reorder sections of your homepage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Reorder.Group 
              axis="y" 
              values={sections} 
              onReorder={saveSectionOrder}
              className="space-y-2"
            >
              <AnimatePresence>
                {sections.map((section) => (
                  <Reorder.Item 
                    key={section.id} 
                    value={section}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileDrag={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="flex items-center gap-3 p-3 bg-white border rounded-lg cursor-grab active:cursor-grabbing group hover:border-primary/50 transition-colors"
                  >
                    <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{section.display_name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tight">{section.section_name}</p>
                    </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setEditingSection(section)}
                          className="h-8 w-8 text-gray-400 hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Switch 
                          checked={section.is_active}
                          onCheckedChange={() => toggleSection(section.id, section.is_active)}
                          className="scale-75"
                        />
                      </div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>

              {editingSection && (
                <SectionEditor 
                  section={editingSection}
                  isOpen={!!editingSection}
                  onClose={() => setEditingSection(null)}
                  onSave={fetchData}
                />
              )}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-600 leading-relaxed">
                <strong>Tip:</strong> Reordering sections here will instantly update the flow of your landing page. You can also hide sections without deleting their content.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

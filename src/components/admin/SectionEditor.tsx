"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';

interface SectionEditorProps {
  section: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const SECTION_SCHEMAS: Record<string, any> = {
  hero: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'subtitle', label: 'Subtitle', type: 'text' },
    { name: 'avatar_url', label: 'Avatar URL', type: 'image' },
    { name: 'avatar_width', label: 'Avatar Width (e.g. 240px)', type: 'text' },
    { name: 'devices_url', label: 'Devices Illustration URL', type: 'image' },
    { name: 'devices_width', label: 'Devices Width (e.g. 860px)', type: 'text' },
  ],
  introduction: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  recent_work: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'subtitle', label: 'Subtitle', type: 'text' },
    { name: 'email_text', label: 'Email Button Text', type: 'text' },
    { name: 'email_url', label: 'Email URL', type: 'text' },
    { name: 'dribbble_text', label: 'Dribbble Button Text', type: 'text' },
    { name: 'dribbble_url', label: 'Dribbble URL', type: 'text' },
  ],
  clients: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'logos', label: 'Client Logos', type: 'list' },
  ],
  startup_projects: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  testimonials: [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'subtitle', label: 'Subtitle', type: 'text' },
  ],
    cta: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'button_text', label: 'Button Text', type: 'text' },
    ],
    contact_form: [
      { name: 'title', label: 'Title', type: 'text' },
    ],
    footer: [
    { name: 'tagline', label: 'Tagline', type: 'text' },
    { name: 'social_links', label: 'Social Links', type: 'socials' },
  ],
};

export default function SectionEditor({ section, isOpen, onClose, onSave }: SectionEditorProps) {
  const [content, setContent] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (section && section.content) {
      setContent(section.content);
    }
  }, [section]);

  const handleChange = (name: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('home_sections')
        .update({ content })
        .eq('id', section.id);

      if (error) throw error;
      toast.success('Section content updated');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving section content:', error);
      toast.error('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(fieldName);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `sections/${section.section_name}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      handleChange(fieldName, publicUrl);
      toast.success('Image uploaded');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const schema = SECTION_SCHEMAS[section?.section_name] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {section?.display_name}</DialogTitle>
          <DialogDescription>
            Modify the content and details for this section.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {schema.map((field: any) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              
              {field.type === 'text' && (
                <Input 
                  id={field.name}
                  value={content[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea 
                  id={field.name}
                  value={content[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  rows={4}
                />
              )}

              {field.type === 'image' && (
                <div className="flex items-center gap-4">
                  {content[field.name] && (
                    <img 
                      src={content[field.name]} 
                      alt="Preview" 
                      className="h-12 w-12 object-contain border rounded" 
                    />
                  )}
                  <div className="flex-1 flex gap-2">
                    <Input 
                      value={content[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder="Image URL"
                    />
                    <div className="relative">
                      <Button variant="outline" size="icon" disabled={uploading === field.name}>
                        {uploading === field.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      </Button>
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => handleFileUpload(e, field.name)}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              )}

              {field.type === 'list' && (
                <div className="space-y-2">
                  {(content[field.name] || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <Input 
                        value={item}
                        onChange={(e) => {
                          const newList = [...content[field.name]];
                          newList[idx] = e.target.value;
                          handleChange(field.name, newList);
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          const newList = content[field.name].filter((_: any, i: number) => i !== idx);
                          handleChange(field.name, newList);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const newList = [...(content[field.name] || []), ''];
                      handleChange(field.name, newList);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              )}

              {field.type === 'socials' && (
                <div className="space-y-4">
                  {(content[field.name] || []).map((link: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 p-3 border rounded-lg relative">
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase">Icon</Label>
                        <Input 
                          value={link.icon} 
                          onChange={(e) => {
                            const newLinks = [...content[field.name]];
                            newLinks[idx] = { ...link, icon: e.target.value };
                            handleChange(field.name, newLinks);
                          }}
                          placeholder="twitter, dribbble, etc."
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase">URL</Label>
                        <Input 
                          value={link.url} 
                          onChange={(e) => {
                            const newLinks = [...content[field.name]];
                            newLinks[idx] = { ...link, url: e.target.value };
                            handleChange(field.name, newLinks);
                          }}
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border shadow-sm"
                        onClick={() => {
                          const newLinks = content[field.name].filter((_: any, i: number) => i !== idx);
                          handleChange(field.name, newLinks);
                        }}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const newLinks = [...(content[field.name] || []), { icon: '', url: '' }];
                      handleChange(field.name, newLinks);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Social Link
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

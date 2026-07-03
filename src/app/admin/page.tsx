'use client';

import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { 
  Lock, Mail, Phone, Calendar, Heart, ShieldCheck, ShieldAlert,
  Plus, Edit, Trash2, Upload, LogOut, CheckCircle, 
  FileText, Users, Eye, HelpCircle, Settings, Award, 
  MapPin, HeartPulse, GraduationCap, Monitor, Image as ImageIcon
} from 'lucide-react';

export default function AdminDashboard() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'blogs' | 'events' | 'gallery' | 'submissions' | 'donations' | 'settings'>('overview');

  // Dynamic Data Lists
  const [stats, setStats] = useState({ blogs: 0, events: 0, programs: 0, messages: 0, volunteers: 0, donations: 0, donationsSum: 0 });
  const [programs, setPrograms] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Loading State
  const [loading, setLoading] = useState(false);

  // CRUD Editing Form States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  
  // Custom Settings Batch State
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({});

  // Form Fields
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Education & Tech', excerpt: '', content: '', featuredImage: '', published: false });
  const [programForm, setProgramForm] = useState({ title: '', category: 'Education', description: '', content: '', icon: 'GraduationCap', image: '' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', content: '', date: '', location: '', image: '', registered: 0 });
  const [galleryForm, setGalleryForm] = useState({ imageUrl: '', type: 'PHOTO', caption: '' });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('blf_admin_token');
    const savedUser = localStorage.getItem('blf_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch dashboard data once authenticated
  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const loadDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const fetchedBlogs = await api.getBlogs(false); // get both drafts and published
      const fetchedPrograms = await api.getPrograms();
      const fetchedEvents = await api.getEvents();
      const fetchedGallery = await api.getGallery();
      const fetchedSettings = await api.getSettings();

      // Admin authenticated list fetchers
      const fetchedMessages = await api.adminFetch('/content/contact', token);
      const fetchedVolunteers = await api.adminFetch('/content/volunteer', token);
      const fetchedDonations = await api.adminFetch('/content/donate', token);

      setBlogs(fetchedBlogs);
      setPrograms(fetchedPrograms);
      setEvents(fetchedEvents);
      setGallery(fetchedGallery);
      setSettings(fetchedSettings);
      setSettingsForm(fetchedSettings);
      setMessages(fetchedMessages);
      setVolunteers(fetchedVolunteers);
      setDonations(fetchedDonations);

      // Compute statistics metrics
      const totalDonated = fetchedDonations
        .filter((d: any) => d.status === 'SUCCESSFUL')
        .reduce((sum: number, curr: any) => sum + curr.amount, 0);

      setStats({
        blogs: fetchedBlogs.length,
        events: fetchedEvents.length,
        programs: fetchedPrograms.length,
        messages: fetchedMessages.filter((m: any) => !m.read).length,
        volunteers: fetchedVolunteers.filter((v: any) => v.status === 'PENDING').length,
        donations: fetchedDonations.filter((d: any) => d.status === 'SUCCESSFUL').length,
        donationsSum: totalDonated,
      });
    } catch (err) {
      console.error('Error fetching admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    setLoggingIn(true);
    setLoginError('');

    try {
      const data = await api.login(loginEmail, loginPassword);
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('blf_admin_token', data.access_token);
      localStorage.setItem('blf_admin_user', JSON.stringify(data.user));
    } catch (err: any) {
      setLoginError(err.message || 'Unauthorized: Invalid email or password');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('blf_admin_token');
    localStorage.removeItem('blf_admin_user');
  };

  // Image Upload helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploadProgress(true);

    try {
      const url = await api.adminUploadFile(file, token);
      
      // Update correct field depending on active form
      if (activeTab === 'blogs') {
        setBlogForm((prev) => ({ ...prev, featuredImage: url }));
      } else if (activeTab === 'programs') {
        setProgramForm((prev) => ({ ...prev, image: url }));
      } else if (activeTab === 'events') {
        setEventForm((prev) => ({ ...prev, image: url }));
      } else if (activeTab === 'gallery') {
        setGalleryForm((prev) => ({ ...prev, imageUrl: url }));
      }
    } catch (err) {
      alert('File upload failed. Defaulting to standard text URLs.');
    } finally {
      setUploadProgress(false);
    }
  };

  // Blog creation/edit submit
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      if (editingItem) {
        await api.adminPut(`/content/blogs/${editingItem.id}`, blogForm, token);
      } else {
        await api.adminPost('/content/blogs', blogForm, token);
      }
      setIsFormOpen(false);
      setEditingItem(null);
      setBlogForm({ title: '', category: 'Education & Tech', excerpt: '', content: '', featuredImage: '', published: false });
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Program creation/edit submit
  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      if (editingItem) {
        await api.adminPut(`/content/programs/${editingItem.id}`, programForm, token);
      } else {
        await api.adminPost('/content/programs', programForm, token);
      }
      setIsFormOpen(false);
      setEditingItem(null);
      setProgramForm({ title: '', category: 'Education', description: '', content: '', icon: 'GraduationCap', image: '' });
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Event creation/edit submit
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      if (editingItem) {
        await api.adminPut(`/content/events/${editingItem.id}`, eventForm, token);
      } else {
        await api.adminPost('/content/events', eventForm, token);
      }
      setIsFormOpen(false);
      setEditingItem(null);
      setEventForm({ title: '', description: '', content: '', date: '', location: '', image: '', registered: 0 });
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Gallery Item submit
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      await api.adminPost('/content/gallery', galleryForm, token);
      setIsFormOpen(false);
      setGalleryForm({ imageUrl: '', type: 'PHOTO', caption: '' });
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Settings Save
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      await api.adminPost('/content/settings', { settings: settingsForm }, token);
      alert('Website settings updated successfully.');
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Could not update settings');
    } finally {
      setLoading(false);
    }
  };

  // General Deletes
  const handleDeleteItem = async (endpoint: string, id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      await api.adminDelete(`${endpoint}/${id}`, token);
      await loadDashboardData();
    } catch (err) {
      alert('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  // Form Mark message read
  const handleMarkMessageRead = async (id: string) => {
    if (!token) return;
    try {
      await api.adminPut(`/content/contact/read/${id}`, {}, token);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Volunteer application status changes
  const handleUpdateVolunteerStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.adminPut(`/content/volunteer/status/${id}`, { status }, token);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Render Login if no token
  if (!token) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative blurry nodes */}
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col gap-6"
        >
          <div className="text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center text-white shadow-md">
              <Lock className="w-5 h-5 fill-white" />
            </div>
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-white leading-tight">Admin Gatekeeper</h2>
            <span className="font-sans text-xs text-white/50">Secure Content Management Console</span>
          </div>

          <hr className="border-white/10" />

          {loginError && (
            <div className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 font-sans">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/60 font-bold">Email Address</label>
              <input
                type="email"
                required
                placeholder=" E.g., admin@brooklinefoundation.org"
                className="bg-white/5 border border-white/10 p-3 rounded-xl focus:border-gold outline-none transition-all text-sm text-white"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={loggingIn}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/60 font-bold">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 p-3 rounded-xl focus:border-gold outline-none transition-all text-sm text-white"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={loggingIn}
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-3.5 rounded-xl border border-gold hover:border-gold-hover shadow-md hover:-translate-y-0.5 transition-all mt-4 cursor-pointer disabled:opacity-50"
            >
              {loggingIn ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Admin header */}
      <header className="bg-navy text-white px-8 py-4 flex items-center justify-between border-b border-white/5 shrink-0 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold text-navy flex items-center justify-center font-bold text-sm">
            B
          </div>
          <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
            BLF Console
          </span>
          <span className="font-sans text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60 font-medium ml-2 uppercase">
            ADMIN
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-xs text-white/70 hidden sm:block">Logged in: <strong>{user?.name}</strong></span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 hidden md:flex">
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-slate-400">Navigation</span>
          
          <nav className="flex flex-col gap-1 flex-1 font-sans text-sm font-semibold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'programs', label: 'Manage Programs', icon: <Award className="w-4 h-4" /> },
              { id: 'blogs', label: 'Manage Blog Posts', icon: <FileText className="w-4 h-4" /> },
              { id: 'events', label: 'Manage Events', icon: <Calendar className="w-4 h-4" /> },
              { id: 'gallery', label: 'Manage Gallery', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'submissions', label: 'Form Submissions', icon: <Mail className="w-4 h-4 text-primary" /> },
              { id: 'donations', label: 'Donations Feed', icon: <Heart className="w-4 h-4 text-rose-500" /> },
              { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary/5 text-primary'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content body */}
        <main className="flex-grow p-8 overflow-y-auto max-h-[calc(100vh-69px)]">
          {loading && (
            <div className="fixed top-0 left-0 right-0 h-1 bg-gold animate-pulse-slow z-50" />
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8 animate-fade-in-up">
              <div>
                <h1 className="font-display font-extrabold text-3xl text-navy">Console Overview</h1>
                <span className="font-sans text-xs text-slate-400">Activity indices and registration tallies.</span>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-slate-400 font-sans text-xs font-bold uppercase tracking-wider">Total Donated</span>
                    <span className="block text-2xl font-display font-extrabold text-navy mt-1">₦{stats.donationsSum.toLocaleString()}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                    <Heart className="w-6 h-6 fill-rose-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-slate-400 font-sans text-xs font-bold uppercase tracking-wider">Succeed Donations</span>
                    <span className="block text-2xl font-display font-extrabold text-navy mt-1">{stats.donations}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-slate-400 font-sans text-xs font-bold uppercase tracking-wider">Unread Messages</span>
                    <span className="block text-2xl font-display font-extrabold text-navy mt-1">{stats.messages}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-slate-400 font-sans text-xs font-bold uppercase tracking-wider">Pending Volunteers</span>
                    <span className="block text-2xl font-display font-extrabold text-navy mt-1">{stats.volunteers}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick actions info panel */}
              <div className="bg-navy text-white p-8 rounded-3xl relative overflow-hidden flex flex-col gap-4 border border-white/5">
                <div className="absolute top-1/4 -right-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <h3 className="font-display font-bold text-xl text-gold">Administrator Quick Guide</h3>
                <p className="font-sans text-sm text-white/70 max-w-2xl leading-relaxed">
                  Use the left sidebar tabs to update dynamic elements on the website. Adding blog articles, events, or program outlines updates the public website in real time. Images are processed statically locally or via Cloudinary depending on configured secrets.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-navy">Manage Programs</h1>
                  <span className="font-sans text-xs text-slate-400">Core development program outlines.</span>
                </div>
                {!isFormOpen && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setProgramForm({ title: '', category: 'Education', description: '', content: '', icon: 'GraduationCap', image: '' });
                      setIsFormOpen(true);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 animate-bounce" /> Add Program
                  </button>
                )}
              </div>

              {isFormOpen ? (
                // FORM PANEL
                <form onSubmit={handleProgramSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-5 max-w-3xl">
                  <span className="font-display font-bold text-lg text-navy">{editingItem ? 'Edit Program details' : 'Add New Program'}</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Program Title</label>
                      <input
                        type="text" required placeholder="E.g., Girls Coding Academy"
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={programForm.title}
                        onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Category</label>
                      <select
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={programForm.category}
                        onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                      >
                        <option value="Education">Education</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Health">Health</option>
                        <option value="Empowerment">Empowerment</option>
                        <option value="Digital Skills">Digital Skills</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Short Summary description</label>
                    <input
                      type="text" required placeholder="A single line summary for list previews..."
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={programForm.description}
                      onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Full Content Details</label>
                    <textarea
                      rows={5} required placeholder="Detailed descriptions and roadmaps..."
                      className="border border-slate-200 p-3 rounded-xl text-sm resize-none"
                      value={programForm.content}
                      onChange={(e) => setProgramForm({ ...programForm, content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Featured Image URL</label>
                      <input
                        type="text" required placeholder="Paste image url or upload..."
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={programForm.image}
                        onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-end">
                      <input
                        type="file" accept="image/*" className="hidden" ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button" disabled={uploadProgress}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-slate-500 p-3 rounded-xl text-sm cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadProgress ? 'Uploading image...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer shadow"
                    >
                      {editingItem ? 'Save Updates' : 'Add Program'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // LIST PANEL
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-5">Program</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Summary</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {programs.map((prog) => (
                        <tr key={prog.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5 font-semibold text-navy">{prog.title}</td>
                          <td className="p-5 text-slate-500">{prog.category}</td>
                          <td className="p-5 text-slate-400 line-clamp-1 max-w-xs">{prog.description}</td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem(prog);
                                  setProgramForm(prog);
                                  setIsFormOpen(true);
                                }}
                                className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                                title="Edit details"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('/content/programs', prog.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Delete program"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE BLOGS */}
          {activeTab === 'blogs' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-navy">Manage Blog Posts</h1>
                  <span className="font-sans text-xs text-slate-400">Published news updates and draft stories.</span>
                </div>
                {!isFormOpen && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setBlogForm({ title: '', category: 'Education & Tech', excerpt: '', content: '', featuredImage: '', published: false });
                      setIsFormOpen(true);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 animate-bounce" /> Create Article
                  </button>
                )}
              </div>

              {isFormOpen ? (
                // FORM PANEL
                <form onSubmit={handleBlogSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-5 max-w-3xl">
                  <span className="font-display font-bold text-lg text-navy">{editingItem ? 'Edit Article details' : 'Write New Article'}</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Article Title</label>
                      <input
                        type="text" required placeholder="E.g., Mentorship as a Catalyst"
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Category</label>
                      <select
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      >
                        <option value="Education & Tech">Education & Tech</option>
                        <option value="Mentorship">Mentorship</option>
                        <option value="Health & Advocacy">Health & Advocacy</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Article Excerpt Summary</label>
                    <input
                      type="text" required placeholder="A short description for list previews..."
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Rich Body Content</label>
                    <textarea
                      rows={8} required placeholder="Write details here, separate paragraphs with double enters..."
                      className="border border-slate-200 p-3 rounded-xl text-sm resize-none"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Featured Image URL</label>
                      <input
                        type="text" required placeholder="Paste image url or upload..."
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={blogForm.featuredImage}
                        onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-end">
                      <input
                        type="file" accept="image/*" className="hidden" ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button" disabled={uploadProgress}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-slate-500 p-3 rounded-xl text-sm cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadProgress ? 'Uploading image...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox" id="published" className="w-4 h-4 cursor-pointer"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    />
                    <label htmlFor="published" className="text-sm font-semibold text-navy cursor-pointer">
                      Publish immediately (Draft otherwise)
                    </label>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer shadow"
                    >
                      {editingItem ? 'Save Updates' : 'Publish Article'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // LIST PANEL
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-5">Article</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blogs.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5 font-semibold text-navy">{post.title}</td>
                          <td className="p-5 text-slate-500">{post.category}</td>
                          <td className="p-5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              post.published 
                                ? 'bg-emerald-50 text-emerald-500 border-emerald-100' 
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem(post);
                                  setBlogForm({
                                    title: post.title,
                                    category: post.category,
                                    excerpt: post.excerpt,
                                    content: post.content,
                                    featuredImage: post.featuredImage,
                                    published: post.published
                                  });
                                  setIsFormOpen(true);
                                }}
                                className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                                title="Edit details"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('/content/blogs', post.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Delete article"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MANAGE EVENTS */}
          {activeTab === 'events' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-navy">Manage Events</h1>
                  <span className="font-sans text-xs text-slate-400">Outreach schedules and seminar programs.</span>
                </div>
                {!isFormOpen && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setEventForm({ title: '', description: '', content: '', date: '', location: '', image: '', registered: 0 });
                      setIsFormOpen(true);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 animate-bounce" /> Add Event
                  </button>
                )}
              </div>

              {isFormOpen ? (
                // FORM PANEL
                <form onSubmit={handleEventSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-5 max-w-3xl">
                  <span className="font-display font-bold text-lg text-navy">{editingItem ? 'Edit Event details' : 'Add New Event'}</span>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Event Title</label>
                    <input
                      type="text" required placeholder="E.g., Annual Leadership Summit"
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Date & Time</label>
                      <input
                        type="datetime-local" required
                        className="border border-slate-200 p-3 rounded-xl text-sm cursor-pointer"
                        value={eventForm.date ? eventForm.date.slice(0, 16) : ''}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Location</label>
                      <input
                        type="text" required placeholder="E.g., Hall Room 12, Boston"
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Short Summary description</label>
                    <input
                      type="text" required placeholder="A single line summary..."
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Full Content Details</label>
                    <textarea
                      rows={5} required placeholder="Details on timing, schedules, and materials..."
                      className="border border-slate-200 p-3 rounded-xl text-sm resize-none"
                      value={eventForm.content}
                      onChange={(e) => setEventForm({ ...eventForm, content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Event Image URL</label>
                      <input
                        type="text" required placeholder="Paste image url or upload..."
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={eventForm.image}
                        onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-end">
                      <input
                        type="file" accept="image/*" className="hidden" ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button" disabled={uploadProgress}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-slate-500 p-3 rounded-xl text-sm cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadProgress ? 'Uploading image...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer shadow"
                    >
                      {editingItem ? 'Save Updates' : 'Add Event'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // LIST PANEL
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-5">Event</th>
                        <th className="p-5">Date</th>
                        <th className="p-5">Location</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {events.map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5 font-semibold text-navy">{ev.title}</td>
                          <td className="p-5 text-slate-500">
                            {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="p-5 text-slate-400">{ev.location.split(',')[0]}</td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem(ev);
                                  setEventForm(ev);
                                  setIsFormOpen(true);
                                }}
                                className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                                title="Edit details"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('/content/events', ev.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Delete event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MANAGE GALLERY */}
          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-navy">Manage Gallery</h1>
                  <span className="font-sans text-xs text-slate-400">Upload photos or tag video links.</span>
                </div>
                {!isFormOpen && (
                  <button
                    onClick={() => {
                      setGalleryForm({ imageUrl: '', type: 'PHOTO', caption: '' });
                      setIsFormOpen(true);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 animate-bounce" /> Add Gallery Item
                  </button>
                )}
              </div>

              {isFormOpen ? (
                // FORM PANEL
                <form onSubmit={handleGallerySubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-5 max-w-md">
                  <span className="font-display font-bold text-lg text-navy">Add Gallery Item</span>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Media Type</label>
                    <select
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={galleryForm.type}
                      onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                    >
                      <option value="PHOTO">Photo</option>
                      <option value="VIDEO">Video</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Caption Text</label>
                    <input
                      type="text" placeholder="Short description..."
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={galleryForm.caption}
                      onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Media/Image URL</label>
                    <input
                      type="text" required placeholder="Paste url or upload..."
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <input
                      type="file" accept="image/*" className="hidden" ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button" disabled={uploadProgress}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-1 border border-slate-200 hover:bg-slate-50 text-slate-500 p-3 rounded-xl text-sm cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadProgress ? 'Uploading media...' : 'Upload Photo file'}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-xl text-xs cursor-pointer shadow"
                    >
                      Publish Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // MEDIA CARDS LIST
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div key={item.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden relative shadow-sm hover:shadow">
                      <img src={item.imageUrl} alt={item.caption} className="w-full h-32 object-cover" />
                      <div className="p-3">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{item.type}</span>
                        <p className="font-sans text-xs text-slate-400 truncate mt-2">{item.caption || 'No caption'}</p>
                      </div>
                      {/* Delete absolute button */}
                      <button
                        onClick={() => handleDeleteItem('/content/gallery', item.id)}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-rose-500 hover:text-white p-2 rounded-full text-slate-500 transition-colors shadow shadow-black/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FORM SUBMISSIONS (Inbox) */}
          {activeTab === 'submissions' && (
            <div className="flex flex-col gap-8 animate-fade-in-up">
              
              {/* CONTACT MESSAGES FEED */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-navy">Contact Inquiries ({messages.length})</h2>
                  <span className="font-sans text-xs text-slate-400">Incoming inquiries from contact forms.</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-5">Sender</th>
                        <th className="p-5">Subject</th>
                        <th className="p-5">Message</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {messages.map((msg) => (
                        <tr key={msg.id} className={`hover:bg-slate-50/50 transition-colors ${!msg.read ? 'bg-primary/5 font-medium' : ''}`}>
                          <td className="p-5">
                            <span className="block text-navy">{msg.name}</span>
                            <span className="block text-[10px] text-slate-400">{msg.email}</span>
                          </td>
                          <td className="p-5 text-navy">{msg.subject}</td>
                          <td className="p-5 text-slate-500 text-xs max-w-xs truncate" title={msg.message}>{msg.message}</td>
                          <td className="p-5">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                              msg.read ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'
                            }`}>
                              {msg.read ? 'Read' : 'New'}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!msg.read && (
                                <button
                                  onClick={() => handleMarkMessageRead(msg.id)}
                                  className="p-1.5 text-xs font-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg cursor-pointer"
                                >
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteItem('/content/contact', msg.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VOLUNTEER ONBOARDING APPLICATIONS */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-navy">Volunteer Registrations ({volunteers.length})</h2>
                  <span className="font-sans text-xs text-slate-400">Applications for mentoring and teaching roles.</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-5">Applicant</th>
                        <th className="p-5">Availability</th>
                        <th className="p-5">Selected Skills</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {volunteers.map((vol) => (
                        <tr key={vol.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5">
                            <span className="block text-navy font-semibold">{vol.name}</span>
                            <span className="block text-[10px] text-slate-400">{vol.email} • {vol.phone}</span>
                          </td>
                          <td className="p-5 text-slate-500">{vol.availability}</td>
                          <td className="p-5 text-slate-400 text-xs max-w-xs truncate" title={vol.skills}>{vol.skills}</td>
                          <td className="p-5">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                              vol.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-600' :
                              vol.status === 'REVIEWED' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {vol.status}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {vol.status === 'PENDING' && (
                                <button
                                  onClick={() => handleUpdateVolunteerStatus(vol.id, 'REVIEWED')}
                                  className="p-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                                >
                                  Reviewed
                                </button>
                              )}
                              {vol.status !== 'ACCEPTED' && (
                                <button
                                  onClick={() => handleUpdateVolunteerStatus(vol.id, 'ACCEPTED')}
                                  className="p-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg cursor-pointer animate-pulse"
                                >
                                  Accept
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteItem('/content/volunteer', vol.id)}
                                className="p-2 text-slate-400 hover:text-rose-500 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: DONATIONS FEED */}
          {activeTab === 'donations' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div>
                <h1 className="font-display font-extrabold text-2xl text-navy">Donations Feed</h1>
                <span className="font-sans text-xs text-slate-400">Logged donations feed.</span>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-5">Donor</th>
                      <th className="p-5">Reference</th>
                      <th className="p-5">Gateway</th>
                      <th className="p-5">Amount</th>
                      <th className="p-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-5">
                          <span className="block text-navy font-semibold">{d.donorName || 'Anonymous Donor'}</span>
                          <span className="block text-[10px] text-slate-400">{d.email}</span>
                        </td>
                        <td className="p-5 font-mono text-xs text-slate-400">{d.reference}</td>
                        <td className="p-5 text-slate-500 font-semibold text-xs">{d.paymentGateway}</td>
                        <td className="p-5 text-navy font-bold">₦{d.amount.toLocaleString()}</td>
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase border ${
                            d.status === 'SUCCESSFUL' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
                            d.status === 'PENDING' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-6 animate-fade-in-up">
              <div>
                <h1 className="font-display font-extrabold text-2xl text-navy">Website Settings</h1>
                <span className="font-sans text-xs text-slate-400">Dynamic homepage and company metadata.</span>
              </div>

              <form onSubmit={handleSettingsSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-6 max-w-3xl font-sans">
                
                {/* Hero section group */}
                <div className="flex flex-col gap-4">
                  <span className="font-display font-bold text-sm text-primary uppercase tracking-wider">Homepage Hero section</span>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Main Title Headline</label>
                    <input
                      type="text" required
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={settingsForm.home_hero_title || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, home_hero_title: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={2} required
                      className="border border-slate-200 p-3 rounded-xl text-sm resize-none"
                      value={settingsForm.home_hero_subtitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, home_hero_subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* About section group */}
                <div className="flex flex-col gap-4">
                  <span className="font-display font-bold text-sm text-primary uppercase tracking-wider">Homepage About section</span>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">About Title Headline</label>
                    <input
                      type="text" required
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={settingsForm.home_about_title || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, home_about_title: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">About Description Text</label>
                    <textarea
                      rows={4} required
                      className="border border-slate-200 p-3 rounded-xl text-sm resize-none"
                      value={settingsForm.home_about_text || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, home_about_text: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Contact information group */}
                <div className="flex flex-col gap-4">
                  <span className="font-display font-bold text-sm text-primary uppercase tracking-wider">Foundation Contact Info</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Inquiry Email</label>
                      <input
                        type="email" required
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={settingsForm.contact_email || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contact_email: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-500">Primary Phone</label>
                      <input
                        type="text" required
                        className="border border-slate-200 p-3 rounded-xl text-sm"
                        value={settingsForm.contact_phone || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contact_phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-500">HQ Office Address</label>
                    <input
                      type="text" required
                      className="border border-slate-200 p-3 rounded-xl text-sm"
                      value={settingsForm.contact_address || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contact_address: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto self-start bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3.5 rounded-xl text-xs cursor-pointer shadow"
                >
                  Save Settings Batch
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

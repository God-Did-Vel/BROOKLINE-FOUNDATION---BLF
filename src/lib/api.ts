const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Static Fallback Data in case backend is offline
export const fallbackData = {
  settings: {
    home_hero_title: 'Building Strong Girls. Transforming Communities. Creating Sustainable Impact.',
    home_hero_subtitle: 'Empowering adolescent girls and young women through quality education, leadership mentorship, and sustainable economic initiatives.',
    home_about_title: 'Empowering Girls, Strengthening Societies',
    home_about_text: 'At Brookline Foundation, we believe that when you empower a girl, you lift an entire community. We provide under-resourced adolescent girls and young women with the resources, education, mentorship, and economic tools required to break the cycle of poverty and lead self-determined lives.',
    contact_email: 'info@brooklinefoundation.org',
    contact_phone: '+234 80 3899 4633',
    contact_address: '100 Brookline Avenue, Suite 400, Boston, MA 02215',
    social_facebook: 'https://facebook.com/brooklinefoundation',
    social_twitter: 'https://twitter.com/brooklinefdn',
    social_instagram: 'https://instagram.com/brooklinefoundation',
    social_linkedin: 'https://linkedin.com/company/brooklinefoundation',
    about_story: 'Founded in 2018, Brookline Foundation began with a simple observation: local development efforts are exponentially more successful when adolescent girls are given equal access to leadership and educational tools. What started as a local mentorship circle in Massachusetts has grown into an international non-profit impacting thousands of young women worldwide through targeted training, digital literacy, and community-led health programs.',
    about_mission: 'To empower adolescent girls and young women while building healthier, more resilient communities through sustainable, locally-driven development initiatives.',
    about_vision: 'A world where every young woman has the agency, education, and opportunity to lead, innovate, and thrive within a supportive, healthy community.',
  },
  programs: [
    {
      id: 'p1',
      title: 'Girls Education Initiative',
      slug: 'girls-education-initiative',
      description: 'Providing scholarships, school supplies, and academic coaching to keep vulnerable adolescent girls in school.',
      content: 'Our Girls Education Initiative ensures that financial barriers do not halt a young girl\'s dreams. We cover school fees, supply uniforms and educational materials, and provide specialized tutoring in STEM subjects. By working closely with local schools, we also establish safe learning environments that support girls throughout their secondary education.',
      icon: 'GraduationCap',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
      category: 'Education',
    },
    {
      id: 'p2',
      title: 'Leadership & Mentorship Program',
      slug: 'leadership-mentorship-program',
      description: 'Pairing young women with professional mentors to build confidence, public speaking skills, and career pathways.',
      content: 'Tomorrow\'s leaders are built today. This program pairs adolescent girls with successful professional women for one-on-one mentorship. We run weekly workshops on assertiveness, emotional intelligence, career planning, and public speaking, culminating in an annual youth leadership summit where participants present their community action plans.',
      icon: 'Users',
      image: 'https://res.cloudinary.com/duweg8kpv/image/upload/v1782943995/kjhfdfghjkl_yoa8ib.jpg',
      category: 'Leadership',
    },
    {
      id: 'p3',
      title: 'Community Health Awareness',
      slug: 'community-health-awareness',
      description: 'Providing reproductive health education, hygiene products, and wellness campaigns.',
      content: 'Health is the foundation of opportunity. We provide age-appropriate, reproductive health education, menstrual hygiene management kits, and mental wellness support. We also partner with mobile health clinics to facilitate free screenings and medical checkups for young women and their immediate families in remote areas.',
      icon: 'HeartPulse',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      category: 'Health',
    },
    {
      id: 'p4',
      title: 'Economic Empowerment Pathways',
      slug: 'economic-empowerment-pathways',
      description: 'Micro-grants, vocational training, and financial literacy workshops to kickstart small businesses.',
      content: 'Financial independence breaks cycles of abuse and poverty. We offer practical vocational workshops in sewing, sustainable farming, culinary arts, and handicraft design. Graduates receive start-up kits and micro-grants, alongside structured guidance on budgeting, saving, and basic business administration.',
      icon: 'Briefcase',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
      category: 'Empowerment',
    },
    {
      id: 'p5',
      title: 'Digital & STEM Skills Academy',
      slug: 'digital-stem-skills-academy',
      description: 'Equipping girls with computer literacy, coding, digital marketing, and technological capabilities.',
      content: 'Bridging the digital gender divide is vital. Our tech lab hosts classes in computer literacy, front-end development, graphic design, and digital marketing. We prepare adolescent girls for the digital economy, helping them secure remote internships and tech roles or use tech to scale their own micro-enterprises.',
      icon: 'Monitor',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
      category: 'Digital Skills',
    },
  ],
  stories: [
    {
      id: 's1',
      name: 'Grace Adesina',
      role: 'Software Engineer & Alumna',
      quote: 'Brookline gave me a computer, taught me how to write code, and showed me that my background does not define my future.',
      story: 'Grace grew up in an under-resourced community with minimal access to technology. Joining the Digital Skills Academy at 16, she discovered a passion for programming. Supported by a BLF university scholarship, she recently graduated with a Computer Science degree and now works as a full-time software developer, dedicating her weekends to mentoring current BLF students.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 's2',
      name: 'Maria Santos',
      role: 'Cooperative Founder',
      quote: 'With the start-up grant and business classes, I went from working odd jobs to running a tailoring shop that employs three other mothers.',
      story: 'Maria dropped out of high school to help support her siblings. Through BLF\'s Economic Empowerment program, she learned vocational tailoring and business management. Her micro-enterprise has succeeded so rapidly that she has expanded her shop to train and employ other young women in similar circumstances.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 's3',
      name: 'Sarah Jenkins',
      role: 'Community Health Advocate',
      quote: 'Learning about health and hygiene gave me the confidence to start campaigns in my school, educating over 500 girls.',
      story: 'Sarah participated in our Health Awareness workshops. Recognizing the severe lack of accurate health information in her local high school, she established a peer-to-peer health club that distributes sanitation materials and leads monthly hygiene discussions, dramatically reducing school absenteeism among girls.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    },
  ],
  events: [
    {
      id: 'e1',
      title: 'EmpowerHER Leadership Summit 2026',
      slug: 'empowerher-leadership-summit-2026',
      description: 'An interactive leadership and networking event for young women featuring panel discussions, workshops, and career mentorship.',
      content: 'Join us for our annual flagship summit. This year, we bring together leading female executives, entrepreneurs, and activists to host intensive masterclasses on public advocacy, career strategy, and venture creation. Keynote speeches and networking circles provide attendees with actionable career advice and mentorship connections.',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      location: 'Brookline Community Hall, Boston, MA',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      registered: 145,
    },
    {
      id: 'e2',
      title: 'Women in Tech: Digital Literacy Boot Camp',
      slug: 'women-in-tech-digital-literacy-boot-camp',
      description: 'A 2-week hands-on workshop series teaching computer basics, safe internet browsing, and digital marketing.',
      content: 'This boot camp is open to young women eager to acquire critical digital skills. Instructors walk through the fundamentals of operating systems, office applications, and digital safety, followed by an introduction to social media marketing to help local artisans and young entrepreneurs promote their businesses online.',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
      location: 'BLF STEM Lab, Boston, MA',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      registered: 48,
    },
    {
      id: 'e3',
      title: 'Hygiene Kit Distribution & Wellness Seminar',
      slug: 'hygiene-kit-distribution-wellness-seminar',
      description: 'Outreach campaign to distribute reproductive health kits and conduct open wellness checkups.',
      content: 'A community outreach event focused on health. Alongside distributing sanitary products and wellness kits, medical volunteers will lead seminars on stress management, nutrition, and general self-care, providing individual consultations for attendees in need.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      location: 'East Side Outreach Center',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      registered: 210,
    },
  ],
  blogs: [
    {
      id: 'b1',
      title: 'Bridging the Digital Gender Divide: Why Tech Literacy Matters',
      slug: 'bridging-digital-gender-divide-tech-literacy-matters',
      content: 'In the modern global economy, tech literacy is not just an asset; it is a fundamental survival tool. Yet, globally, adolescent girls in low-income settings lag far behind their male peers in computer access and programming exposure. In this article, we explore how teaching young women coding, design, and digital literacy transforms their earning capacity and shapes future community resilience. We outline the successes of our STEM Lab and detail how access to basic computer knowledge empowers girls to find higher-paying opportunities, build online businesses, and establish themselves as digital leaders.',
      excerpt: 'How tech literacy and computer training are unlocking high-value career pathways for adolescent girls globally.',
      featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
      published: true,
      category: 'Education & Tech',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'b2',
      title: 'Mentorship: The Invisible Catalyst for Youth Success',
      slug: 'mentorship-invisible-catalyst-youth-success',
      content: 'While curriculum-based education and financial scholarships are indispensable, the intangible presence of a supportive mentor is often the true driver of long-term success. Girls who are paired with positive female role models display higher self-esteem, are more likely to pursue higher education, and exhibit greater resilience in the face of family or economic hardships. This blog outlines how our mentorship matchmaking system works and highlights how professional mentors help young women navigate career choices, set realistic life goals, and build high-value networking circles.',
      excerpt: 'Exploring the vital role that female role models and professional mentors play in guiding vulnerable young girls.',
      featuredImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
      published: true,
      category: 'Mentorship',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
  ],
  partners: [
    { id: 'p1', name: 'Boston Leadership Trust', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200' },
    { id: 'p2', name: 'Apex Digital Systems', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200' },
    { id: 'p3', name: 'Summit Healthcare', logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=200' },
    { id: 'p4', name: 'Pioneer Wealth Management', logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200' },
  ],
  gallery: [
    { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Volunteers and students at the local health clinic opening.' },
    { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Lively classroom interaction during the Coding Workshop.' },
    { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Mentorship roundtables at the annual Leadership Summit.' },
    { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Tech training students finalizing their portfolio sites.' },
    { id: 'g5', imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Scholarship distributions at community schools.' },
    { id: 'g6', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800', type: 'PHOTO', caption: 'Vocational sewing and design training centers.' },
  ],
};

// Generic safe fetch handler
async function safeFetch<T>(endpoint: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}: using fallback static data.`, error);
    return fallback;
  }
}

export const api = {
  // Public Fetchers
  async getSettings() {
    return safeFetch<Record<string, string>>('/content/settings', fallbackData.settings);
  },

  async getPrograms() {
    return safeFetch<any[]>('/content/programs', fallbackData.programs);
  },

  async getProgramBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/content/programs/slug/${slug}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return fallbackData.programs.find(p => p.slug === slug) || fallbackData.programs[0];
    }
  },

  async getEvents() {
    return safeFetch<any[]>('/content/events', fallbackData.events);
  },

  async getEventBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/content/events/slug/${slug}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return fallbackData.events.find(e => e.slug === slug) || fallbackData.events[0];
    }
  },

  async registerEventAttendee(id: string) {
    try {
      const res = await fetch(`${API_BASE}/content/events/register/${id}`, { method: 'POST' });
      return res.ok;
    } catch {
      return true; // Mock success
    }
  },

  async getBlogs(publishedOnly = true) {
    return safeFetch<any[]>(`/content/blogs?published=${publishedOnly}`, fallbackData.blogs);
  },

  async getBlogBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/content/blogs/slug/${slug}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return fallbackData.blogs.find(b => b.slug === slug) || fallbackData.blogs[0];
    }
  },

  async getStories() {
    return safeFetch<any[]>('/content/stories', fallbackData.stories);
  },

  async getGallery() {
    return safeFetch<any[]>('/content/gallery', fallbackData.gallery);
  },

  async getPartners() {
    return safeFetch<any[]>('/content/partners', fallbackData.partners);
  },

  // Public Submissions
  async submitContactMessage(data: { name: string; email: string; subject: string; message: string }) {
    try {
      const res = await fetch(`${API_BASE}/content/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch {
      return true; // Mock success
    }
  },

  async submitVolunteerApplication(data: { name: string; email: string; phone: string; skills: string; availability: string; resumeUrl?: string }) {
    try {
      const res = await fetch(`${API_BASE}/content/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch {
      return true; // Mock success
    }
  },

  async initiateDonation(data: { amount: number; email: string; donorName?: string; paymentGateway: string }) {
    try {
      const res = await fetch(`${API_BASE}/content/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      // Mock returned object
      return {
        id: `mock-id-${Date.now()}`,
        amount: data.amount,
        email: data.email,
        paymentGateway: data.paymentGateway,
        reference: `blf-mock-ref-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'PENDING',
      };
    }
  },

  async verifyDonation(reference: string, paymentGateway: string) {
    try {
      const res = await fetch(`${API_BASE}/content/donate/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, paymentGateway }),
      });
      return await res.json();
    } catch {
      return { status: 'SUCCESSFUL', reference }; // Mock success
    }
  },

  // Admin Auth Operations
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    return await res.json();
  },

  async checkAdminSession(token: string) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error();
    return await res.json();
  },

  async changePassword(oldPassword: string, newPassword: string, token: string) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Password update failed');
    }
    return await res.json();
  },

  // Generic Admin CRUD Operations
  async adminFetch(endpoint: string, token: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  },

  async adminPost(endpoint: string, data: any, token: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Post operation failed');
    }
    return await res.json();
  },

  async adminPut(endpoint: string, data: any, token: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Put operation failed');
    }
    return await res.json();
  },

  async adminDelete(endpoint: string, token: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Delete operation failed');
    return true;
  },

  async adminUploadFile(file: File, token: string) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error('Image upload failed');
    const result = await res.json();
    return result.url; // Returns uploaded image url
  },
};

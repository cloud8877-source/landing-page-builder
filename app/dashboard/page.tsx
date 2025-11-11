'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Site } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Sidebar from '@/components/dashboard/Sidebar';
import SiteCard from '@/components/dashboard/SiteCard';
import { Plus, Globe, TrendingUp, Eye, Menu, User, LogOut, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadSites();
    }
  }, [user]);

  async function loadSites() {
    if (!user) return;

    try {
      // Fetch from both 'sites' and 'landingPages' collections
      const [sitesQuery, landingPagesQuery] = await Promise.all([
        getDocs(query(collection(db, 'sites'), where('userId', '==', user.id))),
        getDocs(query(collection(db, 'landingPages'), where('userId', '==', user.id))),
      ]);

      const sitesData: Site[] = [];

      // Add old sites
      sitesQuery.forEach((doc) => {
        sitesData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Site);
      });

      // Add new landing pages
      landingPagesQuery.forEach((doc) => {
        const data = doc.data();
        sitesData.push({
          id: doc.id,
          userId: data.userId,
          title: data.pageTitle || data.title || 'Untitled',
          subdomain: data.subdomain || '',
          template: data.templateId || data.template || '',
          published: data.published || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          // Include new fields for compatibility
          ...data,
        } as Site);
      });

      // Sort by updatedAt descending
      sitesData.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

      setSites(sitesData);
    } catch (error) {
      console.error('Error loading sites:', error);
    } finally {
      setLoadingSites(false);
    }
  }

  async function deleteSite(siteId: string) {
    if (!confirm('Are you sure you want to delete this site?')) return;

    try {
      // Try deleting from both collections
      // One will succeed, one will fail silently
      await Promise.allSettled([
        deleteDoc(doc(db, 'sites', siteId)),
        deleteDoc(doc(db, 'landingPages', siteId)),
      ]);

      setSites(sites.filter((s) => s.id !== siteId));
    } catch (error) {
      console.error('Error deleting site:', error);
      alert('Error deleting site');
    }
  }

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 border-r bg-card">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside className="w-64 bg-card h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-card border-b px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.displayName}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/builder/new">
                <Button size="sm" className="hidden sm:flex">
                  <Plus className="mr-2 h-4 w-4" />
                  New Site
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.displayName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <Card className="bg-gradient-to-br from-sky-500 to-blue-600 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Sites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{sites.length}</div>
                <p className="text-xs opacity-80 mt-1">All your properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {sites.filter((s) => s.published).length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Live on the web</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{user.plan}</div>
                <p className="text-xs text-muted-foreground mt-1">Upgrade anytime</p>
              </CardContent>
            </Card>
          </div>

          {/* Sites Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Sites</h2>
              <Link href="/builder/new">
                <Button size="sm" className="sm:hidden">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {loadingSites ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : sites.length === 0 ? (
              <Card className="p-12 text-center">
                <Globe className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No sites yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Get started by creating your first property landing page. Choose from beautiful templates designed for Malaysian properties.
                </p>
                <Link href="/builder/new">
                  <Button size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Your First Site
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {sites.map((site) => (
                  <SiteCard key={site.id} site={site} onDelete={deleteSite} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

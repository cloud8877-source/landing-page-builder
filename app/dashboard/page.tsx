'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Site } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ExternalLink, Edit, Trash2, Globe } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);

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
      const q = query(collection(db, 'sites'), where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);

      const sitesData: Site[] = [];
      querySnapshot.forEach((doc) => {
        sitesData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Site);
      });

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
      await deleteDoc(doc(db, 'sites', siteId));
      setSites(sites.filter((s) => s.id !== siteId));
    } catch (error) {
      console.error('Error deleting site:', error);
      alert('Error deleting site');
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Property Sites</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user.displayName}!
            </p>
          </div>
          <Link href="/builder/new">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create New Site
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sites.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {sites.filter((s) => s.published).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user.plan}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sites List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Your Sites</h2>
          </div>

          {loadingSites ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : sites.length === 0 ? (
            <div className="p-8 text-center">
              <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No sites yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first property landing page
              </p>
              <Link href="/builder/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Site
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {sites.map((site) => (
                <div key={site.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{site.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{site.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {site.subdomain}.{process.env.NEXT_PUBLIC_BASE_DOMAIN}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            site.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {site.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {site.published && (
                        <a
                          href={`https://${site.subdomain}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Link href={`/builder/${site.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSite(site.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

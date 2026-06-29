'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash, FaPlus, FaSync } from 'react-icons/fa';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wedding Portfolio</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setLoading(true);
                fetchProjects();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center"
            >
              <FaSync className="mr-2" />
              Refresh
            </button>
            <Link
              href="/admin/projects/new"
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Wedding
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Wedding / Couple
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Venue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project: any) => (
                  <tr key={project._id}>
                    <td className="px-6 py-4">
                      {project.images && project.images.length > 0 ? (
                        <div className="relative w-16 h-16">
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover rounded"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{project.title}</div>
                      {(project.brideName || project.groomName) && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {[project.brideName, project.groomName].filter(Boolean).join(' & ')}
                        </div>
                      )}
                      {project.isFeatured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mt-1 inline-block">Featured</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{project.category?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{project.venue || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
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
    </AdminLayout>
  );
}

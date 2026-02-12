import { IconSettings, IconUsers } from "@tabler/icons-react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your blog system configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <IconUsers className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Users</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Manage admin users and permissions
          </p>
          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
            Manage →
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Environment</p>
            <p className="font-medium">
              {process.env.NODE_ENV || "development"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Database</p>
            <p className="font-medium">MongoDB</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Framework</p>
            <p className="font-medium">Next.js 15</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Authentication</p>
            <p className="font-medium">JWT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

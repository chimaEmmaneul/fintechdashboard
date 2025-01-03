export default function NotificationCenter() {
  const notifications = [
    { id: 1, message: "New transaction received", time: "5 minutes ago" },
    { id: 2, message: "Loan application approved", time: "1 hour ago" },
    { id: 3, message: "Security alert: New login detected", time: "2 hours ago" },
  ]

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
      <div className="p-4">
        <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View all notifications</a>
      </div>
    </div>
  )
}


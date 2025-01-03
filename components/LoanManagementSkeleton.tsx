export default function LoanManagementSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded mt-4"></div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


import { UserIcon, CogIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function ProfileDropdown() {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <UserIcon className="inline-block w-5 h-5 mr-2" />
        Profile
      </a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <CogIcon className="inline-block w-5 h-5 mr-2" />
        Settings
      </a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <QuestionMarkCircleIcon className="inline-block w-5 h-5 mr-2" />
        Help
      </a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <ArrowRightOnRectangleIcon className="inline-block w-5 h-5 mr-2" />
        Sign out
      </a>
    </div>
  )
}


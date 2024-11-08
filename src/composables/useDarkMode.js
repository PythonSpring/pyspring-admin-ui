import { computed } from 'vue'

export const useDarkMode = () => {

  const getThemeClasses = (variant) => {
    const themeClasses = {
      default: 'bg-white dark:bg-black',
      container: 'bg-gray-100 dark:bg-black',
      card: 'bg-white dark:bg-gray-800',
      text: 'text-gray-600 dark:text-gray-300',
      button: 'bg-white hover:bg-gray-400 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-white active:border-gray-500 hover:border-gray-500',
      sidebar: 'bg-gray-800 dark:bg-black',
      link: 'text-blue-500 dark:text-blue-400',
    }
    
    return themeClasses[variant]
  }

  return {
    getThemeClasses
  }
}
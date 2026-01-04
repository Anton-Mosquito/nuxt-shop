export const usePageLoader = () => {
  const isLoading = useState<boolean>('page-loader-loading', () => false)
  const loadingMessage = useState<string>('page-loader-message', () => '')

  const showLoader = (message = 'Loading...') => {
    loadingMessage.value = message
    isLoading.value = true
  }

  const hideLoader = () => {
    isLoading.value = false
    loadingMessage.value = ''
  }

  return {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader
  }
}

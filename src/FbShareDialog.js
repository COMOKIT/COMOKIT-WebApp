import React  from 'react'
import { useFbSdkScriptContext } from './FbSdkScript'

/**
 * This is the button that will trigger the dialog.
 * It uses the context created in the previous snippet to
 * know when the script has loaded and the API is ready
 * to use. 
 */
const FbShareDialog = ({ method = 'share', href, mmap }) => {
  const { isReady } = useFbSdkScriptContext()

  /**
   * Open share dialog when the button is clicked.
   * This will only be available when the isReady
   * state is true.
   */
  const handleClick = () => {
    console.log(mmap);
  }

  /**
   * If FB SDK is not yet ready, don't render the button.
   */
  if (!isReady) {
    return null
  }

  /**
   * Otherwise do render the button and set an onClick
   * event listener which triggers the dialog.
   */
  return (
    // <div >{mmap}</div>
    <button onClick={handleClick}>Play</button>
  )
}

export default FbShareDialog
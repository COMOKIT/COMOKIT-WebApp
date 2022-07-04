import GAMA from "./GAMA";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect
} from 'react'

// Context.
export const FbSdkScriptContext = createContext()

// Create a custom hook to use the context.
export const useFbSdkScriptContext = () => useContext(FbSdkScriptContext)

// Provider of context.
const FbSdkScriptProvider = ({
  appId,
  autoLogAppEvents = true,
  xfbml = true,
  version = 'v8.0',
  children
}) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)

  /**
   * Extra security measure to check if the script has
   * already been included in the DOM
   */
  const scriptAlreadyExists = () =>
    document.querySelector('script#gama-sdk') !== null

  /**
   * Append the script to the document.
   * Whenever the script has been loaded it will
   * set the isLoaded state to true.
   */
   const SearchMap = useRef(); // optional, but useful if the Map object is used after mounting

  const appendSdkScript = () => { 
      setHasLoaded(true);
    // const script = document.createElement('script')
    // script.id = 'gama-sdk'
    // script.src = "GAMA.js";
    // script.async = true;
    // script.defer = true;
    // script.type = "text/javascript"; 
    // script.crossOrigin = 'anonymous' 
    // document.body.append(script)
    // script.onload = () => {
    //   setHasLoaded(true);
    //   if (scriptAlreadyExists()) {
         
        var modelPath =  'C:\\git\\gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
        var experimentName = 'road_traffic'; 
        // SearchMap.current = GAMA("ws://localhost:6868/", modelPath, experimentName);
    //   }
    // }
  };

  /**
   * Runs first time when component is mounted
   * and adds the script to the document.
   */
  useEffect(() => {
    if (!scriptAlreadyExists()) {
      appendSdkScript()
    }

  }, [ ]);

  /**
   * Whenever the script has loaded initialize the
   * FB SDK with the init method. This will then set
   * the isReady state to true and passes that
   * through the context to the consumers.
   */
  useEffect(() => {
    if (hasLoaded === true) { 
      setIsReady(true)
    }
  }, [hasLoaded,SearchMap])
var addr="ws://localhost:6868/";
var modelPath =  'C:\\git\\gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
var experimentName = 'road_traffic';
  return (
    <><GAMA address={addr} modelPath={modelPath} experimentName={experimentName}></GAMA>
    <FbSdkScriptContext.Provider value={{ isReady, hasLoaded }}>
      {children}
    </FbSdkScriptContext.Provider></>
  )
}

export default FbSdkScriptProvider
import {useState} from "react";
import './App.css';
import Timer from './features/Timer'
import Settings from './features/Settings';
import SettingsContext from "./component/SettingsContext";


function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
 
  return ( 
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
 
        {showSettings ?  <Settings /> :  <Timer /> }
      </SettingsContext.Provider>
    </main> 
  );
}

export default App;

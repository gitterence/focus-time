import { useContext, useState, useEffect, useRef } from 'react';
import { COLORS } from '../utils/COLORS';
import 'react-circular-progressbar/dist/styles.css' 
import PauseButton from '../component/PauseButton';
import PlayButton from '../component/PlayButton'; 
import SettingButton from '../component/SettingButton';
import SettingsContext from '../component/SettingsContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; 
 
function Timer() {

    const settingInfo = useContext(SettingsContext);
    const [mode, setMode] = useState('work');
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const modeRef = useRef(mode);
    const isPausedRef = useRef(isPaused);
    const secondsLeftRef = useRef(secondsLeft);
    

    useEffect(() => {

        function switchMode() {
          const nextMode = modeRef.current === 'work' ? 'break' : 'work';
          const nextSeconds = (nextMode === 'work' ? settingInfo.workMinutes : settingInfo.breakMinutes) * 60;
    
          setMode(nextMode);
          modeRef.current = nextMode;
    
          setSecondsLeft(nextSeconds);
          secondsLeftRef.current = nextSeconds;
        }
    
        secondsLeftRef.current = settingInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    
        const interval = setInterval(() => {
          if (isPausedRef.current) {
            return;
          }
          if (secondsLeftRef.current === 0) {
            return switchMode();
          }
    
          countDown();
        }, 1000);
    
        return () => clearInterval(interval);
      }, [settingInfo]);
 
    function countDown() {
        secondsLeftRef.current = secondsLeftRef.current - 1;
        setSecondsLeft(secondsLeftRef.current);
    }

    const totalSeconds = mode === 'work' 
        ? settingInfo.workMinutes * 60 
        : settingInfo.breakMinutes * 60;

    const percentage = Math.round(secondsLeft / totalSeconds * 100) ;

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0' + seconds ;
 

    return(
        <div>
            <CircularProgressbar 
                value={percentage} 
                text={minutes+ ':' + seconds} 
                styles={buildStyles({
                    textColor:COLORS.white,
                    pathColor:mode ==='work' ? COLORS.red : COLORS.green,
                    trailColor:COLORS.grey,
            })} />

            <div style={{marginTop:'20px'}}>

                {isPaused 
                ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current=false; }} /> 
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current=true; }}  />}
                 
            </div>

            <div style={{marginTop:'20px'}}>
                <SettingButton onClick={() =>  settingInfo.setShowSettings(true)} />
            </div> 

        </div>
    ); 
} 
export default Timer;
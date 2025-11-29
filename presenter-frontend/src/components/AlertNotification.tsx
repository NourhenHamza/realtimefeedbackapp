import { useEffect, useRef, useState } from 'react';

interface AlertNotificationProps {
  alerts: Array<{
    type: string;
    severity: 'info' | 'warning' | 'critical' | 'success';
    title: string;
    message: string;
    timestamp: string;
  }>;
  enableSound?: boolean;
}

export default function AlertNotification({ alerts, enableSound = true }: AlertNotificationProps) {
  const [soundEnabled, setSoundEnabled] = useState(enableSound);
  const [volume, setVolume] = useState(0.7);
  const lastAlertRef = useRef<string>('');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Play notification sound using Web Audio API
  const playNotificationSound = (severity: string) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different severities
    if (severity === 'critical') {
      // Critical: Urgent beep pattern (high-low-high)
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.setValueAtTime(660, now + 0.1);
      oscillator.frequency.setValueAtTime(880, now + 0.2);
      gainNode.gain.setValueAtTime(volume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    } else if (severity === 'warning') {
      // Warning: Double beep
      oscillator.frequency.setValueAtTime(660, now);
      gainNode.gain.setValueAtTime(volume * 0.8, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      oscillator.start(now);
      oscillator.stop(now + 0.15);

      // Second beep
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.setValueAtTime(660, audioContext.currentTime);
        gain2.gain.setValueAtTime(volume * 0.8, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.15);
      }, 200);
    } else if (severity === 'success') {
      // Success: Pleasant ascending tone
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.2);
      gainNode.gain.setValueAtTime(volume * 0.6, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } else {
      // Info: Single soft beep
      oscillator.frequency.setValueAtTime(520, now);
      gainNode.gain.setValueAtTime(volume * 0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
    }
  };

  // Monitor for new alerts
  useEffect(() => {
    if (alerts.length === 0) return;

    const latestAlert = alerts[0];
    const alertKey = `${latestAlert.timestamp}-${latestAlert.type}`;

    // Only play sound for new alerts
    if (alertKey !== lastAlertRef.current) {
      lastAlertRef.current = alertKey;
      
      // Play sound based on severity
      if (latestAlert.severity === 'critical' || latestAlert.severity === 'warning') {
        playNotificationSound(latestAlert.severity);
      }
    }
  }, [alerts, soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    
    // Play a test sound when enabling
    if (!soundEnabled) {
      setTimeout(() => playNotificationSound('info'), 100);
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          soundEnabled
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        }`}
        title={soundEnabled ? 'Sound enabled' : 'Sound disabled'}
      >
        <span className="text-lg">{soundEnabled ? '🔔' : '🔕'}</span>
        <span className="font-medium">
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </span>
      </button>

      {soundEnabled && (
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">Volume:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
            className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
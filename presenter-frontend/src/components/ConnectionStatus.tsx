'use client';

import { ConnectionStatus as Status } from '../hooks/useWebSocket';

interface ConnectionStatusProps {
  status: Status;
  onReconnect?: () => void;
}

export default function ConnectionStatus({ status, onReconnect }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'bg-green-500',
          text: 'Connected',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          icon: '✓',
        };
      case 'connecting':
        return {
          color: 'bg-yellow-500',
          text: 'Connecting...',
          textColor: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          icon: '⟳',
        };
      case 'disconnected':
        return {
          color: 'bg-gray-500',
          text: 'Disconnected',
          textColor: 'text-gray-700',
          bgColor: 'bg-gray-50',
          icon: '○',
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Connection Error',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          icon: '✕',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bgColor} rounded-lg px-4 py-2 flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center">
          <span className={`${config.color} w-3 h-3 rounded-full`} />
          {status === 'connecting' && (
            <span
              className={`${config.color} absolute w-3 h-3 rounded-full animate-ping opacity-75`}
            />
          )}
        </div>
        <span className={`font-medium text-sm ${config.textColor}`}>
          {config.icon} {config.text}
        </span>
      </div>

      {(status === 'disconnected' || status === 'error') && onReconnect && (
        <button
          onClick={onReconnect}
          className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
        >
          Reconnect
        </button>
      )}
    </div>
  );
}
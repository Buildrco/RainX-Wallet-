import React from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

export const Icon = ({ name, size = 22, color = '#111114', strokeWidth = 1.9 }: Props & { name: string }) => {
  const common = { stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'home': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...common} d="M3 10.8 12 3l9 7.8v8.2a2 2 0 0 1-2 2h-4.7v-6.1H9.7V21H5a2 2 0 0 1-2-2z"/></Svg>;
    case 'activity': return <Svg width={size} height={size} viewBox="0 0 24 24"><Polyline {...common} points="3,12 7,12 10,5 14,19 17,12 21,12"/></Svg>;
    case 'network': return <Svg width={size} height={size} viewBox="0 0 24 24"><Circle {...common} cx="6" cy="12" r="2.5"/><Circle {...common} cx="18" cy="6" r="2.5"/><Circle {...common} cx="18" cy="18" r="2.5"/><Line {...common} x1="8.2" y1="10.8" x2="15.8" y2="7.2"/><Line {...common} x1="8.2" y1="13.2" x2="15.8" y2="16.8"/></Svg>;
    case 'settings': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...common} d="M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4z"/><Path {...common} d="m19.4 15 .1.2a1.8 1.8 0 0 1-2.5 2.5l-.2-.1a7.9 7.9 0 0 1-2.1 1.2v.2a1.8 1.8 0 1 1-3.6 0v-.2a7.9 7.9 0 0 1-2.1-1.2l-.2.1a1.8 1.8 0 1 1-2.5-2.5l.1-.2A7.9 7.9 0 0 1 5.2 13H5a1.8 1.8 0 1 1 0-3.6h.2a7.9 7.9 0 0 1 1.2-2.1l-.1-.2a1.8 1.8 0 1 1 2.5-2.5l.2.1A7.9 7.9 0 0 1 11 3.5v-.2a1.8 1.8 0 1 1 3.6 0v.2a7.9 7.9 0 0 1 2.1 1.2l.2-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.2a7.9 7.9 0 0 1 1.2 2.1h.2a1.8 1.8 0 1 1 0 3.6h-.2a7.9 7.9 0 0 1-1.2 2.1z"/></Svg>;
    case 'arrow-up': return <Svg width={size} height={size} viewBox="0 0 24 24"><Line {...common} x1="12" y1="18" x2="12" y2="6"/><Polyline {...common} points="7,11 12,6 17,11"/></Svg>;
    case 'arrow-down': return <Svg width={size} height={size} viewBox="0 0 24 24"><Line {...common} x1="12" y1="6" x2="12" y2="18"/><Polyline {...common} points="7,13 12,18 17,13"/></Svg>;
    case 'copy': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...common} x="9" y="9" width="10" height="10" rx="2"/><Path {...common} d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/></Svg>;
    case 'chevron': return <Svg width={size} height={size} viewBox="0 0 24 24"><Polyline {...common} points="9,6 15,12 9,18"/></Svg>;
    case 'shield': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...common} d="M12 3 19 6v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6z"/></Svg>;
    case 'scan': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...common} d="M5 8V5h3M16 5h3v3M19 16v3h-3M8 19H5v-3"/><Line {...common} x1="7" y1="12" x2="17" y2="12"/></Svg>;
    case 'back': return <Svg width={size} height={size} viewBox="0 0 24 24"><Polyline {...common} points="15,5 8,12 15,19"/><Line {...common} x1="8" y1="12" x2="20" y2="12"/></Svg>;
    default: return <Svg width={size} height={size} viewBox="0 0 24 24"><Circle {...common} cx="12" cy="12" r="8"/></Svg>;
  }
};

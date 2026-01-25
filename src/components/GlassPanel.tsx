import { ReactNode, CSSProperties } from 'react';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
}

export default function GlassPanel({ 
  children, 
  className = '', 
  style,
  hover = false 
}: GlassPanelProps) {
  return (
    <div 
      className={`${styles.panel} ${hover ? styles.hover : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

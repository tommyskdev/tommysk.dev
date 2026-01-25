'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './DiscordSection.module.css';

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    global_name?: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  spotify?: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
}

interface DiscordSectionProps {
  userId: string;
}

export default function DiscordSection({ userId }: DiscordSectionProps) {
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();
        if (data.success) {
          setLanyard(data.data);
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [userId]);

  const statusColors: Record<string, string> = {
    online: '#3ba55d',
    idle: '#faa81a',
    dnd: '#ed4245',
    offline: '#747f8d',
  };

  const getActivityIcon = (type: number) => {
    switch (type) {
      case 0: return 'fas fa-gamepad';
      case 2: return 'fab fa-spotify';
      case 3: return 'fas fa-headphones';
      default: return 'fas fa-circle';
    }
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.loading}>
              <i className="fab fa-discord"></i>
              <p>Loading Discord presence...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!lanyard) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <i className="fab fa-discord"></i>
              <h3>Discord</h3>
            </div>
            <p className={styles.offline}>Discord presence unavailable</p>
          </div>
        </div>
      </section>
    );
  }

  const { discord_user, discord_status, activities, spotify } = lanyard;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <i className="fab fa-discord"></i>
            <h3>Discord Activity</h3>
          </div>

          <div className={styles.profile}>
            <div className={styles.avatarWrapper}>
              <Image
                src={avatarUrl}
                alt={discord_user.username}
                width={80}
                height={80}
                className={styles.avatar}
              />
              <span 
                className={styles.statusDot}
                style={{ backgroundColor: statusColors[discord_status] }}
              ></span>
            </div>

            <div className={styles.userInfo}>
              <h4 className={styles.username}>
                {discord_user.global_name || discord_user.username}
              </h4>
              <p className={styles.discriminator}>
                @{discord_user.username}
                {discord_user.discriminator !== '0' && `#${discord_user.discriminator}`}
              </p>
              <p className={styles.status}>
                {discord_status.charAt(0).toUpperCase() + discord_status.slice(1)}
              </p>
            </div>
          </div>

          {spotify && (
            <div className={styles.spotify}>
              <div className={styles.spotifyIcon}>
                <i className="fab fa-spotify"></i>
              </div>
              <div className={styles.spotifyInfo}>
                <p className={styles.spotifyLabel}>Listening to Spotify</p>
                <p className={styles.spotifySong}>{spotify.song}</p>
                <p className={styles.spotifyArtist}>{spotify.artist}</p>
              </div>
            </div>
          )}

          {activities && activities.length > 0 && (
            <div className={styles.activities}>
              {activities.slice(0, 3).map((activity, index) => (
                <div key={index} className={styles.activity}>
                  <i className={getActivityIcon(activity.type)}></i>
                  <div className={styles.activityInfo}>
                    <p className={styles.activityName}>{activity.name}</p>
                    {activity.details && (
                      <p className={styles.activityDetails}>{activity.details}</p>
                    )}
                    {activity.state && (
                      <p className={styles.activityState}>{activity.state}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

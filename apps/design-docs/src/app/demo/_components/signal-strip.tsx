'use client';

import { Badge, Tooltip } from '@onersoft/ui';
import { signals } from './data';
import styles from './dashboard.module.css';

export function SignalStrip() {
  return (
    <section className={styles.strip} aria-label="Key operational signals">
      {signals.map((s) => {
        const peak = Math.max(...s.history);
        return (
          <div key={s.key} className={styles.tile}>
            <div className={styles.tileHead}>
              <span>{s.label}</span>
              <Badge variant={s.deltaVariant} size="sm">
                {s.delta}
              </Badge>
            </div>
            <div className={styles.tileValue}>
              {s.value}
              {s.unit ? <span className={styles.tileUnit}>{s.unit}</span> : null}
            </div>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className={styles.sparks}
                  aria-label={`${s.label} trend, last 12 intervals`}
                  role="img"
                >
                  {s.history.map((h, i) => (
                    <span
                      key={i}
                      className={
                        i === s.history.length - 1
                          ? `${styles.spark} ${styles.sparkLast}`
                          : styles.spark
                      }
                      style={{ height: `${Math.max(12, Math.round((h / peak) * 100))}%` }}
                    />
                  ))}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom">{s.foot}</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <span className={styles.tileFoot}>{s.foot}</span>
          </div>
        );
      })}
    </section>
  );
}

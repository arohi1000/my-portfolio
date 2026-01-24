'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './LogoLoop.module.css';

export interface LogoItem {
    node: React.ReactNode;
    title: string;
    href?: string;
}

export interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    scaleOnHover?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
} as const;

export default function LogoLoop({
    logos,
    speed = 100,
    direction = 'left',
    width = '100%',
    logoHeight = 40,
    gap = 60,
    pauseOnHover = true,
    hoverSpeed,
    fadeOut = true,
    scaleOnHover = true,
    className = '',
    style
}: LogoLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLDivElement>(null); // Changed to Div for easier flex handling

    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const isVertical = direction === 'up' || direction === 'down';

    // Animation State
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    const effectiveHoverSpeed = useMemo(() => {
        if (hoverSpeed !== undefined) return hoverSpeed;
        if (pauseOnHover === true) return 0;
        return undefined;
    }, [hoverSpeed, pauseOnHover]);

    const targetVelocity = useMemo(() => {
        const magnitude = Math.abs(speed);
        let directionMultiplier = (direction === 'up' || direction === 'left') ? 1 : -1;
        // Standardize: Left means translate -x, Right +x? 
        // Usually: Speed > 0 moves forward. 
        // If direction is left, we want items to move left (X decreases). 
        // The previous implementation logic was complex. Let's simplify.
        // X decreases: offset INCREASES (since we use negative transform).
        return magnitude * directionMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
        if (!containerRef.current || !seqRef.current) return;

        const containerSize = isVertical ? containerRef.current.clientHeight : containerRef.current.clientWidth;
        const seqSize = isVertical ? seqRef.current.offsetHeight : seqRef.current.offsetWidth;

        if (seqSize > 0) {
            const copiesNeeded = Math.ceil(containerSize / seqSize) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
    }, [isVertical]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions, logos]);

    // Animation Loop
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            // Determine target speed
            const target = (isHovered && effectiveHoverSpeed !== undefined)
                ? effectiveHoverSpeed
                : targetVelocity;

            // Smooth velocity transition
            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            // Calculate Loop Size (Single sequence size)
            const seqSize = isVertical
                ? (seqRef.current?.offsetHeight ?? 0)
                : (seqRef.current?.offsetWidth ?? 0);

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;

                // Wrap around logic
                // Use modulus to keep offset within [0, seqSize]
                // This ensures infinite loop
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                const transformValue = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
                track.style.transform = transformValue;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [targetVelocity, effectiveHoverSpeed, isHovered, isVertical]);

    const cssVariables = {
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
    } as React.CSSProperties;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const dispatchCursor = (title: string | null) => {
        window.dispatchEvent(new CustomEvent('skill-hover', { detail: { skill: title } }));
    };

    const renderItem = (item: LogoItem, key: string) => (
        <div
            key={key}
            className={styles.item}
            onMouseEnter={() => dispatchCursor(item.title)}
            onMouseLeave={() => dispatchCursor(null)}
        >
            {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
                    {item.node}
                </a>
            ) : (
                item.node
            )}
        </div>
    );

    return (
        <div
            className={`${styles.container} ${isVertical ? styles.vertical : ''} ${className}`}
            style={{ ...style, ...cssVariables, width: typeof width === 'number' ? `${width}px` : width }}
            ref={containerRef}
        >
            {fadeOut && <div className={styles.fadeIn + ' ' + styles.fadeLeft} />}
            {fadeOut && <div className={styles.fadeIn + ' ' + styles.fadeRight} />}

            <div
                className={styles.track}
                ref={trackRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {Array.from({ length: copyCount }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.track} // Use track class purely for spacing layout if needed, but flex in flex works
                        style={{ display: 'flex', flexDirection: isVertical ? 'column' : 'row' }}
                        ref={i === 0 ? seqRef : undefined}
                    >
                        {logos.map((item, index) => renderItem(item, `${i}-${index}`))}
                    </div>
                ))}
            </div>
        </div>
    );
}

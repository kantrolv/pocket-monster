import React, { useState, useEffect } from 'react';

const ANIM_FRAMES = {
    idle: 10,
    running: 8,
    jumping: 12,
};

const ANIM_SPEED = {
    idle: 100, // ms per frame
    running: 80,
    jumping: 60,
};

export const SpriteAnimator = ({ state = "idle", facing = "right", size = 64 }) => {
    const [frameIndex, setFrameIndex] = useState(1);
    const [currentState, setCurrentState] = useState(state);

    // If state changes, reset frame
    useEffect(() => {
        if (currentState !== state) {
            setCurrentState(state);
            setFrameIndex(1);
        }
    }, [state, currentState]);

    useEffect(() => {
        let lastTime = performance.now();
        let rAF;

        const loop = (time) => {
            const msPerFrame = ANIM_SPEED[state] || 100;
            const deltaTime = time - lastTime;

            if (deltaTime > msPerFrame) {
                lastTime = time - (deltaTime % msPerFrame);
                setFrameIndex((prev) => {
                    const maxFrames = ANIM_FRAMES[state] || 1;
                    return prev >= maxFrames ? 1 : prev + 1;
                });
            }
            rAF = requestAnimationFrame(loop);
        };

        rAF = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rAF);
    }, [state]);

    const dirName = state === 'idle' ? 'Idle' : state === 'running' ? 'Run' : 'Jump';
    const imgUrl = `/assets/character/${dirName} (${frameIndex}).png`;

    return (
        <div
            className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
            style={{
                width: size,
                height: size,
                transform: `translate(-50%, -50%) ${facing === 'left' ? 'scaleX(-1)' : ''}`,
                transition: 'transform 0.1s ease-in-out',
            }}
        >
            <img
                src={imgUrl}
                alt={`Character ${state}`}
                className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                style={{
                    imageRendering: "pixelated",
                }}
            />
        </div>
    );
};

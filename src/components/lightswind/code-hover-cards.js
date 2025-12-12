"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { Github, Code, Dices, Terminal, Settings, Heart, Star, Zap, Trophy, Shield, } from 'lucide-react';

/**
 * @typedef {Object} Card
 * @property {string} id
 * @property {import('react').ComponentType<any>=} icon
 * @property {string=} title
 * @property {string=} description
 * @property {import('react').ReactNode=} content
 */
const DEFAULT_CARDS = [
    { id: '1', icon: Github, title: 'GitHub', description: 'Code repository' },
    { id: '2', icon: Code, title: 'Code', description: 'Development tools' },
    { id: '3', icon: Dices, title: 'Games', description: 'Interactive projects' },
];
const DEFAULT_ICONS = [Github, Code, Dices, Terminal, Settings, Heart, Star, Zap, Trophy, Shield];
/**
 * @param {Object} props
 * @param {Card[]=} props.cards
 * @param {string=} props.className
 * @param {string=} props.cardClassName
 * @param {number=} props.maskRadius
 * @param {number=} props.characterCount
 * @param {string=} props.characterSet
 * @param {number=} props.animationDuration
 * @param {number=} props.borderRadius
 * @param {string=} props.cardGap
 * @param {number=} props.iconSize
 * @param {boolean=} props.enableTouch
 * @param {1|2|3|4=} props.columns
 * @param {number=} props.minHeight
 * @param {(card: Card)=>void=} props.onCardClick
 * @param {(card: Card)=>void=} props.onCardHover
 * @param {boolean=} props.disabled
 * @param {boolean=} props.showBorder
 * @param {"normal"|string=} props.theme
 * @param {string|number|null=} props.aspectRatio
 * @param {boolean=} props.fullScreen
 */
const CodeHoverCards = ({ cards = DEFAULT_CARDS, className, cardClassName, maskRadius = 300, characterCount = 2000, characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', animationDuration = 0.5, borderRadius = 26, cardGap = '1rem', iconSize = 48, enableTouch = true, columns = 3, minHeight = 399, onCardClick, onCardHover, disabled = false, showBorder = true, theme = 'normal', aspectRatio = '1', fullScreen = false, }) => {
    const [mousePositions, setMousePositions] = useState({});
    const [randomTexts, setRandomTexts] = useState({});
    const cardRefs = useRef({});
    const generateRandomString = (length) => {
        return Array.from({ length }, () => characterSet[Math.floor(Math.random() * characterSet.length)]).join('');
    };
    const calcCountForRect = (rect) => {
        // Rough estimate: ~8px font height with leading ~1.1, assume ~6x8 px per char at 10px font
        const area = rect.width * rect.height;
        const perChar = 60; // px^2 per char (tuned to overfill)
        const est = Math.ceil(area / perChar);
        // Bound it
        return Math.max(characterCount, Math.min(est, 300000));
    };
    const handleMouseMove = (e, cardId) => {
        if (disabled)
            return;
        const card = cardRefs.current[cardId];
        if (!card)
            return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePositions(prev => ({ ...prev, [cardId]: { x, y } }));
        const count = calcCountForRect(rect);
        setRandomTexts(prev => ({ ...prev, [cardId]: generateRandomString(count) }));
    };
    const handleTouchMove = (e, cardId) => {
        if (disabled || !enableTouch)
            return;
        const card = cardRefs.current[cardId];
        if (!card)
            return;
        const rect = card.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        setMousePositions(prev => ({ ...prev, [cardId]: { x, y } }));
        const count = calcCountForRect(rect);
        setRandomTexts(prev => ({ ...prev, [cardId]: generateRandomString(count) }));
    };
    const handleCardClick = (card) => {
        if (disabled)
            return;
        if (card.href)
            window.open(card.href, '_blank');
        onCardClick?.(card);
    };
    const handleCardHover = (card) => {
        if (disabled)
            return;
        onCardHover?.(card);
    };
    const getColumnClass = () => {
        const columnMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        };
        return columnMap[columns];
    };
    return (_jsx("div", { className: cn(fullScreen ? 'w-screen h-screen overflow-hidden bg-background text-foreground min-h-0' : 'w-full flex items-center justify-center px-0 py-4 bg-background text-foreground', className), children: _jsx("div", { className: cn(fullScreen ? 'w-full h-full min-h-0' : 'container mx-auto'), children: _jsx("div", { className: cn('grid', getColumnClass(), fullScreen && 'w-full h-full min-h-0 grid-rows-1 auto-rows-fr'), style: { gap: cardGap }, children: cards.map((card) => {
                    const IconComponent = card.icon;
                    const position = mousePositions[card.id] || { x: 0, y: 0 };
                    const randomText = randomTexts[card.id] || '';
                    return (_jsxs("div", { className: cn('group relative w-full', disabled && 'pointer-events-none opacity-50', cardClassName, fullScreen && 'h-full min-h-0'), children: [_jsxs("div", { ref: (el) => { cardRefs.current[card.id] = el; }, className: cn('relative w-full h-full min-h-0 flex items-start md:items-center justify-center pt-8 md:pt-0 overflow-hidden cursor-none transition-all duration-200', !fullScreen && 'hover:scale-105 active:scale-95', showBorder && 'border'), style: {
                                    borderRadius: borderRadius + 'px',
                                    ...(fullScreen ? { width: '100%', height: '100%' } : { minHeight: minHeight + 'px', ...(aspectRatio == null ? {} : { aspectRatio: String(aspectRatio) }) }),
                                }, onMouseMove: (e) => handleMouseMove(e, card.id), onTouchMove: enableTouch ? (e) => handleTouchMove(e, card.id) : undefined, onClick: () => handleCardClick(card), onMouseEnter: () => handleCardHover(card), children: [_jsx("div", { className: "relative z-10 text-foreground", children: card.content
                                        ? card.content
                                        : (IconComponent && _jsx(IconComponent, { size: iconSize, className: "transition-transform duration-200 group-hover:scale-110" })) }), _jsx("div", { className: "absolute inset-0 pointer-events-none z-[5]" }), _jsx("div", { className: cn("absolute inset-0 w-full h-full p-4 font-mono text-[10px] leading-[1.1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden break-all text-foreground"), style: {
                                            WebkitMaskImage: 'radial-gradient(' +
                                                maskRadius +
                                                'px circle at ' +
                                                position.x +
                                                'px ' +
                                                position.y +
                                                'px, #000 20%, rgba(0, 0, 0, 0.25), transparent)',
                                            maskImage: 'radial-gradient(' +
                                                maskRadius +
                                                'px circle at ' +
                                                position.x +
                                                'px ' +
                                                position.y +
                                                "px, #000 20%, rgba(0, 0, 0, 0.25), transparent)",
                                            transform: 'scale(1.025)',
                                            transitionDuration: animationDuration + 's',
                                        }, children: randomText })] }), (card.title || card.description) && (_jsxs("div", { className: "mt-4 text-center", children: [card.title && (_jsx("h3", { className: "text-lg font-semibold text-foreground", children: card.title })), card.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: card.description }))] }))] }, card.id));
                }) }) }) }));
};
export default CodeHoverCards;

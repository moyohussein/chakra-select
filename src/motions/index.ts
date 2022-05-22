export const grow = {
    initial:{ opacity: 0, scale: 0 },
    animate:{ opacity: 1, scale: 1 },
    exit:{ opacity: 0 }
};
export const rotate = {
    initial:{ opacity: 0, rotate: 360, scale: 0 },
    animate:{ opacity: 1, scale: 1, rotate: 0 },
    exit:{ opacity: 0, rotate: 360, scale: 0 }
};
export const collapse = {
    initial:{ opacity: 0, scaleY: 0 },
    animate:{ opacity: 1, scaleY: 1 },
    exit:{ opacity: 0, scaleY: 0 }  
};
export const fade = {
    initial:{ opacity: 0 },
    animate:{ opacity: 1 },
    exit:{ opacity: 0 }  
};
export const fadeUp = {
    initial:{ opacity: 0, y: 50 },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, y: 50 }  
};
export const slideLeft = {
    initial:{ x: `-100%` },
    animate:{ x: 0 },
    exit:{ x: `-100%` }
};
export const slideRight = {
    initial:{ x: `100%` },
    animate:{ x: 0 },
    exit:{ x: `100%` }
};
export const slideUp = {
    initial:{ y: `-100%` },
    animate:{ y: 0 },
    exit:{ y: `-100%` }
};
export const slideDown = {
    initial:{ y: `100%` },
    animate:{ y: 0 },
    exit:{ y: `100%` }
};
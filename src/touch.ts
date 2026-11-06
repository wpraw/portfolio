// ten sam warunek co wariant `touch` w index.css
export const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
export const MOUSE_QUERY = "not all and (hover: none) and (pointer: coarse)";

export const isTouch = () => window.matchMedia(TOUCH_QUERY).matches;

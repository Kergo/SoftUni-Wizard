const removeEl = e => e.parentElement.removeChild(e);

const isCol = (f, s) =>
    !(f.y > s.y - s.h ||
     f.y - f.h < s.y ||
     f.x + f.w < s.x ||
     f.x > s.x + s.w);
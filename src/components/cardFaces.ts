// proporcje karty "portrait" z Lanyard (1.6 × 2.25) przy jej szerokości tekstury 1024 px
const W = 1024;
const H = 1440;
// górny pas zostaw wolny — Lanyard wycina tam otwór na klips smyczy
const SLOT_ZONE = 150;
const ACCENT = "#7ea1e8";

const FONTS = ['700 100px "Space Grotesk"', '600 40px "JetBrains Mono"', '700 80px "Caveat"'];

type Palette = ReturnType<typeof palette>;

export interface CardFaces {
  front: string;
  back: string;
  strap: string;
}

export interface CardFacesInput {
  photo?: string;
  label: string;
  name: string;
  role: string;
  location: string;
  email: string;
  strap: string;
}

const color = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const palette = () => ({
  navy: color("--color-navy", "#05172f"),
  slate: color("--color-slate", "#2d3c4c"),
  royal: color("--color-royal", "#05207f"),
  paper: color("--color-paper", "#e9e7e1"),
});

const canvas2d = (width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext("2d")!];
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.max(w / image.width, h / image.height);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(image, (image.width - sw) / 2, (image.height - sh) / 2, sw, sh, x, y, w, h);
}

function drawFront(
  { photo, label, name, role }: { photo: HTMLImageElement | null } & Pick<CardFacesInput, "label" | "name" | "role">,
  c: Palette
) {
  const [canvas, ctx] = canvas2d(W, H);
  const stripTop = H - 280;

  if (photo) {
    drawCover(ctx, photo, 0, 0, W, stripTop);
  } else {
    ctx.fillStyle = c.slate;
    ctx.fillRect(0, 0, W, stripTop);
    ctx.strokeStyle = c.paper;
    ctx.globalAlpha = 0.08;
    ctx.lineWidth = 2;
    for (let x = -stripTop; x < W; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, stripTop);
      ctx.lineTo(x + stripTop, 0);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.7;
    ctx.save();
    ctx.translate(W / 2, (SLOT_ZONE + stripTop) / 2);
    ctx.rotate((-6 * Math.PI) / 180);
    ctx.fillStyle = c.paper;
    ctx.font = FONTS[2];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = c.navy;
  ctx.fillRect(0, stripTop, W, H - stripTop);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, stripTop, W, 8);
  ctx.fillStyle = c.paper;
  ctx.font = '700 76px "Space Grotesk"';
  ctx.letterSpacing = "-1px";
  ctx.fillText(name.toUpperCase(), 72, stripTop + 130);
  ctx.globalAlpha = 0.6;
  ctx.font = '600 28px "JetBrains Mono"';
  ctx.letterSpacing = "8px";
  ctx.fillText(role.toUpperCase(), 72, stripTop + 200);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/png");
}

function drawBack({ name, role, location, email }: Pick<CardFacesInput, "name" | "role" | "location" | "email">, c: Palette) {
  const [canvas, ctx] = canvas2d(W, H);
  const left = 88;

  ctx.fillStyle = c.navy;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = c.paper;
  ctx.globalAlpha = 0.04;
  ctx.lineWidth = 2;
  for (let x = 64; x < W; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, SLOT_ZONE);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = ACCENT;
  ctx.font = '600 26px "JetBrains Mono"';
  ctx.letterSpacing = "10px";
  ctx.fillText("ID · 001", left, SLOT_ZONE + 130);

  ctx.fillStyle = c.paper;
  ctx.font = '700 132px "Space Grotesk"';
  ctx.letterSpacing = "-3px";
  name
    .toUpperCase()
    .split(" ")
    .forEach((part, i) => ctx.fillText(part, left - 6, 560 + i * 128));

  ctx.fillStyle = ACCENT;
  ctx.fillRect(left, 800, 120, 6);

  ctx.fillStyle = c.paper;
  ctx.globalAlpha = 0.7;
  ctx.font = '600 30px "JetBrains Mono"';
  ctx.letterSpacing = "9px";
  ctx.fillText(role.toUpperCase(), left, 890);
  ctx.globalAlpha = 0.75;
  ctx.font = '700 72px "Caveat"';
  ctx.letterSpacing = "0px";
  ctx.fillText(location, left, 1000);
  ctx.globalAlpha = 1;

  // "kod kreskowy" — deterministyczny, czysto dekoracyjny
  let x = left;
  let seed = 7;
  while (x < W - left) {
    seed = (seed * 16807) % 2147483647;
    const w = 3 + (seed % 4) * 3;
    ctx.fillStyle = c.paper;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(x, 1150, w, 110);
    x += w + 4 + (seed % 3) * 4;
  }
  ctx.globalAlpha = 0.5;
  ctx.font = '600 24px "JetBrains Mono"';
  ctx.letterSpacing = "4px";
  ctx.fillText(email, left, 1320);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/png");
}

function drawStrap(label: string, c: Palette) {
  // Lanyard kładzie obrazek smyczy wzdłuż taśmy: szerokość = długość, wysokość = szerokość taśmy
  const [canvas, ctx] = canvas2d(1536, 192);
  ctx.fillStyle = c.royal;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c.paper;
  ctx.globalAlpha = 0.85;
  ctx.font = '600 56px "JetBrains Mono"';
  ctx.letterSpacing = "12px";
  ctx.textBaseline = "middle";
  const text = `${label.toUpperCase()}   ·   `;
  const step = ctx.measureText(text).width;
  for (let x = 0; x < canvas.width; x += step) ctx.fillText(text, x, canvas.height / 2);
  return canvas.toDataURL("image/png");
}

export async function buildCardFaces({
  photo,
  label,
  name,
  role,
  location,
  email,
  strap,
}: CardFacesInput): Promise<CardFaces> {
  // przykładowy tekst z polskimi znakami — bez niego przeglądarka pobiera tylko podstawowy zestaw liter
  await Promise.all(FONTS.map((font) => document.fonts.load(font, "AĄĘŁŃÓŚŹŻ").catch(() => null)));
  const c = palette();
  const photoImage = photo ? await loadImage(photo) : null;
  return {
    front: drawFront({ photo: photoImage, label, name, role }, c),
    back: drawBack({ name, role, location, email }, c),
    strap: drawStrap(strap, c),
  };
}

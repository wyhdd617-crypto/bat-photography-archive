from __future__ import annotations

import math
import random
import struct
import zlib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "photos"

IMAGES = [
    ("bat-01.png", 1440, 1860, 101, "street"),
    ("bat-02.png", 1800, 1200, 102, "landscape"),
    ("bat-03.png", 1320, 1760, 103, "portrait"),
    ("bat-04.png", 1800, 1280, 104, "night"),
    ("bat-05.png", 1500, 1500, 105, "experimental"),
    ("bat-06.png", 1700, 1120, 106, "street"),
    ("bat-07.png", 1780, 1180, 107, "landscape"),
    ("bat-08.png", 1360, 1800, 108, "portrait"),
    ("bat-09.png", 1600, 1200, 109, "night"),
    ("bat-10.png", 1600, 1200, 110, "experimental"),
]


def chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def write_png(path: Path, width: int, height: int, pixels: bytearray) -> None:
    raw = bytearray()
    row_len = width
    for y in range(height):
        raw.append(0)
        start = y * row_len
        raw.extend(pixels[start : start + row_len])

    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 0, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(bytes(raw), 6))
        + chunk(b"IEND", b"")
    )
    path.write_bytes(png)


def clamp(value: float) -> int:
    return max(0, min(255, int(value)))


def add_rect(buf: list[list[float]], x0: int, y0: int, x1: int, y1: int, value: float) -> None:
    h = len(buf)
    w = len(buf[0])
    for y in range(max(0, y0), min(h, y1)):
        row = buf[y]
        for x in range(max(0, x0), min(w, x1)):
            row[x] = value


def add_line(buf: list[list[float]], x0: float, y0: float, x1: float, y1: float, value: float, width: int) -> None:
    steps = int(max(abs(x1 - x0), abs(y1 - y0))) + 1
    for i in range(steps):
        t = i / max(1, steps - 1)
        x = int(x0 + (x1 - x0) * t)
        y = int(y0 + (y1 - y0) * t)
        add_rect(buf, x - width, y - width, x + width + 1, y + width + 1, value)


def add_circle(buf: list[list[float]], cx: int, cy: int, radius: int, value: float) -> None:
    h = len(buf)
    w = len(buf[0])
    r2 = radius * radius
    for y in range(max(0, cy - radius), min(h, cy + radius)):
        row = buf[y]
        for x in range(max(0, cx - radius), min(w, cx + radius)):
            if (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2:
                row[x] = value


def base_field(width: int, height: int, rng: random.Random) -> list[list[float]]:
    buf = []
    for y in range(height):
        yn = y / height
        row = []
        for x in range(width):
            xn = x / width
            v = 18 + 30 * (1 - yn) + 8 * math.sin((xn * 6.5 + yn * 4.0) * math.pi)
            v += rng.uniform(-12, 12)
            row.append(v)
        buf.append(row)
    return buf


def draw_city(buf: list[list[float]], rng: random.Random, mode: str) -> None:
    h = len(buf)
    w = len(buf[0])
    horizon = int(h * rng.uniform(0.34, 0.68))

    if mode in {"street", "night"}:
        add_line(buf, w * 0.18, h, w * 0.48, horizon, 58, max(2, w // 280))
        add_line(buf, w * 0.82, h, w * 0.55, horizon, 66, max(2, w // 280))
        for _ in range(18):
            x = rng.randint(-w // 10, w)
            bw = rng.randint(w // 22, w // 7)
            top = rng.randint(h // 18, int(h * 0.62))
            shade = rng.choice([5, 9, 14, 22, 190])
            add_rect(buf, x, top, x + bw, h, shade)
            for _ in range(rng.randint(2, 8)):
                wx = x + rng.randint(4, max(6, bw - 6))
                wy = rng.randint(top + 10, h - 12)
                add_rect(buf, wx, wy, wx + rng.randint(2, 12), wy + rng.randint(2, 20), rng.choice([28, 150, 220]))

    if mode == "portrait":
        cx = int(w * rng.uniform(0.38, 0.62))
        cy = int(h * rng.uniform(0.32, 0.45))
        head = int(min(w, h) * 0.12)
        add_circle(buf, cx, cy, head, 156)
        add_rect(buf, cx - head, cy + head // 2, cx + head, int(h * 0.86), 34)
        add_rect(buf, cx - head // 2, cy - head // 3, cx + head // 2, cy + head // 7, 25)
        add_line(buf, 0, int(h * 0.75), w, int(h * 0.68), 210, max(1, w // 330))
        for _ in range(6):
            add_rect(
                buf,
                rng.randint(0, w - 1),
                rng.randint(0, h - 1),
                rng.randint(w // 2, w + w // 3),
                rng.randint(0, h - 1),
                rng.choice([12, 44, 178]),
            )

    if mode == "landscape":
        for i in range(7):
            y = int(h * (0.2 + i * 0.09 + rng.uniform(-0.02, 0.02)))
            add_line(buf, -w * 0.1, y, w * 1.1, y + rng.randint(-60, 60), rng.choice([24, 48, 184]), max(2, h // 260))
        add_rect(buf, 0, int(h * 0.72), w, h, 20)
        for _ in range(12):
            add_circle(buf, rng.randint(0, w), rng.randint(0, h // 2), rng.randint(6, 30), rng.choice([100, 210]))

    if mode == "experimental":
        for _ in range(26):
            x0 = rng.randint(-w // 4, w)
            y0 = rng.randint(-h // 4, h)
            x1 = x0 + rng.randint(w // 12, w // 2)
            y1 = y0 + rng.randint(h // 90, h // 10)
            add_rect(buf, x0, y0, x1, y1, rng.choice([0, 16, 48, 184, 230]))
        for _ in range(10):
            add_line(buf, rng.randint(0, w), 0, rng.randint(0, w), h, rng.choice([16, 210]), rng.randint(1, 8))

    for _ in range(4):
        add_line(
            buf,
            rng.randint(-w // 4, w),
            rng.randint(0, h),
            rng.randint(0, w + w // 4),
            rng.randint(0, h),
            rng.choice([8, 230]),
            rng.randint(1, max(2, w // 260)),
        )


def process(buf: list[list[float]], rng: random.Random) -> bytearray:
    h = len(buf)
    w = len(buf[0])
    pixels = bytearray(w * h)
    vignette_power = rng.uniform(1.2, 1.8)

    for y, row in enumerate(buf):
        yn = (y / h - 0.5) * 2
        for x, value in enumerate(row):
            xn = (x / w - 0.5) * 2
            vignette = max(0.38, 1 - (abs(xn) ** 2.2 + abs(yn) ** 2.2) * 0.32 * vignette_power)
            grain = rng.gauss(0, 24)
            scratch = 34 if rng.random() < 0.00075 else 0
            dust = -90 if rng.random() < 0.00055 else 0
            v = (value * vignette) + grain + scratch + dust
            v = 255 / (1 + math.exp(-(v - 118) / 23))
            if rng.random() < 0.004:
                v = rng.choice([0, 245])

            out = clamp(v)
            pixels[y * w + x] = out

    return pixels


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, width, height, seed, mode in IMAGES:
        rng = random.Random(seed)
        buf = base_field(width, height, rng)
        draw_city(buf, rng, mode)
        pixels = process(buf, rng)
        write_png(OUT / name, width, height, pixels)
        print(f"created {OUT / name}")


if __name__ == "__main__":
    main()

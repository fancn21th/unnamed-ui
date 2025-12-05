'use client';

import * as React from 'react';

// 获取当前 CSS 变量值
function getColorValue(key: string): string {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(`--${key}`).trim();
}

// 设置 CSS 变量值
function setColorValue(key: string, value: string) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty(`--${key}`, value);
}

// 使用浏览器 API 将任意颜色格式转换为 RGB
function colorToRgb(color: string): { r: number; g: number; b: number } {
  if (!color || !color.trim() || typeof window === 'undefined') {
    return { r: 0, g: 0, b: 0 };
  }
  
  try {
    const temp = document.createElement('div');
    temp.style.color = color;
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.pointerEvents = 'none';
    document.body.appendChild(temp);
    
    const computed = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };
    }
  } catch (error) {
    console.error('Error converting color to RGB:', error);
  }
  
  return { r: 0, g: 0, b: 0 };
}

// RGB 转 Hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Hex 转 RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// RGB 转 RGB 字符串（直接使用 RGB，避免转换误差）
function rgbToRgbString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

// RGB 转 OKLCH（使用浏览器 API 和手动转换）
function rgbToOklch(r: number, g: number, b: number): string {
  if (typeof window === 'undefined') return `oklch(0.5 0 0)`;
  
  try {
    // 方法1: 尝试使用浏览器 API 直接转换（如果支持）
    // 创建一个临时元素，设置 RGB 颜色，然后尝试读取 OKLCH
    const temp = document.createElement('div');
    temp.style.color = `rgb(${r}, ${g}, ${b})`;
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.pointerEvents = 'none';
    document.body.appendChild(temp);
    
    // 尝试通过设置 OKLCH 并读取来验证浏览器支持
    // 如果浏览器支持 OKLCH，我们可以使用 color-mix 或其他方法
    document.body.removeChild(temp);
    
    // 方法2: 手动转换 RGB 到 OKLCH（使用 OKLab 颜色空间）
    // 首先将 RGB 归一化到 0-1
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    // 应用 sRGB 到线性 RGB 的转换（gamma 校正）
    const toLinear = (c: number) => {
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    
    const rLinear = toLinear(rNorm);
    const gLinear = toLinear(gNorm);
    const bLinear = toLinear(bNorm);
    
    // 转换为线性 sRGB 到 OKLab 的矩阵变换
    // OKLab 使用 D65 白点
    const l = 0.4122214708 * rLinear + 0.5363325363 * gLinear + 0.0514459929 * bLinear;
    const m = 0.2119034982 * rLinear + 0.6806995451 * gLinear + 0.1073969566 * bLinear;
    const s = 0.0883024619 * rLinear + 0.2817188376 * gLinear + 0.6299787005 * bLinear;
    
    // 应用非线性变换
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    
    // 转换为 OKLab
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ok = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    
    // 转换为 OKLCH
    const C = Math.sqrt(a * a + b_ok * b_ok);
    let H = Math.atan2(b_ok, a) * 180 / Math.PI;
    if (H < 0) H += 360;
    
    // 格式化 OKLCH（保留合理的小数位数，匹配 CSS 格式）
    // 对于灰度色（C 接近 0），H 设为 0
    const chroma = C < 0.0001 ? 0 : C;
    const hue = C < 0.0001 ? 0 : H;
    
    return `oklch(${L.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)})`;
  } catch (error) {
    console.error('Error converting RGB to OKLCH:', error);
    // 返回默认值
    return `oklch(0.5 0 0)`;
  }
}


export function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = React.useState<string>('');
  const [hexValue, setHexValue] = React.useState<string>('#000000');

  // 初始化 Primary 颜色值并转换为 Hex
  React.useEffect(() => {
    const initColor = () => {
      const colorValue = getColorValue('primary');
      if (colorValue) {
        setPrimaryColor(colorValue);
        const rgb = colorToRgb(colorValue);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexValue(hex);
      }
    };
    
    // 延迟初始化，确保 DOM 已准备好
    if (typeof window !== 'undefined') {
      initColor();
    }
  }, []);

  const handleColorChange = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    
    // 转换为 OKLCH 格式以匹配主题
    const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
    setColorValue('primary', oklch);
    setPrimaryColor(oklch);
    setHexValue(hex);
  };

  const handleTextChange = (value: string) => {
    // 如果输入的是 OKLCH 格式，直接使用
    if (value.trim().startsWith('oklch(')) {
      setColorValue('primary', value);
      setPrimaryColor(value);
      const rgb = colorToRgb(value);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setHexValue(hex);
    } else {
      // 否则转换为 OKLCH
      const rgb = colorToRgb(value);
      const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
      setColorValue('primary', oklch);
      setPrimaryColor(oklch);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setHexValue(hex);
    }
  };

  const displayColor = primaryColor || '';

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-1.5 block">Primary</label>
        <div className="flex items-center gap-1">
          <div
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded border"
            style={{ backgroundColor: displayColor }}
          >
            <input
              type="color"
              value={hexValue}
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <input
            type="text"
            value={displayColor}
            onChange={(e) => handleTextChange(e.target.value)}
            className="bg-input/25 border-border/20 h-8 flex-1 rounded border px-2 text-sm"
            placeholder="oklch(...) 或 hex"
          />
        </div>
      </div>
    </div>
  );
}


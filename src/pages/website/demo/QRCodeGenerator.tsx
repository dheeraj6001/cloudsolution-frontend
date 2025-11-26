import React, { useState, useRef } from 'react';
import { QrCode, Link, Mail, Type, Download, Palette, Maximize2 } from 'lucide-react';

type ContentType = "text" | "url" | "email";

interface ContentTypeOption {
  id: ContentType;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

export default function QRCodeGenerator() {
  const [contentType, setContentType] = useState<ContentType>("text");
  const [textContent, setTextContent] = useState<string>("");
  const [urlContent, setUrlContent] = useState<string>("");
  const [emailContent, setEmailContent] = useState<string>("");
  const [size, setSize] = useState<number>(256);
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const contentTypes: ContentTypeOption[] = [
    { id: "text", label: "Text", icon: Type },
    { id: "url", label: "URL", icon: Link },
    { id: "email", label: "Email", icon: Mail },
  ];

  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const shouldFillModule = (i: number, j: number, hash: number): boolean => {
    if ((i < 7 && j < 7) || (i > 17 && j < 7) || (i < 7 && j > 17)) {
      return false;
    }
    const seed = (hash + i * 31 + j * 17) % 100;
    return seed > 40;
  };

  const drawPositioningPattern = (
    ctx: CanvasRenderingContext2D,
    moduleSize: number,
    x: number,
    y: number,
    fgColor: string,
    bgColor: string
  ) => {
    ctx.fillStyle = fgColor;
    ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = fgColor;
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
  };

  const generateQRCode = () => {
    let content = "";

    if (contentType === "text") content = textContent;
    if (contentType === "url") content = urlContent;
    if (contentType === "email") content = `mailto:${emailContent}`;

    if (!content) {
      alert("Please enter some content!");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const moduleSize = size / 25;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = fgColor;
    const hash = simpleHash(content);

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (shouldFillModule(i, j, hash)) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    drawPositioningPattern(ctx, moduleSize, 0, 0, fgColor, bgColor);
    drawPositioningPattern(ctx, moduleSize, 18 * moduleSize, 0, fgColor, bgColor);
    drawPositioningPattern(ctx, moduleSize, 0, 18 * moduleSize, fgColor, bgColor);

    setQrGenerated(true);
  };

  const downloadQR = () => {
    if (!qrGenerated) {
      alert("Please generate a QR code first!");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");

    a.href = url;
    a.download = "qrcode.png";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12 text-white text-center">
            <div className="flex justify-center mb-4">
              <QrCode size={64} strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">QR Code Generator</h1>
            <p className="text-lg md:text-xl opacity-90">Create custom QR codes in seconds</p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Type Selector */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all font-semibold flex flex-col items-center gap-2 ${
                      contentType === type.id
                        ? "border-purple-600 bg-purple-600 text-white shadow-lg transform scale-105"
                        : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-sm md:text-base">{type.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {contentType === "text" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter Text
                    </label>
                    <textarea
                      value={textContent}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setTextContent(e.target.value)
                      }
                      placeholder="Type your text here..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
                    />
                  </div>
                )}

                {contentType === "url" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={urlContent}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUrlContent(e.target.value)
                      }
                      placeholder="https://example.com"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>
                )}

                {contentType === "email" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailContent}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmailContent(e.target.value)
                      }
                      placeholder="email@example.com"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>
                )}

                {/* Size Control */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Maximize2 size={16} className="inline mr-2" />
                    QR Code Size
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={128}
                      max={512}
                      step={32}
                      value={size}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSize(Number(e.target.value))
                      }
                      className="flex-1 h-2 bg-gray-200 rounded-lg cursor-pointer accent-purple-600"
                    />
                    <span className="text-lg font-bold text-purple-600 min-w-[70px]">
                      {size}px
                    </span>
                  </div>
                </div>

                {/* Color Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Palette size={16} className="inline mr-2" />
                      Foreground
                    </label>
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFgColor(e.target.value)
                      }
                      className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Palette size={16} className="inline mr-2" />
                      Background
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBgColor(e.target.value)
                      }
                      className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={generateQRCode}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Generate QR Code
                  </button>
                  <button
                    onClick={downloadQR}
                    disabled={!qrGenerated}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                      qrGenerated
                        ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-xl hover:scale-105"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Download size={20} />
                    Download
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex justify-center items-center">
                <div className="w-full bg-gray-50 rounded-2xl p-8 border-4 border-dashed border-gray-300">
                  {!qrGenerated ? (
                    <div className="flex flex-col items-center text-gray-400" style={{ minHeight: "300px" }}>
                      <QrCode size={80} className="mb-4 opacity-30" />
                      <p className="text-lg">Your QR code will appear here</p>
                      <p className="text-sm mt-2">Fill in the details and click Generate</p>
                    </div>
                  ) : (
                    <canvas
                      ref={canvasRef}
                      className="rounded-2xl shadow-xl"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white opacity-75">
          <p className="text-sm">
            Create beautiful QR codes for your business, events, or personal use
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { generateqrcode } from '@/services/website/qrcode';
import { QrResponse } from '@/types/interface';

const QrcodeGenerator = () => {
  const [link, setLink] = useState("");
  const [svg, setSvg] = useState<QrResponse | null>(null);


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { link,title:'Exam' };
      const res = await generateqrcode(payload);
      setSvg(res.data);
    } catch (error) {
      alert("Saving failed!");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="mb-4">
        <h3 className="text-4xl text-center">QR Code Generator</h3>
        <p className=" text-center">create your qrcode for free</p>
      </div>

      <div className="grid grid-cols-2 bg-white mb-8 pb-8 pt-8">
        <div className="p-4">
           <div>
           <p className="mb-2">Past link here with http or https</p>
           <form onSubmit={handleSubmitForm} className="flex items-center gap-3">
              <input
                type="text"
                name="link"
                placeholder="website list with http or https"
                className="border px-3 py-2 rounded w-full"
                onChange={(e) => setLink(e.target.value)}
              />

              <button
                type="submit"
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 whitespace-nowrap"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-8 p-4">
            A QR code is a square, scannable graphic made of black-and-white patterns that encode information like links, text, IDs, or contact details. When someone points their phone camera at it, the device instantly reads the data and opens the intended action, usually a website. It's basically a fast, touch-free shortcut that replaces typing.
          </div>
        </div>
        <div className="">
          {svg && (
        <>
        <div
          className="mt-6 p-4 inline-block border rounded"
          dangerouslySetInnerHTML={{ __html: svg.qrcode }}
        />
        <div><p>{svg.title}</p></div>
        </>

      )}
        </div>
      </div>

      <div className="bg-white p-4 mb-8">
        <h2 className="text-4xl text-center">A Complete Overview of QR Codes</h2>
        <p className="mb-2">A QR code is a type of two dimensional barcode designed to store information in a way that’s both compact and incredibly easy for digital devices to read. Instead of the traditional one dimensional bars you see on product packaging, a QR code uses a grid of black and white squares arranged in unique patterns. These patterns can hold a surprisingly large amount of data, from web links and text to payment information, WiFi credentials, app download links, and more.</p>

<p className="mb-2">What makes QR codes so useful is the speed and convenience. A smartphone camera or scanning app can read one almost instantly, even if the code is small, slightly damaged, or viewed at an angle. Once scanned, the code triggers an action on your device such as opening a webpage, adding a contact, joining a WiFi network, or launching a payment screen. This makes QR codes a go to tool in modern digital interactions where you want people to access information quickly without typing, tapping menus, or searching.</p>

<p className="mb-2">They’re widely used in marketing, event tickets, restaurant menus, product authentication, logistics, and touch free transactions. Because they’re simple to generate, easy to print, and effortless to scan, QR codes have become a universal bridge between the physical world and digital content.</p>
      </div>
    

      
    </div>
  );
};

export default QrcodeGenerator;

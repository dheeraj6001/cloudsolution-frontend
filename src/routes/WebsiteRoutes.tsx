import { Route } from 'react-router-dom';
import WebsiteLayout from '../layouts/website/WebsiteLayout';
import Home from '../pages/website/Home';
import AboutUs from '../pages/website/About';
import Features from '../pages/website/Features';
import ContactUs from '../pages/website/ContactUs';
import QrcodeGenerator from '../pages/website/QrcodeGenerator';
import ZohoBooksDashboard from '../pages/website/demo/ZohoBooksDashboard';
import QRCodeGeneratorDesgin from '../pages/website/demo/QRCodeGenerator';
import QuestionBankForm from '../pages/website/demo/QuestionBankForm';
import DailyNewsPage from '../pages/website/demo/DailyNewsPage';
import ExamRankers from '../pages/website/demo/ExamRankers';


import QRBlogThumbnail from '../pages/website/psofts/Home';




const WebsiteRoutes: Record<string, React.ReactNode> = {

  theme1: (
    <>
      <Route path="/" element={<ExamRankers />} />
      <Route path="/about" element={<Home />} />
    </>
  ),

  vendor2: (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
    </>
  ),

  psofts: (
    <>
      <Route path="/" element={<QRBlogThumbnail />} />
      <Route path="/qr-code-generator" element={<QrcodeGenerator />} />
    </>
  ),

  default: (
    <>
       <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/qrcode-generator" element={<QRCodeGeneratorDesgin />} />
          <Route path="/demo/page1" element={<ZohoBooksDashboard />} />
          
          <Route path="/demo/question-bank-form" element={<QuestionBankForm />} />
          <Route path="/demo/daily-news-page" element={<DailyNewsPage />} />
          <Route path="/demo/examranker" element={<ExamRankers />} />
        </Route>
    </>
  ),
};
export default WebsiteRoutes;

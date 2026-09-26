import { ExternalLink, MessageSquareText } from "lucide-react";
const faqs = [
 ["ووٹ کون ڈال سکتا ہے؟","پاکستان کا ہر شہری جس کی عمر 18 سال یا اس سے زیادہ ہو اور جس کا نام انتخابی فہرست میں درج ہو، ووٹ ڈال سکتا ہے۔"],
 ["کیا خواتین ووٹ ڈال سکتی ہیں؟","جی ہاں، خواتین کو ووٹ ڈالنے کا مکمل حق حاصل ہے۔"],
 ["کیا معذور افراد ووٹ ڈال سکتے ہیں؟","جی ہاں، معذور افراد بھی اپنا ووٹ ڈال سکتے ہیں اور انہیں انتخابی عمل میں حصہ لینے کا حق حاصل ہے۔"],
 ["ووٹ ڈالنے کے لیے کیا ضروری ہے؟","ووٹ ڈالنے کے لیے اصل شناختی کارڈ (CNIC) ضروری ہے۔"],
 ["کیا شناختی کارڈ کی فوٹو کاپی سے ووٹ ڈالا جا سکتا ہے؟","نہیں، ووٹ ڈالنے کے لیے اصل شناختی کارڈ ضروری ہے۔"],
 ["اپنا ووٹ کیسے چیک کیا جا سکتا ہے؟","اپنا 13 ہندسوں کا شناختی کارڈ نمبر 8300 پر SMS کرکے ووٹ کے اندراج کی معلومات حاصل کی جا سکتی ہیں۔"],
 ["ووٹ کہاں ڈالا جاتا ہے؟","ووٹ اپنے مقررہ پولنگ اسٹیشن پر ڈالا جاتا ہے۔"],
 ["کیا ووٹ گھر بیٹھے ڈالا جا سکتا ہے؟","عام طور پر ووٹ پولنگ اسٹیشن پر ہی ڈالا جاتا ہے۔ قانون کے تحت مخصوص افراد کے لیے پوسٹل بیلٹ کی سہولت بھی موجود ہے۔"],
 ["کیا ووٹ ڈالنا ضروری ہے؟","ووٹ ڈالنا ہر اہل شہری کا اہم جمہوری حق ہے۔"],
 ["کیا کوئی دوسرا شخص میری جگہ ووٹ ڈال سکتا ہے؟","نہیں، ہر ووٹر اپنا ووٹ خود ڈالتا ہے۔"],
 ["کیا ووٹ خفیہ ہوتا ہے؟","جی ہاں، ووٹ خفیہ ہوتا ہے اور ووٹر کی پسند کو راز میں رکھا جاتا ہے۔"],
 ["کیا خواجہ سرا افراد ووٹ ڈال سکتے ہیں؟","جی ہاں، خواجہ سرا شہری بھی ووٹ ڈال سکتے ہیں، بشرطیکہ وہ قانونی طور پر اہل ہوں اور انتخابی فہرست میں درج ہوں۔"],
 ["اگر کسی کا ووٹ رجسٹرڈ نہ ہو تو کیا کرنا چاہیے؟","ووٹر اپنے ووٹ کے اندراج یا درستگی کے لیے متعلقہ ضلعی الیکشن کمشنر (DEC) کے دفتر سے رابطہ کر سکتا ہے۔"],
 ["کیا ووٹر اپنا ووٹ دوسرے حلقے میں منتقل کروا سکتا ہے؟","جی ہاں، قانون کے مطابق ووٹر اپنا ووٹ ایک انتخابی علاقے سے دوسرے انتخابی علاقے میں منتقل کروا سکتا ہے۔"],
 ["پولنگ اسٹیشن جاتے وقت کیا ساتھ لے جانا چاہیے؟","پولنگ اسٹیشن جاتے وقت اصل شناختی کارڈ ساتھ لے جانا چاہیے۔"],
 ["کیا ووٹ خریدا یا بیچا جا سکتا ہے؟","نہیں، ووٹ خریدنا یا بیچنا قانوناً جرم ہے۔"],
 ["الیکشن کمیشن آف پاکستان کا بنیادی کام کیا ہے؟","الیکشن کمیشن آف پاکستان کا بنیادی کام آزاد، منصفانہ اور شفاف انتخابات کا انعقاد اور انتخابی عمل کی نگرانی کرنا ہے۔"],
];
export default function Knowledge(){return <main id="main-content" className="shell content-wrap"><div className="page-heading"><span className="eyebrow">VOTER GUIDE</span><h1>Learn about voting</h1><p>Start with the essentials, then explore the answers in Urdu from the supplied voter awareness guide.</p></div><div className="info-banner"><MessageSquareText size={28}/><div><strong>Check your voter registration</strong><p>Send your 13-digit CNIC number by SMS to <b>8300</b>. For current instructions, see <a href="https://ecp.gov.pk/" target="_blank" rel="noopener noreferrer">the ECP website</a>.</p></div></div><div className="resource-grid"><div className="resource-card"><span className="eyebrow">BEFORE YOU GO</span><h2>Bring your original CNIC</h2><p>Keep your original identity card with you and go to your assigned polling station. A photocopy is not a substitute.</p></div><div className="resource-card"><span className="eyebrow">OFFICIAL INFORMATION</span><h2>Need to update your vote?</h2><p>For voter registration or correction, contact your District Election Commissioner or check the latest ECP guidance.</p><a href="https://ecp.gov.pk/" target="_blank" rel="noopener noreferrer">Go to ECP <ExternalLink size={16}/></a></div></div><h2 className="language-label">Frequently asked questions / عام سوالات</h2><div className="faq-grid urdu" lang="ur" dir="rtl">{faqs.map(([q,a],i)=><details className="faq-item" key={q} open={i===0}><summary>{i+1}۔ {q}</summary><p>{a}</p></details>)}</div><p className="subtle-note">These answers follow the supplied awareness document. Election arrangements and procedures should always be confirmed through ECP.</p></main>}

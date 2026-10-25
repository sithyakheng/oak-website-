'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'km' | 'en';
const en = {
  shopNow: 'Shop now', duo: 'Get the Duo', addToCart: 'Add to cart', added: 'Added to cart', cart: 'Cart', cartEmpty: 'Your cart is empty',
  heroTitle: 'Hair that holds, without the shine.',
  heroSub: 'Matte hair clay and texture powder made for hot, humid days in Cambodia.',
  hold: 'Hold', shine: 'Shine', volume: 'Volume', remove: 'Remove', checkout: 'Checkout',
  subtotal: 'Subtotal', delivery: 'Delivery', free: 'Free', total: 'Total',
  name: 'Full name', phone: 'Phone number', province: 'Province', address: 'Address', landmark: 'Landmark or map link',
  payment: 'Payment', cod: 'Cash on delivery', khqr: 'KHQR (send us the receipt on Telegram)', placeOrder: 'Place order', sending: 'Sending your order',
  choose: 'Choose a province', errPhone: 'Enter a valid phone number, like 012 345 678.', errGeneral: 'Something went wrong. Try again or message us on Telegram.',
  thanks: 'Thank you for your order', thanksSub: 'We will call you to confirm it.', orderNo: 'Order number', backShop: 'Keep shopping',
  which: 'Which one is for you?', whichClay: 'Hair Clay: strong hold for defined styles.', whichPowder: 'Texture Powder: light hold and extra volume.',
  how: 'How to use', step1: 'Take a small amount and warm it between your palms.', step2: 'Work it through dry hair.', step3: 'Style as you like.',
  contact: 'Contact us', shipNote: 'Delivery across Cambodia. Pay when it arrives.',   from: 'From', deliveryCambodia: 'Delivery across Cambodia', matteFinish: 'Matte finish, made for the heat', save: 'Save',
};
const km: Record<keyof typeof en, string> = {
  shopNow: 'ទិញឥឡូវនេះ', duo: 'ទិញ Duo', addToCart: 'ដាក់ក្នុងកន្ត្រក', added: 'បានដាក់ក្នុងកន្ត្រក', cart: 'កន្ត្រក', cartEmpty: 'កន្ត្រករបស់អ្នកទទេ',
  heroTitle: 'សក់ទប់បានយូរ មិនភ្លឺប្រឡាក់',
  heroSub: 'ផលិតផលធ្វើសក់ សម្រាប់អាកាសធាតុក្តៅ និងសើមនៅកម្ពុជា។',
  hold: 'កម្លាំងទប់', shine: 'ភាពភ្លឺ', volume: 'បរិមាណសក់', remove: 'ដកចេញ', checkout: 'បញ្ជាទិញ',
  subtotal: 'សរុបរង', delivery: 'ដឹកជញ្ជូន', free: 'ឥតគិតថ្លៃ', total: 'សរុប',
  name: 'ឈ្មោះ', phone: 'លេខទូរស័ព្ទ', province: 'ខេត្ត/រាជធានី', address: 'អាសយដ្ឋាន', landmark: 'ចំណុចសម្គាល់ ឬតំណផែនទី',
  payment: 'វិធីបង់ប្រាក់', cod: 'បង់ពេលទទួលទំនិញ', khqr: 'KHQR (ផ្ញើវិក្កយបត្រតាម Telegram)', placeOrder: 'បញ្ជាក់ការបញ្ជាទិញ', sending: 'កំពុងផ្ញើការបញ្ជាទិញ',
  choose: 'ជ្រើសរើសខេត្ត', errPhone: 'សូមបញ្ចូលលេខទូរស័ព្ទឲ្យត្រឹមត្រូវ ដូចជា 012 345 678។', errGeneral: 'មានបញ្ហា សូមព្យាយាមម្តងទៀត ឬផ្ញើសារមកយើងតាម Telegram។',
  thanks: 'អរគុណសម្រាប់ការបញ្ជាទិញ', thanksSub: 'យើងនឹងទូរស័ព្ទទៅបញ្ជាក់ជាមួយអ្នក។', orderNo: 'លេខបញ្ជាទិញ', backShop: 'បន្តទិញទំនិញ',
  which: 'តើអ្នកគួរជ្រើសរើសមួយណា?', whichClay: 'Hair Clay: ទប់ខ្លាំង សម្រាប់ស្ទីលមានរាង។', whichPowder: 'Texture Powder: ទប់ស្រាល ឡើងបរិមាណសក់។',
  how: 'របៀបប្រើ', step1: 'យកបរិមាណតិចតួច ហើយកក់ក្នុងបាតដៃ។', step2: 'លាបលើសក់ស្ងួត។', step3: 'រៀបសក់តាមចិត្ត។',
  contact: 'ទំនាក់ទំនង', shipNote: 'ដឹកជញ្ជូនទូទាំងកម្ពុជា បង់ប្រាក់ពេលទទួលទំនិញ។', from: 'ចាប់ពី',
  deliveryCambodia: 'ដឹកជញ្ជូនទូទាំងប្រទេសកម្ពុជា', matteFinish: 'ម៉ាត់ មិនរលោង សាកសមនឹងអាកាសធាតុក្តៅ', save: 'សន្សំ',
};
export type Key = keyof typeof en;
const D = { en, km };
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({ lang: 'km', setLang: () => {}, t: (k) => en[k] });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('km');
  useEffect(() => { const s = localStorage.getItem('oak-lang'); if (s === 'en' || s === 'km') setLangState(s); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('oak-lang', l); };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => D[lang][k] }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);

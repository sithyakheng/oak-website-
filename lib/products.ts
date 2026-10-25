export type Product = {
  slug: string; name: string; price: number; color: string; size: string;
  hold?: number; shine?: number; volume?: number;
  tagline: { km: string; en: string }; desc: { km: string; en: string };
};

// TODO: set your real prices and the clay weight.
export const PRODUCTS: Product[] = [
  { slug: 'hair-clay', name: 'OAK Hair Clay', price: 12, color: '#CDBFA7', size: '[__ g]', hold: 4, shine: 3,
    tagline: { km: 'ទប់ខ្លាំង ភ្លឺមធ្យម', en: 'Strong hold, medium shine' },
    desc: { km: 'សម្រាប់ស្ទីលមានរាង និងទប់បានយូរពេញមួយថ្ងៃ។', en: 'For defined styles that stay put all day, even in the heat.' } },
  { slug: 'texture-powder', name: 'OAK Texture Powder', price: 9, color: '#E6E0D2', size: '25 g', hold: 2, shine: 0, volume: 4,
    tagline: { km: 'ស្រាល ឡើងបរិមាណសក់ មិនភ្លឺ', en: 'Light hold, extra volume, zero shine' },
    desc: { km: 'រោយបន្តិចលើឫសសក់ ដើម្បីឲ្យសក់ដុះឡើង និងមានវាយនភាព។', en: 'Sprinkle at the roots for lift and texture without any weight.' } },
  { slug: 'duo', name: 'OAK Duo', price: 19, color: '#A59C91', size: '',
    tagline: { km: 'Hair Clay និង Texture Powder ជាមួយគ្នា', en: 'Hair Clay and Texture Powder together' },
    desc: { km: 'ប្រើម្សៅសម្រាប់បរិមាណ ហើយប្រើ Clay សម្រាប់រាង។', en: 'Powder for volume first, clay for shape on top.' } },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

// TODO: set real delivery prices (USD).
export const DELIVERY = { phnomPenh: 1.5, province: 3, freeOver: 30 };
export const deliveryFee = (province: string, subtotal: number) =>
  subtotal >= DELIVERY.freeOver ? 0 : province === 'Phnom Penh' ? DELIVERY.phnomPenh : DELIVERY.province;

export const PROVINCES: { en: string; km: string }[] = [
  ['Phnom Penh','ភ្នំពេញ'],['Banteay Meanchey','បន្ទាយមានជ័យ'],['Battambang','បាត់ដំបង'],['Kampong Cham','កំពង់ចាម'],
  ['Kampong Chhnang','កំពង់ឆ្នាំង'],['Kampong Speu','កំពង់ស្ពឺ'],['Kampong Thom','កំពង់ធំ'],['Kampot','កំពត'],['Kandal','កណ្ដាល'],
  ['Kep','កែប'],['Koh Kong','កោះកុង'],['Kratie','ក្រចេះ'],['Mondulkiri','មណ្ឌលគិរី'],['Oddar Meanchey','ឧត្តរមានជ័យ'],['Pailin','ប៉ៃលិន'],
  ['Preah Sihanouk','ព្រះសីហនុ'],['Preah Vihear','ព្រះវិហារ'],['Prey Veng','ព្រៃវែង'],['Pursat','ពោធិ៍សាត់'],['Ratanakiri','រតនគិរី'],
  ['Siem Reap','សៀមរាប'],['Stung Treng','ស្ទឹងត្រែង'],['Svay Rieng','ស្វាយរៀង'],['Takeo','តាកែវ'],['Tboung Khmum','ត្បូងឃ្មុំ'],
].map(([en, km]) => ({ en, km }));

// Official Public Contact Details for Mi Udyojak Honarach
export const PUBLIC_CONTACT: {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
} = {
  phone: '+91 74001 19436',
  email: 'miudyojakhonarch@gmail.com',
  whatsapp: '7400119436',
};

export function whatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!/^[1-9]\d{9,14}$/.test(digits)) return undefined;
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent('नमस्कार, मला ‘मी उद्योजक होणारच’ उपक्रमाबद्दल अधिक माहिती हवी आहे.');
}

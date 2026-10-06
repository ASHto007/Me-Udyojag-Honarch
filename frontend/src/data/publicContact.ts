// Public details must be supplied and approved separately from the private notification inbox.
export const PUBLIC_CONTACT: {
  phone?: string; email?: string; address?: string; whatsapp?: string;
  instagram?: string; facebook?: string; youtube?: string; linkedin?: string;
  privacyPolicyUrl?: string; termsUrl?: string;
} = {};

export function whatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!/^[1-9]\d{9,14}$/.test(digits)) return undefined;
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent('नमस्कार, मला ‘मी उद्योजक होणारच’ उपक्रमाबद्दल अधिक माहिती हवी आहे.');
}

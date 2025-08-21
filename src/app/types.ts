export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface WhatsAppData {
  countryCode: string;
  phoneNumber: string;
  message: string;
}

export interface WhatsAppLink {
  url: string;
  displayUrl: string;
  isValid: boolean;
}

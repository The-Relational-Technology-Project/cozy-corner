import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh-CN' | 'zh-HK';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.prep': 'Prep',
    'nav.party': 'Party',
    'nav.coupons': 'Coupons',
    'nav.contact': 'Contact',
    
    // PrepTogether page
    'prep.title': 'Prep Together',
    'prep.subtitle': 'Stay Safe, Stay Connected',
    'prep.welcome': 'Earthquakes and tsunamis are real risks in our neighborhood. By preparing together, we can protect each other.',
    'prep.signup.button': 'Sign Up for a Post-Disaster Check-In Ã¢ÂÂ¤Ã¯Â¸Â',
    'prep.risks.title': 'Know Our Risks',
    'prep.earthquake.title': 'Earthquake Risks',
    'prep.earthquake.description': 'The Sunset sits on sandy soil that can act like quicksand in a quake. Experts say there\'s a 72% chance of a major earthquake (M6.7+) in the Bay Area by 2043.',
    'prep.earthquake.action': 'What you can do now:',
    'prep.tsunami.title': 'Tsunami Risks',
    'prep.tsunami.description': 'Outer Sunset is in a tsunami hazard zone. In a worst-case quake offshore, waves could reach 20Ã¢ÂÂ30 feet and flood up to 46th Avenue.',
    'prep.tsunami.action': 'What you can do now:',
    'prep.neighbors.title': 'Neighbors Helping Neighbors',
    'prep.neighbors.subtitle': 'Connection is Preparedness',
    'prep.neighbors.description': 'Neighbors are the true first responders. Checking on each other saves lives. Together, we can make sure no one is left isolated.',
    'prep.neighbors.connect': 'Ways to connect:',
    'prep.form.title': 'Request a Post-Disaster Check-In',
    'prep.form.subtitle': 'Do you live alone, have limited mobility, or care for someone who might need extra help? Let your neighbors know.',
    'prep.form.description': 'Fill out this form so Cozy Corner volunteers can check on you after an emergency. Your info will stay private.',
    'prep.form.onbehalf': 'I\'m completing this form on behalf of someone else',
    'prep.form.onbehalf.consent': '(who has given consent)',
    'prep.form.name': 'Name',
    'prep.form.name.optional': '(Optional)',
    'prep.form.address': 'Address',
    'prep.form.contact': 'Preferred Contact',
    'prep.form.contact.optional': '(Optional)',
    'prep.form.contact.placeholder': 'Phone, email, WeChat, etc.',
    'prep.form.vulnerable_count': 'Number of people needing check-ins',
    'prep.form.people': 'people',
    'prep.form.person': 'person',
    'prep.form.specific_needs': 'Any specific needs?',
    'prep.form.specific_needs.optional': '(Optional)',
    'prep.form.specific_needs.placeholder': 'Wheelchair access, medical devices, language support, etc.',
    'prep.form.privacy': 'Ã°ÂÂÂ Your information will never be public. Only Cozy Corner volunteers will use it to check on you.',
    'prep.form.submit': 'Submit',
    'prep.form.submitting': 'Submitting...',
    'prep.form.success.title': 'Thank You!',
    'prep.form.success.message': 'We\'ll check on you if a disaster hits. Stay safe Ã¢ÂÂ and check on your neighbors too!',
    'prep.form.success.another': 'Submit Another Request',
  },
  'zh-CN': {
    // Navigation
    'nav.home': 'Ã¤Â¸Â»Ã©Â¡Âµ',
    'nav.prep': 'Ã¥ÂÂÃ¥Â¤Â',
    'nav.party': 'Ã¦Â´Â¾Ã¥Â¯Â¹',
    'nav.coupons': 'Ã¤Â¼ÂÃ¦ÂÂ Ã¥ÂÂ¸',
    'nav.contact': 'Ã¨ÂÂÃ§Â³Â»',
    
    // PrepTogether page
    'prep.title': 'Ã¥ÂÂ±Ã¥ÂÂÃ¥ÂÂÃ¥Â¤Â',
    'prep.subtitle': 'Ã¥Â®ÂÃ¥ÂÂ¨Ã§ÂÂ¸Ã¥Â®ÂÃ¯Â¼ÂÃ¥Â®ÂÃ¦ÂÂÃ§ÂÂ¸Ã¥ÂÂ©',
    'prep.welcome': 'Ã¥ÂÂ°Ã©ÂÂÃ¥ÂÂÃ¦ÂµÂ·Ã¥ÂÂ¸Ã¦ÂÂ¯Ã¦ÂÂÃ¤Â»Â¬Ã§Â¤Â¾Ã¥ÂÂºÃ§ÂÂÃ§ÂÂÃ¥Â®ÂÃ©Â£ÂÃ©ÂÂ©Ã£ÂÂÃ©ÂÂÃ¨Â¿ÂÃ¥ÂÂ±Ã¥ÂÂÃ¥ÂÂÃ¥Â¤ÂÃ¯Â¼ÂÃ¦ÂÂÃ¤Â»Â¬Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤ÂºÂÃ§ÂÂ¸Ã¤Â¿ÂÃ¦ÂÂ¤Ã£ÂÂ',
    'prep.signup.button': 'Ã§ÂÂ»Ã¨Â®Â°Ã§ÂÂ¾Ã¥ÂÂÃ¦ÂÂ¢Ã¨Â®Â¿ Ã¢ÂÂ¤Ã¯Â¸Â',
    'prep.risks.title': 'Ã¤ÂºÂÃ¨Â§Â£Ã¦ÂÂÃ¤Â»Â¬Ã§ÂÂÃ©Â£ÂÃ©ÂÂ©',
    'prep.earthquake.title': 'Ã¥ÂÂ°Ã©ÂÂÃ©Â£ÂÃ©ÂÂ©',
    'prep.earthquake.description': 'Ã¦ÂÂ¥Ã¨ÂÂ½Ã¥ÂÂºÃ¥ÂÂÃ¨ÂÂ½Ã¥ÂÂ¨Ã¦Â²ÂÃ¨Â´Â¨Ã¥ÂÂÃ¥Â£Â¤Ã¤Â¸ÂÃ¯Â¼ÂÃ¥ÂÂ°Ã©ÂÂÃ¦ÂÂ¶Ã¥ÂÂ¯Ã¨ÂÂ½Ã¥ÂÂÃ¦ÂµÂÃ¦Â²ÂÃ¤Â¸ÂÃ¦Â Â·Ã£ÂÂÃ¤Â¸ÂÃ¥Â®Â¶Ã©Â¢ÂÃ¦ÂµÂÃ¯Â¼ÂÃ¥ÂÂ°2043Ã¥Â¹Â´Ã¦Â¹Â¾Ã¥ÂÂºÃ¥ÂÂÃ§ÂÂ6.7Ã§ÂºÂ§Ã¤Â»Â¥Ã¤Â¸ÂÃ¥Â¤Â§Ã¥ÂÂ°Ã©ÂÂÃ§ÂÂÃ¦Â¦ÂÃ§ÂÂÃ¤Â¸Âº72%Ã£ÂÂ',
    'prep.earthquake.action': 'Ã¦ÂÂ¨Ã§ÂÂ°Ã¥ÂÂ¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥ÂÂÃ§ÂÂÃ¯Â¼Â',
    'prep.tsunami.title': 'Ã¦ÂµÂ·Ã¥ÂÂ¸Ã©Â£ÂÃ©ÂÂ©',
    'prep.tsunami.description': 'Ã¥Â¤ÂÃ¦ÂÂ¥Ã¨ÂÂ½Ã¥ÂÂºÃ¤Â½ÂÃ¤ÂºÂÃ¦ÂµÂ·Ã¥ÂÂ¸Ã¥ÂÂ±Ã©ÂÂ©Ã¥ÂÂºÃ£ÂÂÃ¥ÂÂ¨Ã¦ÂÂÃ¥ÂÂÃ¦ÂÂÃ¥ÂÂµÃ¤Â¸ÂÃ§ÂÂÃ¨Â¿ÂÃ¦ÂµÂ·Ã¥ÂÂ°Ã©ÂÂÃ¤Â¸Â­Ã¯Â¼ÂÃ¦ÂµÂ·Ã¦ÂµÂªÃ¥ÂÂ¯Ã¨ÂÂ½Ã¨Â¾Â¾Ã¥ÂÂ°20-30Ã¨ÂÂ±Ã¥Â°ÂºÃ¯Â¼ÂÃ¥Â¹Â¶Ã¦Â·Â¹Ã¦Â²Â¡Ã¨ÂÂ³46Ã¥Â¤Â§Ã©ÂÂÃ£ÂÂ',
    'prep.tsunami.action': 'Ã¦ÂÂ¨Ã§ÂÂ°Ã¥ÂÂ¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥ÂÂÃ§ÂÂÃ¯Â¼Â',
    'prep.neighbors.title': 'Ã©ÂÂ»Ã©ÂÂÃ¤ÂºÂÃ¥ÂÂ©',
    'prep.neighbors.subtitle': 'Ã¨ÂÂÃ§Â³Â»Ã¥Â°Â±Ã¦ÂÂ¯Ã¥ÂÂÃ¥Â¤Â',
    'prep.neighbors.description': 'Ã©ÂÂ»Ã¥Â±ÂÃ¦ÂÂÃ¦ÂÂ¯Ã§ÂÂÃ¦Â­Â£Ã§ÂÂÃ§Â¬Â¬Ã¤Â¸ÂÃ¥ÂÂÃ¥ÂºÂÃ¨ÂÂÃ£ÂÂÃ¤ÂºÂÃ§ÂÂ¸Ã¦ÂÂ¢Ã¦ÂÂÃ¨ÂÂ½Ã¦ÂÂ¯Ã¦ÂÂÃ§ÂÂÃ¥ÂÂ½Ã£ÂÂÃ¦ÂÂÃ¤Â»Â¬Ã¤Â¸ÂÃ¨ÂµÂ·Ã§Â¡Â®Ã¤Â¿ÂÃ¦Â²Â¡Ã¦ÂÂÃ¤ÂºÂºÃ¨Â¢Â«Ã¥Â­Â¤Ã§Â«ÂÃ£ÂÂ',
    'prep.neighbors.connect': 'Ã¨ÂÂÃ§Â³Â»Ã¦ÂÂ¹Ã¥Â¼ÂÃ¯Â¼Â',
    'prep.form.title': 'Ã§ÂÂ³Ã¨Â¯Â·Ã§ÂÂ¾Ã¥ÂÂÃ¦ÂÂ¢Ã¨Â®Â¿',
    'prep.form.subtitle': 'Ã¦ÂÂ¨Ã¦ÂÂ¯Ã¥ÂÂ¦Ã§ÂÂ¬Ã¥Â±ÂÃ£ÂÂÃ¨Â¡ÂÃ¥ÂÂ¨Ã¤Â¸ÂÃ¤Â¾Â¿Ã¯Â¼ÂÃ¦ÂÂÃ§ÂÂ§Ã©Â¡Â¾Ã¥ÂÂ¯Ã¨ÂÂ½Ã©ÂÂÃ¨Â¦ÂÃ©Â¢ÂÃ¥Â¤ÂÃ¥Â¸Â®Ã¥ÂÂ©Ã§ÂÂÃ¤ÂºÂºÃ¯Â¼ÂÃ¨Â¯Â·Ã¨Â®Â©Ã©ÂÂ»Ã¥Â±ÂÃ§ÂÂ¥Ã©ÂÂÃ£ÂÂ',
    'prep.form.description': 'Ã¥Â¡Â«Ã¥ÂÂÃ¦Â­Â¤Ã¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼ÂÃ¨Â®Â©Ã¦Â¸Â©Ã©Â¦Â¨Ã¨Â§ÂÃ¨ÂÂ½Ã¥Â¿ÂÃ¦ÂÂ¿Ã¨ÂÂÃ¥ÂÂ¨Ã§Â´Â§Ã¦ÂÂ¥Ã¦ÂÂÃ¥ÂÂµÃ¥ÂÂÃ¨ÂÂ½Ã¦ÂÂ¢Ã¨Â®Â¿Ã¦ÂÂ¨Ã£ÂÂÃ¦ÂÂ¨Ã§ÂÂÃ¤Â¿Â¡Ã¦ÂÂ¯Ã¥Â°ÂÃ¤Â¿ÂÃ¥Â¯ÂÃ£ÂÂ',
    'prep.form.onbehalf': 'Ã¦ÂÂÃ¤Â»Â£Ã¨Â¡Â¨Ã¤Â»ÂÃ¤ÂºÂºÃ¥Â¡Â«Ã¥ÂÂÃ¦Â­Â¤Ã¨Â¡Â¨Ã¦Â Â¼',
    'prep.form.onbehalf.consent': 'Ã¯Â¼ÂÃ¥Â·Â²Ã¨ÂÂ·Ã¥Â¾ÂÃ¥ÂÂÃ¦ÂÂÃ¯Â¼Â',
    'prep.form.name': 'Ã¥Â§ÂÃ¥ÂÂ',
    'prep.form.name.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂÃ¯Â¼Â',
    'prep.form.address': 'Ã¥ÂÂ°Ã¥ÂÂ',
    'prep.form.contact': 'Ã©Â¦ÂÃ©ÂÂÃ¨ÂÂÃ§Â³Â»Ã¦ÂÂ¹Ã¥Â¼Â',
    'prep.form.contact.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂÃ¯Â¼Â',
    'prep.form.contact.placeholder': 'Ã§ÂÂµÃ¨Â¯ÂÃ£ÂÂÃ§ÂÂµÃ¥Â­ÂÃ©ÂÂ®Ã¤Â»Â¶Ã£ÂÂÃ¥Â¾Â®Ã¤Â¿Â¡Ã§Â­Â',
    'prep.form.vulnerable_count': 'Ã©ÂÂÃ¨Â¦ÂÃ¦ÂÂ¢Ã¨Â®Â¿Ã§ÂÂÃ¤ÂºÂºÃ¦ÂÂ°',
    'prep.form.people': 'Ã¤ÂºÂº',
    'prep.form.person': 'Ã¤ÂºÂº',
    'prep.form.specific_needs': 'Ã¦ÂÂÃ¤Â»ÂÃ¤Â¹ÂÃ§ÂÂ¹Ã¦Â®ÂÃ©ÂÂÃ¦Â±ÂÃ¥ÂÂÃ¯Â¼Â',
    'prep.form.specific_needs.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂÃ¯Â¼Â',
    'prep.form.specific_needs.placeholder': 'Ã¨Â½Â®Ã¦Â¤ÂÃ©ÂÂÃ©ÂÂÃ£ÂÂÃ¥ÂÂ»Ã§ÂÂÃ¨Â®Â¾Ã¥Â¤ÂÃ£ÂÂÃ¨Â¯Â­Ã¨Â¨ÂÃ¦ÂÂ¯Ã¦ÂÂÃ§Â­Â',
    'prep.form.privacy': 'Ã°ÂÂÂ Ã¦ÂÂ¨Ã§ÂÂÃ¤Â¿Â¡Ã¦ÂÂ¯Ã§Â»ÂÃ¤Â¸ÂÃ¤Â¼ÂÃ¥ÂÂ¬Ã¥Â¼ÂÃ£ÂÂÃ¥ÂÂªÃ¦ÂÂÃ¦Â¸Â©Ã©Â¦Â¨Ã¨Â§ÂÃ¨ÂÂ½Ã¥Â¿ÂÃ¦ÂÂ¿Ã¨ÂÂÃ¤Â¼ÂÃ¤Â½Â¿Ã§ÂÂ¨Ã¥Â®ÂÃ¦ÂÂ¥Ã¦ÂÂ¢Ã¨Â®Â¿Ã¦ÂÂ¨Ã£ÂÂ',
    'prep.form.submit': 'Ã¦ÂÂÃ¤ÂºÂ¤',
    'prep.form.submitting': 'Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â¸Â­...',
    'prep.form.success.title': 'Ã¨Â°Â¢Ã¨Â°Â¢Ã¯Â¼Â',
    'prep.form.success.message': 'Ã¥Â¦ÂÃ¦ÂÂÃ¥ÂÂÃ§ÂÂÃ§ÂÂ¾Ã©ÂÂ¾Ã¯Â¼ÂÃ¦ÂÂÃ¤Â»Â¬Ã¤Â¼ÂÃ¦ÂÂ¢Ã¨Â®Â¿Ã¦ÂÂ¨Ã£ÂÂÃ¤Â¿ÂÃ¦ÂÂÃ¥Â®ÂÃ¥ÂÂ¨ - Ã¤Â¹ÂÃ¨Â¦ÂÃ¦ÂÂ¢Ã¦ÂÂÃ¦ÂÂ¨Ã§ÂÂÃ©ÂÂ»Ã¥Â±ÂÃ¯Â¼Â',
    'prep.form.success.another': 'Ã¦ÂÂÃ¤ÂºÂ¤Ã¥ÂÂ¦Ã¤Â¸ÂÃ¤Â¸ÂªÃ§ÂÂ³Ã¨Â¯Â·',
  },
  'zh-HK': {
    // Navigation
    'nav.home': 'Ã¤Â¸Â»Ã©Â Â',
    'nav.prep': 'Ã¦ÂºÂÃ¥ÂÂ',
    'nav.party': 'Ã¦Â´Â¾Ã¥Â°Â',
    'nav.coupons': 'Ã¥ÂÂªÃ¦ÂÂ Ã¥ÂÂ¸',
    'nav.contact': 'Ã¨ÂÂ¯Ã§ÂµÂ¡',
    
    // PrepTogether page
    'prep.title': 'Ã¥ÂÂ±Ã¥ÂÂÃ¦ÂºÂÃ¥ÂÂ',
    'prep.subtitle': 'Ã¥Â®ÂÃ¥ÂÂ¨Ã§ÂÂ¸Ã¥Â®ÂÃ¯Â¼ÂÃ¥Â®ÂÃ¦ÂÂÃ§ÂÂ¸Ã¥ÂÂ©',
    'prep.welcome': 'Ã¥ÂÂ°Ã©ÂÂÃ¥ÂÂÃ¦ÂµÂ·Ã¥ÂÂ¯Ã¤Â¿ÂÃ¦ÂÂÃ¥ÂÂÃ§Â¤Â¾Ã¥ÂÂÃ¥ÂÂÃ§ÂÂÃ¥Â¯Â¦Ã©Â¢Â¨Ã©ÂÂªÃ£ÂÂÃ©ÂÂÃ©ÂÂÃ¥ÂÂ±Ã¥ÂÂÃ¦ÂºÂÃ¥ÂÂÃ¯Â¼ÂÃ¦ÂÂÃ¥ÂÂÃ¥ÂÂ¯Ã¤Â»Â¥Ã¤ÂºÂÃ§ÂÂ¸Ã¤Â¿ÂÃ¨Â­Â·Ã£ÂÂ',
    'prep.signup.button': 'Ã§ÂÂ»Ã¨Â¨ÂÃ§ÂÂ½Ã¥Â¾ÂÃ¦ÂÂ¢Ã¨Â¨Âª Ã¢ÂÂ¤Ã¯Â¸Â',
    'prep.risks.title': 'Ã¤ÂºÂÃ¨Â§Â£Ã¦ÂÂÃ¥ÂÂÃ¥ÂÂÃ©Â¢Â¨Ã©ÂÂª',
    'prep.earthquake.title': 'Ã¥ÂÂ°Ã©ÂÂÃ©Â¢Â¨Ã©ÂÂª',
    'prep.earthquake.description': 'Ã¦ÂÂ¥Ã¨ÂÂ½Ã¥ÂÂÃ¥ÂºÂ§Ã¨ÂÂ½Ã¥ÂÂºÃ¦Â²ÂÃ¨Â³ÂªÃ¥ÂÂÃ¥Â£Â¤Ã¤Â¸ÂÃ¯Â¼ÂÃ¥ÂÂ°Ã©ÂÂÃ¦ÂÂÃ¥ÂÂ¯Ã¨ÂÂ½Ã¦ÂÂÃ¤Â¼Â¼Ã¦ÂµÂÃ¦Â²ÂÃ¥ÂÂÃ£ÂÂÃ¥Â°ÂÃ¥Â®Â¶Ã©Â ÂÃ¦Â¸Â¬Ã¯Â¼ÂÃ¥ÂÂ°2043Ã¥Â¹Â´Ã§ÂÂ£Ã¥ÂÂÃ§ÂÂ¼Ã§ÂÂ6.7Ã§Â´ÂÃ¤Â»Â¥Ã¤Â¸ÂÃ¥Â¤Â§Ã¥ÂÂ°Ã©ÂÂÃ¥ÂÂÃ¦Â©ÂÃ§ÂÂÃ¤Â¿Â72%Ã£ÂÂ',
    'prep.earthquake.action': 'Ã¤Â½Â Ã¨ÂÂÃ¥Â®Â¶Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥ÂÂÃ¥ÂÂÃ¯Â¼Â',
    'prep.tsunami.title': 'Ã¦ÂµÂ·Ã¥ÂÂ¯Ã©Â¢Â¨Ã©ÂÂª',
    'prep.tsunami.description': 'Ã¥Â¤ÂÃ¦ÂÂ¥Ã¨ÂÂ½Ã¥ÂÂÃ¤Â½ÂÃ¦ÂÂ¼Ã¦ÂµÂ·Ã¥ÂÂ¯Ã¥ÂÂ±Ã©ÂÂªÃ¥ÂÂÃ£ÂÂÃ¥ÂÂºÃ¦ÂÂÃ¥Â£ÂÃ¦ÂÂÃ¦Â³ÂÃ¤Â¸ÂÃ¥ÂÂÃ¨Â¿ÂÃ¦ÂµÂ·Ã¥ÂÂ°Ã©ÂÂÃ¤Â¸Â­Ã¯Â¼ÂÃ¦ÂµÂ·Ã¦ÂµÂªÃ¥ÂÂ¯Ã¨ÂÂ½Ã©ÂÂÃ¥ÂÂ°20-30Ã¨ÂÂ±Ã¥Â°ÂºÃ¯Â¼ÂÃ¤Â¸Â¦Ã¦Â·Â¹Ã¦Â²ÂÃ¨ÂÂ³46Ã¥Â¤Â§Ã©ÂÂÃ£ÂÂ',
    'prep.tsunami.action': 'Ã¤Â½Â Ã¨ÂÂÃ¥Â®Â¶Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥ÂÂÃ¥ÂÂÃ¯Â¼Â',
    'prep.neighbors.title': 'Ã©ÂÂ°Ã©ÂÂÃ¤ÂºÂÃ¥ÂÂ©',
    'prep.neighbors.subtitle': 'Ã¨ÂÂ¯Ã§Â¹Â«Ã¥Â°Â±Ã¤Â¿ÂÃ¦ÂºÂÃ¥ÂÂ',
    'prep.neighbors.description': 'Ã©ÂÂ°Ã¥Â±ÂÃ¥ÂÂÃ¤Â¿ÂÃ§ÂÂÃ¦Â­Â£Ã¥ÂÂÃ§Â¬Â¬Ã¤Â¸ÂÃ©ÂÂ¿Ã¦ÂÂÃ¨ÂÂÃ£ÂÂÃ¤ÂºÂÃ§ÂÂ¸Ã¦ÂÂ¢Ã¦ÂÂÃ¨ÂÂ½Ã¦ÂÂ¯Ã¦ÂÂÃ§ÂÂÃ¥ÂÂ½Ã£ÂÂÃ¦ÂÂÃ¥ÂÂÃ¤Â¸ÂÃ©Â½ÂÃ§Â¢ÂºÃ¤Â¿ÂÃ¥ÂÂÃ¤ÂºÂºÃ¨Â¢Â«Ã¥Â­Â¤Ã§Â«ÂÃ£ÂÂ',
    'prep.neighbors.connect': 'Ã¨ÂÂ¯Ã§ÂµÂ¡Ã¦ÂÂ¹Ã¥Â¼ÂÃ¯Â¼Â',
    'prep.form.title': 'Ã§ÂÂ³Ã¨Â«ÂÃ§ÂÂ½Ã¥Â¾ÂÃ¦ÂÂ¢Ã¨Â¨Âª',
    'prep.form.subtitle': 'Ã¤Â½Â Ã¤Â¿ÂÃ¥ÂÂªÃ§ÂÂ¨Ã¥Â±ÂÃ£ÂÂÃ¨Â¡ÂÃ¥ÂÂÃ¤Â¸ÂÃ¤Â¾Â¿Ã¯Â¼ÂÃ¦ÂÂÃ¨ÂÂÃ§ÂÂ§Ã©Â¡Â§Ã¥ÂÂ¯Ã¨ÂÂ½Ã©ÂÂÃ¨Â¦ÂÃ©Â¡ÂÃ¥Â¤ÂÃ¥Â¹Â«Ã¥ÂÂ©Ã¥ÂÂÃ¤ÂºÂºÃ¯Â¼ÂÃ¨Â«ÂÃ¤Â¿Â¾Ã©ÂÂ°Ã¥Â±ÂÃ§ÂÂ¥Ã©ÂÂÃ£ÂÂ',
    'prep.form.description': 'Ã¥Â¡Â«Ã¥Â¯Â«Ã¥ÂÂ¢Ã¥ÂÂÃ¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼ÂÃ§Â­ÂÃ¦ÂºÂ«Ã©Â¦Â¨Ã¨Â§ÂÃ¨ÂÂ½Ã§Â¾Â©Ã¥Â·Â¥Ã¥ÂÂºÃ§Â·ÂÃ¦ÂÂ¥Ã¦ÂÂÃ¦Â³ÂÃ¥Â¾ÂÃ¨ÂÂ½Ã¦ÂÂ¢Ã¨Â¨ÂªÃ¤Â½Â Ã£ÂÂÃ¤Â½Â Ã¥ÂÂÃ¨Â³ÂÃ¦ÂÂÃ¦ÂÂÃ¤Â¿ÂÃ¥Â¯ÂÃ£ÂÂ',
    'prep.form.onbehalf': 'Ã¦ÂÂÃ¤Â»Â£Ã¨Â¡Â¨Ã¥ÂÂ¶Ã¤Â»ÂÃ¤ÂºÂºÃ¥Â¡Â«Ã¥Â¯Â«Ã¥ÂÂ¢Ã¥ÂÂÃ¨Â¡Â¨Ã¦Â Â¼',
    'prep.form.onbehalf.consent': 'Ã¯Â¼ÂÃ¥Â·Â²Ã§ÂÂ²Ã¥Â¾ÂÃ¥ÂÂÃ¦ÂÂÃ¯Â¼Â',
    'prep.form.name': 'Ã¥Â§ÂÃ¥ÂÂ',
    'prep.form.name.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂ¸Ã¯Â¼Â',
    'prep.form.address': 'Ã¥ÂÂ°Ã¥ÂÂ',
    'prep.form.contact': 'Ã©Â¦ÂÃ©ÂÂ¸Ã¨ÂÂ¯Ã§ÂµÂ¡Ã¦ÂÂ¹Ã¥Â¼Â',
    'prep.form.contact.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂ¸Ã¯Â¼Â',
    'prep.form.contact.placeholder': 'Ã©ÂÂ»Ã¨Â©Â±Ã£ÂÂÃ©ÂÂ»Ã©ÂÂµÃ£ÂÂÃ¥Â¾Â®Ã¤Â¿Â¡Ã§Â­Â',
    'prep.form.vulnerable_count': 'Ã©ÂÂÃ¨Â¦ÂÃ¦ÂÂ¢Ã¨Â¨ÂªÃ¥ÂÂÃ¤ÂºÂºÃ¦ÂÂ¸',
    'prep.form.people': 'Ã¤ÂºÂº',
    'prep.form.person': 'Ã¤ÂºÂº',
    'prep.form.specific_needs': 'Ã¦ÂÂÃ¥ÂÂ©Ã§ÂÂ¹Ã¦Â®ÂÃ©ÂÂÃ¨Â¦ÂÃ¯Â¼Â',
    'prep.form.specific_needs.optional': 'Ã¯Â¼ÂÃ¥ÂÂ¯Ã©ÂÂ¸Ã¯Â¼Â',
    'prep.form.specific_needs.placeholder': 'Ã¨Â¼ÂªÃ¦Â¤ÂÃ©ÂÂÃ©ÂÂÃ£ÂÂÃ©ÂÂ«Ã§ÂÂÃ¨Â¨Â­Ã¥ÂÂÃ£ÂÂÃ¨ÂªÂÃ¨Â¨ÂÃ¦ÂÂ¯Ã¦ÂÂ´Ã§Â­Â',
    'prep.form.privacy': 'Ã°ÂÂÂ Ã¤Â½Â Ã¥ÂÂÃ¨Â³ÂÃ¦ÂÂÃ§ÂµÂÃ¤Â¸ÂÃ¦ÂÂÃ¥ÂÂ¬Ã©ÂÂÃ£ÂÂÃ¥ÂÂªÃ¦ÂÂÃ¦ÂºÂ«Ã©Â¦Â¨Ã¨Â§ÂÃ¨ÂÂ½Ã§Â¾Â©Ã¥Â·Â¥Ã¦ÂÂÃ§ÂÂ¨Ã¥ÂÂÃ¦ÂÂ¢Ã¨Â¨ÂªÃ¤Â½Â Ã£ÂÂ',
    'prep.form.submit': 'Ã¦ÂÂÃ¤ÂºÂ¤',
    'prep.form.submitting': 'Ã¦ÂÂÃ¤ÂºÂ¤Ã§Â·Â...',
    'prep.form.success.title': 'Ã¥Â¤ÂÃ¨Â¬ÂÃ¯Â¼Â',
    'prep.form.success.message': 'Ã¥Â¦ÂÃ¦ÂÂÃ§ÂÂ¼Ã§ÂÂÃ§ÂÂ½Ã©ÂÂ£Ã¯Â¼ÂÃ¦ÂÂÃ¥ÂÂÃ¦ÂÂÃ¦ÂÂ¢Ã¨Â¨ÂªÃ¤Â½Â Ã£ÂÂÃ¤Â¿ÂÃ¦ÂÂÃ¥Â®ÂÃ¥ÂÂ¨ - Ã¤ÂºÂ¦Ã¨Â¦ÂÃ¦ÂÂ¢Ã¦ÂÂÃ¤Â½Â Ã¥ÂÂÃ©ÂÂ°Ã¥Â±ÂÃ¯Â¼Â',
    'prep.form.success.another': 'Ã¦ÂÂÃ¤ÂºÂ¤Ã¥ÂÂ¦Ã¤Â¸ÂÃ¥ÂÂÃ§ÂÂ³Ã¨Â«Â',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

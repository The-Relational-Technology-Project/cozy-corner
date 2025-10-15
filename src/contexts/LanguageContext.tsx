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
    'prep.signup.button': 'Sign Up for a Post-Disaster Check-In ❤️',
    'prep.risks.title': 'Know Our Risks',
    'prep.earthquake.title': 'Earthquake Risks',
    'prep.earthquake.description': 'The Sunset sits on sandy soil that can act like quicksand in a quake. Experts say there\'s a 72% chance of a major earthquake (M6.7+) in the Bay Area by 2043.',
    'prep.earthquake.action': 'What you can do now:',
    'prep.tsunami.title': 'Tsunami Risks',
    'prep.tsunami.description': 'Outer Sunset is in a tsunami hazard zone. In a worst-case quake offshore, waves could reach 20–30 feet and flood up to 46th Avenue.',
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
    'prep.form.privacy': '🔒 Your information will never be public. Only Cozy Corner volunteers will use it to check on you.',
    'prep.form.submit': 'Submit',
    'prep.form.submitting': 'Submitting...',
    'prep.form.success.title': 'Thank You!',
    'prep.form.success.message': 'We\'ll check on you if a disaster hits. Stay safe – and check on your neighbors too!',
    'prep.form.success.another': 'Submit Another Request',
  },
  'zh-CN': {
    // Navigation
    'nav.home': '主页',
    'nav.prep': '准备',
    'nav.party': '派对',
    'nav.coupons': '优惠券',
    'nav.contact': '联系',
    
    // PrepTogether page
    'prep.title': '共同准备',
    'prep.subtitle': '安全相守，守望相助',
    'prep.welcome': '地震和海啸是我们社区的真实风险。通过共同准备，我们可以互相保护。',
    'prep.signup.button': '登记灾后探访 ❤️',
    'prep.risks.title': '了解我们的风险',
    'prep.earthquake.title': '地震风险',
    'prep.earthquake.description': '日落区坐落在沙质土壤上，地震时可能像流沙一样。专家预测，到2043年湾区发生6.7级以上大地震的概率为72%。',
    'prep.earthquake.action': '您现在可以做的：',
    'prep.tsunami.title': '海啸风险',
    'prep.tsunami.description': '外日落区位于海啸危险区。在最坏情况下的近海地震中，海浪可能达到20-30英尺，并淹没至46大道。',
    'prep.tsunami.action': '您现在可以做的：',
    'prep.neighbors.title': '邻里互助',
    'prep.neighbors.subtitle': '联系就是准备',
    'prep.neighbors.description': '邻居才是真正的第一响应者。互相探望能拯救生命。我们一起确保没有人被孤立。',
    'prep.neighbors.connect': '联系方式：',
    'prep.form.title': '申请灾后探访',
    'prep.form.subtitle': '您是否独居、行动不便，或照顾可能需要额外帮助的人？请让邻居知道。',
    'prep.form.description': '填写此表格，让温馨角落志愿者在紧急情况后能探访您。您的信息将保密。',
    'prep.form.onbehalf': '我代表他人填写此表格',
    'prep.form.onbehalf.consent': '（已获得同意）',
    'prep.form.name': '姓名',
    'prep.form.name.optional': '（可选）',
    'prep.form.address': '地址',
    'prep.form.contact': '首选联系方式',
    'prep.form.contact.optional': '（可选）',
    'prep.form.contact.placeholder': '电话、电子邮件、微信等',
    'prep.form.vulnerable_count': '需要探访的人数',
    'prep.form.people': '人',
    'prep.form.person': '人',
    'prep.form.specific_needs': '有什么特殊需求吗？',
    'prep.form.specific_needs.optional': '（可选）',
    'prep.form.specific_needs.placeholder': '轮椅通道、医疗设备、语言支持等',
    'prep.form.privacy': '🔒 您的信息绝不会公开。只有温馨角落志愿者会使用它来探访您。',
    'prep.form.submit': '提交',
    'prep.form.submitting': '提交中...',
    'prep.form.success.title': '谢谢！',
    'prep.form.success.message': '如果发生灾难，我们会探访您。保持安全 - 也要探望您的邻居！',
    'prep.form.success.another': '提交另一个申请',
  },
  'zh-HK': {
    // Navigation
    'nav.home': '主頁',
    'nav.prep': '準備',
    'nav.party': '派對',
    'nav.coupons': '優惠券',
    'nav.contact': '聯絡',
    
    // PrepTogether page
    'prep.title': '共同準備',
    'prep.subtitle': '安全相守，守望相助',
    'prep.welcome': '地震同海嘯係我哋社區嘅真實風險。透過共同準備，我哋可以互相保護。',
    'prep.signup.button': '登記災後探訪 ❤️',
    'prep.risks.title': '了解我哋嘅風險',
    'prep.earthquake.title': '地震風險',
    'prep.earthquake.description': '日落區座落喺沙質土壤上，地震時可能會似流沙咁。專家預測，到2043年灣區發生6.7級以上大地震嘅機率係72%。',
    'prep.earthquake.action': '你而家可以做嘅：',
    'prep.tsunami.title': '海嘯風險',
    'prep.tsunami.description': '外日落區位於海嘯危險區。喺最壞情況下嘅近海地震中，海浪可能達到20-30英尺，並淹沒至46大道。',
    'prep.tsunami.action': '你而家可以做嘅：',
    'prep.neighbors.title': '鄰里互助',
    'prep.neighbors.subtitle': '聯繫就係準備',
    'prep.neighbors.description': '鄰居先係真正嘅第一響應者。互相探望能拯救生命。我哋一齊確保冇人被孤立。',
    'prep.neighbors.connect': '聯絡方式：',
    'prep.form.title': '申請災後探訪',
    'prep.form.subtitle': '你係咪獨居、行動不便，或者照顧可能需要額外幫助嘅人？請俾鄰居知道。',
    'prep.form.description': '填寫呢個表格，等溫馨角落義工喺緊急情況後能探訪你。你嘅資料會保密。',
    'prep.form.onbehalf': '我代表其他人填寫呢個表格',
    'prep.form.onbehalf.consent': '（已獲得同意）',
    'prep.form.name': '姓名',
    'prep.form.name.optional': '（可選）',
    'prep.form.address': '地址',
    'prep.form.contact': '首選聯絡方式',
    'prep.form.contact.optional': '（可選）',
    'prep.form.contact.placeholder': '電話、電郵、微信等',
    'prep.form.vulnerable_count': '需要探訪嘅人數',
    'prep.form.people': '人',
    'prep.form.person': '人',
    'prep.form.specific_needs': '有咩特殊需要？',
    'prep.form.specific_needs.optional': '（可選）',
    'prep.form.specific_needs.placeholder': '輪椅通道、醫療設備、語言支援等',
    'prep.form.privacy': '🔒 你嘅資料絕不會公開。只有溫馨角落義工會用嚟探訪你。',
    'prep.form.submit': '提交',
    'prep.form.submitting': '提交緊...',
    'prep.form.success.title': '多謝！',
    'prep.form.success.message': '如果發生災難，我哋會探訪你。保持安全 - 亦要探望你嘅鄰居！',
    'prep.form.success.another': '提交另一個申請',
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

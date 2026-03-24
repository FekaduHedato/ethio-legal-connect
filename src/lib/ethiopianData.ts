export interface LegalCode {
  id: string;
  title: string;
  article: string;
  content: string;
  category: 'personal' | 'financial' | 'property' | 'family' | 'labor' | 'divorce';
}

export interface Proverb {
  amharic: string;
  oromo?: string;
  transliteration: string;
  translation: string;
  meaning: string;
}

export const ETHIOPIAN_CODES: LegalCode[] = [
  {
    id: 'CC-1731',
    title: 'Civil Code of 1960',
    article: 'Article 1731',
    content: 'Contracts lawfully formed shall have the force of law between the parties.',
    category: 'financial'
  },
  {
    id: 'CC-2124',
    title: 'Civil Code of 1960',
    article: 'Article 2124',
    content: 'Whosoever causes damage to another by an offense shall make it good.',
    category: 'personal'
  },
  {
    id: 'CC-1130',
    title: 'Civil Code of 1960',
    article: 'Article 1130',
    content: 'The owner of a thing shall be entitled to recover it from any person who holds it without a title.',
    category: 'property'
  },
  {
    id: 'RFC-50',
    title: 'Revised Family Code',
    article: 'Article 50',
    content: 'Spouses shall have equal rights and duties in all matters relating to their marriage.',
    category: 'family'
  },
  {
    id: 'RFC-75',
    title: 'Revised Family Code',
    article: 'Article 75',
    content: 'Divorce by mutual consent shall be granted if both spouses agree to end their marriage and the court confirms their agreement.',
    category: 'divorce'
  },
  {
    id: 'RFC-113',
    title: 'Revised Family Code',
    article: 'Article 113',
    content: 'The common property of the spouses shall be divided equally between them.',
    category: 'family'
  },
  {
    id: 'LP-12',
    title: 'Labor Proclamation 1156/2019',
    article: 'Article 12',
    content: 'An employee shall perform his work with due care and diligence.',
    category: 'labor'
  },
  {
    id: 'CC-1763',
    title: 'Civil Code of 1960',
    article: 'Article 1763',
    content: 'The court may grant a period of grace to the debtor for the performance of his obligation.',
    category: 'financial'
  }
];

export const ETHIOPIAN_PROVERBS: Proverb[] = [
  {
    amharic: 'ድሪ ቢያብር አንበሳ ያስር',
    oromo: 'Bakka waliigalteen jiru, goota mo’an.',
    transliteration: 'Dir biabir anbessa yasir',
    translation: 'When spider webs unite, they can tie up a lion.',
    meaning: 'Unity and cooperation can solve even the most difficult problems.'
  },
  {
    amharic: 'የታረቀን ሰው እግዚአብሔር ይወዳል',
    oromo: 'Araarri haqa qaba.',
    transliteration: 'Yetarekhen sew Egziabher yiwedal',
    translation: 'God loves a person who reconciles.',
    meaning: 'The act of forgiveness and peace-making is divinely favored.'
  },
  {
    amharic: 'ከባዶ ማድጋ፤ ጥኑ ማድጋ',
    oromo: 'Harka duwwaa irra, xinnoo qabaachuun caala.',
    transliteration: 'Ke bado madega, tinu madega',
    translation: 'Better a small jar than an empty one.',
    meaning: 'A small compromise is better than a total loss.'
  },
  {
    amharic: 'ጠብ ከመገዶ ይጀምራል',
    oromo: 'Morkiin xinnoon lola guddaa fida.',
    transliteration: 'Teb kemagedo yijemiral',
    translation: 'Conflict starts from firewood.',
    meaning: 'Small misunderstandings can grow into large disputes if not addressed early.'
  },
  {
    amharic: 'ሰው ለሰው መድኃኒቱ ነው',
    oromo: 'Namni namaaf qoricha.',
    transliteration: 'Sew lesew medhanitu new',
    translation: 'Man is man’s medicine.',
    meaning: 'Humanity finds healing and solutions through one another.'
  },
  {
    amharic: 'ቢታረቁ የት ይደርሱ',
    oromo: 'Araarri nageenya fida.',
    transliteration: 'Bitareku yet yidersu',
    translation: 'If they reconcile, where could they reach?',
    meaning: 'Reconciliation leads to boundless possibilities and peace.'
  }
];

export const CULTURAL_ASSETS = [
  {
    title: {
      en: 'The Coffee Ceremony',
      am: 'የቡና ሥነ-ሥርዓት',
      om: 'Sirna Bunaa'
    },
    description: {
      en: 'Buna Tetu (Drinking coffee) is more than a break; it is a ritual of social connection and peace.',
      am: 'ቡና መጠጣት (ቡና ጠጡ) ከመዘናናት በላይ ነው፤ የማህበራዊ ግንኙነት እና የሰላም ሥነ-ሥርዓት ነው፡፡',
      om: 'Buna dhuguun (Buna Tetu) boqonnaa qofa miti; hidhata hawaasummaa fi nageenyaa ti.'
    },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/ethiopian-coffee-ceremony-08b987c7-1773946471555.webp',
    tag: {
      en: 'Social Bond',
      am: 'ማህበራዊ ትስስር',
      om: 'Hidhata Hawaasaa'
    }
  },
  {
    title: {
      en: 'Shimgelina',
      am: 'ሽምግልና',
      om: 'Shimagillummaa'
    },
    description: {
      en: 'The ancient art of mediation by elders who use wisdom, proverbs, and legal reasoning to restore harmony.',
      am: 'የጥንት የእርቅ ጥበብ በሽማግሌዎች የሚከናወን ሲሆን በውስጡም ጥበብን፣ ምሳሌያዊ ንግግሮችን እና ህጋዊ አስተሳሰብን በመጠቀም ስምምነትን ይፈጥራሉ፡፡',
      om: 'Ogummaa araaraa durii jaarsoliin beekumsa, mammaaksaa fi yaada seeraa fayyadamuun nagaa buusan.'
    },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/traditional-mediation---shimagille-907b160f-1773946470836.webp',
    tag: {
      en: 'Wisdom',
      am: 'ጥበብ',
      om: 'Ogummaa'
    }
  },
  {
    title: {
      en: 'Divorce Resolution Document',
      am: 'የፍቺ ስምምነት ሰነድ',
      om: 'Waraqaa Furmaata Hiikaa'
    },
    description: {
      en: 'A formal agreement designed to ensure fairness, child welfare, and equitable division of assets.',
      am: 'ፍትሃዊነትን፣ የልጆችን ደህንነት እና ፍትሃዊ የንብረት ክፍፍልን ለማረጋገጥ የተዘጋጀ ይፋዊ ስምምነት፡፡',
      om: 'Waliigaltee haqa, nageenya ijoollee fi qabeenya qooddachuu mirkaneessuuf qophaa’e.'
    },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/divorce-agreement-template-c4498578-1773949250719.webp',
    tag: {
      en: 'Legal',
      am: 'ህጋዊ',
      om: 'Seeraa'
    }
  }
];
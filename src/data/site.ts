// Edit this file to change the website's content. Nothing else needs touching.
const WA = '919241646518'
const EMAIL = 'psmediaofficial6@gmail.com'

export const site = {
  email: EMAIL,
  phone: '+91 92416 46518',
  wa: (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,
  mail: (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  msg: {
    brand: "Hello PS MEDIA Official, I'm interested in discussing an influencer marketing campaign for my brand.",
    creator: "Hello PS MEDIA Official, I'm interested in joining your creator network and exploring collaboration opportunities.",
  },
  subject: {
    brand: 'Influencer Marketing Collaboration — PS MEDIA Official',
    creator: 'Creator Network Registration — PS MEDIA Official',
  },
  socials: [] as { label: string; url: string }[], // add only real profile URLs, e.g. { label: 'Instagram', url: 'https://instagram.com/...' }
  nav: [['Home', '#top'], ['About', '#about'], ['Services', '#services'], ['Our Work', '#work'], ['Creators', '#creators'], ['Contact', '#contact']],
  brands: ['FLIPKART', 'MEESHO', 'MYNTRA'], // only brands you have really worked with
  capabilities: ['Strategic Creator Discovery', 'Influencer Campaign Management', 'Brand-Creator Partnerships', 'Content Production', 'Performance-Focused Campaigns', 'International Campaign Coordination'],
  services: [
    { title: 'Influencer Marketing', text: 'Connecting brands with relevant creators to build awareness and drive campaign objectives.' },
    { title: 'Creator Discovery', text: 'Finding creators based on niche, audience, location, engagement, and campaign requirements.' },
    { title: 'Campaign Management', text: 'Managing creator communication, deliverables, timelines, approvals, and campaign execution.' },
    { title: 'UGC Content Production', text: 'Creating authentic, creator-led content for organic and paid marketing campaigns.' },
    { title: 'Performance Marketing', text: 'Supporting performance-focused creator campaigns and content amplification.' },
    { title: 'Global Creator Campaigns', text: 'Coordinating influencer campaigns across relevant markets and regions.' },
    { title: 'Instagram Marketing', text: 'Campaigns featuring Reels, Stories, and other Instagram content formats.' },
    { title: 'YouTube Integrations', text: 'Creator partnerships involving long-form videos and YouTube Shorts.' },
  ],
  process: [
    { title: 'Discover', text: 'Understand the brand, target audience, campaign goals, and budget.' },
    { title: 'Strategize', text: 'Identify suitable creators and develop the campaign approach.' },
    { title: 'Execute', text: 'Coordinate deliverables, approvals, content production, and publishing.' },
    { title: 'Optimize', text: 'Review campaign performance and identify opportunities for improvement.' },
  ],
  niches: ['Technology', 'Gaming', 'Lifestyle', 'Beauty', 'AI & SaaS', 'Flex Category', 'Other Emerging Niches'],
  // Photos load from the current Lovable site. To host your own copies, save them in public/ and change the paths here.
  founders: [
    { name: 'Priye Satyam', role: 'Founder', focus: 'Vision & Strategy', img: 'https://psmediaofficial.lovable.app/assets/founder-priye-DuqFbMI0.png' },
    { name: 'Raunak', role: 'Co-Founder', focus: 'Operations & Growth', img: 'https://psmediaofficial.lovable.app/assets/founder-raunak-BhlJZwHp.png' },
  ],
}

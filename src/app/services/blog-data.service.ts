import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ContentBlockType = 'text' | 'image' | 'product' | 'quote' | 'video' | 'code' | 'comparison-table' | 'list';

export interface ProductItem {
  title: string;
  description: string;
  link: string;
  image?: string;
  price?: string;
  rating?: number;
  specs?: {[key: string]: string};
}

export interface ContentBlock {
  type: ContentBlockType;
  id: string;
  heading?: string;
  content?: string;
  products?: ProductItem[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  code?: string;
  language?: string;
  items?: {text: string; link?: string}[];
  tableData?: {headers: string[], rows: any[][]};
  attribution?: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  content: string;
  contentBlocks?: ContentBlock[];
}

export interface Blog {
  id: number;
  title: string;
  category: string;
  publishDate: Date;
  content: string;
  slug: string;
  description: string;
  featured: boolean;
  template?: 'standard' | 'product-review' | 'tutorial' | 'news' | 'comparison';
  headerImage?: string;
  author?: string;
  tags?: string[];
  sections: BlogSection[];
  contentBlocks?: ContentBlock[];
  recommendations?: ProductItem[];
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private categories: string[] = [
    'Smart Lighting',
    'Home Security',
    'Automation & Routines',
    'Voice Assistants',
    'Energy Efficiency',
    'Smart Appliances',
    'DIY Smart Home Projects',
    'Wi-Fi & Connectivity',
    'Smart Home Apps',
    'Device Integrations',
    'Industry News & Updates',
  ];

  private allBlogs: Blog[] = [
    {
      id: 1,
      title: 'The Future of Smart Lighting',
      slug: 'the-future-of-smart-lighting',
      category: 'Smart Lighting',
      publishDate: new Date('2024-03-01'),
      content: 'Smart lighting content...',
      description: 'Explore the latest innovations in smart lighting technology and how they will transform your home in the coming years.',
      featured: true,
      template: 'standard',
      headerImage: 'https://example.com/images/smart-lighting.jpg',
      author: 'Jane Smith',
      tags: ['lighting', 'innovation', 'smart home'],
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Lighting',
          content: 'Smart lighting has come a long way from simple motion sensors to fully integrated home systems. Today\'s smart lighting solutions offer unprecedented control, energy efficiency, and customization options for homeowners.'
        },
        {
          id: 'current-tech',
          heading: 'Current Smart Lighting Technologies',
          content: 'Current technologies include LED bulbs with WiFi connectivity, color-changing capabilities, and integration with voice assistants. Popular brands like Philips Hue, LIFX, and Nanoleaf offer a range of products from basic white bulbs to elaborate light panels.'
        },
        {
          id: 'energy-efficiency',
          heading: 'Energy Efficiency Benefits',
          content: 'One of the major advantages of smart lighting is energy conservation. By scheduling lights, using motion detection, and optimizing brightness levels, homeowners can reduce their energy usage by up to 40% compared to traditional lighting systems.'
        },
        {
          id: 'future-innovations',
          heading: 'Future Innovations',
          content: 'The future of smart lighting looks promising with technologies like Li-Fi (using light for wireless data transmission), self-powered bulbs that harvest ambient energy, and lighting that adapts to your circadian rhythm to improve sleep and wellbeing.'
        },
        {
          id: 'integration',
          heading: 'Smart Home Integration',
          content: 'The true power of smart lighting comes from integration with other smart home systems. From security to entertainment, lighting can enhance every aspect of your smart home experience when properly integrated.'
        }
      ],
      recommendations: [
        {
          title: 'Philips Hue Starter Kit',
          description: 'Everything you need to get started with smart lighting',
          link: '/products/philips-hue-starter',
          image: 'philips-hue.jpg',
          price: '$199.99',
          rating: 4.8
        },
        {
          title: 'LIFX Color A19 Bulb',
          description: 'The brightest, most vibrant smart bulb available',
          link: '/products/lifx-color-a19',
          image: 'lifx-bulb.jpg',
          price: '$59.99',
          rating: 4.5
        },
        {
          title: 'Nanoleaf Light Panels',
          description: 'Modular lighting panels for creative wall designs',
          link: '/products/nanoleaf-panels',
          image: 'nanoleaf.jpg',
          price: '$199.99',
          rating: 4.7
        }
      ]
    },
    {
      id: 2,
      title: 'Home Security Best Practices',
      slug: 'home-security-best-practices',
      category: 'Home Security',
      publishDate: new Date('2024-02-28'),
      content: 'Home security content...',
      description: 'Learn essential strategies and technologies to protect your home with modern smart security systems.',
      featured: false,
      template: 'standard',
      headerImage: 'https://example.com/images/home-security.jpg',
      author: 'Mark Johnson',
      tags: ['security', 'safety', 'cameras'],
      sections: [
        {
          id: 'security-basics',
          heading: 'Smart Security Basics',
          content: 'Smart home security begins with understanding the key components: cameras, sensors, smart locks, and monitoring services. Creating a comprehensive system that covers all vulnerable areas is essential.'
        },
        {
          id: 'camera-systems',
          heading: 'Camera Systems and Placement',
          content: 'Strategic camera placement is crucial for effective home monitoring. Focus on entry points like doors and first-floor windows, and ensure cameras have good lighting and network connectivity.'
        },
        {
          id: 'door-security',
          heading: 'Smart Door Security',
          content: 'Smart locks and video doorbells form the first line of defense. They offer remote access control, visitor verification, and activity logging to keep your entry points secure.'
        },
        {
          id: 'monitoring',
          heading: 'Professional vs. DIY Monitoring',
          content: 'While professional monitoring services offer 24/7 oversight, many homeowners opt for DIY solutions that send alerts directly to their smartphones, avoiding monthly fees while maintaining control.'
        },
        {
          id: 'integration',
          heading: 'Integration with Other Smart Systems',
          content: 'A truly smart security setup integrates with lighting, speakers, and other home systems to create automated responses to security events, like turning on lights when motion is detected.'
        }
      ],
      recommendations: [
        {
          title: 'Ring Alarm Security Kit',
          description: 'Complete home security system with professional monitoring options',
          link: '/products/ring-alarm',
          image: 'ring-alarm.jpg',
          price: '$199.99',
          rating: 4.6
        },
        {
          title: 'Nest Cam Outdoor',
          description: 'Weather-resistant camera with 24/7 recording and intelligent alerts',
          link: '/products/nest-cam-outdoor',
          image: 'nest-cam.jpg',
          price: '$179.99',
          rating: 4.4
        },
        {
          title: 'August Smart Lock Pro',
          description: 'Retrofit smart lock that works with your existing deadbolt',
          link: '/products/august-lock',
          image: 'august-lock.jpg',
          price: '$229.99',
          rating: 4.3
        }
      ]
    },
    {
      id: 3,
      title: 'Setting Up Morning Routines for Your Smart Home',
      slug: 'setting-up-morning-routines-for-your-smart-home',
      category: 'Automation & Routines',
      publishDate: new Date('2024-03-05'),
      content: 'Learn how to automate your morning routine with smart devices...',
      description: 'Streamline your mornings with customized smart home automation routines that make waking up easier and more efficient.',
      featured: true,
      template: 'tutorial',
      headerImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071',
      author: 'Emma Roberts',
      tags: ['automation', 'routines', 'morning', 'smart home', 'tutorial'],
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction',
          content: 'Imagine waking up to gentle lights that gradually brighten like a sunrise, your favorite energizing playlist, freshly brewed coffee, and the day\'s weather forecast read to you—all happening automatically without lifting a finger. With smart home technology, this isn\'t just a dream scenario; it\'s entirely achievable through automated morning routines. In this comprehensive guide, we\'ll walk you through setting up custom morning routines that can transform how you start your day, making mornings less stressful and more productive.'
        }
      ],
      contentBlocks: [
        {
          id: 'benefits',
          type: 'text',
          heading: 'Benefits of Smart Morning Routines',
          content: 'Before diving into setup instructions, let\'s explore why automated morning routines are worth the effort:<ul><li><strong>Consistency:</strong> Automated routines ensure you wake up the same way every day, helping to regulate your body\'s internal clock.</li><li><strong>Time Efficiency:</strong> By automating multiple tasks that would normally require your attention, you free up time for more important morning activities.</li><li><strong>Reduced Decision Fatigue:</strong> With fewer decisions to make first thing in the morning, you preserve mental energy for more important choices throughout the day.</li><li><strong>Gentle Transition:</strong> Smart lighting and sound can create a more natural, gradual awakening compared to jarring alarm clocks.</li><li><strong>Improved Morning Mood:</strong> Starting your day with a smooth, pleasant routine can positively impact your outlook for the entire day.</li></ul>'
        },
        {
          id: 'essential-devices',
          type: 'image',
          heading: 'Essential Devices for Morning Routines',
          imageUrl: 'https://images.unsplash.com/photo-1558002038-1055e2e89a5c',
          imageAlt: 'Collection of smart home devices including speakers, lights, and a smart display',
          content: 'To create a comprehensive morning routine, consider incorporating these key smart devices:<ul><li><strong>Smart Speaker or Display:</strong> The central hub for your routine (Amazon Echo, Google Nest Hub, or Apple HomePod)</li><li><strong>Smart Lighting:</strong> For gradual wake-up lighting (Philips Hue, LIFX, or Wyze Bulbs)</li><li><strong>Smart Plugs:</strong> To automate coffee makers, fans, or other non-smart appliances</li><li><strong>Smart Blinds or Curtains:</strong> For natural light automation</li><li><strong>Smart Thermostat:</strong> To adjust your home to the perfect morning temperature</li></ul>'
        },
        {
          id: 'video-intro',
          type: 'video',
          heading: 'Video Overview: Creating Morning Routines',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          content: 'This video demonstrates the basic setup process for morning routines across different smart home platforms.'
        },
        {
          id: 'alexa-routine',
          type: 'text',
          heading: 'Setting Up an Amazon Alexa Morning Routine',
          content: 'Amazon\'s Alexa offers one of the most user-friendly interfaces for creating complex routines. Here\'s how to set up a morning routine with Alexa:<ol><li>Open the Alexa app on your smartphone</li><li>Tap the "More" button in the bottom right corner</li><li>Select "Routines"</li><li>Tap the "+" icon to create a new routine</li><li>Name your routine (e.g., "Weekday Morning")</li><li>Under "When this happens," select "Schedule" and set your desired wake-up time</li><li>Select the days you want the routine to run</li><li>Under "Add action," add all the morning activities you want to automate</li><li>Arrange the actions in your preferred order</li><li>Tap "Save" to activate your new routine</li></ol>'
        },
        {
          id: 'alexa-example',
          type: 'image',
          heading: 'Example Alexa Morning Routine',
          imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230',
          imageAlt: 'Amazon Echo device on a bedside table with smart lights',
          content: 'A typical Alexa morning routine might include:<ul><li>Gradually brighten bedroom lights to 50% with a warm color temperature</li><li>Raise smart blinds halfway</li><li>Turn on the smart plug connected to your coffee maker</li><li>Play your morning news briefing</li><li>Read out your calendar events for the day</li><li>Provide a weather forecast</li><li>Start your favorite morning playlist on Spotify</li></ul>'
        },
        {
          id: 'google-routine',
          type: 'text',
          heading: 'Creating Google Home Morning Routines',
          content: 'Google Home offers similar functionality with their routines feature:<ol><li>Open the Google Home app</li><li>Tap your profile icon in the top right</li><li>Select "Assistant settings"</li><li>Tap "Routines"</li><li>Select "New routine"</li><li>Set a start time for your routine</li><li>Select which days it should run</li><li>Add the actions you want to include</li><li>Tap "Save" to activate</li></ol>'
        },
        {
          id: 'advanced-techniques',
          type: 'text',
          heading: 'Advanced Morning Routine Techniques',
          content: 'Once you\'ve mastered the basics, consider these advanced options:<ul><li><strong>Sunrise Simulation:</strong> Program your lights to gradually increase in brightness and shift from red to white over 30 minutes before your alarm to simulate a natural sunrise.</li><li><strong>Conditional Routines:</strong> Use IFTTT or native platform conditions to adjust your routine based on weather or calendar events.</li><li><strong>Multi-Room Progression:</strong> Create a routine that follows you through your home, activating different devices as you move from bedroom to bathroom to kitchen.</li><li><strong>Voice-Only Additions:</strong> Add voice-only elements like motivational quotes or reminders that don\'t appear in the app interface.</li></ul>'
        },
        {
          id: 'product-recommendations',
          type: 'product',
          heading: 'Recommended Products for Morning Routines',
          products: [
            {
              title: 'Philips Hue White and Color Ambiance Starter Kit',
              description: 'Perfect for wake-up lighting with millions of colors and warm-to-cool white options',
              link: 'https://www.philips-hue.com/starter-kits',
              image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
              price: '$199.99',
              rating: 4.7
            },
            {
              title: 'Amazon Echo Show 8',
              description: 'Smart display with 8-inch HD screen, perfect as a bedside morning routine hub',
              link: 'https://www.amazon.com/echo-show-8',
              image: 'https://images.unsplash.com/photo-1543512214-318c7553f230',
              price: '$129.99',
              rating: 4.6
            },
            {
              title: 'Lutron Serena Smart Blinds',
              description: 'Automated window coverings for natural wake-up lighting',
              link: 'https://www.lutron.com/serena',
              image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
              price: '$599.99',
              rating: 4.5
            }
          ]
        },
        {
          id: 'common-problems',
          type: 'quote',
          heading: 'Troubleshooting Common Issues',
          content: 'The most important element of a successful smart home routine is reliability. If your morning routine works only some of the time, you\'ll quickly lose trust in the system. Take time to troubleshoot issues, ensure all devices have strong connections, and create manual backups (like traditional alarms) while you\'re establishing your routine.',
          attribution: 'Smart Home Expert John Davis'
        },
        {
          id: 'routine-code',
          type: 'code',
          heading: 'Home Assistant Morning Routine YAML',
          language: 'YAML',
          code: 'alias: Morning Routine\ntrigger:\n  - platform: time\n    at: \"06:30:00\"\ncondition:\n  - condition: time\n    weekday:\n      - mon\n      - tue\n      - wed\n      - thu\n      - fri\naction:\n  - service: light.turn_on\n    entity_id: light.bedroom\n    data:\n      brightness_pct: 1\n      color_temp: 500\n  - delay: 300\n  - service: light.turn_on\n    entity_id: light.bedroom\n    data:\n      brightness_pct: 100\n      transition: 900\n      color_temp: 250\n  - delay: 900\n  - service: switch.turn_on\n    entity_id: switch.coffee_maker\n  - service: media_player.volume_set\n    data:\n      entity_id: media_player.bedroom_speaker\n      volume_level: 0.4\n  - service: media_player.play_media\n    target:\n      entity_id: media_player.bedroom_speaker\n    data:\n      media_content_id: news_briefing\n      media_content_type: news\n  - service: climate.set_temperature\n    data:\n      entity_id: climate.home\n      temperature: 22',
          content: 'For advanced users who prefer Home Assistant, this YAML code creates a comprehensive morning routine that gradually brightens lights, makes coffee, plays the news, and adjusts your thermostat.'
        },
        {
          id: 'comparison',
          type: 'comparison-table',
          heading: 'Smart Home Platform Comparison for Routines',
          tableData: {
            headers: ['Feature', 'Amazon Alexa', 'Google Home', 'Apple HomeKit', 'Home Assistant'],
            rows: [
              ['Ease of Setup', 'Very Easy', 'Easy', 'Moderate', 'Complex'],
              ['Customization', 'Good', 'Moderate', 'Limited', 'Excellent'],
              ['Device Compatibility', 'Excellent', 'Very Good', 'Limited', 'Outstanding'],
              ['Conditional Logic', 'Basic', 'Basic', 'Limited', 'Advanced'],
              ['Voice Control Quality', 'Excellent', 'Excellent', 'Good', 'Depends on Integration'],
              ['Local Processing', 'No', 'No', 'Some', 'Yes']
            ]
          }
        },
        {
          id: 'checklist',
          type: 'list',
          heading: 'Morning Routine Checklist',
          items: [
            { text: 'Choose your primary smart home platform' },
            { text: 'Identify which morning tasks you want to automate' },
            { text: 'Purchase any required devices' },
            { text: 'Install devices according to manufacturer instructions' },
            { text: 'Create a basic routine and test it' },
            { text: 'Gradually add more complexity' },
            { text: 'Adjust timing based on your actual usage' },
            { text: 'Create variations for weekends or special occasions' },
            { text: 'Set up backup systems for critical functions like alarms' }
          ]
        }
      ],
      recommendations: [
        {
          title: 'Google Nest Hub (2nd Gen)',
          description: 'Smart display with sleep tracking and gentle wake-up features',
          link: 'https://store.google.com/product/nest_hub_2nd_gen',
          image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
          price: '$99.99',
          rating: 4.6
        },
        {
          title: 'TP-Link Kasa Smart Wi-Fi Plug Mini',
          description: 'Make any appliance smart with these reliable, compact plugs',
          link: 'https://www.kasasmart.com/products/kasa-smart-wifi-plug-mini',
          image: 'https://images.unsplash.com/photo-1558075295-33158cb67233',
          price: '$39.99',
          rating: 4.7
        },
        {
          title: 'Philips Hue White Ambiance A19 Starter Kit',
          description: 'Perfect lighting for wake-up routines with adjustable color temperature',
          link: 'https://www.philips-hue.com/white-ambiance',
          image: 'https://images.unsplash.com/photo-1558002038-1055e2e89a5c',
          price: '$119.99',
          rating: 4.8
        }
      ]
    },
    {
      id: 4,
      title: 'Amazon Alexa vs. Google Assistant: Which is Better?',
      slug: 'amazon-alexa-vs-google-assistant-which-is-better',
      category: 'Voice Assistants',
      publishDate: new Date('2024-02-20'),
      content: 'A detailed comparison of the most popular voice assistants...',
      description: 'Compare the features, compatibility and performance of the top voice assistants.',
      featured: true,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Voice Assistants',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 5,
      title: 'How to Reduce Energy Consumption with Smart Thermostats',
      slug: 'how-to-reduce-energy-consumption-with-smart-thermostats',
      category: 'Energy Efficiency',
      publishDate: new Date('2024-01-15'),
      content: 'Smart thermostats can help you save energy and money...',
      description: 'Learn how to optimize your home climate control system for maximum energy savings.',
      featured: false,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Thermostats',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 6,
      title: 'The Best Smart Refrigerators of 2024',
      slug: 'the-best-smart-refrigerators-of-2024',
      category: 'Smart Appliances',
      publishDate: new Date('2024-03-10'),
      content: 'A review of the latest smart refrigerators...',
      description: 'Discover the top smart refrigerators with the best features for modern homes.',
      featured: true,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Refrigerators',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 7,
      title: 'Build Your Own Smart Mirror: A Step-by-Step Guide',
      slug: 'build-your-own-smart-mirror-a-step-by-step-guide',
      category: 'DIY Smart Home Projects',
      publishDate: new Date('2024-02-05'),
      content: 'Create a custom smart mirror with these instructions...',
      description: 'Follow this comprehensive guide to building your own smart mirror from scratch.',
      featured: false,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Mirrors',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 8,
      title: 'Optimizing Your Wi-Fi Network for Smart Home Devices',
      slug: 'optimizing-your-wi-fi-network-for-smart-home-devices',
      category: 'Wi-Fi & Connectivity',
      publishDate: new Date('2024-01-25'),
      content: 'Tips to improve connectivity for all your smart devices...',
      description: 'Learn expert techniques to strengthen your home network for reliable smart device operation.',
      featured: false,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Wi-Fi Optimization',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 9,
      title: 'Top 5 Apps to Control Your Smart Home',
      slug: 'top-5-apps-to-control-your-smart-home',
      category: 'Smart Home Apps',
      publishDate: new Date('2024-03-15'),
      content: 'The best apps for managing your smart home ecosystem...',
      description: 'Discover the most powerful and user-friendly apps to control your entire smart home.',
      featured: true,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Home Apps',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 10,
      title: 'How to Connect Philips Hue with Samsung SmartThings',
      slug: 'how-to-connect-philips-hue-with-samsung-smartthings',
      category: 'Device Integrations',
      publishDate: new Date('2024-02-10'),
      content: 'A guide to connecting different smart home ecosystems...',
      description: 'Step-by-step instructions for integrating your Philips Hue lights with Samsung SmartThings.',
      featured: false,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Device Integration',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 11,
      title: 'CES 2024: The Latest Smart Home Innovations',
      slug: 'ces-2024-the-latest-smart-home-innovations',
      category: 'Industry News & Updates',
      publishDate: new Date('2024-01-20'),
      content: 'Coverage of the newest smart home technologies from CES...',
      description: 'A comprehensive roundup of the most exciting smart home products unveiled at CES 2024.',
      featured: true,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to CES 2024',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 12,
      title: 'Enhancing Home Security with Smart Doorbell Cameras',
      slug: 'enhancing-home-security-with-smart-doorbell-cameras',
      category: 'Home Security',
      publishDate: new Date('2024-03-20'),
      content: 'How doorbell cameras can improve your home security system...',
      description: 'Learn how smart doorbell cameras provide an essential layer of security for your home.',
      featured: false,
      sections: [
        {
          id: 'introduction',
          heading: 'Introduction to Smart Doorbell Cameras',
          content: 'Basic introduction content...'
        }
      ]
    },
    {
      id: 13,
      title: 'Top 5 Security Cameras for 2024',
      slug: 'top-5-security-cameras-for-2024',
      category: 'Home Security',
      publishDate: new Date('2024-03-25'),
      content: 'Review of the best security cameras available today...',
      description: 'Our expert analysis of the most effective home security cameras on the market in 2024.',
      featured: true,
      template: 'product-review',
      headerImage: 'https://example.com/images/security-cameras.jpg',
      author: 'Sarah Adams',
      tags: ['security', 'cameras', 'reviews', 'comparisons'],
      sections: [
        {
          id: 'intro',
          heading: 'Introduction',
          content: 'Home security cameras have become essential for modern home protection. In this article, we compare the top options available in 2024 based on image quality, smart features, reliability, and value.'
        }
      ],
      contentBlocks: [
        {
          id: 'overview',
          type: 'text',
          heading: 'When choosing a security camera, you need to consider factors like resolution, field of view, night vision capabilities, and smart integrations. Our testing process evaluated cameras across multiple environments and usage scenarios.'
        },
        {
          id: 'top-pick',
          type: 'product',
          heading: '1. Arlo Pro 5',
          products: [
            {
              title: 'Arlo Pro 5',
              description: 'The best overall security camera with 4K resolution, color night vision, and 180-degree field of view.',
              link: '/products/arlo-pro-5',
              image: 'arlo-pro-5.jpg',
              price: '$249.99',
              rating: 4.9,
              specs: {
                'Resolution': '4K UHD',
                'Field of View': '180°',
                'Night Vision': 'Color',
                'Weather Resistance': 'IP65',
                'Battery Life': 'Up to 6 months'
              }
            }
          ],
          content: 'The Arlo Pro 5 stands out with exceptional video quality even in low light conditions. Its advanced motion detection can distinguish between people, animals, vehicles, and packages, reducing false alerts significantly.'
        },
        {
          id: 'runner-up',
          type: 'product',
          heading: '2. Google Nest Cam (Battery)',
          products: [
            {
              title: 'Google Nest Cam (Battery)',
              description: 'Premium wireless camera with on-device AI for smarter notifications.',
              link: '/products/nest-cam-battery',
              image: 'nest-cam-battery.jpg',
              price: '$179.99',
              rating: 4.7,
              specs: {
                'Resolution': '1080p HD',
                'Field of View': '130°',
                'Night Vision': 'HDR',
                'Weather Resistance': 'IP54',
                'Battery Life': 'Up to 3 months'
              }
            }
          ],
          content: 'Google\'s Nest Cam brings together excellent hardware with industry-leading AI. The on-device processing means faster alerts and better privacy by reducing cloud dependencies.'
        },
        {
          id: 'budget-pick',
          type: 'product',
          heading: '3. Wyze Cam v4',
          products: [
            {
              title: 'Wyze Cam v4',
              description: 'The best budget camera that doesn\'t compromise on essential features.',
              link: '/products/wyze-cam-v4',
              image: 'wyze-cam-v4.jpg',
              price: '$35.99',
              rating: 4.5,
              specs: {
                'Resolution': '1080p HD',
                'Field of View': '120°',
                'Night Vision': 'IR',
                'Weather Resistance': 'Indoor only',
                'Power': 'Wired'
              }
            }
          ],
          content: 'Wyze continues to redefine value in the security camera market. The v4 improves on its predecessors with better image quality and more reliable connectivity at a fraction of competitors\' prices.'
        },
        {
          id: 'comparison-table',
          type: 'comparison-table',
          heading: 'Features Comparison',
          tableData: {
            headers: ['Camera', 'Resolution', 'Field of View', 'Weather Resistance', 'Smart Integrations', 'Price'],
            rows: [
              ['Arlo Pro 5', '4K UHD', '180°', 'IP65', 'Alexa, Google, HomeKit', '$249.99'],
              ['Google Nest Cam', '1080p HD', '130°', 'IP54', 'Google, Alexa', '$179.99'],
              ['Wyze Cam v4', '1080p HD', '120°', 'Indoor', 'Alexa, Google', '$35.99'],
              ['Ring Stick Up Cam', '1080p HD', '130°', 'IP65', 'Alexa, Ring', '$99.99'],
              ['Eufy SoloCam E40', '2K HD', '135°', 'IP65', 'Alexa, Google', '$129.99']
            ]
          }
        },
        {
          id: 'conclusion',
          type: 'text',
          content: 'While the Arlo Pro 5 is our top overall pick, the right security camera for you depends on your specific needs and budget. Consider factors like whether you need weather resistance, preference for subscription vs. local storage, and which smart home ecosystem you already use.'
        }
      ],
      recommendations: [
        {
          title: 'Arlo Pro 5',
          description: 'The best overall security camera with 4K resolution and color night vision.',
          link: '/products/arlo-pro-5',
          image: 'arlo-pro-5.jpg',
          price: '$249.99',
          rating: 4.9
        },
        {
          title: 'Google Nest Cam (Battery)',
          description: 'Premium wireless camera with on-device AI for smarter notifications.',
          link: '/products/nest-cam-battery',
          image: 'nest-cam-battery.jpg',
          price: '$179.99',
          rating: 4.7
        },
        {
          title: 'Wyze Cam v4',
          description: 'The best budget camera that doesn\'t compromise on essential features.',
          link: '/products/wyze-cam-v4',
          image: 'wyze-cam-v4.jpg',
          price: '$35.99',
          rating: 4.5
        }
      ]
    },
    {
      id: 14,
      title: 'How to Install a Smart Doorbell Camera Yourself',
      slug: 'how-to-install-a-smart-doorbell-camera-yourself',
      category: 'DIY Smart Home Projects',
      publishDate: new Date('2024-03-18'),
      content: 'A comprehensive guide to installing your own smart doorbell...',
      description: 'Follow this step-by-step tutorial to set up a smart doorbell camera without hiring a professional.',
      featured: false,
      template: 'tutorial',
      headerImage: 'https://example.com/images/doorbell-installation.jpg',
      author: 'Mike Richards',
      tags: ['DIY', 'installation', 'doorbell', 'tutorial'],
      sections: [
        {
          id: 'intro',
          heading: 'Introduction',
          content: 'Installing a smart doorbell camera is a straightforward DIY project that can enhance your home security in just an hour or two. This guide will walk you through the process step by step.'
        }
      ],
      contentBlocks: [
        {
          id: 'materials',
          type: 'list',
          heading: 'What You\'ll Need',
          items: [
            { text: 'Smart doorbell camera of your choice' },
            { text: 'Screwdriver (usually Phillips head)' },
            { text: 'Drill with appropriate bits' },
            { text: 'Wire strippers/cutters (if hardwiring)' },
            { text: 'Level' },
            { text: 'Pencil' },
            { text: 'Voltage tester (for hardwired installation)' }
          ]
        },
        {
          id: 'step1',
          type: 'image',
          heading: 'Step 1: Turn Off Power',
          imageUrl: 'doorbell-breaker.jpg',
          imageAlt: 'Circuit breaker box with doorbell circuit switched off',
          content: 'If you\'re installing a hardwired doorbell, locate your home\'s circuit breaker box and turn off power to the doorbell circuit. Use a voltage tester to confirm the power is off before proceeding.'
        },
        {
          id: 'step2',
          type: 'image',
          heading: 'Step 2: Remove Existing Doorbell',
          imageUrl: 'remove-doorbell.jpg',
          imageAlt: 'Removing an existing doorbell button',
          content: 'Unscrew and carefully remove your existing doorbell button. Take note of the wires connected to it - typically you\'ll have two wires. Take a photo for reference if needed.'
        },
        {
          id: 'step3',
          type: 'image',
          heading: 'Step 3: Install Mounting Bracket',
          imageUrl: 'mounting-bracket.jpg',
          imageAlt: 'Installing the doorbell mounting bracket',
          content: 'Attach the mounting bracket that came with your smart doorbell to the wall. Use the included level to ensure it\'s straight before marking screw holes. If your doorbell manufacturer provides a drilling template, use it for more precise installation.'
        },
        {
          id: 'step4',
          type: 'image',
          heading: 'Step 4: Connect the Wires',
          imageUrl: 'connect-wires.jpg',
          imageAlt: 'Connecting doorbell wires',
          content: 'Connect the existing doorbell wires to the terminals on your smart doorbell or its mounting bracket. Most doorbells aren\'t polarity-sensitive, so it doesn\'t matter which wire goes to which terminal. If your doorbell is battery-powered, insert the battery according to manufacturer instructions.'
        },
        {
          id: 'step5',
          type: 'image',
          heading: 'Step 5: Attach the Doorbell',
          imageUrl: 'attach-doorbell.jpg',
          imageAlt: 'Attaching the doorbell to the mounting bracket',
          content: 'Carefully align your smart doorbell with the mounting bracket and press it into place until you hear it click or it feels secure. Some models may require additional screws to secure the doorbell to the bracket.'
        },
        {
          id: 'step6',
          type: 'text',
          heading: 'Step 6: Restore Power and Set Up',
          content: 'Turn the power back on at the circuit breaker. Follow the manufacturer\'s instructions to connect your doorbell to your WiFi network and complete the setup through their mobile app.'
        },
        {
          id: 'troubleshooting',
          type: 'text',
          heading: 'Troubleshooting Tips',
          content: 'If your doorbell isn\'t powering on, first check that you\'ve restored power at the breaker. If it still doesn\'t work, you may need a doorbell transformer with higher voltage output. Most smart doorbells require at least 16V AC. If your WiFi connection is weak, consider installing a WiFi extender near your front door.'
        },
        {
          id: 'product-recommendation',
          type: 'product',
          heading: 'Recommended Smart Doorbells',
          products: [
            {
              title: 'Ring Video Doorbell 4',
              description: 'Easy to install with both hardwired and battery options',
              link: '/products/ring-doorbell-4',
              image: 'ring-doorbell.jpg',
              price: '$199.99',
              rating: 4.7
            },
            {
              title: 'Google Nest Doorbell',
              description: 'Superior AI detection with package, person, and animal recognition',
              link: '/products/nest-doorbell',
              image: 'nest-doorbell.jpg',
              price: '$179.99',
              rating: 4.6
            }
          ]
        }
      ],
      recommendations: [
        {
          title: 'Ring Video Doorbell 4',
          description: 'Easy to install with both hardwired and battery options',
          link: '/products/ring-doorbell-4',
          image: 'ring-doorbell.jpg',
          price: '$199.99',
          rating: 4.7
        },
        {
          title: 'Doorbell Transformer Adapter',
          description: 'Upgrade your existing doorbell transformer for compatibility with smart doorbells',
          link: '/products/doorbell-transformer',
          image: 'doorbell-transformer.jpg',
          price: '$24.99',
          rating: 4.3
        }
      ]
    },
    {
      id: 15,
      title: '10 Must-Have Smart Home Gadgets for 2024',
      slug: '10-must-have-smart-home-gadgets-for-2024',
      category: 'Smart Appliances',
      publishDate: new Date('2024-04-01'),
      content: 'A comprehensive guide to the best smart home gadgets available today.',
      description: 'Our experts have tested dozens of smart home devices to bring you the ultimate list of must-have gadgets for the modern home.',
      featured: true,
      template: 'product-review',
      headerImage: 'https://images.unsplash.com/photo-1558002038-1055e2e89a5c',
      author: 'Tech Review Team',
      tags: ['gadgets', 'smart home', 'reviews', 'recommendations', 'tech'],
      sections: [
        {
          id: 'intro',
          heading: 'Introduction to Smart Home Gadgets',
          content: 'Smart home technology has evolved rapidly over the past few years, transforming our living spaces into hubs of convenience, efficiency, and entertainment. From voice-controlled assistants to automated security systems, these innovations make our homes more responsive to our needs while offering unprecedented control, often from the palm of our hand. In this article, we\'ve compiled our expert recommendations for the top 10 smart home gadgets that deliver the best combination of functionality, reliability, and value for money in 2024.'
        }
      ],
      contentBlocks: [
        {
          id: 'selection-criteria',
          type: 'text',
          heading: 'How We Selected These Products',
          content: 'Our team spent over 200 hours testing more than 50 smart home devices across various categories. We evaluated each product based on ease of installation, reliability of connection, app interface quality, integration with other smart home systems, privacy features, and overall performance. Only products that excelled across these criteria made it to our final list.'
        },
        {
          id: 'product-1',
          type: 'product',
          heading: 'Sonos Era 300 Smart Speaker',
          products: [
            {
              title: 'Sonos Era 300',
              description: 'The ultimate smart speaker with spatial audio and multi-room capability',
              link: 'https://www.sonos.com/products/era-300',
              image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d',
              price: '$449.99',
              rating: 4.8,
              specs: {
                'Connectivity': 'Wi-Fi, Bluetooth, AirPlay 2',
                'Voice Assistants': 'Amazon Alexa, Sonos Voice Control',
                'Room Calibration': 'Trueplay',
                'Audio': 'Spatial Audio with Dolby Atmos support',
                'Item Number': 'SON-ERA300-BLK'
              }
            }
          ],
          content: 'The Sonos Era 300 represents a significant leap forward in smart speaker technology. With its innovative acoustic architecture designed specifically for spatial audio, this speaker delivers an immersive listening experience that makes it feel like you\'re surrounded by sound. The Era 300 easily integrates with your existing smart home setup and supports both Amazon Alexa and Sonos Voice Control for hands-free operation.'
        },
        {
          id: 'product-2',
          type: 'product',
          heading: 'Ecobee Smart Thermostat Premium',
          products: [
            {
              title: 'Ecobee Smart Thermostat Premium',
              description: 'Energy-efficient smart thermostat with built-in air quality monitoring',
              link: 'https://www.ecobee.com/smart-thermostat-premium',
              image: 'https://images.unsplash.com/photo-1567086053748-8d3c962a3c68',
              price: '$249.99',
              rating: 4.7,
              specs: {
                'Connectivity': 'Wi-Fi, Bluetooth',
                'Voice Assistants': 'Amazon Alexa, Google Assistant, Siri',
                'Sensors': 'Temperature, Humidity, Occupancy, Air Quality',
                'Smart Home Integration': 'HomeKit, SmartThings, IFTTT',
                'Item Number': 'EB-STP-01'
              }
            }
          ],
          content: 'The Ecobee Smart Thermostat Premium goes beyond temperature control with its built-in air quality monitor that tracks VOCs and CO2 levels in your home. The sleek, glass-fronted design houses a responsive touchscreen interface, while the included SmartSensor helps eliminate hot and cold spots by measuring temperature in different rooms. With an average energy savings of 26% annually, this thermostat typically pays for itself within a year of installation.'
        },
        {
          id: 'product-3',
          type: 'product',
          heading: 'Level Lock+ Smart Lock',
          products: [
            {
              title: 'Level Lock+',
              description: 'Invisible smart lock with Apple Home Key support',
              link: 'https://level.co/products/lock-plus',
              image: 'https://images.unsplash.com/photo-1582649033333-9bc14a9cfb85',
              price: '$329.99',
              rating: 4.6,
              specs: {
                'Connectivity': 'Bluetooth, NFC',
                'Smart Home Integration': 'Apple HomeKit, Home Key',
                'Power': 'CR2 Battery (up to 12 months)',
                'Features': 'Auto-Unlock, Tap-to-Unlock, Key Card',
                'Item Number': 'LVL-LOCK-PLUS-SATIN'
              }
            }
          ],
          content: 'The Level Lock+ is the first smart lock to support Apple Home Key, allowing you to simply tap your iPhone or Apple Watch to unlock your door. What makes this lock truly unique is its invisible design – all the technology is hidden inside your door, maintaining your home\'s aesthetic while adding cutting-edge functionality. Installation takes about 15 minutes and only requires a screwdriver, making it one of the easiest smart locks to set up.'
        },
        {
          id: 'product-4',
          type: 'product',
          heading: 'Arlo Pro 5 Security Camera',
          products: [
            {
              title: 'Arlo Pro 5',
              description: '2K HDR security camera with color night vision and 180° field of view',
              link: 'https://www.arlo.com/products/arlo-pro-5',
              image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb',
              price: '$249.99',
              rating: 4.9,
              specs: {
                'Resolution': '2K HDR with 180° viewing angle',
                'Night Vision': 'Color night vision with integrated spotlight',
                'Weather Resistance': 'IP65 weatherproof',
                'Battery Life': 'Up to 6 months per charge',
                'Item Number': 'ARLO-PRO5-1CAM'
              }
            }
          ],
          content: 'The Arlo Pro 5 leads our list of security cameras with its exceptional video quality and advanced AI features. The camera\'s ability to distinguish between people, vehicles, animals, and packages means you\'ll receive relevant notifications without constant false alarms. The integrated spotlight enables color night vision, providing crucial details that traditional infrared cameras miss. With local storage options and flexible mounting possibilities, the Pro 5 offers security without compromise.'
        },
        {
          id: 'product-5',
          type: 'product',
          heading: 'Philips Hue White and Color Ambiance',
          products: [
            {
              title: 'Philips Hue White and Color Ambiance (4-pack)',
              description: 'Premium smart bulbs with 16 million colors and seamless ecosystem integration',
              link: 'https://www.philips-hue.com/products/smart-bulbs',
              image: 'https://images.unsplash.com/photo-1589326366787-a9cae1a29844',
              price: '$199.99',
              rating: 4.8,
              specs: {
                'Bulb Type': 'A19 E26 LED',
                'Brightness': '1100 lumens',
                'Connectivity': 'Bluetooth, Zigbee (with Hue Bridge)',
                'Lifespan': '25,000 hours',
                'Item Number': 'PHI-HUE-COLOR-4PK'
              }
            }
          ],
          content: 'Philips Hue remains the gold standard for smart lighting with their White and Color Ambiance bulbs. These energy-efficient LEDs offer 16 million colors and can be controlled via the Hue app, voice commands, or through integrations with every major smart home platform. What sets Hue apart is their robust ecosystem of accessories, reliable performance, and regular software updates that continue to add functionality years after purchase.'
        },
        {
          id: 'product-6',
          type: 'product',
          heading: 'Google Nest Hub Max',
          products: [
            {
              title: 'Google Nest Hub Max',
              description: '10-inch smart display with built-in Nest Cam and premium audio',
              link: 'https://store.google.com/product/nest_hub_max',
              image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
              price: '$229.99',
              rating: 4.7,
              specs: {
                'Display': '10-inch HD touchscreen',
                'Camera': '6.5MP with 127° field of view',
                'Speakers': 'Stereo speakers with 30W subwoofer',
                'Smart Home Control': 'Matter, Thread, Zigbee compatible',
                'Item Number': 'GA00639-US'
              }
            }
          ],
          content: 'The Google Nest Hub Max serves as the perfect command center for your smart home. Its 10-inch display is ideal for controlling devices, viewing security cameras, following recipes, or enjoying video calls with the built-in camera that automatically pans and zooms to keep you in frame. The integrated Nest Cam can monitor your home when you\'re away, while the surprisingly powerful speakers deliver room-filling sound for music and podcasts.'
        },
        {
          id: 'product-7',
          type: 'product',
          heading: 'Roborock S8 Pro Ultra',
          products: [
            {
              title: 'Roborock S8 Pro Ultra',
              description: 'Self-emptying robot vacuum and mop with AI obstacle avoidance',
              link: 'https://us.roborock.com/products/roborock-s8-pro-ultra',
              image: 'https://images.unsplash.com/photo-1663624653182-70e1949cac76',
              price: '$1,399.99',
              rating: 4.8,
              specs: {
                'Suction Power': '6000Pa',
                'Mop System': 'Sonic vibration up to 3000 times/min',
                'Runtime': 'Up to 180 minutes',
                'Self-Maintenance': 'Auto-empty, self-cleaning, self-refilling',
                'Item Number': 'RBR-S8PRO-ULTRA'
              }
            }
          ],
          content: 'The Roborock S8 Pro Ultra represents the pinnacle of cleaning automation with its all-in-one dock that empties the dust bin, washes the mop, and refills the water tank. The S8\'s dual rubber brushes and 6000Pa suction handle pet hair and debris with ease, while the sonic mopping system scrubs floors up to 3000 times per minute. The reactive 3D scanning technology intelligently avoids obstacles like shoes, cords, and pet waste, making it truly worry-free.'
        },
        {
          id: 'product-8',
          type: 'product',
          heading: 'TP-Link Kasa Smart Wi-Fi Plug Mini',
          products: [
            {
              title: 'TP-Link Kasa Smart Wi-Fi Plug Mini (4-pack)',
              description: 'Compact smart plugs with energy monitoring and no hub required',
              link: 'https://www.kasasmart.com/products/kasa-smart-wifi-plug-mini',
              image: 'https://images.unsplash.com/photo-1558075295-33158cb67233',
              price: '$39.99',
              rating: 4.7,
              specs: {
                'Connectivity': 'Wi-Fi 2.4GHz',
                'Dimensions': '1.5 × 1.6 × 2.6 inches',
                'Maximum Load': '15A/1800W',
                'Features': 'Energy monitoring, schedules, away mode',
                'Item Number': 'KP-115-4PK'
              }
            }
          ],
          content: 'The TP-Link Kasa Smart Plugs are the most affordable way to add smart functionality to any device with a plug. Despite their budget-friendly price, they offer premium features like energy monitoring, reliable connectivity, and robust scheduling options. Their compact design ensures you can fit two plugs in a standard outlet, and they work with all major voice assistants without requiring a separate hub.'
        },
        {
          id: 'product-9',
          type: 'product',
          heading: 'Ring Battery Doorbell Pro',
          products: [
            {
              title: 'Ring Battery Doorbell Pro',
              description: 'Advanced video doorbell with head-to-toe HD+ video and 3D motion detection',
              link: 'https://ring.com/products/battery-doorbell-pro',
              image: 'https://images.unsplash.com/photo-1558979869-aea13d285bc3',
              price: '$229.99',
              rating: 4.6,
              specs: {
                'Resolution': '1536p HD+ with HDR',
                'Field of View': '150° horizontal, 150° vertical',
                'Power': 'Rechargeable battery or hardwired',
                'Features': '3D motion detection, pre-roll video capture',
                'Item Number': 'RNG-BDP-SATIN'
              }
            }
          ],
          content: 'Ring\'s newest Battery Doorbell Pro offers installation flexibility with either battery or hardwired power options, while delivering premium features like head-to-toe video that shows packages left at your doorstep. The 3D motion detection provides precise alerts with exact distance measurements, and the color pre-roll feature captures four seconds of video before motion is detected, ensuring you never miss the beginning of an event.'
        },
        {
          id: 'product-10',
          type: 'product',
          heading: 'Chamberlain myQ Smart Garage Control',
          products: [
            {
              title: 'Chamberlain myQ Smart Garage Control',
              description: 'Universal smart garage door controller with secure in-garage delivery',
              link: 'https://www.myq.com/products/smart-garage-control',
              image: 'https://images.unsplash.com/photo-1520520731457-9283dd14aa66',
              price: '$29.99',
              rating: 4.5,
              specs: {
                'Compatibility': 'Works with most garage door openers after 1993',
                'Connectivity': 'Wi-Fi 2.4GHz',
                'Additional Features': 'Amazon Key In-Garage Delivery compatible',
                'Installation': 'No wiring needed, 15-minute setup',
                'Item Number': 'MYQ-G0401'
              }
            }
          ],
          content: 'The Chamberlain myQ Smart Garage Control offers exceptional value, transforming your existing garage door opener into a smart device for under $30. Beyond the convenience of remotely controlling your garage door, the myQ enables Amazon Key In-Garage Delivery, allowing couriers to securely place packages in your garage while you\'re away. The system provides real-time notifications when your garage door opens or closes, adding peace of mind to its convenience features.'
        },
        {
          id: 'comparison',
          type: 'comparison-table',
          heading: 'Quick Comparison of Top Smart Home Gadgets',
          tableData: {
            headers: ['Product', 'Best For', 'Price', 'Key Feature', 'Smart Home Compatibility'],
            rows: [
              ['Sonos Era 300', 'Audio Enthusiasts', '$449.99', 'Spatial Audio', 'Alexa, AirPlay 2'],
              ['Ecobee Smart Thermostat', 'Energy Savings', '$249.99', 'Air Quality Monitoring', 'Alexa, Google, HomeKit, SmartThings'],
              ['Level Lock+', 'Minimalists', '$329.99', 'Invisible Design', 'Apple HomeKit'],
              ['Arlo Pro 5', 'Security', '$249.99', 'Color Night Vision', 'Alexa, Google, HomeKit, IFTTT'],
              ['Philips Hue Bulbs', 'Mood Lighting', '$199.99/4pk', 'Rich Ecosystem', 'All major platforms'],
              ['Nest Hub Max', 'Smart Home Control', '$229.99', 'Built-in Nest Cam', 'Google, Matter'],
              ['Roborock S8 Pro Ultra', 'Automated Cleaning', '$1,399.99', 'Self-Maintenance', 'Alexa, Google'],
              ['TP-Link Kasa Plugs', 'Budget Automation', '$39.99/4pk', 'Energy Monitoring', 'Alexa, Google'],
              ['Ring Doorbell Pro', 'Home Security', '$229.99', 'Head-to-Toe View', 'Alexa, Works with Ring'],
              ['myQ Garage Control', 'In-Garage Delivery', '$29.99', 'Amazon Key Compatible', 'Alexa, Google']
            ]
          }
        },
        {
          id: 'conclusion',
          type: 'text',
          heading: 'Building Your Smart Home Ecosystem',
          content: 'When building your smart home, we recommend starting with a foundation of the most impactful devices – typically a smart speaker or display as your control center, followed by lighting and security devices. Consider which ecosystem (Apple HomeKit, Amazon Alexa, or Google Home) works best for your needs before expanding your collection.<br><br>Focus on solving real problems rather than buying gadgets for novelty. For example, if you frequently forget whether you closed your garage door, the myQ controller provides tremendous value. If security is your primary concern, start with the Arlo camera and Ring doorbell.<br><br>As the Matter standard continues to gain adoption, cross-platform compatibility is improving, but it\'s still worth checking that new devices will work with your existing setup before purchasing.'
        }
      ],
      recommendations: [
        {
          title: 'Sonos Era 300',
          description: 'Premium smart speaker with spatial audio and multi-room capability',
          link: 'https://www.sonos.com/products/era-300',
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d',
          price: '$449.99',
          rating: 4.8
        },
        {
          title: 'Arlo Pro 5',
          description: '2K HDR security camera with color night vision and 180° field of view',
          link: 'https://www.arlo.com/products/arlo-pro-5',
          image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb',
          price: '$249.99',
          rating: 4.9
        },
        {
          title: 'Ecobee Smart Thermostat Premium',
          description: 'Energy-efficient smart thermostat with built-in air quality monitoring',
          link: 'https://www.ecobee.com/smart-thermostat-premium',
          image: 'https://images.unsplash.com/photo-1567086053748-8d3c962a3c68',
          price: '$249.99',
          rating: 4.7
        }
      ]
    }
  ];

  private filteredBlogs: Blog[] = [...this.allBlogs];
  private blogsToDisplaySubject = new BehaviorSubject<Blog[]>(this.allBlogs);
  blogsToDisplay$ = this.blogsToDisplaySubject.asObservable();

  private paginationInfoSubject = new BehaviorSubject<PaginationInfo>({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: this.allBlogs.length,
    totalPages: Math.ceil(this.allBlogs.length / 6)
  });
  paginationInfo$ = this.paginationInfoSubject.asObservable();

  constructor() {
    this.updatePagination(1);
  }

  getCategories(): string[] {
    return this.categories;
  }

  getBlogBySlug(slug: string): Blog | undefined {
    return this.allBlogs.find(blog => blog.slug === slug);
  }

  getRelatedBlogs(blogId: number, category: string, limit: number = 3): Blog[] {
    return this.allBlogs
      .filter(blog => blog.category === category && blog.id !== blogId)
      .slice(0, limit);
  }

  filterByCategory(category: string | null) {
    if (!category) {
      this.filteredBlogs = [...this.allBlogs];
    } else {
      this.filteredBlogs = this.allBlogs.filter(blog => blog.category === category);
    }
    
    this.updatePagination(1);
    console.log('Filtered blogs by category:', category, this.filteredBlogs);
  }

  filterByDate(startDate: Date, endDate: Date) {
    this.filteredBlogs = this.allBlogs.filter(blog => {
      return blog.publishDate >= startDate && blog.publishDate <= endDate;
    });
    
    this.updatePagination(1);
    console.log('Filtered blogs by date:', startDate, endDate, this.filteredBlogs);
  }

  setItemsPerPage(itemsPerPage: number) {
    const currentInfo = this.paginationInfoSubject.value;
    this.updatePagination(1, itemsPerPage);
  }

  goToPage(pageNumber: number) {
    this.updatePagination(pageNumber);
  }

  private updatePagination(page: number, itemsPerPage?: number) {
    const currentInfo = this.paginationInfoSubject.value;
    const newItemsPerPage = itemsPerPage || currentInfo.itemsPerPage;
    
    const totalItems = this.filteredBlogs.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / newItemsPerPage));
    
    // Ensure we don't go beyond available pages
    const validPage = Math.min(Math.max(1, page), totalPages);
    
    // Update pagination info
    this.paginationInfoSubject.next({
      currentPage: validPage,
      itemsPerPage: newItemsPerPage,
      totalItems,
      totalPages
    });
    
    // Calculate slice for current page
    const startIndex = (validPage - 1) * newItemsPerPage;
    const endIndex = Math.min(startIndex + newItemsPerPage, totalItems);
    
    // Update displayed blogs
    const paginatedBlogs = this.filteredBlogs.slice(startIndex, endIndex);
    this.blogsToDisplaySubject.next(paginatedBlogs);
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  }

  searchBlogs(query: string): Blog[] {
    query = query.toLowerCase().trim();
    
    if (!query) return [];

    return this.allBlogs.filter(blog => {
      // Check title and description (higher priority)
      if (blog.title.toLowerCase().includes(query) || 
          blog.description.toLowerCase().includes(query)) {
        return true;
      }
      
      // Check tags
      if (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query))) {
        return true;
      }
      
      // Check category
      if (blog.category.toLowerCase().includes(query)) {
        return true;
      }
      
      // Check sections content
      if (blog.sections && blog.sections.some(section => 
        section.heading.toLowerCase().includes(query) || 
        section.content.toLowerCase().includes(query))) {
        return true;
      }
      
      // Check content blocks if available
      if (blog.contentBlocks && blog.contentBlocks.some(block => {
        if (block.heading && block.heading.toLowerCase().includes(query)) {
          return true;
        }
        if (block.content && block.content.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      })) {
        return true;
      }
      
      return false;
    });
  }
}

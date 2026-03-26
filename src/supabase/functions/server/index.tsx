import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize default activities on startup
const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    title: 'Annual Tech Summit',
    description: 'A flagship event bringing together tech leaders, investors, and innovators from Kosovo and the UK to explore partnership opportunities and showcase cutting-edge solutions.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    fullContent: 'The Annual Tech Summit is our premier event that brings together the brightest minds from Kosovo and the United Kingdom. This multi-day conference features keynote speeches from industry leaders, panel discussions on emerging technologies, networking opportunities, and showcase exhibitions.\n\nThe summit focuses on creating tangible partnerships and investment opportunities, with dedicated sessions for startups to pitch to UK investors, workshops on scaling businesses internationally, and roundtable discussions on regulatory frameworks and market entry strategies.\n\nPrevious summits have resulted in over €5M in direct investments, 30+ partnership agreements, and the establishment of several UK-Kosovo joint ventures in the technology sector.',
    objectives: [
      'Connect technology leaders and decision-makers from both countries',
      'Facilitate direct investment and partnership opportunities',
      'Showcase Kosovo\'s emerging tech ecosystem to international audience',
      'Create actionable roadmaps for bilateral tech collaboration'
    ],
    impact: [
      'Over 500 participants from both countries annually',
      'Generated €5M+ in investments and partnerships',
      '30+ memoranda of understanding signed between UK and Kosovo companies',
      'Featured coverage in major tech and business publications'
    ]
  },
  {
    id: 2,
    title: 'Business Delegation Visits',
    description: 'Facilitating high-level business missions between Kosovo and UK, creating direct connections between companies, government bodies, and investment institutions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    fullContent: 'Our Business Delegation Visits program organizes curated missions that bring UK businesses to Kosovo and Kosovo companies to the UK. These are not tourist visits – they are intensive, focused business development opportunities with pre-arranged meetings, site visits, and networking events.\n\nEach delegation is carefully planned with specific sector focuses, whether it\'s fintech, software development, hardware manufacturing, or digital services. We work closely with both the British Embassy in Pristina and UK trade organizations to ensure maximum value for participants.\n\nDelegations typically include meetings with government officials, visits to tech parks and innovation hubs, one-on-one business matching sessions, and social events that foster informal networking and relationship building.',
    objectives: [
      'Create direct business-to-business connections',
      'Provide market intelligence and entry strategies',
      'Facilitate government and institutional relationships',
      'Build long-term bilateral business networks'
    ],
    impact: [
      '15+ delegations organized with 200+ business representatives',
      'Direct business deals valued at over €3M',
      'Strengthened institutional relationships at government level',
      'Ongoing partnerships and collaboration agreements'
    ]
  },
  {
    id: 3,
    title: 'Skills Development Workshops',
    description: 'Intensive training programs focused on emerging technologies, leadership development, and international business practices to strengthen the capabilities of local tech talent.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    fullContent: 'The Skills Development Workshops program addresses the critical need for advanced technical and business skills in Kosovo\'s growing tech sector. We bring UK experts and trainers to deliver intensive, hands-on workshops on cutting-edge technologies and business practices.\n\nWorkshops cover topics including AI and machine learning, cloud architecture, cybersecurity, agile development methodologies, product management, and international business development. Each workshop is designed to be practical and immediately applicable, with real-world projects and case studies.\n\nWe also offer specialized programs for tech leaders and entrepreneurs, focusing on scaling businesses, fundraising strategies, and building international partnerships. Many participants have gone on to secure funding, expand internationally, or advance to leadership positions.',
    objectives: [
      'Upgrade technical skills to international standards',
      'Develop leadership and entrepreneurial capabilities',
      'Transfer knowledge on international best practices',
      'Create pipeline of globally competitive tech talent'
    ],
    impact: [
      '50+ workshops delivered with 1,000+ participants',
      'Topics ranging from AI/ML to business development',
      'Participants report 40% average skill improvement',
      'Several workshop graduates secured UK employment or partnerships'
    ]
  },
  {
    id: 4,
    title: 'Investor Matchmaking',
    description: 'Connecting Kosovo startups and scale-ups with UK angel investors, venture capital firms, and institutional investors seeking opportunities in emerging markets.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
    fullContent: 'Our Investor Matchmaking program bridges the gap between Kosovo\'s innovative startups and UK investment capital. We carefully curate matches between companies seeking funding and investors looking for opportunities in emerging European markets.\n\nThe program includes pitch coaching, financial modeling support, due diligence preparation, and structured introductions to relevant investors. We work with a network of UK angel investors, venture capital firms, and institutional investors who have expressed interest in the Kosovo market.\n\nCompanies go through a rigorous preparation process including pitch deck development, financial projections, market analysis, and mock pitch sessions. Only investment-ready companies are introduced to our investor network, ensuring high-quality dealflow and successful outcomes.',
    objectives: [
      'Connect investable Kosovo companies with UK capital',
      'Prepare companies to meet international investment standards',
      'Educate investors on Kosovo market opportunities',
      'Facilitate successful funding rounds and exits'
    ],
    impact: [
      'Matched 40+ Kosovo companies with UK investors',
      '€8M+ in funding secured by participating companies',
      'Several successful exits and follow-on funding rounds',
      'Growing network of UK investors active in Kosovo market'
    ]
  },
];

// Initialize default activities if not exists
async function initializeActivities() {
  const existing = await kv.get('activities');
  if (!existing) {
    console.log('Initializing default activities...');
    await kv.set('activities', DEFAULT_ACTIVITIES);
    console.log('Default activities initialized');
  }
}

// Call initialization
initializeActivities();

// Health check endpoint
app.get("/make-server-862435c9/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all activities
app.get("/make-server-862435c9/activities", async (c) => {
  try {
    const activities = await kv.get('activities') || DEFAULT_ACTIVITIES;
    return c.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return c.json({ error: 'Failed to fetch activities' }, 500);
  }
});

// Add new activity
app.post("/make-server-862435c9/activities", async (c) => {
  try {
    const newActivity = await c.req.json();
    const activities = await kv.get('activities') || [];
    
    // Generate new ID
    const maxId = activities.length > 0 ? Math.max(...activities.map((a: any) => a.id)) : 0;
    const activityWithId = { ...newActivity, id: maxId + 1 };
    
    const updatedActivities = [...activities, activityWithId];
    await kv.set('activities', updatedActivities);
    
    return c.json(activityWithId);
  } catch (error) {
    console.error('Error adding activity:', error);
    return c.json({ error: 'Failed to add activity' }, 500);
  }
});

// Update activity
app.put("/make-server-862435c9/activities/:id", async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const updatedData = await c.req.json();
    const activities = await kv.get('activities') || [];
    
    const index = activities.findIndex((a: any) => a.id === id);
    if (index === -1) {
      return c.json({ error: 'Activity not found' }, 404);
    }
    
    activities[index] = { ...updatedData, id };
    await kv.set('activities', activities);
    
    return c.json(activities[index]);
  } catch (error) {
    console.error('Error updating activity:', error);
    return c.json({ error: 'Failed to update activity' }, 500);
  }
});

// Delete activity
app.delete("/make-server-862435c9/activities/:id", async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const activities = await kv.get('activities') || [];
    
    const filteredActivities = activities.filter((a: any) => a.id !== id);
    
    if (filteredActivities.length === activities.length) {
      return c.json({ error: 'Activity not found' }, 404);
    }
    
    await kv.set('activities', filteredActivities);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return c.json({ error: 'Failed to delete activity' }, 500);
  }
});

Deno.serve(app.fetch);
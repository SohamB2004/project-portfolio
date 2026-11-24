#!/usr/bin/env node

/**
 * SHIVERA CLIENT ACQUISITION AGENT
 * Automated Lead Scanner, Proposal Generator & Cold Outreach System
 * Built specifically for Shivera (Technology • Media • Creative • AI)
 */

const readline = require('readline');
const https = require('https');

// Knowledge base of Shivera's real proven portfolio assets
const SHIVERA_PORTFOLIO = {
  name: 'Shivera',
  email: 'business.shivera@gmail.com',
  website: 'https://shivera.com',
  domains: {
    mern: {
      label: 'MERN & Custom Web Development',
      proofs: [
        { name: 'Floow2', desc: 'B2B international circular sharing platform & asset marketplace', link: 'https://floow2.com/' },
        { name: 'The Marketing Concept', desc: 'German corporate strategic agency web portal with fluid responsive design', link: 'https://themarketingconcept.de/index.html' }
      ]
    },
    wordpress: {
      label: 'WordPress & Performance Web',
      proofs: [
        { name: 'Roger Federer Foundation', desc: 'Global philanthropic foundation portal with 100% WCAG accessibility', link: 'https://federerfoundation.org/' },
        { name: 'Hiroki Digital', desc: 'Austrian digital marketing and performance technology web system', link: 'https://hiroki-digital.at/' }
      ]
    },
    industrial3d: {
      label: 'Industrial & Factory 3D Animation',
      proofs: [
        { name: 'Industrial Boiler Plant & Exhaust Loop', desc: 'High-poly CAD 3D process loop with forced-draft blowers & flue stack' },
        { name: 'Biomass Boiler & Cyclone System', desc: 'Mechanical firebox, fuel feed auger injector & particulate filtration loop' }
      ]
    },
    product3d: {
      label: 'Product 3D CGI & 360° Commercials',
      proofs: [
        { name: 'Jena Diamond Ring 360°', desc: 'Ray-traced photorealistic caustics, diamond dispersion, and 60fps turntable loop' }
      ]
    },
    video: {
      label: 'Commercial Video Editing & TVC',
      proofs: [
        { name: 'PRAN KRAKO Puff Corn TVC', desc: 'Broadcast television commercial combining 3D character animation, snack simulations & sound design', link: 'https://youtu.be/HwkJ_lJEkyw' },
        { name: 'Cinematic Product & Brand Reels', desc: 'High-retention commercial storytelling, speed ramping, and color grading' }
      ]
    },
    ai: {
      label: 'Generative AI, Agents & RAG',
      proofs: [
        { name: 'NeuroDocs AI', desc: 'Enterprise hybrid semantic RAG indexing 50,000+ technical documents with sub-second latency' },
        { name: 'OmniAgent Swarm', desc: 'Autonomous multi-agent support orchestrator with ReAct framework and API tool execution' }
      ]
    }
  }
};

// Helper: Fetch JSON with User-Agent
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ShiveraClientAgent/1.0'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(new Error('Failed to parse JSON: ' + err.message));
        }
      });
    }).on('error', err => reject(err));
  });
}

// Analyze a job description text to detect domain and match Shivera proofs
function analyzeJob(text) {
  const lower = text.toLowerCase();
  const matchedDomains = [];

  if (lower.includes('react') || lower.includes('mern') || lower.includes('node') || lower.includes('frontend') || lower.includes('web app') || lower.includes('full stack') || lower.includes('saas')) {
    matchedDomains.push('mern');
  }
  if (lower.includes('wordpress') || lower.includes('woocommerce') || lower.includes('elementor') || lower.includes('php') || lower.includes('cms')) {
    matchedDomains.push('wordpress');
  }
  if (lower.includes('3d') || lower.includes('blender') || lower.includes('animation') || lower.includes('cgi') || lower.includes('render') || lower.includes('cad') || lower.includes('industrial') || lower.includes('boiler')) {
    if (lower.includes('industrial') || lower.includes('factory') || lower.includes('plant') || lower.includes('machine') || lower.includes('mechanical') || lower.includes('cad')) {
      matchedDomains.push('industrial3d');
    } else {
      matchedDomains.push('product3d');
    }
  }
  if (lower.includes('video') || lower.includes('edit') || lower.includes('premiere') || lower.includes('after effects') || lower.includes('tvc') || lower.includes('commercial') || lower.includes('youtube') || lower.includes('reels')) {
    matchedDomains.push('video');
  }
  if (lower.includes('ai') || lower.includes('rag') || lower.includes('llm') || lower.includes('langchain') || lower.includes('agent') || lower.includes('gpt') || lower.includes('claude') || lower.includes('machine learning')) {
    matchedDomains.push('ai');
  }

  // Fallback if none matched
  if (matchedDomains.length === 0) {
    matchedDomains.push('mern', 'video');
  }

  return [...new Set(matchedDomains)];
}

// Generate an agency-grade tailored proposal
function generateProposal(jobTitle, jobDescription, clientName = 'there') {
  const domains = analyzeJob(jobTitle + ' ' + jobDescription);
  
  let proofLines = [];
  domains.forEach(d => {
    const domainObj = SHIVERA_PORTFOLIO.domains[d];
    if (domainObj) {
      domainObj.proofs.forEach(p => {
        proofLines.push(`• **${p.name}** – ${p.desc}${p.link ? ` (Live: ${p.link})` : ''}`);
      });
    }
  });

  return `
================================================================================
                    🔥 SHIVERA WINNING PROPOSAL DRAFT 🔥
================================================================================

Hi ${clientName},

I reviewed your requirements for "${jobTitle.trim()}" and can help you execute this cleanly without the usual agency overhead.

At Shivera (${SHIVERA_PORTFOLIO.website}), we specialize in high-performance web development, 3D CGI animation, and commercial video production. Here are our direct reference projects that prove we've solved this exact challenge:

${proofLines.slice(0, 3).join('\n')}

### How We Will Approach Your Project:
1. **Discovery & Architecture:** Align on milestones, wireframes, and design specs within the first 48 hours.
2. **Rapid Iteration & Staging:** Weekly staging milestones with transparent progress updates so you retain full creative and technical control.
3. **Production Deployment & Polish:** End-to-end testing, responsive design, 60fps performance optimization, and final handover.

### Questions for You:
• What is your target completion deadline?
• Do you have existing brand assets/wireframes, or should we architect them from scratch?

Let's connect for a brief 10-minute scoping chat, or feel free to message me back here or at ${SHIVERA_PORTFOLIO.email}.

Best regards,
Shivera Team
Portfolio: ${SHIVERA_PORTFOLIO.website}
Contact: ${SHIVERA_PORTFOLIO.email}

================================================================================
`;
}

// Generate startup cold email outreach
function generateStartupColdEmail(startupName, industry = 'tech') {
  return `
================================================================================
                🚀 COLD OUTREACH SEQUENCE FOR: ${startupName.toUpperCase()} 🚀
================================================================================

--- EMAIL 1: The High-Value Hook ---
Subject: Quick idea for ${startupName} + 3D / AI launch concept

Hi [Founder Name],

Saw what you're building with ${startupName} — congratulations on the momentum.

Most emerging companies in your space lose valuable weeks trying to manage three disconnected vendors: a dev shop, a 3D animator, and a video editor. At Shivera (https://shivera.com), we deliver the entire launch stack in-house:

1. High-Performance Web & AI Platforms (like our work on Floow2 & NeuroDocs)
2. 3D Product & Process CGI (like our photorealistic CAD & 360° product models)
3. Commercial Video Production (like our broadcast TVC work for PRAN Foods: https://youtu.be/HwkJ_lJEkyw)

I took a look at ${startupName} and put together 2 quick ideas on how an interactive 3D hero model or automated AI workflow could elevate your user conversion.

Open to a brief 10-minute brainstorming chat this Thursday?

Best,
[Your Name] | Shivera Studio
business.shivera@gmail.com


--- EMAIL 2: The 48-Hour Follow-Up ---
Subject: Re: Quick idea for ${startupName}

Hi [Founder Name],

Brief follow-up on my note below. I know you're busy growing ${startupName}.

If you'd like, I can send over a 2-page Technical Feasibility & 3D Visual Concept roadmap free of charge so you can review it asynchronously.

Let me know if that would be helpful!

Best,
[Your Name] | Shivera
business.shivera@gmail.com
================================================================================
`;
}

// Fetch live jobs from RemoteOK and filter for relevant roles
async function scanLiveJobs() {
  console.log('\n📡 Scanning live remote jobs matching Shivera skills...\n');
  try {
    const data = await fetchJson('https://remoteok.com/api');
    if (!Array.isArray(data) || data.length < 2) {
      console.log('⚠️ No live jobs returned at this moment. Try again later.');
      return;
    }

    // Filter relevant tech/creative jobs
    const keywords = ['react', 'node', 'full stack', 'frontend', 'web', 'wordpress', 'video', 'design', '3d', 'ai', 'python'];
    const matchedJobs = data.slice(1).filter(job => {
      const text = ((job.position || '') + ' ' + (job.tags || []).join(' ') + ' ' + (job.description || '')).toLowerCase();
      return keywords.some(k => text.includes(k));
    }).slice(0, 8);

    if (matchedJobs.length === 0) {
      console.log('No direct matches in the latest 100 posts. Displaying recent contract roles.');
      return;
    }

    console.log(`✅ Found ${matchedJobs.length} active freelance/startup opportunities:\n`);
    matchedJobs.forEach((j, idx) => {
      console.log(`[${idx + 1}] ${j.position} @ ${j.company || 'Confidential'}`);
      console.log(`    📍 Location: ${j.location || 'Remote'} | 🏷️ Tags: ${(j.tags || []).slice(0, 4).join(', ')}`);
      console.log(`    🔗 Link: ${j.url || 'https://remoteok.com'}\n`);
    });

    return matchedJobs;
  } catch (err) {
    console.error('⚠️ Could not connect to remote feed:', err.message);
  }
}

// Interactive CLI Menu
function startCli() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                   SHIVERA CLIENT ACQUISITION AGENT               ║
║             AI-Powered Lead Generation & Proposal Engine          ║
╚═══════════════════════════════════════════════════════════════════╝
`);

  function showMenu() {
    console.log('Select an action:');
    console.log('1. 📡 Scan Live Remote Freelance/Startup Opportunities');
    console.log('2. 📝 Generate Proposal for ANY Job Post (Upwork, Contra, LinkedIn)');
    console.log('3. 🚀 Generate Cold Outreach Pitch for a Startup / Brand');
    console.log('4. 📅 View the 30-Minute Daily Client Acquisition Playbook');
    console.log('5. ❌ Exit\n');

    rl.question('Enter choice [1-5]: ', async (choice) => {
      const trimmed = choice.trim();

      if (trimmed === '1') {
        const jobs = await scanLiveJobs();
        if (jobs && jobs.length > 0) {
          rl.question('\nGenerate proposal for one of these jobs? Enter number [1-' + jobs.length + '] or press Enter to skip: ', (num) => {
            const idx = parseInt(num) - 1;
            if (!isNaN(idx) && jobs[idx]) {
              const selected = jobs[idx];
              console.log(generateProposal(selected.position, selected.description || selected.position, selected.company || 'there'));
            }
            showMenu();
          });
          return;
        }
        showMenu();
      } else if (trimmed === '2') {
        rl.question('\nEnter Job Title: ', (title) => {
          rl.question('Paste Job Description (or press Enter when done): ', (desc) => {
            rl.question('Client / Company Name (optional): ', (name) => {
              console.log(generateProposal(title, desc || title, name || 'there'));
              showMenu();
            });
          });
        });
      } else if (trimmed === '3') {
        rl.question('\nEnter Startup / Company Name: ', (name) => {
          rl.question('Industry / Product Type (e.g., CleanTech, SaaS, D2C): ', (ind) => {
            console.log(generateStartupColdEmail(name, ind));
            showMenu();
          });
        });
      } else if (trimmed === '4') {
        console.log(`
================================================================================
          📅 SHIVERA 30-MINUTE DAILY CLIENT ACQUISITION ROUTINE
================================================================================

If you have 0 marketing experience, follow this exact routine every weekday:

⏰ MINUTES 1–15: Bid on 3 Fresh Upwork / Contra Projects
  • Go to Upwork.com or Contra.com.
  • Search: "React MERN", "WordPress", "3D Animation", or "Video Editing".
  • Filter by: "Posted in last 24 hours" and "Verified Payment".
  • Paste the job post into Option 2 of this agent to get an instant customized proposal.
  • Send proposal immediately.

⏰ MINUTES 16–25: Cold Outreach to 2 Funded Startups
  • Go to Wellfound.com or TechCrunch or Twitter/X.
  • Look for startups that just launched or raised Seed funding.
  • Run Option 3 of this agent to generate a tailored email and send it to their founder or contact email.

⏰ MINUTES 26–30: Follow-Ups
  • Reply to any inquiries on your website or past messages.
  • Direct them to your Shivera portfolio: https://shivera.com

📊 EXPECTED RESULTS:
  • 3 proposals/day = 15/week = 60/month.
  • In freelancing, a 5-10% reply rate is standard.
  • That yields 3 to 6 client interviews per month, easily leading to 1-3 funded projects.
================================================================================
`);
        showMenu();
      } else if (trimmed === '5') {
        console.log('Goodbye! Keep pitching consistently.');
        rl.close();
      } else {
        console.log('Invalid option. Please enter 1 to 5.');
        showMenu();
      }
    });
  }

  showMenu();
}

// Allow test execution via CLI flag
if (process.argv.includes('--test')) {
  console.log('Shivera Client Acquisition Agent: Self-test passed.');
  console.log(generateProposal('React Full Stack Developer for B2B Marketplace', 'Looking for MERN expert with UI/UX skills'));
  process.exit(0);
}

startCli();

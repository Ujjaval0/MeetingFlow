export const mockMeetings = [
  {
    id: "meeting-1",
    title: "Q3 Product Planning & Roadmap Sync",
    date: "May 28, 2026",
    duration: "42 min",
    speakerCount: 4,
    summary: {
      overview: "The team aligned on core product objectives for Q3 2026. The primary themes identified are user interface simplification, mobile responsiveness optimizations, and planning for external tool integrations in late Q3.",
      decisions: [
        "Focus first on UI simplification and mobile responsiveness; postpone native CRM integrations to Q4.",
        "Adopt the new bi-weekly deployment cycle starting next month.",
        "Approve the timeline extension of 2 weeks for the mobile dashboard beta release."
      ],
      topics: [
        { title: "Q3 Core Objectives", description: "Reviewing company-wide alignment goals and key results." },
        { title: "UI Simplification & Mobile Roadmap", description: "Addressing user drop-offs by streamlining the main user workflows." },
        { title: "CRM & Integrations Strategy", description: "Evaluating HubSpot and Salesforce APIs and resource constraints." }
      ]
    },
    actionItems: [
      { id: "act-1-1", text: "Draft Q3 roadmap document and share in Slack", assignee: "Sarah Connor", status: "pending", dueDate: "June 2, 2026" },
      { id: "act-1-2", text: "Update design guidelines for the mobile layout", assignee: "David Miller", status: "pending", dueDate: "June 5, 2026" },
      { id: "act-1-3", text: "Investigate OAuth implementation details for HubSpot integration", assignee: "Alex Chen", status: "completed", dueDate: "May 29, 2026" },
      { id: "act-1-4", text: "Schedule user feedback interviews on new onboarding flow", assignee: "Priya Sharma", status: "pending", dueDate: "June 8, 2026" }
    ],
    highlights: [
      { time: "00:04:12", text: "Sarah proposes shifting focus from CRM integrations to core UX optimization based on latest survey analytics." },
      { time: "00:15:30", text: "David showcases the mobile prototype and highlights a 40% reduction in screen-tap requirements for setting up a meeting." },
      { time: "00:28:45", text: "Alex outlines technical concerns about database latency during heavy sync periods and recommends caching templates." }
    ],
    transcript: [
      { time: "00:01:05", speaker: "Sarah Connor", text: "Good morning everyone. Let's kick off the Q3 planning session. Our main objective today is to lock down our high-level roadmap and prioritize features." },
      { time: "00:02:15", speaker: "Alex Chen", text: "Before we jump into new features, I want to mention that backend tech debt has been piling up. We should allocate at least 15% of our sprint bandwidth to refactoring API endpoints." },
      { time: "00:03:40", speaker: "David Miller", text: "From the design side, we've completed the mobile dashboard audit. The mobile user experience is currently fragmented, which explains the user drop-offs we saw last month." },
      { time: "00:04:12", speaker: "Sarah Connor", text: "That makes sense, David. Based on the survey data, users want simplicity. I propose we shift our primary focus from CRM integrations to core UX optimization and mobile responsiveness. Let's push HubSpot and Salesforce integrations to Q4." },
      { time: "00:05:55", speaker: "Priya Sharma", text: "I agree with that adjustment. User feedback shows that people find the landing page straightforward, but the actual dashboard is overwhelming. Simplifying the interface will have a higher ROI." },
      { time: "00:08:20", speaker: "Alex Chen", text: "Pushing CRM integrations to Q4 will also give the backend team time to address the database schema changes needed for robust syncing. I support this plan." },
      { time: "00:15:30", speaker: "David Miller", text: "Perfect. I'm displaying the mobile prototype now. We reorganized the sidebar navigation into a bottom bar interface. Our tests show it reduces screen-tap requirements by 40%." },
      { time: "00:18:10", speaker: "Sarah Connor", text: "This mobile UI looks incredibly sleek! David, can you formalize these guidelines? We need the developers to start building this by mid-June." },
      { time: "00:19:00", speaker: "David Miller", text: "Yes, I'll update the mobile design guidelines document in Figma by June 5th." },
      { time: "00:25:35", speaker: "Priya Sharma", text: "I should also run some user feedback sessions once the prototype is interactive. I'll target scheduling interviews for the week after next." },
      { time: "00:28:45", speaker: "Alex Chen", text: "Regarding the HubSpot investigation, I actually looked into their OAuth flow yesterday. It's relatively standard, but we'll need to create a dedicated redirect server to handle keys securely. I'll check if we can reuse our existing proxy code." },
      { time: "00:35:10", speaker: "Sarah Connor", text: "Great work, Alex. Let's document that. Let's make sure we write down these decisions. I'll publish the finalized Q3 roadmap draft in Slack by Tuesday." }
    ]
  },
  {
    id: "meeting-2",
    title: "Weekly Design System Alignment",
    date: "May 25, 2026",
    duration: "28 min",
    speakerCount: 3,
    summary: {
      overview: "The design system committee reviewed updates to tokenized layouts, component accessibility, and the color palette for dark mode.",
      decisions: [
        "Adopt the standard HSL color schema for styling tokens.",
        "Deprecate the legacy gray-400 borders in favor of the new thin border design token.",
        "Conduct quarterly accessibility reviews starting this cycle."
      ],
      topics: [
        { title: "HSL Color Palette Tokens", description: "Reviewing color consistency and accessibility ratios for contrast compliance." },
        { title: "Component Library Clean-up", description: "Consolidating duplicate input fields and buttons." }
      ]
    },
    actionItems: [
      { id: "act-2-1", text: "Export new Figma design tokens to JSON format", assignee: "Emily Watson", status: "completed", dueDate: "May 26, 2026" },
      { id: "act-2-2", text: "Refactor button component to support dark mode tokens", assignee: "Alex Chen", status: "pending", dueDate: "June 1, 2026" },
      { id: "act-2-3", text: "Run screen reader compliance check on navigation menu", assignee: "Priya Sharma", status: "pending", dueDate: "June 4, 2026" }
    ],
    highlights: [
      { time: "00:06:15", text: "Emily presents the contrast ratios for the new interactive electric mint accent (#00ffc4) under AAA accessibility guidelines." },
      { time: "00:18:40", text: "Alex suggests using CSS custom properties (variables) instead of Tailwind classes for the design token build process." }
    ],
    transcript: [
      { time: "00:01:10", speaker: "Emily Watson", text: "Hi team. Today we are looking at the v2 design system updates. The main item is the color palette refinement for dark mode." },
      { time: "00:04:30", speaker: "Priya Sharma", text: "Before we show the palette, did we verify if our mint accent meets contrast ratios? Several beta users with visual impairments reported difficulties on the buttons." },
      { time: "00:06:15", speaker: "Emily Watson", text: "Yes, we did. The new interactive electric mint accent (#00ffc4) was modified to an HSL value that provides a 4.5:1 contrast against dark backgrounds. It meets AAA guidelines for large text and AA for normal text." },
      { time: "00:10:45", speaker: "Alex Chen", text: "Nice. That will fix the accessibility issues in the navbar as well. What's the status of the Figma token export?" },
      { time: "00:12:00", speaker: "Emily Watson", text: "I've already exported the Figma design tokens to JSON. They are available in the design-tokens repo now." },
      { time: "00:15:20", speaker: "Priya Sharma", text: "Excellent. I will use those JSON tokens to run a screen reader compliance check on the main navigation components later this week." },
      { time: "00:18:40", speaker: "Alex Chen", text: "For the implementation, I recommend using CSS variables rather than hardcoding. It will make dark/light mode toggling much smoother. I can refactor the button component to use these new tokens next." },
      { time: "00:24:15", speaker: "Emily Watson", text: "Agreed. Let's deprecate the legacy gray border styling. Let's make sure the buttons, inputs, and cards are fully unified." }
    ]
  },
  {
    id: "meeting-3",
    title: "Customer Feedback & Review: Beta Launch",
    date: "May 20, 2026",
    duration: "35 min",
    speakerCount: 3,
    summary: {
      overview: "Review of feedback collected from our first 50 beta testing accounts. Key observations focus on onboarding abandonment and query latency on the dashboard page.",
      decisions: [
        "Shorten the initial setup questionnaire from 8 steps to 3 steps.",
        "Add database indexes to meeting metadata tables to fix latency issues.",
        "Implement a 'Quick Tour' wizard for first-time dashboard visitors."
      ],
      topics: [
        { title: "Onboarding Funnel Drop-off", description: "Analyzing why 35% of users drop off before completing their profile." },
        { title: "Query Latency Reports", description: "Diagnosing server response times during simultaneous transcript searches." }
      ]
    },
    actionItems: [
      { id: "act-3-1", text: "Optimize user onboarding questionnaire length and layout", assignee: "Mark Davis", status: "pending", dueDate: "June 3, 2026" },
      { id: "act-3-2", text: "Fix N+1 query latency in dashboard API endpoints", assignee: "Liam Peterson", status: "completed", dueDate: "May 24, 2026" },
      { id: "act-3-3", text: "Set up post-onboarding automated email campaign", assignee: "Mark Davis", status: "pending", dueDate: "June 6, 2026" }
    ],
    highlights: [
      { time: "00:08:50", text: "Mark points out that the survey responses show page 3 of the setup wizard has the highest bounce rate due to security queries." },
      { time: "00:22:15", text: "Liam confirms the dashboard delay is caused by an N+1 query loading speaker profiles for every transcript line." }
    ],
    transcript: [
      { time: "00:01:02", speaker: "Mark Davis", text: "Welcome. Today we're digesting beta launch feedback. The good news: 82% of active users find the meeting highlights feature very helpful. The bad news: we're losing users during onboarding." },
      { time: "00:05:15", speaker: "Liam Peterson", text: "We also have some performance complaints. Two customers emailed about the dashboard taking up to 5 seconds to load." },
      { time: "00:08:50", speaker: "Mark Davis", text: "Let's tackle onboarding first. Our funnel analysis shows a 35% drop-off on page 3 of the questionnaire. That page asks about security configurations, which feels too invasive too early. I think we should shorten the setup to 3 simple steps." },
      { time: "00:13:20", speaker: "Liam Peterson", text: "Agree. Let's move security setups inside the app dashboard context later. What about the dashboard load latency?" },
      { time: "00:22:15", speaker: "Liam Peterson", text: "I ran a profiling session. The 5-second delay is caused by an N+1 database query. The dashboard was retrieving speaker profiles on every transcript line. I wrote a patch to preload profiles, which drops loading to 180ms." },
      { time: "00:27:40", speaker: "Mark Davis", text: "That is massive! Great fix, Liam. Let's push that optimization to production immediately." },
      { time: "00:30:10", speaker: "Mark Davis", text: "I'll also set up an automated email system to re-engage users who dropped off onboarding before this patch. I should have that campaign set up by June 6th." }
    ]
  }
];

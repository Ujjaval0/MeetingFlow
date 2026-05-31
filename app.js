import { mockMeetings } from './mockData.js';

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize page-active body class
  document.body.className = 'page-active-home';

  // State variables
  let meetings = [...mockMeetings];
  let activeMeetingId = meetings[0].id;
  let activeTab = 'summary';
  let isAnnualBilling = false;

  // Cache DOM elements
  const pageSections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-links li');
  const footerLinks = document.querySelectorAll('.nav-footer-link');
  const siteNav = document.getElementById('site-nav');
  const siteFooter = document.getElementById('site-footer');
  const websiteContent = document.getElementById('website-content');
  const appDashboard = document.getElementById('app-dashboard');
  const btnExitDashboard = document.getElementById('btn-exit-dashboard');
  const logoLink = document.getElementById('logo-link');
  
  // Dashboard Specific DOM elements
  const meetingItemsTarget = document.getElementById('meeting-items-target');
  const activeMeetingTitle = document.getElementById('active-meeting-title');
  const activeMeetingDate = document.getElementById('active-meeting-date');
  const activeMeetingDuration = document.getElementById('active-meeting-duration');
  const activeMeetingSpeakers = document.getElementById('active-meeting-speakers');
  
  const summaryOverviewTarget = document.getElementById('summary-overview-target');
  const summaryDecisionsTarget = document.getElementById('summary-decisions-target');
  const summaryTopicsTarget = document.getElementById('summary-topics-target');
  const actionsItemsTarget = document.getElementById('actions-items-target');
  const actionCountLabel = document.getElementById('action-count-label');
  const transcriptLinesTarget = document.getElementById('transcript-lines-target');
  const highlightsItemsTarget = document.getElementById('highlights-items-target');
  
  const dashTabBtns = document.querySelectorAll('.dash-tab-btn');
  const dashPanels = document.querySelectorAll('.dash-panel');
  const addActionItemForm = document.getElementById('add-action-item-form');
  
  // Search DOM
  const globalSearchBar = document.getElementById('global-search-bar');
  const transcriptLocalSearch = document.getElementById('transcript-local-search');
  const workspaceStandardView = document.getElementById('workspace-standard-view');
  const workspaceSearchView = document.getElementById('workspace-search-view');
  const globalSearchResultsTarget = document.getElementById('global-search-results-target');
  const searchQueryLabel = document.getElementById('search-query-label');
  const searchCountLabel = document.getElementById('search-count-label');

  // Modal DOM
  const btnTriggerUpload = document.getElementById('btn-trigger-upload');
  const uploadModalOverlay = document.getElementById('upload-modal-overlay');
  const btnCloseUpload = document.getElementById('btn-close-upload');
  const modalDragArea = document.getElementById('modal-drag-area');
  const uploadStageSelect = document.getElementById('upload-stage-select');
  const uploadStageProcessing = document.getElementById('upload-stage-processing');

  // ==========================================
  // WEBSITE CLIENT ROUTING
  // ==========================================
  
  function switchPage(pageId) {
    // Update active page class on body for styling overrides
    document.body.className = `page-active-${pageId}`;

    // Hide all sections, remove active classes
    pageSections.forEach(section => {
      section.classList.remove('active');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Activate nav link
    const targetNavLink = document.querySelector(`.nav-links li[data-page="${pageId}"]`);
    if (targetNavLink) {
      targetNavLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Event Listeners for Nav Links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  // Mobile Nav Hamburger Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });
  }

  // Close mobile nav when links or logo are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  });
  if (logoLink) {
    logoLink.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  }

  // Event Listeners for Footer Links
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  // Home link in logo
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchPage('home');
  });

  // FAQ Accordions
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isOpen = item.classList.contains('open');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ==========================================
  // PRICING SYSTEM
  // ==========================================
  
  const billingSwitch = document.getElementById('billing-switch');
  const billingMonthly = document.getElementById('billing-monthly');
  const billingAnnual = document.getElementById('billing-annual');
  const proPrice = document.getElementById('pro-price');

  if (billingSwitch) {
    billingSwitch.addEventListener('click', () => {
      isAnnualBilling = !isAnnualBilling;
      billingSwitch.classList.toggle('active', isAnnualBilling);
      billingMonthly.classList.toggle('active', !isAnnualBilling);
      billingAnnual.classList.toggle('active', isAnnualBilling);
      
      if (isAnnualBilling) {
        proPrice.innerHTML = '$15 <span>/ mo</span>';
      } else {
        proPrice.innerHTML = '$19 <span>/ mo</span>';
      }
    });
  }

  // ==========================================
  // DASHBOARD INTEGRATION / TOGGLING
  // ==========================================
  
  function launchDashboard() {
    siteNav.style.display = 'none';
    siteFooter.style.display = 'none';
    websiteContent.style.display = 'none';
    appDashboard.classList.add('active');
    renderSidebarMeetings();
    selectMeeting(activeMeetingId);
  }

  function exitDashboard() {
    appDashboard.classList.remove('active');
    appDashboard.classList.remove('show-workspace');
    siteNav.style.display = 'flex';
    siteFooter.style.display = 'block';
    websiteContent.style.display = 'block';
    // Switch to Home by default
    switchPage('home');
  }

  // Trigger elements (buttons like "Start Free", "Watch Demo")
  document.querySelectorAll('.btn-launch-app').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      launchDashboard();
    });
  });

  btnExitDashboard.addEventListener('click', exitDashboard);

  // Dashboard Mobile Back Navigation
  const dashBackBtn = document.getElementById('dash-back-btn');
  const dashBackBtnSearch = document.getElementById('dash-back-btn-search');
  
  function goBackToMeetingsList() {
    appDashboard.classList.remove('show-workspace');
  }

  if (dashBackBtn) {
    dashBackBtn.addEventListener('click', goBackToMeetingsList);
  }
  if (dashBackBtnSearch) {
    dashBackBtnSearch.addEventListener('click', goBackToMeetingsList);
  }

  // Forms submit simulation on landing page
  document.querySelectorAll('.mini-form-submit, #full-contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.form-success-msg');
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  });

  // ==========================================
  // RENDER MEETING DETAIL WORKSPACE
  // ==========================================
  
  function renderSidebarMeetings() {
    meetingItemsTarget.innerHTML = '';
    meetings.forEach(meeting => {
      const isActive = meeting.id === activeMeetingId;
      const li = document.createElement('li');
      li.innerHTML = `
        <button class="meeting-item-btn ${isActive ? 'active' : ''}" data-id="${meeting.id}">
          <span class="meeting-item-title">${meeting.title}</span>
          <span class="meeting-item-meta">
            <span>${meeting.date}</span>
            <span>${meeting.duration}</span>
          </span>
        </button>
      `;
      
      li.querySelector('button').addEventListener('click', () => {
        // Clear global search first if user switches meetings
        if (globalSearchBar.value.trim()) {
          globalSearchBar.value = '';
          workspaceSearchView.classList.remove('active');
          workspaceStandardView.style.display = 'flex';
        }
        selectMeeting(meeting.id);
      });
      meetingItemsTarget.appendChild(li);
    });
  }

  function selectMeeting(id) {
    activeMeetingId = id;
    const meeting = meetings.find(m => m.id === id);
    if (!meeting) return;

    // Update active state in sidebar
    document.querySelectorAll('.meeting-item-btn').forEach(btn => {
      const btnId = btn.getAttribute('data-id');
      btn.classList.toggle('active', btnId === id);
    });

    // Populate Headers
    activeMeetingTitle.textContent = meeting.title;
    activeMeetingDate.innerHTML = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> ${meeting.date}`;
    activeMeetingDuration.innerHTML = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${meeting.duration}`;
    activeMeetingSpeakers.innerHTML = `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> ${meeting.speakerCount} speakers`;

    // Populate Tab 1: AI Summary
    summaryOverviewTarget.innerHTML = `<p>${meeting.summary.overview}</p>`;
    
    summaryDecisionsTarget.innerHTML = '';
    meeting.summary.decisions.forEach(decision => {
      const li = document.createElement('li');
      li.textContent = decision;
      summaryDecisionsTarget.appendChild(li);
    });

    summaryTopicsTarget.innerHTML = '';
    meeting.summary.topics.forEach(topic => {
      const item = document.createElement('div');
      item.className = 'topic-item glass-panel';
      item.innerHTML = `
        <h4>${topic.title}</h4>
        <p>${topic.description}</p>
      `;
      summaryTopicsTarget.appendChild(item);
    });

    // Populate Tab 2: Action Items
    renderActionItems(meeting);

    // Populate Tab 3: Transcript Lines
    renderTranscript(meeting);

    // Populate Tab 4: Key Highlights
    highlightsItemsTarget.innerHTML = '';
    meeting.highlights.forEach(hl => {
      const div = document.createElement('div');
      div.className = 'highlight-item glass-panel';
      div.innerHTML = `
        <div class="highlight-info">
          <span class="highlight-badge">${hl.time}</span>
          <p class="highlight-body-text">${hl.text}</p>
        </div>
        <div class="highlight-action-icon">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      `;
      // Click highlight to jump to timestamp in Transcript Tab
      div.addEventListener('click', () => {
        switchTab('transcript');
        jumpToTimestamp(hl.time);
      });
      highlightsItemsTarget.appendChild(div);
    });

    // Render interactive analytics charts dynamically
    renderSpeakerEngagementChart(meeting);

    // On mobile, show workspace when a meeting is selected
    appDashboard.classList.add('show-workspace');
  }

  function renderActionItems(meeting) {
    actionsItemsTarget.innerHTML = '';
    let pendingCount = 0;
    
    meeting.actionItems.forEach(action => {
      if (action.status === 'pending') pendingCount++;
      const isCompleted = action.status === 'completed';
      const initials = action.assignee.split(' ').map(n => n[0]).join('');

      const div = document.createElement('div');
      div.className = `action-item-card glass-panel ${isCompleted ? 'completed' : ''}`;
      div.innerHTML = `
        <input type="checkbox" class="action-checkbox" ${isCompleted ? 'checked' : ''} data-id="${action.id}">
        <span class="action-text">${action.text}</span>
        <span class="action-assignee">
          <span class="assignee-avatar">${initials}</span>
          ${action.assignee}
        </span>
        <span class="action-due">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Due ${action.dueDate}
        </span>
      `;

      // Checkbox listener to update status
      div.querySelector('.action-checkbox').addEventListener('change', (e) => {
        action.status = e.target.checked ? 'completed' : 'pending';
        renderActionItems(meeting);
      });

      actionsItemsTarget.appendChild(div);
    });

    actionCountLabel.textContent = `${pendingCount} Pending`;
  }

  function renderTranscript(meeting, query = '') {
    transcriptLinesTarget.innerHTML = '';
    
    meeting.transcript.forEach((line, index) => {
      const initials = line.speaker.split(' ').map(n => n[0]).join('');
      
      let textToShow = line.text;
      if (query.trim()) {
        const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        textToShow = line.text.replace(regex, '<span class="highlight-match">$1</span>');
      }

      const div = document.createElement('div');
      div.className = 'transcript-row';
      div.id = `transcript-line-${line.time.replace(/:/g, '-')}`;
      div.innerHTML = `
        <div class="speaker-col">
          <span class="speaker-avatar">${initials}</span>
          <span class="speaker-name" title="${line.speaker}">${line.speaker}</span>
        </div>
        <div class="transcript-text-col">
          <button class="transcript-time-btn" data-time="${line.time}">${line.time}</button>
          <p class="transcript-text">${textToShow}</p>
        </div>
      `;
      transcriptLinesTarget.appendChild(div);
    });
  }

  // Jump to specific line and flash background
  function jumpToTimestamp(timeStr) {
    const targetId = `transcript-line-${timeStr.replace(/:/g, '-')}`;
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.background = 'rgba(0, 113, 227, 0.1)';
        element.style.transition = 'background 0.5s ease';
        setTimeout(() => {
          element.style.background = 'transparent';
        }, 2000);
      }, 100);
    }
  }

  // ==========================================
  // TAB SWITCHING IN WORKSPACE
  // ==========================================
  
  function switchTab(tabName) {
    activeTab = tabName;
    dashTabBtns.forEach(btn => {
      const btnTab = btn.getAttribute('data-tab');
      btn.classList.toggle('active', btnTab === tabName);
    });

    dashPanels.forEach(panel => {
      const panelId = panel.getAttribute('id');
      panel.classList.toggle('active', panelId === `tab-${tabName}`);
    });
  }

  dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // ==========================================
  // ADD ACTION ITEM TO DYNAMIC LIST
  // ==========================================
  
  addActionItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textInput = document.getElementById('new-action-text');
    const assigneeInput = document.getElementById('new-action-assignee');
    const dueInput = document.getElementById('new-action-due');

    const activeMeeting = meetings.find(m => m.id === activeMeetingId);
    if (!activeMeeting) return;

    const newItem = {
      id: `act-${activeMeeting.id}-${Date.now()}`,
      text: textInput.value,
      assignee: assigneeInput.value,
      status: 'pending',
      dueDate: dueInput.value
    };

    activeMeeting.actionItems.push(newItem);
    renderActionItems(activeMeeting);

    // Reset inputs
    textInput.value = '';
    assigneeInput.value = '';
    dueInput.value = '';
  });

  // ==========================================
  // LOCAL TRANSCRIPT SEARCH
  // ==========================================
  
  transcriptLocalSearch.addEventListener('input', (e) => {
    const query = e.target.value;
    const activeMeeting = meetings.find(m => m.id === activeMeetingId);
    if (activeMeeting) {
      renderTranscript(activeMeeting, query);
    }
  });

  // ==========================================
  // CROSS-PLATFORM SEARCH SYSTEM
  // ==========================================
  
  globalSearchBar.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (!query) {
      // Return to standard meeting workspace
      workspaceSearchView.classList.remove('active');
      workspaceStandardView.style.display = 'flex';
      return;
    }

    // Switch to search view overlay
    workspaceStandardView.style.display = 'none';
    workspaceSearchView.classList.add('active');
    searchQueryLabel.textContent = `Query: "${query}"`;

    let results = [];

    // Query across summaries, transcripts, decisions, and action items in all meetings
    meetings.forEach(meeting => {
      // 1. Check Transcripts
      meeting.transcript.forEach(line => {
        if (line.text.toLowerCase().includes(query)) {
          results.push({
            meetingId: meeting.id,
            meetingTitle: meeting.title,
            type: 'transcript',
            time: line.time,
            snippet: `<b>${line.speaker}</b>: "... ${highlightSnippet(line.text, query)} ..."`
          });
        }
      });

      // 2. Check Overview Summary
      if (meeting.summary.overview.toLowerCase().includes(query)) {
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          type: 'summary',
          time: 'Overview',
          snippet: `"${highlightSnippet(meeting.summary.overview, query)}"`
        });
      }

      // 3. Check Decisions list
      meeting.summary.decisions.forEach(decision => {
        if (decision.toLowerCase().includes(query)) {
          results.push({
            meetingId: meeting.id,
            meetingTitle: meeting.title,
            type: 'summary',
            time: 'Decision',
            snippet: `"${highlightSnippet(decision, query)}"`
          });
        }
      });

      // 4. Check Action Items
      meeting.actionItems.forEach(action => {
        if (action.text.toLowerCase().includes(query) || action.assignee.toLowerCase().includes(query)) {
          results.push({
            meetingId: meeting.id,
            meetingTitle: meeting.title,
            type: 'action',
            time: 'Action Item',
            snippet: `<b>Task:</b> ${highlightSnippet(action.text, query)} (Owner: ${highlightSnippet(action.assignee, query)})`
          });
        }
      });
    });

    searchCountLabel.textContent = `${results.length} matches found`;
    renderSearchResults(results);
  });

  function highlightSnippet(text, query) {
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text;
    
    const matchedPart = text.substr(index, query.length);
    const before = text.substring(Math.max(0, index - 40), index);
    const after = text.substring(index + query.length, Math.min(text.length, index + query.length + 40));
    
    return `${before}<span class="highlight-match">${matchedPart}</span>${after}`;
  }

  function renderSearchResults(results) {
    globalSearchResultsTarget.innerHTML = '';
    if (results.length === 0) {
      globalSearchResultsTarget.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 3rem;">No matches found across your historical meetings knowledge base.</div>';
      return;
    }

    results.forEach(res => {
      const card = document.createElement('div');
      card.className = 'result-card glass-panel';
      card.innerHTML = `
        <div class="result-meta">
          <span class="result-meeting-title">${res.meetingTitle}</span>
          <span class="result-type-badge badge-${res.type}">${res.type} [${res.time}]</span>
        </div>
        <p class="result-text">${res.snippet}</p>
      `;

      card.addEventListener('click', () => {
        // Go back to standard view, select correct meeting
        globalSearchBar.value = '';
        workspaceSearchView.classList.remove('active');
        workspaceStandardView.style.display = 'flex';
        selectMeeting(res.meetingId);

        // If it was a transcript, jump to that line
        if (res.type === 'transcript') {
          switchTab('transcript');
          jumpToTimestamp(res.time);
        } else if (res.type === 'action') {
          switchTab('actions');
        } else {
          switchTab('summary');
        }
      });

      globalSearchResultsTarget.appendChild(card);
    });
  }

  // ==========================================
  // FILE UPLOAD & ANALYSIS SIMULATION
  // ==========================================
  
  btnTriggerUpload.addEventListener('click', () => {
    uploadModalOverlay.classList.add('active');
    uploadStageSelect.style.display = 'block';
    uploadStageProcessing.classList.remove('active');
  });

  btnCloseUpload.addEventListener('click', () => {
    uploadModalOverlay.classList.remove('active');
  });

  modalDragArea.addEventListener('click', () => {
    // Transition to processing visual stages
    uploadStageSelect.style.display = 'none';
    uploadStageProcessing.classList.add('active');
    
    simulateAIProcessingPipeline();
  });

  function simulateAIProcessingPipeline() {
    const steps = [
      { id: 'p-step-1', duration: 1500 },
      { id: 'p-step-2', duration: 1500 },
      { id: 'p-step-3', duration: 1500 },
      { id: 'p-step-4', duration: 1500 }
    ];

    // Reset processing classes
    steps.forEach(step => {
      const el = document.getElementById(step.id);
      el.classList.remove('active', 'completed');
    });

    let currentStepIndex = 0;

    function runStep() {
      if (currentStepIndex > 0) {
        // Set previous step as completed
        const prevEl = document.getElementById(steps[currentStepIndex - 1].id);
        prevEl.classList.remove('active');
        prevEl.classList.add('completed');
        prevEl.querySelector('span').textContent = prevEl.querySelector('span').textContent.replace('...', ' ✓');
      }

      if (currentStepIndex < steps.length) {
        // Activate current step
        const currentEl = document.getElementById(steps[currentStepIndex].id);
        currentEl.classList.add('active');
        
        setTimeout(() => {
          currentStepIndex++;
          runStep();
        }, steps[currentStepIndex].duration);
      } else {
        // Complete last step and finalize creation
        setTimeout(() => {
          finalizeUploadedMeeting();
        }, 500);
      }
    }

    runStep();
  }

  function finalizeUploadedMeeting() {
    // 1. Create Mock Meeting Object
    const newMeeting = {
      id: `meeting-${meetings.length + 1}`,
      title: "Beta Feedback Sync & Retro",
      date: "May 30, 2026",
      duration: "15 min",
      speakerCount: 3,
      summary: {
        overview: "A quick review of user onboarding funnel modifications following the 3-step refactoring release. Data indicates a 22% improvement in onboarding completions.",
        decisions: [
          "Keep the onboarding wizard at 3 steps; deprecate the legacy 8-step process entirely.",
          "Add a follow-up survey 7 days post-registration to monitor user setup completion rates.",
          "Promote the new Dashboard Search bar in the user onboarding tour."
        ],
        topics: [
          { title: "Funnel Conversion Growth", description: "Measuring completion metrics after shortening the onboarding wizard." },
          { title: "Engagement Optimization", description: "Automating surveys and tracking setup drop-off reasons." }
        ]
      },
      actionItems: [
        { id: `act-${meetings.length + 1}-1`, text: "Configure Amplitude dashboard to track onboarding step events", assignee: "Liam Peterson", status: "pending", dueDate: "June 3, 2026" },
        { id: `act-${meetings.length + 1}-2`, text: "Draft email copy for the 7-day post-registration survey", assignee: "Mark Davis", status: "pending", dueDate: "June 6, 2026" }
      ],
      highlights: [
        { time: "00:02:10", text: "Mark highlights the 22% jump in onboarding completions after deploying the shortened wizard." },
        { time: "00:08:45", text: "Liam suggests tracking event logs for individual step completions using amplitude." }
      ],
      transcript: [
        { time: "00:01:05", speaker: "Mark Davis", text: "Hey guys. I want to report that the 3-step onboarding flow is officially live, and we've already tracked a 22% bump in user conversions." },
        { time: "00:02:10", speaker: "Liam Peterson", text: "That's fantastic. I'm seeing fewer queries failing, and database load is lower too since we aren't creating unfinished profiles." },
        { time: "00:05:40", speaker: "Sarah Connor", text: "Great. Let's make sure we track exact drop-off events using Amplitude. Let's write down the task to set that up." },
        { time: "00:08:45", speaker: "Mark Davis", text: "I will draft the email survey copy. Let's get feedback from users after 7 days to see if they need help setting up their meetings." }
      ]
    };

    // 2. Add to global meetings array and update sidebar
    meetings.push(newMeeting);
    activeMeetingId = newMeeting.id;
    
    // 3. Reset Modal UI state
    uploadModalOverlay.classList.remove('active');
    
    // Reset steps label text
    document.getElementById('p-step-1').querySelector('span').textContent = "Uploading audio streams (14.2 MB)...";
    document.getElementById('p-step-2').querySelector('span').textContent = "Running neural audio speech transcription...";
    document.getElementById('p-step-3').querySelector('span').textContent = "Synthesizing topic structures & summaries...";
    document.getElementById('p-step-4').querySelector('span').textContent = "Extracting actionable checklist & assignees...";
    
    // 4. Re-render UI
    renderSidebarMeetings();
    selectMeeting(activeMeetingId);
    switchTab('summary');
  }

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // HERO PREVIEW Redesigned Mock Dashboard Animation
  // 8-second continuous workflow animation loop
  // ==========================================
  const demoTranscript1 = document.getElementById('demo-transcript-1');
  const demoTranscript2 = document.getElementById('demo-transcript-2');
  const demoTranscript3 = document.getElementById('demo-transcript-3');
  const demoProcessing = document.getElementById('demo-summary-processing');
  const demoSummary = document.getElementById('demo-summary-items');
  const demoAction1 = document.getElementById('demo-action-1');
  const demoAction2 = document.getElementById('demo-action-2');
  const demoAction3 = document.getElementById('demo-action-3');
  const demoKnowledge = document.getElementById('demo-knowledge-content');
  const demoCopilot = document.getElementById('demo-copilot-content');
  const demoBadgeLeft = document.querySelector('.badge-left');
  const demoBadgeRight = document.querySelector('.badge-right');

  if (demoTranscript1) {
    function resetDemo() {
      // Hide all elements
      demoTranscript1.classList.remove('show');
      demoTranscript2.classList.remove('show');
      demoTranscript3.classList.remove('show');
      
      demoProcessing.style.opacity = '0';
      demoProcessing.querySelector('.demo-processing-text').textContent = 'Processing...';
      demoProcessing.querySelector('.demo-sparkle').className = 'demo-sparkle animate-sparkle';
      
      demoSummary.classList.remove('show');
      
      demoAction1.classList.remove('show');
      demoAction2.classList.remove('show');
      demoAction3.classList.remove('show');
      
      demoKnowledge.classList.remove('show');
      demoCopilot.classList.remove('show');
      
      demoBadgeLeft.classList.remove('show');
      demoBadgeRight.classList.remove('show');

      // Reset horizontal step indicator highlights
      document.querySelectorAll('.workflow-step').forEach(step => {
        step.classList.remove('active');
      });
    }

    function runWorkflowAnimation() {
      resetDemo();

      // Step 1: Meeting transcript lines appear (0s - 1.5s)
      const stepMeeting = document.getElementById('step-meeting');
      if (stepMeeting) stepMeeting.classList.add('active');

      setTimeout(() => {
        demoTranscript1.classList.add('show');
      }, 100);
      setTimeout(() => {
        demoTranscript2.classList.add('show');
      }, 500);
      setTimeout(() => {
        demoTranscript3.classList.add('show');
      }, 900);

      // Step 2: AI Processing animation begins (1.5s - 3s)
      setTimeout(() => {
        if (stepMeeting) stepMeeting.classList.remove('active');
        const stepProcessing = document.getElementById('step-processing');
        if (stepProcessing) stepProcessing.classList.add('active');
        demoProcessing.style.opacity = '1';
      }, 1500);

      // Step 3: Summary card auto-generates (3s - 4.5s)
      setTimeout(() => {
        const stepProcessing = document.getElementById('step-processing');
        if (stepProcessing) stepProcessing.classList.remove('active');
        const stepSummary = document.getElementById('step-summary');
        if (stepSummary) stepSummary.classList.add('active');

        demoProcessing.querySelector('.demo-processing-text').textContent = 'Completed';
        demoProcessing.querySelector('.demo-sparkle').className = 'demo-sparkle'; // stop animation
        demoSummary.classList.add('show');
      }, 3000);

      // Step 4: Action items are extracted (4.5s - 5.5s)
      setTimeout(() => {
        const stepSummary = document.getElementById('step-summary');
        if (stepSummary) stepSummary.classList.remove('active');
        const stepActions = document.getElementById('step-actions');
        if (stepActions) stepActions.classList.add('active');

        demoAction1.classList.add('show');
      }, 4500);
      setTimeout(() => {
        demoAction2.classList.add('show');
      }, 4800);
      setTimeout(() => {
        demoAction3.classList.add('show');
      }, 5100);

      // Step 5: Knowledge base & AI Copilot updates (5.5s - 6.5s)
      setTimeout(() => {
        const stepActions = document.getElementById('step-actions');
        if (stepActions) stepActions.classList.remove('active');
        const stepKnowledge = document.getElementById('step-knowledge');
        if (stepKnowledge) stepKnowledge.classList.add('active');

        demoKnowledge.classList.add('show');
        demoCopilot.classList.add('show');
      }, 5500);

      // Step 6: Performance metrics appear (6.5s - 8.5s)
      setTimeout(() => {
        const stepKnowledge = document.getElementById('step-knowledge');
        if (stepKnowledge) stepKnowledge.classList.remove('active');
        const stepExecution = document.getElementById('step-execution');
        if (stepExecution) stepExecution.classList.add('active');

        demoBadgeLeft.classList.add('show');
        demoBadgeRight.classList.add('show');
      }, 6500);
    }

    // Run first iteration immediately
    runWorkflowAnimation();

    // Loop continuously every 8.5 seconds to allow state settling
    setInterval(runWorkflowAnimation, 8500);
  }



  // ==========================================
  // VOICE TRANSCRIPTION WAVEFORM VISUALIZER
  // ==========================================
  const waveContainer = document.getElementById('transcription-wave-bars');
  const barCount = 14;
  let waveBars = [];

  if (waveContainer) {
    // Generate visualizer bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'visualizer-bar';
      waveContainer.appendChild(bar);
      waveBars.push(bar);
    }

    // Animation loop
    function animateWave() {
      waveBars.forEach((bar) => {
        // Rhythmic random heights between 4px and 26px
        const randomHeight = Math.floor(Math.random() * 22) + 4;
        bar.style.height = `${randomHeight}px`;
      });
      requestAnimationFrame(() => {
        setTimeout(animateWave, 100); // Throttle to 10fps for clean wave look
      });
    }
    animateWave();
  }

  // ==========================================
  // SVG INTERACTIVE CHARTS SYSTEM
  // ==========================================
  function renderSpeakerEngagementChart(meeting) {
    const chartContainer = document.getElementById('speaker-engagement-chart-container');
    if (!chartContainer) return;

    // Calculate characters per speaker dynamically from transcripts database
    const speakerStats = {};
    let totalChars = 0;

    meeting.transcript.forEach(line => {
      const charCount = line.text.length;
      speakerStats[line.speaker] = (speakerStats[line.speaker] || 0) + charCount;
      totalChars += charCount;
    });

    // Format list sorted by character volume percentages
    const speakers = Object.keys(speakerStats).map(name => {
      const charCount = speakerStats[name];
      const percentage = Math.round((charCount / totalChars) * 100);
      return { name, percentage };
    }).sort((a, b) => b.percentage - a.percentage);

    // Color schema matching default dark / light modes
    const colors = [
      'var(--primary)',
      'var(--accent-mint)',
      'var(--accent-cyan)',
      'var(--warning)',
      'var(--success)'
    ];

    // Build SVG Donut Chart
    let accumulatedPercentage = 0;
    let svgContent = `
      <svg viewBox="0 0 100 100" width="130" height="130" style="transform: rotate(-90deg); filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));">
    `;

    speakers.forEach((sp, index) => {
      const color = colors[index % colors.length];
      const radius = 35;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (sp.percentage / 100) * circumference;
      const strokeDasharray = `${circumference} ${circumference}`;
      const rotation = (accumulatedPercentage / 100) * 360;

      svgContent += `
        <circle class="chart-slice" cx="50" cy="50" r="${radius}"
          fill="transparent"
          stroke="${color}"
          stroke-width="11"
          stroke-dasharray="${strokeDasharray}"
          stroke-dashoffset="${strokeDashoffset}"
          style="transform-origin: center; transform: rotate(${rotation}deg);"
          title="${sp.name}: ${sp.percentage}%"
        />
      `;
      accumulatedPercentage += sp.percentage;
    });

    // Core central cutout
    svgContent += `
      <circle cx="50" cy="50" r="28" fill="var(--bg-secondary)" />
      <text x="50" y="54" text-anchor="middle" font-family="var(--font-display)" font-weight="900" font-size="8" fill="var(--text-primary)" style="transform: rotate(90deg); transform-origin: center; letter-spacing: 0.05em;">
        SPEAK
      </text>
      </svg>
    `;

    // Legend content block
    let legendContent = '<div class="chart-legend">';
    speakers.forEach((sp, index) => {
      const color = colors[index % colors.length];
      legendContent += `
        <div class="legend-item">
          <span class="legend-color" style="background: ${color}"></span>
          <span>${sp.name}: ${sp.percentage}%</span>
        </div>
      `;
    });
    legendContent += '</div>';

    chartContainer.innerHTML = svgContent + legendContent;
  }

  // Scroll Listener for Navbar scrolled effect and hide/show on scroll
  const navbarContainer = document.querySelector('.navbar-container');
  if (navbarContainer) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state background
      if (currentScrollY > 20) {
        navbarContainer.classList.add('scrolled');
      } else {
        navbarContainer.classList.remove('scrolled');
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        navbarContainer.classList.add('navbar-hidden');
      } else if (currentScrollY < lastScrollY) {
        navbarContainer.classList.remove('navbar-hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Interactive Solve Section Tabs Switching
  const solveTabBtns = document.querySelectorAll('.solve-tab-btn');
  const solvePanels = document.querySelectorAll('.solve-panel');

  if (solveTabBtns.length > 0) {
    solveTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-solve-tab');
        
        // Update active tab button
        solveTabBtns.forEach(b => b.classList.toggle('active', b === btn));
        
        // Update active panel
        solvePanels.forEach(panel => {
          const panelId = panel.getAttribute('id');
          panel.classList.toggle('active', panelId === `solve-panel-${tabId}`);
        });
      });
    });
  }
});

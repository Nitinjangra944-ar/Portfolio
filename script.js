const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const dotLinks = document.querySelectorAll(".dot-nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const revealItems = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id]")];
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const chatWidget = document.querySelector("[data-chat-widget]");
const chatButton = document.querySelector(".chat-button");
const chatPanel = document.querySelector(".chat-panel");
const chatClose = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector(".chat-form input");
const chatMessages = document.querySelector(".chat-messages");

// Enhanced theme application with smooth transitions
const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  localStorage.setItem("theme", theme);
  
  // Add animation class for smooth transition
  document.documentElement.style.transition = "background-color 400ms var(--ease)";
};

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

const closeMenu = () => {
  navToggle?.classList.remove("is-active");
  navMenu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

const openMenu = () => {
  navToggle?.classList.add("is-active");
  navMenu?.classList.add("is-open");
  document.body.classList.add("menu-open");
  navToggle?.setAttribute("aria-expanded", "true");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.contains("is-open");
  isOpen ? closeMenu() : openMenu();
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

themeToggle?.addEventListener("click", () => {
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Enhanced reveal observer with staggered animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for better visual effect
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, index * 50);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -70px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
      dotLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.42 }
);

sections.forEach((section) => activeLinkObserver.observe(section));

// Enhanced form validation with smooth feedback
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const invalidFields = fields.filter((field) => !field.checkValidity());

  fields.forEach((field) => {
    field.classList.toggle("is-invalid", !field.checkValidity());
    if (!field.checkValidity()) {
      field.style.animation = "shake 400ms var(--ease)";
    }
  });

  if (invalidFields.length) {
    formMessage.textContent = "Please complete the highlighted fields with valid details.";
    formMessage.className = "form-message error";
    invalidFields[0].focus();
    return;
  }

  formMessage.textContent = "Thanks. Your project details are ready to send from a connected backend.";
  formMessage.className = "form-message success";
  
  // Add success animation
  contactForm.style.animation = "slideUp 600ms var(--ease)";
  
  setTimeout(() => {
    contactForm.reset();
    contactForm.style.animation = "";
  }, 600);
});

contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("is-invalid");
    field.style.animation = "";
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
  });
  
  // Add focus effects
  field.addEventListener("focus", () => {
    field.parentElement?.style.setProperty("--input-focus", "1");
  });
  
  field.addEventListener("blur", () => {
    field.parentElement?.style.setProperty("--input-focus", "0");
  });
});

// Add shake animation for invalid fields
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

const chatReplies = [
  {
    keywords: ["price", "cost", "budget", "charge", "pricing", "quote"],
    reply: "Website cost depends on scope and goals. A focused landing page can be faster and more affordable than a larger content site. Share your budget and I can suggest the best fit."
  },
  {
    keywords: ["service", "website", "design", "redesign", "responsive", "mobile", "landing"],
    reply: "I help with website design, redesign, mobile-first builds, conversion-focused layouts, and trust-building content. Tell me what you want to improve and I’ll recommend the best next step."
  },
  {
    keywords: ["contact", "phone", "call", "number", "whatsapp", "email"],
    reply: "You can reach Nitin at +91 98127 81384 or nitinji844@gmail.com. I’m also available through WhatsApp and contact form links in the footer."
  },
  {
    keywords: ["time", "timeline", "delivery", "how long", "weeks", "days"],
    reply: "Simple sites can move quickly once the scope is clear, while larger redesigns need planning and QA. Share your timeline and I’ll help estimate the right pace."
  },
  {
    keywords: ["location", "where", "india", "haryana", "hisar", "barwa"],
    reply: "Nitin is based in Haryana, India and works remotely with clients everywhere. Local or remote, the process and communication stay smooth."
  },
  {
    keywords: ["ather", "bikaji", "techside", "startup", "brand", "project"],
    reply: "This website highlights experience with brands, product launches, and business websites. I focus on trust, readability, mobile performance, and clear calls to action."
  }
];

const addChatMessage = (message, type) => {
  if (!chatMessages) return;

  const messageBubble = document.createElement("div");
  messageBubble.className = `chat-message ${type}`;
  messageBubble.textContent = message;
  messageBubble.style.animation = "slideUp 300ms var(--ease)";
  chatMessages.appendChild(messageBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const getChatReply = (message) => {
  const normalizedMessage = message.toLowerCase();
  const matchedReply = chatReplies.find(({ keywords }) =>
    keywords.some((keyword) => normalizedMessage.includes(keyword))
  );

  if (matchedReply) {
    return matchedReply.reply;
  }

  if (normalizedMessage.length < 4) {
    return "I’m here to answer website-related questions. Can you share a bit more detail?";
  }

  return "I can help with website services, trust-focused redesigns, mobile performance, pricing, and contact details. Ask about any of those and I’ll respond with useful details.";
};

const openChat = () => {
  if (!chatPanel || !chatButton) return;

  chatPanel.hidden = false;
  chatButton.setAttribute("aria-expanded", "true");
  chatInput?.focus();
  chatPanel.style.animation = "chatOpen 350ms var(--ease)";
};

const closeChat = () => {
  if (!chatPanel || !chatButton) return;

  chatPanel.hidden = true;
  chatButton.setAttribute("aria-expanded", "false");
};

chatButton?.addEventListener("click", () => {
  chatPanel?.hidden ? openChat() : closeChat();
});

chatClose?.addEventListener("click", closeChat);

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = chatInput?.value.trim();
  if (!message) return;

  addChatMessage(message, "user");
  chatInput.value = "";
  chatInput?.focus();

  window.setTimeout(() => {
    addChatMessage(getChatReply(message), "bot");
  }, 280);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel && !chatPanel.hidden) {
    closeChat();
  }
});

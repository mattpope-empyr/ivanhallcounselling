/** Shared, human-written content used across pages. */

export const services = [
  {
    slug: "anxiety",
    title: "Anxiety & worry",
    blurb:
      "When your mind won't switch off, or worry has quietly taken the wheel. We'll make sense of it together and find steadier ground.",
    points: ["Racing thoughts", "Panic & overwhelm", "Health & social anxiety"],
  },
  {
    slug: "relationships",
    title: "Relationships",
    blurb:
      "Difficulties with a partner, family, friends or colleagues — including the patterns that seem to repeat. A space to understand and be understood.",
    points: ["Communication", "Recurring conflict", "Feeling disconnected"],
  },
  {
    slug: "anger",
    title: "Anger & frustration",
    blurb:
      "Anger usually has something important underneath it. We'll explore what yours is trying to tell you, without blame or judgement.",
    points: ["Reacting then regretting", "Bottling things up", "Frustration & irritability"],
  },
  {
    slug: "low-mood",
    title: "Low mood & stress",
    blurb:
      "When everything feels heavy, flat or like too much. Gentle, steady support to help you feel more like yourself again.",
    points: ["Burnout & stress", "Low motivation", "Feeling stuck"],
  },
  {
    slug: "life-changes",
    title: "Life changes & loss",
    blurb:
      "Bereavement, separation, work, identity, becoming a parent — the big shifts that ask a lot of us. You don't have to navigate them alone.",
    points: ["Grief & loss", "Big transitions", "Loss of direction"],
  },
  {
    slug: "self",
    title: "Self-esteem & meaning",
    blurb:
      "A quiet sense that something isn't right, or that you've lost sight of who you are. Space to reconnect with what matters to you.",
    points: ["Confidence", "Self-criticism", "Searching for meaning"],
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Reach out",
    body: "Send a short enquiry or call. There's no pressure and nothing you need to prepare — a few words about what's bringing you here is plenty.",
  },
  {
    step: "02",
    title: "Free 20-minute consultation",
    body: "We have a relaxed, no-obligation chat by phone, video or in person. It's a chance to ask questions and see how it feels to talk.",
  },
  {
    step: "03",
    title: "Your first session",
    body: "If it feels right, we book your first 50-minute session. We go at your pace — there's no script and no rush.",
  },
  {
    step: "04",
    title: "Working together",
    body: "We meet weekly at a regular time. Over time we make sense of things together, and you decide how long feels helpful for you.",
  },
] as const;

export const trustPoints = [
  {
    title: "BACP registered",
    body: "A registered member of the British Association for Counselling and Psychotherapy, working to its ethical framework.",
  },
  {
    title: "20+ years' experience",
    body: "Two decades supporting people across mental health and education settings, with adults and young people from all walks of life.",
  },
  {
    title: "Confidential & non-judgemental",
    body: "What you share stays between us, within clear professional and ethical limits. No labels, no judgement.",
  },
  {
    title: "Free first conversation",
    body: "A no-obligation 20-minute consultation so you can decide, with no pressure, whether it feels like a good fit.",
  },
] as const;

export const faqs = [
  {
    question: "Do I need a reason or a diagnosis to come to counselling?",
    answer:
      "Not at all. You don't need a diagnosis, a crisis, or even the right words. If something feels difficult — or you simply have a sense that things could be better — that's reason enough to reach out.",
  },
  {
    question: "How long are sessions, and how often do we meet?",
    answer:
      "Sessions are 50 minutes and usually take place weekly at the same time, which helps build a steady, trusting space. How long we work together is entirely up to you — some people come for a few weeks, others for longer.",
  },
  {
    question: "How much does counselling cost?",
    answer:
      "Sessions are £60 each. Concessionary rates are available for students and people on a low income — please just ask. The initial 20-minute consultation is always free.",
  },
  {
    question: "Is what I say confidential?",
    answer:
      "Yes. What you share is confidential and held with care, within the BACP ethical framework. There are rare legal and safeguarding limits to confidentiality, which I'll always explain clearly at the start.",
  },
  {
    question: "How do we meet for sessions?",
    answer:
      "Sessions can be in person at the quiet home office in Sparsholt, by telephone, or by secure video — whatever feels most comfortable and practical for you. Many people mix and match.",
  },
  {
    question: "What kind of counselling do you offer?",
    answer:
      "I draw mainly on Transactional Analysis alongside other evidence-based approaches, in a warm and collaborative style. In practice that means we work together, led by you, to understand what's happening and what might help.",
  },
  {
    question: "Do you offer neurodiversity-affirming counselling?",
    answer:
      "Yes. I offer warm, affirming counselling for neurodivergent adults — including autistic and ADHD clients, and people who are questioning or self-identifying. Sessions adapt to how you think and communicate, there's no need to mask, and we work with how your mind works rather than against it. Please note this is counselling support, not a diagnostic or assessment service.",
  },
  {
    question: "What if I need to cancel a session?",
    answer:
      "Life happens. I ask for at least 24 hours' notice to rearrange a session. Cancellations with less than 24 hours' notice are charged at the full session fee.",
  },
  {
    question: "What happens in the very first session?",
    answer:
      "Mostly, we just talk. There's no script. We'll touch on what's brought you here and what you're hoping for, and you can ask anything you like. Nothing is expected of you beyond turning up as you are.",
  },
] as const;

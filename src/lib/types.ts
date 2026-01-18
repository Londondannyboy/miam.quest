// MIAM.quest - Mediation Preparation Platform Types

// ============ Case & Position Types ============

export type CaseType = "child_arrangements" | "financial" | "both";
export type CaseStatus = "preparation" | "ready_for_mediation" | "in_mediation" | "completed" | "closed";
export type PositionCategory = "must_have" | "priority" | "nice_to_have" | "red_line";
export type DocumentType = "preparation_summary" | "parenting_plan" | "financial_summary" | "position_statement";
export type DocumentStatus = "draft" | "review" | "final";

export interface Case {
  id: string;
  partyAId: string;
  partyBId?: string;
  caseType: CaseType;
  status: CaseStatus;
  childrenCount?: number;
  childrenAges?: number[];
  currentArrangement?: string;
  mainConcerns?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PositionItem {
  id: string;
  caseId: string;
  userId: string;
  category: PositionCategory;
  topic: PositionTopic;
  item: string;
  context?: string;
  importance?: number; // 1-5 scale
  createdAt: Date;
  updatedAt?: Date;
}

export interface Position {
  id: string;
  caseId: string;
  userId: string;
  mustHaves: PositionItem[];
  priorities: PositionItem[];
  niceToHaves: PositionItem[];
  redLines: PositionItem[];
  rawTranscript?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// ============ Position Topics ============

export type PositionTopic =
  | "living_arrangements"
  | "school_education"
  | "holidays_occasions"
  | "communication"
  | "decision_making"
  | "financial_support"
  | "handover_logistics"
  | "extended_family"
  | "health_medical"
  | "activities_hobbies"
  | "religious_cultural"
  | "travel_relocation"
  | "other";

export interface TopicInfo {
  topic: PositionTopic;
  label: string;
  description: string;
  sampleQuestions: string[];
}

export const POSITION_TOPICS: TopicInfo[] = [
  {
    topic: "living_arrangements",
    label: "Living Arrangements",
    description: "Where children will live primarily and spend their time",
    sampleQuestions: [
      "Where would you like the children to live most of the time?",
      "How would you describe the ideal weekly routine?",
      "Are there any concerns about either home environment?"
    ]
  },
  {
    topic: "school_education",
    label: "School & Education",
    description: "School choices, homework, educational decisions",
    sampleQuestions: [
      "Where are the children currently at school?",
      "Who manages homework and school communications?",
      "How should big educational decisions be made?"
    ]
  },
  {
    topic: "holidays_occasions",
    label: "Holidays & Special Occasions",
    description: "Christmas, birthdays, school holidays, family events",
    sampleQuestions: [
      "How would you like to handle Christmas and other holidays?",
      "What about birthdays - theirs and yours?",
      "How should school holidays be divided?"
    ]
  },
  {
    topic: "communication",
    label: "Communication Between Households",
    description: "How parents communicate about children, contact during time with other parent",
    sampleQuestions: [
      "How do you currently communicate about the children?",
      "Should children be able to contact the other parent freely?",
      "What information should be shared routinely?"
    ]
  },
  {
    topic: "decision_making",
    label: "Decision Making",
    description: "Who makes which decisions - day-to-day vs major decisions",
    sampleQuestions: [
      "How should major decisions about the children be made?",
      "What counts as a decision both parents should be involved in?",
      "How have you made decisions in the past?"
    ]
  },
  {
    topic: "financial_support",
    label: "Financial Support",
    description: "Child maintenance, shared costs, extra expenses",
    sampleQuestions: [
      "Have you discussed or arranged child maintenance?",
      "How should extra costs like school trips be handled?",
      "What about costs for activities and hobbies?"
    ]
  },
  {
    topic: "handover_logistics",
    label: "Handover & Logistics",
    description: "Pickup/dropoff arrangements, who transports children",
    sampleQuestions: [
      "Where would handovers take place?",
      "Who would do the pickups and dropoffs?",
      "What should happen if someone is running late?"
    ]
  },
  {
    topic: "extended_family",
    label: "Extended Family",
    description: "Grandparents, new partners, step-siblings",
    sampleQuestions: [
      "What role should grandparents play?",
      "Are there any concerns about new partners being introduced?",
      "How should step-siblings be factored in?"
    ]
  },
  {
    topic: "health_medical",
    label: "Health & Medical",
    description: "Medical decisions, doctor appointments, health conditions",
    sampleQuestions: [
      "Do any children have ongoing health needs?",
      "How should medical appointments be handled?",
      "Who should make decisions about vaccinations or treatments?"
    ]
  },
  {
    topic: "activities_hobbies",
    label: "Activities & Hobbies",
    description: "Sports, clubs, extracurricular activities",
    sampleQuestions: [
      "What activities are the children involved in?",
      "How should costs and transport for activities be shared?",
      "What if a new activity conflicts with parenting time?"
    ]
  },
  {
    topic: "religious_cultural",
    label: "Religious & Cultural",
    description: "Religious upbringing, cultural traditions, celebrations",
    sampleQuestions: [
      "Is religious upbringing important to either of you?",
      "Are there cultural traditions you want to maintain?",
      "How should different beliefs be handled?"
    ]
  },
  {
    topic: "travel_relocation",
    label: "Travel & Relocation",
    description: "Taking children on holiday, moving home, passports",
    sampleQuestions: [
      "How much notice should be given for holidays abroad?",
      "What if one parent wants to move further away?",
      "Where are the children's passports kept?"
    ]
  },
  {
    topic: "other",
    label: "Other",
    description: "Any other concerns or topics not covered above",
    sampleQuestions: [
      "Is there anything else that's important to you?",
      "What else would you like to discuss in mediation?"
    ]
  }
];

// ============ Document Types ============

export interface Document {
  id: string;
  caseId: string;
  userId?: string;
  docType: DocumentType;
  title: string;
  content: string;
  status: DocumentStatus;
  version: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PreparationSummary {
  caseOverview: {
    caseType: CaseType;
    numberOfChildren: number;
    childrenAges: number[];
    currentArrangement: string;
  };
  userPosition: Position;
  keyQuestions: string[];
  nextSteps: string[];
  generatedAt: Date;
}

// ============ Mediator Types ============

export type MediatorSpecialization =
  | "child_arrangements"
  | "financial"
  | "domestic_abuse"
  | "high_conflict"
  | "international"
  | "lgbtq"
  | "disability";

export interface Mediator {
  id: string;
  name: string;
  fmcAccredited: boolean;
  fmcNumber?: string;
  specializations: MediatorSpecialization[];
  location: string;
  postcode?: string;
  remoteAvailable: boolean;
  inPersonAvailable: boolean;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  bio?: string;
  hourlyRate?: number;
  miamCost?: number;
  legalAidAvailable: boolean;
  languages?: string[];
  createdAt: Date;
}

// ============ MIAM Exemption Types ============

export type MiamExemption =
  | "domestic_abuse"
  | "child_protection"
  | "urgency"
  | "previous_miam"
  | "other_party_overseas"
  | "other_party_prison"
  | "disability"
  | "no_mediator_available"
  | "bankruptcy"
  | "none";

export interface ExemptionCheck {
  exemption: MiamExemption;
  label: string;
  description: string;
  evidenceRequired?: string[];
  applies: boolean;
}

export const MIAM_EXEMPTIONS: Omit<ExemptionCheck, "applies">[] = [
  {
    exemption: "domestic_abuse",
    label: "Domestic Abuse",
    description: "Evidence that you or the child are at risk of domestic abuse",
    evidenceRequired: [
      "Police investigation or caution",
      "Conviction for domestic abuse offence",
      "Protective injunction (non-molestation/occupation order)",
      "Undertaking in court proceedings",
      "Finding of fact in court proceedings",
      "Expert letter from GP, health visitor, or specialist service",
      "Refuge or domestic abuse support service letter",
      "MARAC (Multi-Agency Risk Assessment Conference) referral"
    ]
  },
  {
    exemption: "child_protection",
    label: "Child Protection",
    description: "There are child protection concerns involving local authority or police",
    evidenceRequired: [
      "Child subject to child protection plan",
      "Section 47 enquiries",
      "Local authority involvement letter"
    ]
  },
  {
    exemption: "urgency",
    label: "Urgency",
    description: "Urgent need for protection - risk of harm, child abduction, or delay causing significant harm",
    evidenceRequired: []
  },
  {
    exemption: "previous_miam",
    label: "Previous MIAM",
    description: "A MIAM about the same or substantially the same dispute within the last 4 months"
  },
  {
    exemption: "other_party_overseas",
    label: "Other Party Overseas",
    description: "The other party lives outside England & Wales"
  },
  {
    exemption: "other_party_prison",
    label: "Other Party in Prison",
    description: "The other party is in prison or a secure hospital"
  },
  {
    exemption: "disability",
    label: "Disability",
    description: "You cannot attend a MIAM due to disability and no reasonable adjustments can be made"
  },
  {
    exemption: "no_mediator_available",
    label: "No Mediator Available",
    description: "No authorised family mediator available within 15 miles"
  },
  {
    exemption: "bankruptcy",
    label: "Bankruptcy (Financial Only)",
    description: "For financial applications only - you or the other party is bankrupt"
  }
];

// ============ Conversation/Session Types ============

export interface ConversationSession {
  id: string;
  userId: string;
  caseId?: string;
  startedAt: Date;
  endedAt?: Date;
  durationMinutes?: number;
  topicsCovered: PositionTopic[];
  itemsCaptured: number;
  transcript?: string;
}

// ============ User Profile Types ============

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  preferredContactMethod?: "email" | "phone" | "both";
  hasChildren: boolean;
  childrenCount?: number;
  childrenAges?: number[];
  currentSituation?: "separating" | "separated" | "considering";
  location?: string;
  hasLegalAid?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// ============ Agent Tool Response Types ============

export interface CapturePositionResponse {
  success: boolean;
  positionId: string;
  message: string;
  currentCounts: {
    mustHaves: number;
    priorities: number;
    niceToHaves: number;
    redLines: number;
  };
}

export interface PositionSummaryResponse {
  userId: string;
  caseId: string;
  position: Position;
  completeness: {
    topicsCovered: PositionTopic[];
    topicsRemaining: PositionTopic[];
    percentComplete: number;
  };
  suggestions: string[];
}

export interface MediatorSearchResponse {
  mediators: Mediator[];
  totalCount: number;
  searchCriteria: {
    location?: string;
    specialization?: MediatorSpecialization;
    remoteOnly?: boolean;
    legalAidOnly?: boolean;
  };
}

export interface MiamInfoResponse {
  topic: string;
  content: string;
  relatedTopics: string[];
  sources: string[];
}

export interface ExemptionCheckResponse {
  potentialExemptions: ExemptionCheck[];
  hasLikelyExemption: boolean;
  recommendation: string;
  disclaimer: string;
}

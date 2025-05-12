export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: 'Doctor' | 'Patient' | 'Admin';
    speciality?: string;
    description?: string;
    isGeneralist?: boolean;
    profilePhotoUrl?: string;
    whatsappNumber?: string;  // Correction: whatsappNumber au lieu de whatsappUrl
    facebookUrl?: string;
    instagramUrl?: string;
    websiteUrl?: string;
    isProfileComplete: boolean;
    diploma?: string;
  }
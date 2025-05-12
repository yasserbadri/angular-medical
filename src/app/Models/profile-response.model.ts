export interface ProfileResponse {
  baseProfile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    profilePhotoUrl?: string;
    isProfileComplete?: boolean;
  };
  doctorDetails?: {
    speciality?: string;
    description?: string;
    isGeneralist?: boolean;
    diploma?: string;
    whatsappNumber?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    websiteUrl?: string;
  };
}

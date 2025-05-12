// profile.interface.ts
export interface ProfileResponse {
    BaseProfile: {
      Id: string;
      FirstName: string;
      LastName: string;
      Email: string;
      PhoneNumber?: string;
      Role: string;
      ProfilePhotoUrl?: string;
      IsProfileComplete: boolean;
    };
    DoctorDetails?: {
      Speciality?: string;
      Description?: string;
      IsGeneralist?: boolean;
      Diploma?: string;
      WhatsappNumber?: string;
      FacebookUrl?: string;
      InstagramUrl?: string;
      WebsiteUrl?: string;
    };
  }
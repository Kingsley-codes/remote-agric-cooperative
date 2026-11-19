export interface CurrentUser {
  id: string;
  localUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  farmerID: string;
  membershipStatus: "pending" | "active" | "suspended";
  termsAcceptedAt: string | null;
  termsVersion: string | null;
  currentTermsVersion: string;
}


export interface CurrentAdmin {
  id: string; email: string; name: string; role: "admin";
}

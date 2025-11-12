// PI Model Structure
export interface PIModel {
    id: string; // piId
    username: string;
    password: string; // Note: Typically excluded from frontend display/GET, but needed for POST/PATCH
    fullName: string;
    role: 'PrincipalInvestigator'; // Based on Role enum
    createdAt: string; // LocalDateTime
}
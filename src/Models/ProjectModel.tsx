// src/model/ProjectModel.ts or within ProjectService.ts
export interface ProjectModel {
    id: string; // Corresponds to projectId in ProjectEntity
    title: string;
    summary: string;
    tags: string; // Assuming tags is a single string in DTO/Entity
    pi: { // Assuming PI is a simple object for display/update
        piId: string;
        name: string; // Assuming PIEntity has a name property
    };
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'; // Based on Status enum
    startDate: string; // Using string for LocalDate/LocalDateTime
    endDate: string; // Using string for LocalDate/LocalDateTime
    createdAt: string; // Using string for LocalDateTime
    updatedAt: string; // Using string for LocalDateTime
}

// Minimal model for creation/update (PI is complex, but simplifying for frontend)
export interface ProjectInputModel {
    title: string;
    summary: string;
    tags: string;
    pi: { piId: string }; // Simplified PI input
    status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    startDate: string;
    endDate: string;
}